export interface Artist {
  id: number
  name: string
  picture?: string
  picture_small?: string
  picture_medium?: string
  picture_big?: string
  picture_xl?: string
  nb_fan?: number
}

export interface Album {
  id: number
  title: string
  cover?: string
  cover_small?: string
  cover_medium?: string
  cover_big?: string
  cover_xl?: string
  artist?: Artist
}

export interface Track {
  id: number
  title: string
  duration?: number
  preview: string
  rank?: number
  album: Album
  artist: Artist
}
