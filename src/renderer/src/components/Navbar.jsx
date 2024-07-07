import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styled from 'styled-components'

const NavbarStyled = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  background-color: var(--primary-color);
  padding: 10px 1rem;
  height: var(--navbar-height);
  top: 0;
  left: 0;
  align-items: center;
  gap: 10px;

  a {
    text-decoration: none;
    color: lightblue;
  }
`

export const Navbar = () => {
  const { user, logoutUser } = useAuth()

  const _logoutUser = async (e) => {
    e.preventDefault()
    await logoutUser()
  }

  return (
    <NavbarStyled>
      <Link to="/">Home</Link>
      {!user ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <Link to="/setting">Setting</Link>
          <Link onClick={_logoutUser}>Logout</Link>
        </>
      )}
    </NavbarStyled>
  )
}
