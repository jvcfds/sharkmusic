import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// 🔹 Providers globais
import { ThemeProvider } from './lib/theme'
import { PlayerProvider } from './lib/player'

// 🔹 Estilos globais e fontes
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import './index.css'

// 🔹 Renderização principal
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <PlayerProvider>
          <App />
        </PlayerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
