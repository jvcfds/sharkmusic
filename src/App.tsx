import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Song from './pages/Song'
import Artist from './pages/Artist'
import Search from './pages/Search'
import RootLayout from './layouts/RootLayout'

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/artist/:id" element={<Artist />} />
        <Route path="/song/:id" element={<Song />} />
        <Route path="/search" element={<Search />} />
      </Route>
    </Routes>
  )
}
