import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import Player from '../components/Player'

export default function RootLayout() {
  const navigate = useNavigate()

  return (
    <div className="min-h-full relative">
      <header className="border-b border-white/10 sticky top-0 backdrop-blur-md bg-[#081018]/70 z-50 shadow-lg">
        <nav className="container py-4 flex items-center justify-between">
          {/* 🦈 título clicável volta pra home */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-shark-400 hover:text-shark-300 transition font-bold text-2xl"
          >
            🦈 SharkMusic
          </button>

          <div className="flex gap-6 text-sm">
            <NavLink
              to="/search"
              className="opacity-80 hover:opacity-100 transition"
            >
              Buscar
            </NavLink>
          </div>
        </nav>
      </header>

      <main className="pb-24"> {/* espaço pro player fixo */}
        <Outlet />
      </main>

      <Player />
    </div>
  )
}
