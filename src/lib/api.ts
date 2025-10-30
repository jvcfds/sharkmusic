import type { Artist, Track } from './types'

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} - ${url}`)
  return res.json()
}

// Busca artistas por nome
export async function searchArtists(q: string): Promise<Artist[]> {
  if (!q) return []
  const data = await getJSON<{ data: any[] }>(`/api/search/artist?q=${encodeURIComponent(q)}`)
  return data.data?.map(mapArtist) ?? []
}

// Detalhe do artista
export async function getArtist(id: string | number): Promise<Artist> {
  const a = await getJSON<any>(`/api/artist/${id}`)
  return mapArtist(a)
}

// Top músicas do artista
export async function getArtistTopTracks(id: string | number): Promise<Track[]> {
  const data = await getJSON<{ data: any[] }>(`/api/artist/${id}/top?limit=12`)
  return data.data?.map(mapTrack) ?? []
}

// Detalhe da música
export async function getTrack(id: string | number): Promise<Track> {
  const t = await getJSON<any>(`/api/track/${id}`)
  return mapTrack(t)
}

function mapArtist(a: any): Artist {
  return {
    id: a.id,
    name: a.name,
    picture: a.picture,
    picture_medium: a.picture_medium ?? a.picture,
    picture_big: a.picture_big ?? a.picture,
  }
}

function mapTrack(t: any): Track {
  return {
    id: t.id,
    title: t.title,
    preview: t.preview,
    duration: t.duration,
    artist: {
      id: t.artist?.id,
      name: t.artist?.name,
      picture: t.artist?.picture,
    },
    album: t.album
      ? {
          cover: t.album.cover,
          cover_medium: t.album.cover_medium ?? t.album.cover,
          cover_big: t.album.cover_big ?? t.album.cover,
        }
      : undefined,
  }
}
