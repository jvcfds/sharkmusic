import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  getArtist,
  getArtistTopTracks,
  getArtistAlbums,
  getRelatedArtists,
} from '../lib/api'
import type { Artist, Album, Track } from '../lib/types'
import { useTheme } from '../lib/theme'
import { motion } from 'framer-motion'
import SongCard from '../components/SongCard'
import ArtistCard from '../components/ArtistCard'

export default function ArtistPage() {
  const { id } = useParams()
  const [artist, setArtist] = useState<Artist | null>(null)
  const [tracks, setTracks] = useState<Track[]>([])
  const [albums, setAlbums] = useState<Album[]>([])
  const [related, setRelated] = useState<Artist[]>([])
  const { setTheme } = useTheme()

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return

      // pega dados do artista
      const a = await getArtist(id)
      if (a) {
        setArtist(a)
        setTheme({
          bgImage: a.picture_xl || a.picture_big || a.picture || '',
        })
      }

      // pega músicas do artista
      const chart = await getArtistTopTracks(id)
      const artistTracks = chart.filter(
        (t: Track) => t.artist.id === Number(id)
      )
      setTracks(artistTracks.slice(0, 12))

      // pega álbuns
      const alb = await getArtistAlbums(id)
      setAlbums(alb.slice(0, 6))

      // artistas relacionados
      const rel = await getRelatedArtists(id)
      setRelated(rel.slice(0, 6))
    }

    fetchData()
  }, [id, setTheme])

  if (!artist)
    return (
      <div className="text-center text-white/70 mt-20">
        <p>Carregando artista...</p>
      </div>
    )

  return (
    <motion.div
      className="flex flex-col gap-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Cabeçalho do artista */}
      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left">
        <img
          src={
            artist.picture_xl ||
            artist.picture_big ||
            artist.picture_medium ||
            '/shark-album.png'
          }
          alt={artist.name}
          className="w-40 h-40 sm:w-48 sm:h-48 rounded-xl object-cover shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold text-white">{artist.name}</h1>
          {artist.nb_fan && (
            <p className="text-white/70 text-sm">
              {artist.nb_fan.toLocaleString()} fãs
            </p>
          )}
        </div>
      </div>

      {/* Músicas populares */}
      {tracks.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Músicas populares</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tracks.map((t) => (
              <SongCard key={t.id} track={t} />
            ))}
          </div>
        </section>
      )}

      {/* Álbuns */}
      {albums.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Álbuns</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {albums.map((a) => (
              <div
                key={a.id}
                className="bg-white/5 p-3 rounded-lg hover:bg-white/10 transition"
              >
                <img
                  src={
                    a.cover_medium || a.cover_big || '/shark-album.png'
                  }
                  alt={a.title}
                  className="w-full rounded-md mb-2"
                />
                <p className="text-sm font-medium truncate">{a.title}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Artistas relacionados */}
      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Artistas relacionados</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {related.map((r) => (
              <ArtistCard key={r.id} artist={r} />
            ))}
          </div>
        </section>
      )}
    </motion.div>
  )
}
