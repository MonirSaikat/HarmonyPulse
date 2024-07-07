import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const env = await import.meta.env

const supabaseUrl = 'https://tvfrxeajcdlzylsrojrw.supabase.co'
const supabase = createClient(supabaseUrl, env.VITE_SUPABASE_KEY)

export const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        throw error  
      }

      console.log(data.user)
      setUser(data.user)
    } catch (error) {
      console.log(error.message)
      alert('Something went wrong: ' + error.message)
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user)
    })
  }, [])

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  )
}
