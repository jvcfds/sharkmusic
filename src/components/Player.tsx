import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause } from 'lucide-react'
import { usePlayer } from '../lib/player'

export default function Player() {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    progress,
    duration,
    setProgress,
    setDuration,
  } = usePlayer()

  const audioRef = useRef<HTMLAudioElement | null>(null)

  // sempre que a música mudar, atualiza o player
  useEffect(() => {
    if (audioRef.current && currentTrack?.preview) {
      audioRef.current.src = currentTrack.preview
      audioRef.current.play().catch(() => null)
    }
  }, [currentTrack])

  // controle de play/pause
  useEffect(() => {
    if (!audioRef.current) return
    if (isPlaying) audioRef.current.play().catch(() => null)
    else audioRef.current.pause()
  }, [isPlaying])

  // progresso e duração
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => setProgress(audio.currentTime)
    const handleLoaded = () => setDuration(audio.duration || 30)

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoaded)
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoaded)
    }
  }, [setProgress, setDuration])

  if (!currentTrack) return null

  const cover =
    currentTrack.album?.cover_medium ||
    currentTrack.album?.cover_big ||
    '/shark-album.png'

  const percent = duration ? (progress / duration) * 100 : 0

  return (
    <>
      <audio ref={audioRef} />
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md bg-black/70 border-t border-white/10 flex items-center justify-between gap-4 px-6 py-3"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ duration: 0.3 }}
      >
        {/* Capa e info */}
        <div className="flex items-center gap-4 min-w-[200px]">
          <img
            src={cover}
            alt={currentTrack.title}
            className="w-14 h-14 rounded-lg object-cover shadow-md"
          />
          <div className="truncate">
            <p className="font-semibold text-sm truncate text-white">
              {currentTrack.title}
            </p>
            <p className="text-xs opacity-70 truncate text-white/80">
              {currentTrack.artist.name}
            </p>
          </div>
        </div>

        {/* Botão Play/Pause */}
        <button
          onClick={togglePlay}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
          {isPlaying ? (
            <Pause size={20} className="text-white" />
          ) : (
            <Play size={20} className="text-white ml-1" />
          )}
        </button>

        {/* Barra de progresso */}
        <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden mx-4">
          <div
            className="h-full bg-sky-400 transition-all duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Tempo */}
        <span className="text-xs text-white/60 min-w-[60px] text-right">
          {Math.floor(progress)}s / {Math.floor(duration)}s
        </span>
      </motion.div>
    </>
  )
}
