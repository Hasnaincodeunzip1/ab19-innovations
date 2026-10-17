import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import HomePage from './pages/HomePage'

// Home is eager — it is the landing route. Everything else splits out.
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'))
const MethodPage = lazy(() => import('./pages/MethodPage'))
const WorkPage = lazy(() => import('./pages/WorkPage'))
const IndustryPage = lazy(() => import('./pages/IndustryPage'))
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const PostPage = lazy(() => import('./pages/PostPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

/** Holds the layout height while a route chunk loads, so nothing jumps. */
function RouteFallback() {
  return <div className="min-h-dvh" aria-busy="true" />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="*"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Routes>
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/:slug" element={<ServiceDetailPage />} />
                  <Route path="/method" element={<MethodPage />} />
                  <Route path="/work" element={<WorkPage />} />
                  <Route path="/work/:industry" element={<IndustryPage />} />
                  <Route path="/work/:industry/:slug" element={<CaseStudyPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<PostPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
