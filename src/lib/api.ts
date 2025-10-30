const proxy = 'https://api.allorigins.win/raw?url='
const baseUrl = 'https://api.deezer.com'

// Função auxiliar pra garantir fetch limpo e tratável
async function fetchDeezer(endpoint: string) {
  const res = await fetch(`${proxy}${baseUrl}${endpoint}`)
  if (!res.ok) {
    console.error('Erro ao buscar dados do Deezer:', res.status, res.statusText)
    throw new Error('Erro na API do Deezer')
  }
  return res.json()
}

// 🔹 Artistas em alta (usado na Home)
export async function getTopArtists() {
  return fetchDeezer('/chart/0/artists')
}

// 🔹 Músicas em alta (usado na Home)
export async function getTopTracks() {
  return fetchDeezer('/chart/0/tracks')
}

// 🔹 Detalhes de um artista
export async function getArtist(id: string) {
  return fetchDeezer(`/artist/${id}`)
}

// 🔹 Álbuns de um artista
export async function getArtistAlbums(id: string) {
  return fetchDeezer(`/artist/${id}/albums`)
}

// 🔹 Faixas de um álbum
export async function getAlbumTracks(id: string) {
  return fetchDeezer(`/album/${id}/tracks`)
}

// 🔹 Detalhes de uma música específica
export async function getTrack(id: string) {
  return fetchDeezer(`/track/${id}`)
}

// 🔹 Buscar artistas ou faixas
export async function searchAll(query: string) {
  return fetchDeezer(`/search?q=${encodeURIComponent(query)}`)
}
