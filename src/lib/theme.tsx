import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ThemeContextType {
  bgImage: string | null
  setTheme: (theme: { bgImage?: string | null }) => void
  clearTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  bgImage: null,
  setTheme: () => {},
  clearTheme: () => {},
})

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [bgImage, setBgImage] = useState<string | null>(null)

  const setTheme = (theme: { bgImage?: string | null }) => {
    if (theme.bgImage) setBgImage(theme.bgImage)
  }

  const clearTheme = () => setBgImage(null)

  return (
    <ThemeContext.Provider value={{ bgImage, setTheme, clearTheme }}>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#030818] to-[#0a1a3a] text-white transition-all duration-1000">
        <AnimatePresence mode="wait">
          {bgImage && (
            <motion.div
              key={bgImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="fixed inset-0 z-0"
              style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(80px) saturate(120%) brightness(40%)',
              }}
            />
          )}
        </AnimatePresence>
        <div className="relative z-10 backdrop-blur-[2px]">{children}</div>
      </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
