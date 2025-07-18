import { useAuthContext } from '../hooks/useAuthContext'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'


export default function Navbar() {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>myMoney</li>


        {!user && (
        <>
          <li><Link to="/Login">Login</Link></li>
          <li><Link to="/Signup">Signup</Link></li>
        </>)}


        {user && (
          <>
          <li>Hello, {user.displayName}</li>
          <li>
            <button className='btn' onClick={logout}>Logout</button>
          </li>
          </>
        )}
      </ul>
    </nav>
  )
}
