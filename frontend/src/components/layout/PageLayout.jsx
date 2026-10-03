import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'
import Header from './Header.jsx'

/**
 * The frame around every page. <Outlet /> is where React Router puts the
 * current page, so the header and footer never need repeating.
 */
export default function PageLayout() {
  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
