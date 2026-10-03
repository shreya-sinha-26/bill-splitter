import { APP_NAME } from '../../constants/config.js'
import { FOOTER_TEXT } from '../../constants/labels.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="app-footer">
      <p>
        © {year} {APP_NAME}. {FOOTER_TEXT.TAGLINE}
      </p>
    </footer>
  )
}
