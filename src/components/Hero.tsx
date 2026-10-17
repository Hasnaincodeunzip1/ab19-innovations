import { motion } from 'framer-motion'
import { Button } from './ui/Button'
import { Eyebrow } from './ui/Eyebrow'
import { cn } from '../lib/cn'

const marks = ['AI systems', 'Data platforms', 'Digital products']

/** Staggered entrance — the copy assembles while the 3D world settles behind it. */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 md:pb-24 lg:pt-44"
    >
      {/* A fine CSS grid sits in front of the WebGL field to give it a plane. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className={cn(
            'absolute inset-0 opacity-30',
            '[background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)]',
            '[background-size:72px_72px]',
            '[mask-image:radial-gradient(130%_95%_at_70%_20%,#000_20%,transparent_75%)]',
          )}
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink to-transparent" />
        {/* Keeps the copy readable over the scene: an even dim on phones,
            a side scrim once the layout puts copy beside the world. */}
        <div className="absolute inset-0 bg-ink/55 sm:hidden" />
        <div className="absolute inset-y-0 left-0 hidden w-[78%] bg-gradient-to-r from-ink via-ink/78 to-transparent sm:block lg:w-[64%]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="shell">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12"
        >
          <div className="lg:col-span-9 xl:col-span-8">
            <motion.div variants={item}>
              <Eyebrow>AB19 INNOVATIONS · AI + SOFTWARE + DATA</Eyebrow>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-balance-tight mt-8 text-[length:var(--text-display)] font-medium sm:mt-10"
            >
              Build what
              <br />
              comes next<span className="text-accent">.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-8 max-w-[56ch] text-base leading-relaxed text-fg-muted sm:mt-10 sm:text-lg"
            >
              We build AI-powered software, intelligent data systems and digital products that help
              businesses move faster, operate smarter and create measurable impact.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:items-center sm:gap-4"
            >
              <Button href="/services">Explore services</Button>
              <Button href="/contact" variant="ghost">
                Start a project
              </Button>
            </motion.div>
          </div>

          <motion.div variants={item} className="flex items-end lg:col-span-3 lg:justify-end xl:col-span-4">
            <ul className="w-full space-y-px border-t border-line lg:max-w-[16rem] lg:border-t-0 lg:border-l lg:pl-6">
              {marks.map((mark) => (
                <li
                  key={mark}
                  className="flex items-center gap-3 border-b border-line py-3.5 text-sm text-fg-faint lg:border-b-0 lg:py-2"
                >
                  <span aria-hidden="true" className="block h-px w-4 bg-accent" />
                  {mark}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
