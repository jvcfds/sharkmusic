import { useEffect, useState } from 'react'
import { getTopArtists, getTopTracks } from '../lib/api'
import ArtistCard from '../components/ArtistCard'
import SongCard from '../components/SongCard'
import { motion } from 'framer-motion'

export default function Home() {
  const [artists, setArtists] = useState<any[]>([])
  const [tracks, setTracks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [artistData, trackData] = await Promise.all([
          getTopArtists(),
          getTopTracks(),
        ])

        setArtists(artistData.data || [])
        setTracks(trackData.data || [])
      } catch (err) {
        console.error('Erro ao carregar dados:', err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading)
    return (
      <div className="flex items-center justify-center h-[70vh] text-white/70 text-lg">
        Carregando tendências musicais...
      </div>
    )

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-16">
      {/* Cabeçalho de boas-vindas */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]">
          Descubra o som que te move 🎧
        </h1>
        <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Explore artistas em ascensão, hits globais e sons que estão moldando a nova era da música.
        </p>
      </motion.div>

      {/* Artistas em destaque */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
          🌟 Em destaque agora
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {artists.slice(0, 12).map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </motion.div>

      {/* Músicas populares */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mt-6 mb-5 flex items-center gap-2">
          🔥 No topo das paradas
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {tracks.slice(0, 12).map((track) => (
            <SongCard key={track.id} track={track} />
          ))}
        </div>
      </motion.div>

      {/* Seção final */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-white/60 text-sm md:text-base">
          SharkMusic — Sinta o ritmo. Viva a música. 🦈
        </p>
      </motion.div>
    </div>
  )
}
