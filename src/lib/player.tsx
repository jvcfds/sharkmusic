import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Track } from './types'

export interface PlayerContextType {
  currentTrack: Track | null
  isPlaying: boolean
  progress: number
  duration: number
  playTrack: (track: Track) => void
  togglePlay: () => void
  setProgress: (time: number) => void
  setDuration: (time: number) => void
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  function playTrack(track: Track) {
    setCurrentTrack(track)
    setIsPlaying(true)
    setProgress(0)
  }

  function togglePlay() {
    setIsPlaying((prev) => !prev)
  }

  const value: PlayerContextType = {
    currentTrack,
    isPlaying,
    progress,
    duration,
    playTrack,
    togglePlay,
    setProgress,
    setDuration,
  }

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used inside PlayerProvider')
  }
  return context
}
