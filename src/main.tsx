import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// 🧱 Layout principal
import RootLayout from './layouts/RootLayout'

// 🌊 Páginas
import Home from './pages/Home'
import Artist from './pages/Artist'
import Song from './pages/Song'
import Search from './pages/Search'

// 🎨 Provedores globais
import { ThemeProvider } from './lib/theme'
import { PlayerProvider } from './lib/playerContext'

// 🎵 Estilos globais
import './index.css'

// 🧭 Configuração de rotas
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/artist/:id', element: <Artist /> },
      { path: '/song/:id', element: <Song /> },
      { path: '/search', element: <Search /> },
    ],
  },
])

// 🚀 Renderização do app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PlayerProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </PlayerProvider>
  </React.StrictMode>
)
