import { createContext, useContext, useRef, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Track } from './types'

interface PlayerContextType {
  currentTrack: Track | null
  isPlaying: boolean
  progress: number
  duration: number
  playTrack: (track: Track) => void
  togglePlay: () => void
  pause: () => void
}

const PlayerContext = createContext<PlayerContextType>({
  currentTrack: null,
  isPlaying: false,
  progress: 0,
  duration: 0,
  playTrack: () => {},
  togglePlay: () => {},
  pause: () => {},
})

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const attachAudioEvents = () => {
    if (!audioRef.current) return
    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(audioRef.current?.currentTime || 0)
      setDuration(audioRef.current?.duration || 30)
    })
    audioRef.current.addEventListener('ended', () => setIsPlaying(false))
  }

  const playTrack = (track: Track) => {
    if (!track.preview) return
    if (!audioRef.current) {
      audioRef.current = new Audio(track.preview)
      attachAudioEvents()
    } else {
      audioRef.current.src = track.preview
    }
    audioRef.current.play()
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause()
    }
  }, [])

  return (
    <PlayerContext.Provider
      value={{ currentTrack, isPlaying, progress, duration, playTrack, togglePlay, pause }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => useContext(PlayerContext)
