/**keeps signed-out visitors away from the group pages */
import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../../constants/routes.js'
import { useAuth } from '../../context/AuthContext.jsx'

/** Shows its pages only to signed-in users; everyone else goes to sign-in. */
export default function ProtectedRoute() {
  const { isLoggedIn } = useAuth()
  return isLoggedIn ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />
}
