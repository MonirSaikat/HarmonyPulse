import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import { HomeScreen } from './screens/app/homeScreen'
import { LoginScreen } from './screens/auth/loginScreen'
import { RegisterScreen } from './screens/auth/registerScreen'
import { SettingScreen } from './screens/SettingScreen'
import { VideoDetails } from './screens/app/videoDetails'
import './App.css'
import { Navbar } from './components/Navbar'
import styled from 'styled-components'
import { AuthProvider } from './context/AuthContext'

const AppContentContainer = styled.div`
  margin-top: calc(var(--navbar-height) * 1.5);
  padding: 0 1rem 1rem 1rem;
`

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <AuthProvider>
      <Navbar />
      <AppContentContainer>
        <Routes>
          <Route path="/" element={<HomeScreen />} index />
          <Route path="/:videoId" element={<VideoDetails />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/setting" element={<SettingScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
        </Routes>
      </AppContentContainer>
    </AuthProvider>
  )
}

export default App
