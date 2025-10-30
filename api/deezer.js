export default async function handler(req, res) {
  const { path } = req.query

  if (!path) {
    return res.status(400).json({ error: 'Missing Deezer path' })
  }

  try {
    const response = await fetch(`https://api.deezer.com/${path}`)
    const data = await response.json()
    res.status(200).json(data)
  } catch (err) {
    console.error('Erro ao buscar dados do Deezer:', err)
    res.status(500).json({ error: 'Erro interno no proxy Deezer' })
  }
}
