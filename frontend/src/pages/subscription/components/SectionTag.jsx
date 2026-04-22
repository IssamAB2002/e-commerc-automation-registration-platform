import { T } from '../designTokens.js'

export default function SectionTag({ label }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '.5rem',
        marginBottom: '1rem',
      }}
    >
      <div style={{ width: 22, height: 1, background: T.cyan }} />
      <span
        style={{
          fontSize: '.72rem',
          fontWeight: 600,
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          color: T.cyan,
        }}
      >
        {label}
      </span>
    </div>
  )
}

