/**
 * A white panel with a border and shadow.
 *
 * titleAs picks the heading tag. Use 'h1' when the card holds the page's main
 * heading, so every page still has exactly one h1.
 */
export default function Card({ title, titleAs: Heading = 'h2', description, className = '', children }) {
  return (
    <div className={['card', className].filter(Boolean).join(' ')}>
      {title && <Heading className="card-title">{title}</Heading>}
      {description && <p className="card-description">{description}</p>}
      {children}
    </div>
  )
}
