import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTrack } from '../lib/api'
import { useTheme } from '../lib/theme'
import { usePlayer } from '../lib/player'
import type { Track } from '../lib/types'
import { motion } from 'framer-motion'

export default function SongPage() {
  const { id } = useParams()
  const [track, setTrack] = useState<Track | null>(null)
  const { setTheme } = useTheme()
  const { playTrack } = usePlayer()

  useEffect(() => {
    if (!id) return

    const load = async () => {
      try {
        const data = await getTrack(id)
        setTrack(data)

        // define o fundo com fallback seguro
        const cover =
          (data.album as any)?.cover_xl ||
          (data.album as any)?.cover_big ||
          (data.album as any)?.cover_medium ||
          (data.album as any)?.cover ||
          '/shark-album.png'

        setTheme({ bgImage: cover })
      } catch (err) {
        console.error('Erro ao carregar música:', err)
      }
    }

    load()
  }, [id, setTheme])

  if (!track)
    return (
      <div className="flex items-center justify-center h-[70vh] text-white/70 text-lg">
        Carregando música...
      </div>
    )

  const albumCover =
    (track.album as any)?.cover_xl ||
    (track.album as any)?.cover_big ||
    (track.album as any)?.cover_medium ||
    (track.album as any)?.cover ||
    '/shark-album.png'

  return (
    <motion.div
      className="flex flex-col items-center text-center space-y-8 mt-10 pb-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Capa */}
      <motion.img
        src={albumCover}
        alt={track.title}
        className="w-64 h-64 rounded-2xl shadow-xl object-cover"
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      />

      {/* Informações */}
      <div>
        <h1 className="text-4xl font-bold mb-2">{track.title}</h1>
        <p className="opacity-80">{track.artist.name}</p>
      </div>

      {/* Botão Play */}
      <motion.button
        onClick={() => playTrack(track)}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-shark-500/40 hover:bg-shark-500/70 rounded-full text-white font-semibold transition"
      >
        ▶ Tocar Prévia
      </motion.button>

      {/* Álbum */}
      <div className="opacity-70 text-sm">
        Álbum:{' '}
        <span className="font-medium">
          {(track.album as any)?.title || 'Desconhecido'}
        </span>
      </div>

      {/* Link Deezer */}
      {(track as any)?.link && (
        <a
          href={(track as any).link}
          target="_blank"
          rel="noreferrer"
          className="text-shark-300 hover:text-shark-200 underline transition"
        >
          Ouvir no Deezer →
        </a>
      )}
    </motion.div>
  )
}
