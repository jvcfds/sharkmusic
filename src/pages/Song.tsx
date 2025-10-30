import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTrack } from '../lib/api'
import type { Track } from '../lib/types'
import { motion } from 'framer-motion'
import { useTheme } from '../lib/theme'
import { usePlayer } from '../lib/playerContext'

export default function Song() {
  const { id } = useParams()
  const [track, setTrack] = useState<Track | null>(null)
  const { setTheme } = useTheme()
  const { playTrack } = usePlayer()

  useEffect(() => {
    if (!id) return
    getTrack(id).then((t) => {
      setTrack(t)
      const cover = t.album?.cover_big ?? t.artist.picture
      setTheme({
        bgImage: cover || null,
        tint: 'radial-gradient(900px 500px at 70% 20%, rgba(0,191,255,.35), rgba(8,16,24,.9))'
      })
    })
  }, [id, setTheme])

  if (!track) return <p className="opacity-70">Carregando música…</p>

  const cover = track.album?.cover_big ?? track.artist.picture

  return (
    <div className="grid md:grid-cols-[320px_1fr] gap-8 items-start">
      <motion.img
        src={cover}
        alt={track.title}
        className="w-full max-w-[320px] rounded-2xl shadow-[0_0_40px_rgba(0,191,255,0.25)]"
      />
      <div className="space-y-5">
        <h1 className="text-4xl font-extrabold text-shark-300">{track.title}</h1>
        <p className="text-shark-200">{track.artist.name}</p>

        {track.preview ? (
          <button
            onClick={() => playTrack(track)}
            className="rounded-lg bg-shark-500/20 hover:bg-shark-500/40 text-shark-100 font-medium px-6 py-2 transition shadow-md"
          >
            ▶️ Ouvir preview (30s)
          </button>
        ) : (
          <span className="opacity-70 text-sm">🎵 Sem preview disponível</span>
        )}

        <div className="opacity-70 text-sm">
          <p>ID: {track.id}</p>
          <p>Duração: {Math.round(track.duration / 60)} min</p>
        </div>
      </div>
    </div>
  )
}
