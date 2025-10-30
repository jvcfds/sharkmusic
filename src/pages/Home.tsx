import { useEffect, useState } from 'react'
import ArtistCard from '../components/ArtistCard'
import { searchArtists } from '../lib/api'
import type { Artist } from '../lib/types'
import { Link } from 'react-router-dom'
import { GridSkeleton } from '../components/Skeleton'
import { useTheme } from '../lib/theme'

export default function Home() {
  const [q, setQ] = useState('')
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(false)
  const { clearTheme } = useTheme()

  useEffect(() => {
    clearTheme() // limpa fundo pra padrão azul

    // 🔥 busca inicial com artistas populares
    const popular = ['The Weeknd', 'Dua Lipa', 'Drake', 'Ariana Grande', 'Coldplay']
    setLoading(true)
    Promise.all(popular.map(name => searchArtists(name)))
      .then(results => {
        // junta todos resultados e remove duplicados
        const all = results.flat()
        const unique = all.filter((a, i, arr) => arr.findIndex(x => x.id === a.id) === i)
        setArtists(unique)
      })
      .finally(() => setLoading(false))
  }, [clearTheme])

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!q.trim()) return
    setLoading(true)
    setArtists(await searchArtists(q))
    setLoading(false)
  }

  return (
    <div className="relative">
      {/* Cabeçalho principal */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-shark-400 drop-shadow-[0_0_15px_rgba(0,123,255,0.3)]">
            Descubra o ritmo que move você 🎵
          </h1>
          <p className="opacity-70 mt-1 text-sm">
            Explore artistas, tendências e sons em alta no momento.
          </p>
        </div>

        <Link
          to="/search"
          className="text-sm text-shark-300 opacity-80 hover:opacity-100 hover:text-shark-200 transition"
        >
          Busca avançada →
        </Link>
      </div>

      {/* Campo de busca */}
      <form onSubmit={onSearch} className="mt-6 flex flex-col sm:flex-row gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Busque um artista..."
          className="flex-1 rounded-lg bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-shark-500/50"
        />
        <button
          className="rounded-lg bg-shark-500/20 hover:bg-shark-500/40 text-shark-100 font-medium px-6 py-2 transition"
        >
          Buscar
        </button>
      </form>

      {/* Resultados */}
      {loading ? (
        <GridSkeleton />
      ) : (
        <>
          <h2 className="mt-8 mb-4 text-xl font-semibold text-shark-300">
            Em alta agora 🔥
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {artists
  .filter((a) => a.picture && a.picture !== '') // só com imagem válida
  .map((a) => <ArtistCard key={a.id} artist={a} />)}
          </div>
        </>
      )}
    </div>
  )
}
