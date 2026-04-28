export default function AuthButton({
  children,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  onClick,
  ...props
}) {
  return (
    <button
      className={`auth-button ${variant}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="9.42" />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  )
}
