import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import Song from './pages/Song'
import Artist from './pages/Artist'
import Player from './components/Player'

export default function App() {
  const location = useLocation()

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Animações de transição entre páginas */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex-1"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/song/:id" element={<Song />} />
            <Route path="/artist/:id" element={<Artist />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      {/* Player fixo global — sempre dentro do contexto */}
      <Player />
    </div>
  )
}
