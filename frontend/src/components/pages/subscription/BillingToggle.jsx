import { T } from '../../../design/pages/subscription/designTokens.js'

export default function BillingToggle({ billing, onChange }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        justifyContent: 'center',
        marginBottom: '3.5rem',
      }}
    >
      <span
        style={{
          fontSize: '.9rem',
          color: billing === 'monthly' ? T.text : T.muted,
          transition: 'color .2s',
          fontWeight: billing === 'monthly' ? 500 : 400,
        }}
      >
        Monthly
      </span>
      <button
        type="button"
        onClick={() => onChange(billing === 'monthly' ? 'annual' : 'monthly')}
        style={{
          width: 52,
          height: 28,
          borderRadius: 14,
          border: 'none',
          cursor: 'pointer',
          background: billing === 'annual' ? T.cyan : T.surface2,
          position: 'relative',
          transition: 'background .3s',
        }}
        aria-label="Toggle billing cycle"
      >
        <div
          style={{
            position: 'absolute',
            top: 3,
            left: billing === 'annual' ? 27 : 3,
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: billing === 'annual' ? T.bg : T.muted,
            transition: 'left .3s',
            boxShadow: '0 1px 4px rgba(0,0,0,.4)',
          }}
        />
      </button>
      <span style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
        <span
          style={{
            fontSize: '.9rem',
            color: billing === 'annual' ? T.text : T.muted,
            transition: 'color .2s',
            fontWeight: billing === 'annual' ? 500 : 400,
          }}
        >
          Annual
        </span>
        <span
          style={{
            background: 'rgba(62,207,142,0.12)',
            color: T.green,
            border: '1px solid rgba(62,207,142,0.2)',
            borderRadius: 100,
            padding: '.15rem .55rem',
            fontSize: '.68rem',
            fontWeight: 700,
            letterSpacing: '.04em',
          }}
        >
          SAVE 20%
        </span>
      </span>
    </div>
  )
}
