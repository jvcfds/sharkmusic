import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getArtist, getArtistTopTracks } from '../lib/api'
import type { Artist as ArtistType, Track } from '../lib/types'
import { motion } from 'framer-motion'
import SongCard from '../components/SongCard'
import { GridSkeleton } from '../components/Skeleton'
import { useTheme } from '../lib/theme'

export default function Artist() {
  const { id } = useParams()
  const [artist, setArtist] = useState<ArtistType | null>(null)
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)
  const { setTheme } = useTheme()

  useEffect(() => {
    if (!id) return
    setLoading(true)
    Promise.all([getArtist(id), getArtistTopTracks(id)])
      .then(([a, t]) => {
        setArtist(a)
        setTracks(t)
        // Fundo com foto e gradiente azul SharkMusic
        setTheme({
          bgImage: a.picture_big,
          tint: 'radial-gradient(1200px 600px at 20% 10%, rgba(0,123,255,.35), rgba(8,16,24,.85))'
        })
      })
      .finally(() => setLoading(false))
  }, [id, setTheme])

  if (loading) return (
    <>
      <div className="flex items-center gap-4">
        <div className="w-28 h-28 rounded-xl bg-white/10 animate-pulse" />
        <div className="space-y-2">
          <div className="h-6 w-48 bg-white/10 rounded animate-pulse" />
          <div className="h-3 w-64 bg-white/10 rounded animate-pulse" />
        </div>
      </div>
      <GridSkeleton />
    </>
  )

  if (!artist) return <p>Artista não encontrado.</p>

  return (
    <div>
      {/* Cabeçalho do artista */}
      <motion.div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <motion.img
          layoutId={`artist-cover-${artist.id}`}
          src={artist.picture_big}
          alt={artist.name}
          className="w-40 h-40 rounded-xl object-cover shadow-[0_0_30px_rgba(0,123,255,0.25)]"
        />
        <div>
          <motion.h1
            layoutId={`artist-card-${artist.id}`}
            className="text-4xl font-extrabold text-shark-300 drop-shadow-[0_0_20px_rgba(0,123,255,0.35)]"
          >
            {artist.name}
          </motion.h1>
          <p className="opacity-70 text-sm mt-1">
            Top músicas — clique em uma para mergulhar no som 🎧
          </p>
        </div>
      </motion.div>

      {/* Lista de músicas */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {tracks.map((t) => <SongCard key={t.id} track={t} />)}
      </div>
    </div>
  )
}
