import { useState } from 'react'
import { searchAll } from '../lib/api'
import ArtistCard from '../components/ArtistCard'
import SongCard from '../components/SongCard'
import type { Artist, Track } from '../lib/types'

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<{ artists: Artist[]; tracks: Track[] }>({
    artists: [],
    tracks: [],
  })

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    const res = await searchAll(query)
    const artists = res.data.map((r: any) => r.artist)
    const unique = artists.filter(
      (a: Artist, i: number, arr: Artist[]) =>
        arr.findIndex((x) => x.id === a.id) === i
    )

    setResults({
      artists: unique.slice(0, 6),
      tracks: res.data.slice(0, 8),
    })
  }

  return (
    <div className="space-y-10">
      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Buscar artistas ou músicas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
        />
        <button className="bg-shark-500/30 hover:bg-shark-500/60 transition px-5 py-2 rounded-lg font-semibold">
          Buscar
        </button>
      </form>

      {results.artists.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-3">Artistas</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </section>
      )}

      {results.tracks.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-3">Músicas</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.tracks.map((track) => (
              <SongCard key={track.id} track={track} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
