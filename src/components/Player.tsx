import { motion, AnimatePresence } from 'framer-motion'
import { usePlayer } from '../lib/playerContext'

export default function Player() {
  const { currentTrack, isPlaying, progress, duration, togglePlay, seek } = usePlayer()
  if (!currentTrack) return null

  // garante imagem de capa válida
  const cover =
    currentTrack.album?.cover_medium ||
    currentTrack.album?.cover ||
    '/shark-album.png'

  return (
    <AnimatePresence>
      <motion.div
        key={currentTrack.id}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-[#0b1624]/70 border-t border-white/10 shadow-lg z-50"
      >
        <div className="container flex items-center justify-between gap-4 py-3 px-4">
          <div className="flex items-center gap-3">
            <img
              src={cover}
              alt={currentTrack.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <div className="font-semibold text-shark-100 truncate max-w-[200px]">
                {currentTrack.title}
              </div>
              <div className="text-sm text-shark-300 truncate max-w-[200px]">
                {currentTrack.artist.name}
              </div>
            </div>
          </div>

          {/* Linha de tempo */}
          <div className="flex-1 mx-6 flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={duration || 30}
              value={progress}
              onChange={(e) => seek(parseFloat(e.target.value))}
              className="w-full accent-shark-400 cursor-pointer"
            />
            <span className="text-xs text-shark-300 w-10 text-right">
              {Math.floor(progress)}s
            </span>
          </div>

          {/* Botão play/pause */}
          <button
            onClick={togglePlay}
            className="bg-shark-500/30 hover:bg-shark-500/60 transition rounded-full px-4 py-2 text-white font-semibold shadow-[0_0_15px_rgba(0,191,255,0.2)]"
          >
            {isPlaying ? '⏸' : '▶️'}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
