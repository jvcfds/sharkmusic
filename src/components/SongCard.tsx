import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Track } from '../lib/types'
import { usePlayer } from '../lib/player'

export default function SongCard({ track }: { track: Track }) {
  const { playTrack } = usePlayer()
  const cover =
    track.album?.cover_medium || track.album?.cover || '/shark-album.png'

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 250, damping: 18 }}
      className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 backdrop-blur-sm group cursor-pointer flex flex-col"
    >
      <div
        onClick={() => playTrack(track)}
        className="relative w-full aspect-square overflow-hidden"
      >
        <motion.img
          src={cover}
          alt={track.title}
          loading="lazy"
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black/50"
        >
          <button
            onClick={() => playTrack(track)}
            className="p-3 rounded-full bg-shark-500/60 hover:bg-shark-500/80 transition"
          >
            ▶
          </button>
        </motion.div>
      </div>

      <div className="p-3 flex flex-col items-center justify-center text-center space-y-1">
        <Link
          to={`/song/${track.id}`}
          className="text-sm font-semibold hover:text-shark-300 transition-colors truncate max-w-[90%]"
        >
          {track.title}
        </Link>
        <p className="text-xs opacity-70 truncate">{track.artist.name}</p>
      </div>
    </motion.div>
  )
}
