import { T } from '../designTokens.js'

function PlusIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function ChevronRightIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  )
}

export default function QuickActions() {
  const actions = [
    { label: 'New Registration', primary: true, description: 'Start a new product registration' },
    { label: 'Bulk Import', description: 'Import multiple products at once' },
    { label: 'View Reports', description: 'Detailed analytics and insights' },
    { label: 'Support', description: 'Get help from our team' },
  ]

  return (
    <div className="quick-actions">
      {actions.map((action, idx) => (
        <button
          key={idx}
          className={`action-button ${action.primary ? 'primary' : ''}`}
          style={{
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
            {action.primary && <PlusIcon style={{ width: 16, height: 16 }} />}
            <span style={{ flex: 1, textAlign: 'left' }}>{action.label}</span>
            <ChevronRightIcon className="arrow-icon" />
          </div>
          <span
            style={{
              fontSize: '0.7rem',
              color: T.muted,
              marginTop: '0.25rem',
              textAlign: 'left',
            }}
          >
            {action.description}
          </span>
        </button>
      ))}
    </div>
  )
}
