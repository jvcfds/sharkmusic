export type Artist = {
  id: number
  name: string
  picture: string
  picture_medium: string
  picture_big: string
}

export type Track = {
  id: number
  title: string
  preview: string
  duration: number
  artist: { id: number; name: string; picture?: string }
  album?: { cover: string; cover_medium: string; cover_big: string }
}
