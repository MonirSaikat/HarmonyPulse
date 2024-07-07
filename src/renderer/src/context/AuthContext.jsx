import { createClient } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'
const env = await import.meta.env

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

const supabaseUrl = 'https://tvfrxeajcdlzylsrojrw.supabase.co'
const supabase = createClient(supabaseUrl, env.VITE_SUPABASE_KEY)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const loginUser = async (cred) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword(cred)

      if (error) {
        throw error
      }

      setUser(data.user)
      return true
    } catch (error) {
      alert('Something went wrong: ' + error.message)
    }
  }

  const logoutUser = async () => {
    try {
      await supabase.auth.signOut()

      setUser(null)
      return true
    } catch (error) {
      alert('Something went wrong: ' + error.message)
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}
