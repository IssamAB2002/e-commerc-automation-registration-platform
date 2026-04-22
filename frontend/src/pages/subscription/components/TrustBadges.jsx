import { T } from '../designTokens.js'

function TrustBadge({ icon, label, sub }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '.9rem',
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 12,
        padding: '1rem 1.3rem',
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 9,
          background: 'rgba(0,212,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '.88rem', fontWeight: 700, color: T.text }}>
          {label}
        </div>
        <div style={{ fontSize: '.75rem', color: T.muted, fontWeight: 300, marginTop: '.1rem' }}>{sub}</div>
      </div>
    </div>
  )
}

export default function TrustBadges() {
  return (
    <div className="sub-trust-grid">
      <TrustBadge
        icon={
          <svg width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
              d="M9 2l1.8 5.4H17l-4.6 3.4 1.8 5.4L9 13 4.8 16.2l1.8-5.4L2 7.4h6.2L9 2z"
              stroke={T.cyan}
              strokeWidth={1.4}
              strokeLinejoin="round"
            />
          </svg>
        }
        label="1‑Month Free Trial"
        sub="Then 2 months 20% off"
      />
      <TrustBadge
        icon={
          <svg width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M9 2a7 7 0 100 14A7 7 0 009 2z" stroke={T.cyan} strokeWidth={1.4} />
            <path d="M6 9l2 2 4-4" stroke={T.cyan} strokeWidth={1.4} strokeLinecap="round" />
          </svg>
        }
        label="Cancel Anytime"
        sub="No lock-in contracts"
      />
      <TrustBadge
        icon={
          <svg width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <rect x={3} y={3} width={12} height={12} rx={3} stroke={T.cyan} strokeWidth={1.4} />
            <path d="M6 9h6M9 6v6" stroke={T.cyan} strokeWidth={1.4} strokeLinecap="round" />
          </svg>
        }
        label="Auto-Scale Groups"
        sub="Grows with your client base"
      />
      <TrustBadge
        icon={
          <svg width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
              d="M3 9l2.5 2.5L9 8l3.5 4L15 6"
              stroke={T.cyan}
              strokeWidth={1.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        label="99.9% Uptime SLA"
        sub="Monitored 24/7"
      />
    </div>
  )
}
