import { useEffect, useState } from 'react'
import { getTopArtists, getTopTracks } from '../lib/api'
import type { Artist, Track } from '../lib/types'
import ArtistCard from '../components/ArtistCard'
import SongCard from '../components/SongCard'
import { useTheme } from '../lib/theme'
import { motion } from 'framer-motion'

export default function Home() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)
  const { clearTheme } = useTheme()

  useEffect(() => {
    clearTheme()

    const load = async () => {
      try {
        const topArtists = await getTopArtists()
        const topTracks = await getTopTracks()

        setArtists(topArtists.data.slice(0, 12))
        setTracks(topTracks.data.slice(0, 12))
      } catch (err) {
        console.error('Erro ao carregar dados da Home:', err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [clearTheme])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-white/70 text-lg">
        Carregando recomendações...
      </div>
    )
  }

  return (
    <motion.div
      className="space-y-14 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* 🔹 Artistas em destaque */}
      <section>
        <h1 className="text-3xl font-bold mb-6 text-white">🎤 Artistas em destaque</h1>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      {/* 🔹 Músicas populares */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-white">🔥 Músicas populares</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {tracks.map((track) => (
            <SongCard key={track.id} track={track} />
          ))}
        </div>
      </section>
    </motion.div>
  )
}
