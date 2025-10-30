import { useEffect, useState } from 'react'
import { getTopArtists, getTopTracks } from '../lib/api' // removido searchAll
import type { Artist, Track } from '../lib/types'
import ArtistCard from '../components/ArtistCard'
import SongCard from '../components/SongCard'
import { useTheme } from '../lib/theme'

export default function Home() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [tracks, setTracks] = useState<Track[]>([])
  const { clearTheme } = useTheme()

  useEffect(() => {
    clearTheme()

    const load = async () => {
      const topArtists = await getTopArtists()
      const topTracks = await getTopTracks()

      const all = [...topArtists.data, ...topTracks.data.map((t: any) => t.artist)]

      const unique = all.filter(
        (a: any, i: number, arr: any[]) =>
          arr.findIndex((x: any) => x.id === a.id) === i
      )

      setArtists(unique.slice(0, 8))
      setTracks(topTracks.data.slice(0, 8))
    }

    load()
  }, [clearTheme])

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl font-bold mb-4">Artistas em destaque</h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4">Músicas populares</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {tracks.map((track) => (
            <SongCard key={track.id} track={track} />
          ))}
        </div>
      </section>
    </div>
  )
}
