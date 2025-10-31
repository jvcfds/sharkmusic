import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTrack } from '../lib/api'
import type { Track } from '../lib/types'
import { useTheme } from '../lib/theme'
import { usePlayer } from '../lib/player'
import { motion } from 'framer-motion'

export default function Song() {
  const { id } = useParams()
  const [track, setTrack] = useState<Track | null>(null)
  const { setTheme } = useTheme()
  const { playTrack } = usePlayer()

  useEffect(() => {
    const fetchTrack = async () => {
      const data = await getTrack(id || '')
      if (data) {
        setTrack(data)
        setTheme({
          bgImage:
            data.album?.cover_xl ||
            data.album?.cover_big ||
            data.album?.cover_medium ||
            data.album?.cover ||
            '/shark-album.png',
        })
      }
    }
    fetchTrack()
  }, [id, setTheme])

  if (!track)
    return (
      <div className="text-center text-white/60 mt-20">
        <p>Carregando música...</p>
      </div>
    )

  return (
    <motion.div
      className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <img
        src={
          track.album?.cover_xl ||
          track.album?.cover_big ||
          track.album?.cover_medium ||
          track.album?.cover ||
          '/shark-album.png'
        }
        alt={track.title}
        className="w-56 h-56 rounded-2xl object-cover shadow-lg border border-white/10"
      />

      <div>
        <h1 className="text-2xl font-bold text-white mb-2">{track.title}</h1>
        <p className="text-sky-400 text-sm font-medium">
          {track.artist.name}
        </p>
      </div>

      <button
        onClick={() => playTrack(track)}
        className="px-6 py-3 bg-sky-500 hover:bg-sky-600 transition rounded-full text-white font-semibold shadow-lg"
      >
        ▶️ Tocar música
      </button>

      <div className="text-sm text-white/70 mt-4">
        <p>Duração: {(track.duration || 0) / 60 < 1
            ? `${track.duration}s`
            : `${Math.floor((track.duration || 0) / 60)}:${String(
                (track.duration || 0) % 60
              ).padStart(2, '0')} min`}
        </p>
        <a
          href={track.preview}
          target="_blank"
          rel="noreferrer"
          className="block mt-1 text-sky-400 hover:underline"
        >
          Ouvir prévia no Deezer
        </a>
      </div>
    </motion.div>
  )
}
