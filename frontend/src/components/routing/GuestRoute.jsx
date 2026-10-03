/** keeps signed-in users away from the login and register pages.*/
import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../../constants/routes.js'
import { useAuth } from '../../context/AuthContext.jsx'

/** Shows its pages only to signed-out users; a signed-in user goes home. */
export default function GuestRoute() {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? <Navigate to={ROUTES.HOME} replace /> : <Outlet />
}
