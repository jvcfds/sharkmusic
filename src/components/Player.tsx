import { usePlayer } from '../lib/player'
import { motion } from 'framer-motion'
import { Play, Pause } from 'lucide-react'

export default function Player() {
  const { currentTrack, isPlaying, togglePlay, progress, duration } = usePlayer()

  if (!currentTrack) return null

  const cover =
    currentTrack.album?.cover_medium ||
    currentTrack.album?.cover_big ||
    '/shark-album.png'

  const percent = duration ? (progress / duration) * 100 : 0

  return (
    <motion.div
      className="player-bar flex items-center justify-between gap-4 border-t border-white/10"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      transition={{ duration: 0.3 }}
    >
      {/* Capa do álbum */}
      <div className="flex items-center gap-4 w-[200px]">
        <img
          src={cover}
          alt={currentTrack.title}
          className="w-12 h-12 rounded-lg object-cover shadow-glow"
        />
        <div className="truncate">
          <p className="font-semibold text-sm truncate">{currentTrack.title}</p>
          <p className="text-xs opacity-70 truncate">{currentTrack.artist.name}</p>
        </div>
      </div>

      {/* Controles */}
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
          {isPlaying ? (
            <Pause size={20} className="text-white" />
          ) : (
            <Play size={20} className="text-white ml-1" />
          )}
        </button>
      </div>

      {/* Barra de progresso */}
      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden max-w-[300px] mx-auto">
        <div
          className="progress-bar"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </motion.div>
  )
}
