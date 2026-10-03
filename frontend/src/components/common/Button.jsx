/**
 * The app's standard button.
 *
 * variant   - 'primary', 'danger' or 'ghost'; leave out for the plain style
 * block     - stretch to the full width of its container
 * isLoading - disable the button and show loadingText while work is running
 */
export default function Button({
  variant,
  block = false,
  isLoading = false,
  loadingText,
  type = 'button',
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  const classes = ['btn', variant && `btn-${variant}`, block && 'btn-block', className]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...rest}
    >
      {isLoading && loadingText ? loadingText : children}
    </button>
  )
}
