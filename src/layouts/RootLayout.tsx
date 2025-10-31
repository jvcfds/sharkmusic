import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Player from '../components/Player'

export default function RootLayout() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) navigate(`/search?q=${query}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#020617] via-[#0B1222] to-[#04070f] text-white">
      {/* HEADER FIXO */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 backdrop-blur-md bg-black/20 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2">
          {/* 🔹 Removido o símbolo/ícone da logo */}
          <span className="text-xl font-bold text-sky-400">SharkMusic</span>
        </Link>

        <form onSubmit={handleSearch} className="relative w-[280px] sm:w-[350px]">
          <input
            type="text"
            placeholder="Buscar artista, música..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full bg-white/10 text-sm py-2 pl-4 pr-10 placeholder-white/50 outline-none focus:bg-white/15 transition"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition"
          >
            🔍
          </button>
        </form>
      </header>

      {/* CONTEÚDO CENTRAL */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
        >
          <Outlet />
        </motion.div>
      </main>

      {/* PLAYER FIXO (CORRIGIDO) */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-lg border-t border-white/10">
  <div className="max-w-7xl mx-auto px-4 py-2">
    <Player />
  </div>
</footer>
    </div>
  )
}
