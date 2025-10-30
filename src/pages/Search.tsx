import { useEffect, useState } from 'react'
import { searchArtists } from '../lib/api'
import ArtistCard from '../components/ArtistCard'
import type { Artist } from '../lib/types'
import { useSearchParams } from 'react-router-dom'
import { GridSkeleton } from '../components/Skeleton'
import { useTheme } from '../lib/theme'

export default function Search() {
  const [params, setParams] = useSearchParams()
  const initial = params.get('q') ?? ''
  const [q, setQ] = useState(initial)
  const [loading, setLoading] = useState(false)
  const [artists, setArtists] = useState<Artist[]>([])
  const { clearTheme } = useTheme()

  useEffect(() => {
    clearTheme() // fundo padrão
    if (!initial) return
    setLoading(true)
    searchArtists(initial).then(setArtists).finally(() => setLoading(false))
  }, [initial, clearTheme])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setParams({ q })
    setLoading(true)
    setArtists(await searchArtists(q))
    setLoading(false)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Buscar artistas</h1>

      <form onSubmit={onSubmit} className="mt-4 flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ex.: daft punk, ariana grande…"
          className="flex-1 rounded-lg bg-white/5 px-3 py-2 outline-none"
        />
        <button className="rounded-lg bg-white/10 px-4 hover:bg-white/20">Buscar</button>
      </form>

      {loading ? <GridSkeleton /> : (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {artists.map((a) => <ArtistCard key={a.id} artist={a} />)}
        </div>
      )}
    </div>
  )
}
