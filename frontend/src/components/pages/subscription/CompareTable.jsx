import { T } from '../../../design/pages/subscription/designTokens.js'
import { CheckIcon, CrossIcon } from './Icons.jsx'
import { COMPARE_ROWS } from '../../../data/pages/subscription/data.js'

function CVal({ val, color = T.cyan }) {
  if (val === true) return <CheckIcon color={color} />
  if (val === false) return <CrossIcon />
  return <span style={{ fontSize: '.83rem', color: T.text, fontWeight: 500 }}>{val}</span>
}

export default function CompareTable() {
  const cats = [...new Set(COMPARE_ROWS.map((r) => r.cat))]
  return (
    <div
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 20,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          background: T.surface2,
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <div
          style={{
            padding: '1.1rem 1.5rem',
            fontSize: '.78rem',
            color: T.muted,
            fontWeight: 600,
            letterSpacing: '.06em',
            textTransform: 'uppercase',
          }}
        >
          Feature
        </div>
        {['Starter', 'Growth', 'Pro'].map((n) => (
          <div
            key={n}
            style={{
              padding: '1.1rem 1rem',
              textAlign: 'center',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: '.9rem',
              color: n === 'Growth' ? T.cyan : n === 'Pro' ? T.orange : T.muted,
              borderLeft: `1px solid ${T.border}`,
            }}
          >
            {n}
          </div>
        ))}
      </div>

      {cats.map((cat) => (
        <div key={cat}>
          <div
            style={{
              padding: '.55rem 1.5rem',
              background: 'rgba(0,0,0,0.25)',
              borderBottom: `1px solid ${T.border}`,
            }}
          >
            <span
              style={{
                fontSize: '.68rem',
                color: T.muted,
                fontWeight: 600,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
              }}
            >
              {cat}
            </span>
          </div>

          {COMPARE_ROWS.filter((r) => r.cat === cat).map((row, ri, arr) => (
            <div
              key={row.label}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                borderBottom:
                  ri === arr.length - 1 && cat !== cats[cats.length - 1]
                    ? `1px solid ${T.border}`
                    : '1px solid rgba(26,37,64,0.4)',
                transition: 'background .15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,212,255,0.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ padding: '.7rem 1.5rem', fontSize: '.83rem', color: T.text, fontWeight: 400 }}>
                {row.label}
              </div>
              {[row.starter, row.growth, row.pro].map((v, ci) => (
                <div
                  key={ci}
                  style={{
                    padding: '.7rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderLeft: `1px solid ${T.border}`,
                  }}
                >
                  <CVal val={v} color={ci === 1 ? T.cyan : ci === 2 ? T.orange : T.cyan} />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
