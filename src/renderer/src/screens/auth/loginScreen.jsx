import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Input = styled.input`
  padding: 10px;
  border: 2px solid skyblue;
  outline: 0;
`

const Button = styled.button`
  padding: 10px;
  outline: 0;
  border: 0;
  cursor: pointer;
`

export const LoginScreen = () => {
  const { user, loginUser } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const _handleLogin = async (e) => {
    e.preventDefault()

    try {
      loginUser({
        email,
        password
      })
    } catch (error) {
      alert('Something went wrong: ' + error.message)
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])

  return (
    <form onSubmit={_handleLogin}>
      <h2>Login</h2>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button type="submit">Login</Button>
    </form>
  )
}
