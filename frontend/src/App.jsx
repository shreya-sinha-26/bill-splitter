import { Navigate, Route, Routes } from 'react-router-dom'
import PageLayout from './components/layout/PageLayout.jsx'
import GuestRoute from './components/routing/GuestRoute.jsx'
import ProtectedRoute from './components/routing/ProtectedRoute.jsx'
import { ROUTES } from './constants/routes.js'

import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'

export default function App() {
  return (
    <Routes>
      {/* Every page is drawn inside the shared header and footer. */}
      <Route element={<PageLayout />}>
        {/* Only for visitors who are not signed in. */}
        <Route element={<GuestRoute />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>

        {/* Groups are private to their members, so these need a sign-in. */}
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.HOME} element={<h1>You are signed in</h1>} />
          
        </Route>

        {/* Any unknown address goes back to the start. */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Route>
    </Routes>
  )
}
