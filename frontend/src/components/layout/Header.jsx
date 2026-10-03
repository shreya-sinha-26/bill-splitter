import { Link } from 'react-router-dom'
import Button from '../common/Button.jsx'
import { APP_NAME } from '../../constants/config.js'
import { HEADER_TEXT } from '../../constants/labels.js'
import { ROUTES } from '../../constants/routes.js'
import { useAuth } from '../../context/AuthContext.jsx'

export default function Header() {
  const { isLoggedIn, displayName, username, logout } = useAuth()

  return (
    <header className="app-header">
      <Link to={ROUTES.HOME} className="app-brand">
        {APP_NAME}
      </Link>

      {isLoggedIn && (
        <div className="app-auth">
          <span className="app-user">{displayName || username}</span>
          <Button variant="ghost" onClick={logout}>
            {HEADER_TEXT.SIGN_OUT}
          </Button>
        </div>
      )}
    </header>
  )
}
