const isLocal = window.location.hostname === 'localhost'
const baseUrl = isLocal
  ? 'https://api.deezer.com'
  : '/api/deezer?path=' // rota da Vercel

async function fetchDeezer(endpoint: string) {
  const url = isLocal ? `${baseUrl}${endpoint}` : `${baseUrl}${endpoint.slice(1)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Erro ao buscar dados do Deezer')
  return res.json()
}

export async function getTopArtists() {
  return fetchDeezer('/chart/0/artists')
}

export async function getTopTracks() {
  return fetchDeezer('/chart/0/tracks')
}

export async function getArtist(id: string) {
  return fetchDeezer(`/artist/${id}`)
}

export async function getArtistAlbums(id: string) {
  return fetchDeezer(`/artist/${id}/albums`)
}

export async function getAlbumTracks(id: string) {
  return fetchDeezer(`/album/${id}/tracks`)
}

export async function getTrack(id: string) {
  return fetchDeezer(`/track/${id}`)
}

export async function searchAll(query: string) {
  return fetchDeezer(`/search?q=${encodeURIComponent(query)}`)
}
