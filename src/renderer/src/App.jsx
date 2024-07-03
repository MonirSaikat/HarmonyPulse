import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import { HomeScreen } from './screens/app/homeScreen'
import { LoginScreen } from './screens/auth/loginScreen'
import { RegisterScreen } from './screens/auth/registerScreen'
import { VideoDetails } from './screens/app/videoDetails'
import './App.css';

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>

      <Routes>
        <Route path="/" element={<HomeScreen />} index />
        <Route path="/:videoId" element={<VideoDetails />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </>
  )
}

export default App
