import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Artist from './pages/Artist'
import Song from './pages/Song'
import Search from './pages/Search'

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<RootLayout />}>
          <Route index element={<Page><Home /></Page>} />
          <Route path="artist/:id" element={<Page><Artist /></Page>} />
          <Route path="song/:id" element={<Page><Song /></Page>} />
          <Route path="search" element={<Page><Search /></Page>} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: .35 }}
      className="container py-6"
    >
      {children}
    </motion.div>
  )
}
