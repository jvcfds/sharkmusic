import type { Artist, Album, Track } from './types'

const API_BASE = '/api/deezer'

async function safeFetch(path: string): Promise<any> {
  try {
    const res = await fetch(`${API_BASE}?path=${path}`)
    if (!res.ok) throw new Error(`Erro HTTP ${res.status}`)
    const data = await res.json()
    return data
  } catch (err) {
    console.error(`❌ Erro ao buscar ${path}:`, err)
    return { data: [] }
  }
}

/* 🎤 ARTISTAS */
export async function getTopArtists(limit = 24): Promise<Artist[]> {
  const data = await safeFetch(`chart/0/artists?limit=${limit}`)
  return data.data || []
}

export async function getArtist(id: string): Promise<Artist | null> {
  const data = await safeFetch(`artist/${id}`)
  return data || null
}

export async function getRelatedArtists(id: string, limit = 20): Promise<Artist[]> {
  const data = await safeFetch(`artist/${id}/related?limit=${limit}`)
  return data.data || []
}

/* 🎵 MÚSICAS */
export async function getTopTracks(limit = 50): Promise<Track[]> {
  const data = await safeFetch(`chart/0/tracks?limit=${limit}`)
  return data.data || []
}

export async function getArtistTopTracks(id: string): Promise<Track[]> {
  const topRes = await fetch(`${API_BASE}?path=artist/${id}/top?limit=100`)
  const topData = await topRes.json()
  let tracks: Track[] = topData.data || []

  if (!tracks.length || tracks.length < 10) {
    const albumsRes = await fetch(`${API_BASE}?path=artist/${id}/albums`)
    const albumsData = await albumsRes.json()

    if (albumsData.data?.length) {
      const albums = albumsData.data.slice(0, 25)
      const trackPromises = albums.map(async (album: Album) => {
        const res = await fetch(`${API_BASE}?path=album/${album.id}/tracks`)
        const data = await res.json()
        return (
          data.data?.map((t: Track) => ({
            ...t,
            album: album,
          })) || []
        )
      })
      const results = await Promise.all(trackPromises)
      tracks = results.flat()
    }
  }

  const uniqueTracks = tracks.filter(
    (track: Track, index: number, self: Track[]) =>
      self.findIndex((t) => t.id === track.id) === index
  )

  uniqueTracks.sort((a: Track, b: Track) => (b.rank || 0) - (a.rank || 0))
  return uniqueTracks
}

/* 💿 ÁLBUNS */
export async function getArtistAlbums(id: string, limit = 50): Promise<Album[]> {
  const data = await safeFetch(`artist/${id}/albums?limit=${limit}`)
  return data.data || []
}

export async function getAlbum(id: string): Promise<Album | null> {
  const data = await safeFetch(`album/${id}`)
  return data || null
}

export async function getAlbumTracks(id: string): Promise<Track[]> {
  const data = await safeFetch(`album/${id}/tracks`)
  return data.data || []
}

/* 🎚️ FAIXA INDIVIDUAL */
export async function getTrack(id: string): Promise<Track | null> {
  const data = await safeFetch(`track/${id}`)
  return data || null
}

/* 🔍 BUSCA */
export async function searchAll(query: string, limit = 200): Promise<any[]> {
  const data = await safeFetch(`search?q=${encodeURIComponent(query)}&limit=${limit}`)
  return data.data || []
}

export async function searchArtists(query: string, limit = 100): Promise<Artist[]> {
  const data = await safeFetch(`search/artist?q=${encodeURIComponent(query)}&limit=${limit}`)
  return data.data || []
}

export async function searchAlbums(query: string, limit = 100): Promise<Album[]> {
  const data = await safeFetch(`search/album?q=${encodeURIComponent(query)}&limit=${limit}`)
  return data.data || []
}

export async function searchTracks(query: string, limit = 200): Promise<Track[]> {
  const data = await safeFetch(`search/track?q=${encodeURIComponent(query)}&limit=${limit}`)
  return data.data || []
}
