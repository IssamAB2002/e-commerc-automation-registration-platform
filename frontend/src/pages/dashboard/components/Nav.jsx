import { navigateTo } from '../../../utils/navigation.js'
import { T } from '../designTokens.js'

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

export default function Nav() {
  return (
    <nav
      style={{
        position: 'relative',
        zIndex: 100,
        background: `linear-gradient(to bottom, ${T.surface}, transparent)`,
        borderBottom: `1px solid ${T.border}`,
        padding: '0 2rem',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
        <div
          onClick={() => navigateTo('home')}
          style={{
            cursor: 'pointer',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: T.cyan,
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.color = T.purple)}
          onMouseLeave={(e) => (e.target.style.color = T.cyan)}
        >
          Dashboard
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <button
            onClick={() => navigateTo('pricing')}
            style={{
              background: 'transparent',
              border: 'none',
              color: T.text,
              cursor: 'pointer',
              fontSize: '0.875rem',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = T.cyan)}
            onMouseLeave={(e) => (e.target.style.color = T.text)}
          >
            Upgrade Plan
          </button>
          <button
            onClick={() => navigateTo('signin')}
            style={{
              background: 'transparent',
              border: 'none',
              color: T.text,
              cursor: 'pointer',
              fontSize: '0.875rem',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = T.cyan)}
            onMouseLeave={(e) => (e.target.style.color = T.text)}
          >
            Settings
          </button>
          <button
            onClick={() => navigateTo('home')}
            style={{
              background: 'transparent',
              border: 'none',
              color: T.text,
              cursor: 'pointer',
              fontSize: '0.875rem',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = T.error)}
            onMouseLeave={(e) => (e.target.style.color = T.text)}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
