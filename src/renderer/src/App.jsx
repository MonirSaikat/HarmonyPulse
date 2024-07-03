import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import { HashRouter, Link, Navigate, Route, Routes } from 'react-router-dom'

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <HashRouter>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>

      <Routes>
        <Route path="/" element={<h1>Home page</h1>} index />
        <Route path="/about" element={<h1>About page</h1>} />
        <Route path="/contact" element={<h1>Contact page</h1>} />
      </Routes>
    </HashRouter>
  )
}

export default App
