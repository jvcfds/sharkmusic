/**
 * SharkMusic — API Deezer ampliada
 * Versão completa e otimizada (com fallback e busca massiva)
 * by VictorCodeco 🦈
 */

const API_BASE = '/api/deezer'

/* -----------------------------
 * 🔹 Função auxiliar de segurança
 * ----------------------------- */
async function safeFetch(path: string) {
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

/* -----------------------------
 * 🎤 ARTISTAS
 * ----------------------------- */

// Artistas em destaque (chart global)
export async function getTopArtists(limit = 24) {
  const data = await safeFetch(`chart/0/artists?limit=${limit}`)
  return data.data || []
}

// Dados completos de um artista
export async function getArtist(id: string) {
  const data = await safeFetch(`artist/${id}`)
  return data || null
}

// Artistas relacionados
export async function getRelatedArtists(id: string, limit = 20) {
  const data = await safeFetch(`artist/${id}/related?limit=${limit}`)
  return data.data || []
}

/* -------------------------------------------------
 * 🎵 MÚSICAS (Top, Busca e Fallback por Álbuns)
 * ------------------------------------------------- */

// Músicas em alta global
export async function getTopTracks(limit = 50) {
  const data = await safeFetch(`chart/0/tracks?limit=${limit}`)
  return data.data || []
}

// Músicas mais populares de um artista (com fallback de álbuns)
export async function getArtistTopTracks(id: string) {
  // 1️⃣ Pega as top tracks diretas do artista
  const topRes = await fetch(`${API_BASE}?path=artist/${id}/top?limit=100`)
  const topData = await topRes.json()
  let tracks = topData.data || []

  // 2️⃣ Se vier vazio ou muito pouco, pega músicas dos álbuns
  if (!tracks.length || tracks.length < 10) {
    const albumsRes = await fetch(`${API_BASE}?path=artist/${id}/albums`)
    const albumsData = await albumsRes.json()

    if (albumsData.data?.length) {
      // Limita a até 25 álbuns pra não travar (pode aumentar se quiser)
      const albums = albumsData.data.slice(0, 25)

      const trackPromises = albums.map(async (album: any) => {
        const res = await fetch(`${API_BASE}?path=album/${album.id}/tracks`)
        const data = await res.json()
        return (
          data.data?.map((t: any) => ({
            ...t,
            album: album,
          })) || []
        )
      })

      const results = await Promise.all(trackPromises)
      tracks = results.flat()
    }
  }

  // 3️⃣ Remove duplicadas
  const uniqueTracks = tracks.filter(
    (track, index, self) => self.findIndex((t) => t.id === track.id) === index
  )

  // 4️⃣ Ordena por rank (popularidade)
  uniqueTracks.sort((a, b) => (b.rank || 0) - (a.rank || 0))

  return uniqueTracks
}

// Busca geral (qualquer tipo de conteúdo)
export async function searchAll(query: string, limit = 200) {
  const data = await safeFetch(`search?q=${encodeURIComponent(query)}&limit=${limit}`)
  return data.data || []
}

// Busca apenas artistas
export async function searchArtists(query: string, limit = 100) {
  const data = await safeFetch(`search/artist?q=${encodeURIComponent(query)}&limit=${limit}`)
  return data.data || []
}

// Busca apenas álbuns
export async function searchAlbums(query: string, limit = 100) {
  const data = await safeFetch(`search/album?q=${encodeURIComponent(query)}&limit=${limit}`)
  return data.data || []
}

// Busca apenas faixas
export async function searchTracks(query: string, limit = 200) {
  const data = await safeFetch(`search/track?q=${encodeURIComponent(query)}&limit=${limit}`)
  return data.data || []
}

/* -----------------------------
 * 💿 ÁLBUNS
 * ----------------------------- */

// Dados de um álbum
export async function getAlbum(id: string) {
  const data = await safeFetch(`album/${id}`)
  return data || null
}

// Músicas de um álbum
export async function getAlbumTracks(id: string) {
  const data = await safeFetch(`album/${id}/tracks`)
  return data.data || []
}

/* -----------------------------
 * 🎚️ MÚSICA INDIVIDUAL
 * ----------------------------- */
export async function getTrack(id: string) {
  const data = await safeFetch(`track/${id}`)
  return data || null
}
