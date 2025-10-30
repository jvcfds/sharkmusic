import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import type { Track } from '../lib/types'

export default function SongCard({ track }: { track: Track }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  const cover =
    track.album?.cover_medium ?? track.artist.picture ?? '/shark-album.png'

  return (
    <div className="bg-white/5 rounded-xl p-3 hover:bg-white/10 transition">
      <Link
        to={`/song/${track.id}`}
        state={{ track }} // envia a música para o Player
        className="block"
      >
        <motion.img
          layoutId={`song-cover-${track.id}`}
          src={cover}
          alt={track.title}
          className="w-full aspect-square object-cover rounded-lg transition-transform duration-300 hover:scale-105"
        />
      </Link>

      <div className="mt-2">
        <div className="font-semibold leading-tight truncate">{track.title}</div>
        <Link
          to={`/artist/${track.artist.id}`}
          className="text-sm opacity-70 hover:opacity-100 truncate"
        >
          {track.artist.name}
        </Link>
      </div>

      {track.preview && (
        <div className="mt-3 flex items-center gap-2">
          <audio ref={audioRef} src={track.preview} />
          <button
            className="text-xs px-2 py-1 rounded bg-shark-500/20 hover:bg-shark-500/40 transition"
            onClick={() => {
              const a = audioRef.current
              if (!a) return
              if (playing) {
                a.pause()
                setPlaying(false)
              } else {
                a.play()
                setPlaying(true)
                a.onended = () => setPlaying(false)
              }
            }}
          >
            {playing ? '⏸ Pausar' : '▶️ Preview (30s)'}
          </button>
        </div>
      )}
    </div>
  )
}
