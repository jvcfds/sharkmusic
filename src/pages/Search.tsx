import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { searchAll } from '../lib/api'
import type { Artist, Track, Album } from '../lib/types'
import { motion } from 'framer-motion'
import SongCard from '../components/SongCard'
import ArtistCard from '../components/ArtistCard'

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [artists, setArtists] = useState<Artist[]>([])
  const [tracks, setTracks] = useState<Track[]>([])
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!query.trim()) return
      setLoading(true)

      try {
        const results = await searchAll(query, 80)

        const foundTracks: Track[] = results.filter((r: any) => r.type === 'track')
        const foundArtists: Artist[] = results
          .filter((r: any) => r.type === 'artist')
          .slice(0, 12)
        const foundAlbums: Album[] = results
          .filter((r: any) => r.type === 'album')
          .slice(0, 8)

        setTracks(foundTracks)
        setArtists(foundArtists)
        setAlbums(foundAlbums)
      } catch (err) {
        console.error('Erro ao buscar:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [query])

  if (!query.trim())
    return (
      <div className="text-center text-white/70 mt-20">
        <p>Digite algo para buscar músicas, artistas ou álbuns 🎧</p>
      </div>
    )

  return (
    <motion.div
      className="flex flex-col gap-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-2xl font-bold text-sky-400">
        Resultados para “{query}”
      </h1>

      {loading && (
        <p className="text-center text-white/70">Buscando resultados...</p>
      )}

      {!loading && (
        <>
          {artists.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-3">Artistas</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {artists.map((a) => (
                  <ArtistCard key={a.id} artist={a} />
                ))}
              </div>
            </section>
          )}

          {albums.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-3">Álbuns</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {albums.map((a) => (
                  <Link
                    key={a.id}
                    to={`/song/${a.id}`}
                    className="bg-white/5 p-3 rounded-lg hover:bg-white/10 transition"
                  >
                    <img
                      src={
                        a.cover_medium ||
                        a.cover_big ||
                        '/shark-album.png'
                      }
                      alt={a.title}
                      className="w-full rounded-md mb-2"
                    />
                    <p className="text-sm font-medium truncate">{a.title}</p>
                    <p className="text-xs opacity-60 truncate">
                      {a.artist?.name}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {tracks.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-3">Músicas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tracks.map((t) => (
                  <SongCard key={t.id} track={t} />
                ))}
              </div>
            </section>
          )}

          {artists.length === 0 &&
            albums.length === 0 &&
            tracks.length === 0 && (
              <p className="text-center text-white/70 mt-10">
                Nenhum resultado encontrado 😔
              </p>
            )}
        </>
      )}
    </motion.div>
  )
}
