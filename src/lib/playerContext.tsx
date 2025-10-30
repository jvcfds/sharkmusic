import React, { createContext, useContext, useRef, useState, useEffect } from 'react'
import type { Track } from '../lib/types'

interface PlayerContextType {
  currentTrack: Track | null
  isPlaying: boolean
  progress: number
  duration: number
  playTrack: (track: Track) => void
  togglePlay: () => void
  seek: (value: number) => void
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const playTrack = (track: Track) => {
    setCurrentTrack(track)
    setIsPlaying(true)
  }

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
      setIsPlaying(true)
    }
  }

  const seek = (value: number) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = value
    }
  }

  // atualiza progresso
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => setProgress(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', () => setIsPlaying(false))

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [currentTrack])

  // play/pause automático quando muda a faixa
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return
    audio.src = currentTrack.preview || ''
    if (currentTrack.preview) audio.play()
  }, [currentTrack])

  return (
    <PlayerContext.Provider
      value={{ currentTrack, isPlaying, progress, duration, playTrack, togglePlay, seek }}
    >
      {children}
      <audio ref={audioRef} />
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used inside PlayerProvider')
  return ctx
}
