import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Artist } from '../lib/types'

export default function ArtistCard({ artist }: { artist: Artist }) {
  const cover = artist.picture_medium || artist.picture || '/shark-album.png'

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 backdrop-blur-sm cursor-pointer group"
    >
      <Link to={`/artist/${artist.id}`} className="block">
        <div className="relative w-full aspect-square overflow-hidden">
          <motion.img
            src={cover}
            alt={artist.name}
            loading="lazy"
            className="object-cover w-full h-full group-hover:opacity-90 transition-opacity duration-300"
          />
        </div>

        <div className="p-3 text-center">
          <h3 className="text-base font-semibold truncate group-hover:text-shark-300 transition-colors">
            {artist.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  )
}
