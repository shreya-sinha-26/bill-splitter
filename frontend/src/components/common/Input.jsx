/**
 * A labelled text field with room for an error or a hint underneath.
 *
 * Any other prop (type, value, onChange, autoComplete...) is passed straight
 * to the <input>.
 */
export default function Input({ id, label, error, hint, ...inputProps }) {
  const messageId = `${id}-message`
  const message = error || hint

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={message ? messageId : undefined}
        {...inputProps}
      />
      {message && (
        <span
          id={messageId}
          className={error ? 'field-error' : 'field-hint'}
          aria-live="polite"
        >
          {message}
        </span>
      )}
    </div>
  )
}
