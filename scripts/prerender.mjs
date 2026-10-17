/**
 * Renders every route to static HTML.
 *
 * The site is a client-rendered SPA, which is the wrong thing to hand a
 * crawler. This drives the built bundle in headless Chrome — with WebGL
 * disabled so the 3D layer never ends up in the output — and writes the
 * resulting DOM to dist/<route>/index.html. Each route then serves real HTML
 * with its own title, meta and JSON-LD, and hydrates into the full app.
 */
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { routes } from './routes.mjs'

/**
 * Finds a Chrome to drive. Build machines are not developer laptops: CI images
 * put the binary somewhere else, or ship none at all, so an explicit override
 * wins, then Puppeteer's own download, then the usual system locations.
 */
async function findChrome() {
  const fromEnv = [
    process.env.CHROME_PATH,
    process.env.PUPPETEER_EXECUTABLE_PATH,
    process.env.CHROME_BIN,
  ].filter(Boolean)
  for (const candidate of fromEnv) {
    if (existsSync(candidate)) return candidate
    console.warn(`prerender: ignoring missing browser from env: ${candidate}`)
  }

  try {
    const { default: puppeteer } = await import('puppeteer')
    // Sync in Puppeteer <= 24, a promise from 25 on.
    const path = await puppeteer.executablePath()
    if (path && existsSync(path)) return path
  } catch {
    /* puppeteer not installed or no browser downloaded; try system paths */
  }

  const candidates =
    process.platform === 'darwin'
      ? [
          '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
          '/Applications/Chromium.app/Contents/MacOS/Chromium',
        ]
      : [
          '/usr/bin/google-chrome-stable',
          '/usr/bin/google-chrome',
          '/usr/bin/chromium-browser',
          '/usr/bin/chromium',
          '/snap/bin/chromium',
        ]
  return candidates.find((path) => existsSync(path)) ?? null
}

const CHROME = await findChrome()
if (!CHROME) {
  console.warn(
    '\nprerender: no Chrome found, so routes ship as the client-rendered SPA.\n' +
      '           Crawlers will see an empty shell. Install the browser with\n' +
      '           `npm i -D puppeteer`, or set CHROME_PATH to a binary.\n',
  )
  process.exit(0)
}
const PORT = 4188
const CDP_PORT = 9422
const DIST = 'dist'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function waitFor(url, { json = false, attempts = 160 } = {}) {
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await fetch(url)
      if (response.ok) return json ? await response.json() : true
    } catch {
      /* not up yet */
    }
    await sleep(250)
  }
  throw new Error(`timed out waiting for ${url}`)
}

const preview = spawn(
  join(process.cwd(), 'node_modules', '.bin', 'vite'),
  ['preview', '--port', String(PORT), '--strictPort'],
  { stdio: 'ignore' },
)

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--hide-scrollbars',
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${join(process.cwd(), 'node_modules', '.cache', 'prerender-profile')}`,
    'about:blank',
  ],
  { stdio: 'ignore' },
)

// A bad binary fails the spawn asynchronously; without this the script just
// waits out the CDP timeout and reports the wrong cause.
chrome.on('error', (error) => {
  console.error(`prerender: could not start Chrome at ${CHROME}\n${error.message}`)
  process.exit(1)
})

const cleanup = () => {
  preview.kill()
  chrome.kill()
}
process.on('exit', cleanup)
process.on('SIGINT', () => {
  cleanup()
  process.exit(1)
})

try {
  await waitFor(`http://localhost:${PORT}/`)
  const { webSocketDebuggerUrl } = await waitFor(`http://127.0.0.1:${CDP_PORT}/json/version`, {
    json: true,
  })

  const socket = new WebSocket(webSocketDebuggerUrl)
  await new Promise((resolve) => socket.addEventListener('open', resolve, { once: true }))

  let id = 0
  const pending = new Map()
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data)
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message)
      pending.delete(message.id)
    }
  })
  const call = (method, params = {}, sessionId) =>
    new Promise((resolve, reject) => {
      const messageId = ++id
      pending.set(messageId, (message) =>
        message.error ? reject(new Error(`${method}: ${message.error.message}`)) : resolve(message.result),
      )
      socket.send(JSON.stringify({ id: messageId, method, params, sessionId }))
    })

  const { targetId } = await call('Target.createTarget', { url: 'about:blank' })
  const { sessionId } = await call('Target.attachToTarget', { targetId, flatten: true })
  const send = (method, params) => call(method, params, sessionId)
  const evaluate = async (expression) =>
    (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result
      .value

  await send('Page.enable')
  await send('Runtime.enable')
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  })
  // Reduced motion keeps Lenis and the idle animation out of the captured DOM.
  await send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
  })
  // No WebGL: the static fallback is what belongs in prerendered markup.
  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
      const original = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (type, ...rest) {
        return String(type).startsWith('webgl') ? null : original.call(this, type, ...rest);
      };
      Object.defineProperty(window, 'WebGLRenderingContext', { value: undefined });
    `,
  })

  let written = 0
  for (const route of routes) {
    await send('Page.navigate', { url: `http://localhost:${PORT}${route.path}` })
    await sleep(1400)

    // Reveal-on-scroll elements start at opacity 0; mark them visible so the
    // prerendered HTML is not full of invisible content.
    await evaluate(`
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
      document.querySelectorAll('[aria-busy="true"]').length
    `)

    const html = await evaluate('document.documentElement.outerHTML')
    const title = await evaluate('document.title')
    if (!html || !title) throw new Error(`empty render for ${route.path}`)

    const document = `<!doctype html>\n${html}\n`

    if (route.path === '/') {
      writeFileSync(join(DIST, 'index.html'), document)
    } else {
      // Write both shapes so the output resolves on any static host, whether it
      // maps /blog to /blog/index.html or to /blog.html.
      for (const target of [join(DIST, route.path, 'index.html'), join(DIST, `${route.path}.html`)]) {
        mkdirSync(dirname(target), { recursive: true })
        writeFileSync(target, document)
      }
    }
    written++
    console.log(`  ${route.path.padEnd(52)} ${title.slice(0, 58)}`)
  }

  // A 404 document for hosts that serve one.
  await send('Page.navigate', { url: `http://localhost:${PORT}/__not-found__` })
  await sleep(1200)
  await evaluate(`document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))`)
  const notFound = await evaluate('document.documentElement.outerHTML')
  writeFileSync(join(DIST, '404.html'), `<!doctype html>\n${notFound}\n`)

  socket.close()
  console.log(`prerender: ${written} routes + 404.html`)
} finally {
  cleanup()
}
