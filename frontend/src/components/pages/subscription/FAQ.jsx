import { useState } from 'react'
import { T } from '../../../design/pages/subscription/designTokens.js'
import { FAQS } from '../../../data/pages/subscription/data.js'

function FAQItem({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div
      style={{
        background: T.surface,
        border: `1px solid ${open ? T.borderHover : T.border}`,
        borderRadius: 12,
        overflow: 'hidden',
        transition: 'border-color .2s',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '1.2rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          textAlign: 'left',
          cursor: 'pointer',
        }}
      >
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 600,
            fontSize: '.95rem',
            color: T.text,
          }}
        >
          {q}
        </span>
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: '50%',
            background: open ? T.cyan : T.surface2,
            border: `1px solid ${open ? T.cyan : T.border}`,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all .2s',
          }}
          aria-hidden="true"
        >
          <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
            <path
              d={open ? 'M2 9L6 5L10 9' : 'M2 4L6 8L10 4'}
              stroke={open ? T.bg : T.muted}
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
      {open ? (
        <div
          style={{
            padding: '0 1.5rem 1.2rem',
            fontSize: '.88rem',
            color: T.muted,
            lineHeight: 1.75,
            fontWeight: 300,
          }}
        >
          {a}
        </div>
      ) : null}
    </div>
  )
}

export default function FAQList() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
      {FAQS.map((f, i) => (
        <FAQItem key={i} q={f.q} a={f.a} defaultOpen={i === 0} />
      ))}
    </div>
  )
}
