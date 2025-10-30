import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getArtist, getArtistAlbums, getTopTracks } from '../lib/api'
import { motion } from 'framer-motion'
import { useTheme } from '../lib/theme'
import type { Artist, Track } from '../lib/types' // removido Album
import SongCard from '../components/SongCard'

export default function ArtistPage() {
  const { id } = useParams()
  const [artist, setArtist] = useState<Artist | null>(null)
  const [tracks, setTracks] = useState<Track[]>([])
  const [albums, setAlbums] = useState<any[]>([]) // albums do Deezer são genéricos
  const { setTheme } = useTheme()

  useEffect(() => {
    if (!id) return

    const load = async () => {
      const a = await getArtist(id)
      setArtist(a)
      setTheme({
        bgImage: a.picture_xl || a.picture_big || a.picture,
      })

      // pega músicas em alta e filtra pelo artista
      const chart = await getTopTracks()
      const artistTracks = chart.data.filter((t: Track) => t.artist.id === Number(id))
      setTracks(artistTracks.slice(0, 10))

      const alb = await getArtistAlbums(id)
      setAlbums(alb.data.slice(0, 6))
    }

    load()
  }, [id, setTheme])

  if (!artist) return <p className="opacity-70">Carregando artista...</p>

  return (
    <div className="space-y-8">
      <motion.div
        layoutId={`artist-cover-${artist.id}`}
        className="flex items-center gap-6"
      >
        <img
          src={artist.picture_big || '/shark-album.png'}
          alt={artist.name}
          className="w-40 h-40 rounded-full object-cover shadow-lg"
        />
        <div>
          <h1 className="text-4xl font-bold">{artist.name}</h1>

          {/* nb_fan pode não existir no tipo, então protegemos */}
          {'nb_fan' in artist && (
            <p className="opacity-70">
              {Number((artist as any).nb_fan).toLocaleString()} fãs
            </p>
          )}
        </div>
      </motion.div>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Músicas em alta</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tracks.map((t) => (
            <SongCard key={t.id} track={t} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Álbuns</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {albums.map((a) => (
            <div
              key={a.id}
              className="bg-white/5 rounded-lg p-2 hover:bg-white/10 transition"
            >
              <img
                src={a.cover_medium || '/shark-album.png'}
                alt={a.title}
                className="w-full aspect-square object-cover rounded-md"
              />
              <div className="mt-2 text-sm truncate text-center">{a.title}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
