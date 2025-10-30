import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Artist } from '../lib/types'
import { useState } from 'react'

export default function ArtistCard({ artist }: { artist: Artist }) {
  const fallback = '/shark-album.png'
  const [loaded, setLoaded] = useState(false)

  // imagem preferida
  const imageUrl = artist.picture_medium || fallback

  return (
    <Link to={`/artist/${artist.id}`} className="block">
      <motion.div
        layoutId={`artist-card-${artist.id}`}
        className="bg-[#0b1624]/60 rounded-xl p-3 hover:bg-[#0b1624]/90 transition shadow-md hover:shadow-lg hover:shadow-shark-500/10"
      >
        <div className="relative overflow-hidden rounded-lg">
          {/* fallback padrão Shark — aparece até a imagem real carregar */}
          {!loaded && (
            <img
              src={fallback}
              alt="shark-fallback"
              className="w-full aspect-square object-cover rounded-lg absolute inset-0 blur-[1px] opacity-90"
            />
          )}

          {/* imagem real */}
          <motion.img
            layoutId={`artist-cover-${artist.id}`}
            src={imageUrl}
            alt={artist.name}
            onLoad={() => setLoaded(true)}
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = fallback
            }}
            className={`w-full aspect-square object-cover rounded-lg transition-transform duration-300 hover:scale-105 ${
              !loaded ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* overlay azul suave */}
          {loaded && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          )}
        </div>

        <div className="mt-2 font-medium text-center truncate text-shark-100">
          {artist.name}
        </div>
      </motion.div>
    </Link>
  )
}
