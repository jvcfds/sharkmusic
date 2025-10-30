import React, { createContext, useContext, useState, useEffect } from 'react'
import ColorThief from 'color-thief-browser'

interface ThemeContextType {
  bgImage: string | null
  tint: string
  setTheme: (theme: { bgImage: string | null; tint?: string }) => void
  clearTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bgImage, setBgImage] = useState<string | null>(null)
  const [tint, setTint] = useState(
    'linear-gradient(120deg, rgba(0,123,255,.25), rgba(8,16,24,.8))'
  )

  useEffect(() => {
    if (!bgImage) return

    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = bgImage

    img.onload = () => {
      try {
        const colorThief = new ColorThief()
        const result = colorThief.getColor(img)
        const [r, g, b] = result
        setTint(
          `linear-gradient(160deg, rgba(${r},${g},${b},0.4), rgba(8,16,24,.9))`
        )
      } catch {
        setTint(
          'linear-gradient(120deg, rgba(0,123,255,.25), rgba(8,16,24,.8))'
        )
      }
    }
  }, [bgImage])

  return (
    <ThemeContext.Provider
      value={{
        bgImage,
        tint,
        setTheme: ({ bgImage, tint }) => {
          if (bgImage) setBgImage(bgImage)
          if (tint) setTint(tint)
        },
        clearTheme: () => {
          setBgImage(null)
          setTint(
            'linear-gradient(120deg, rgba(0,123,255,.25), rgba(8,16,24,.8))'
          )
        },
      }}
    >
      {/* fundo dinâmico com fade suave */}
      <div
        key={bgImage || 'default'}
        className="fixed inset-0 -z-10 transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `${tint}${bgImage ? `, url(${bgImage})` : ''}`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(40px) brightness(0.8)',
          opacity: 1,
        }}
      />
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
