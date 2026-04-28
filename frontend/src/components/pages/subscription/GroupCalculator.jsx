import { useMemo, useState } from 'react'
import { T } from '../../../design/pages/subscription/designTokens.js'
import SectionTag from './SectionTag.jsx'
import { CLIENTS_PER_GROUP, groupsNeeded } from '../../../utils/grouping.js'

export default function GroupCalculator() {
  const [clients, setClients] = useState(30)
  const perGroup = CLIENTS_PER_GROUP

  const groups = useMemo(() => groupsNeeded(clients, perGroup), [clients, perGroup])
  const msgs = useMemo(() => clients * 450, [clients])
  const plan = clients <= 1 ? 'Starter' : clients <= 45 ? 'Growth' : 'Pro'
  const planColor = plan === 'Pro' ? T.orange : T.cyan

  const wrap = useMemo(
    () => ({
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0 2rem',
      position: 'relative',
      zIndex: 2,
    }),
    [],
  )

  return (
    <section style={{ padding: '6rem 0', position: 'relative', zIndex: 2 }}>
      <div style={wrap}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <SectionTag label="Calculator" />
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(1.8rem,3.5vw,2.5rem)',
                letterSpacing: '-.03em',
                lineHeight: 1.1,
                marginBottom: '1rem',
              }}
            >
              Estimate Your
              <br />
              <span style={{ color: T.cyan }}>Group Setup</span>
            </h2>
            <p style={{ color: T.muted, fontSize: '.9rem', fontWeight: 300, lineHeight: 1.75, marginBottom: '2rem' }}>
              Drag the slider to see how many workflow groups and Meta Developer Apps your client count requires.
            </p>
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: '1.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                <label style={{ fontSize: '.85rem', color: T.muted, fontWeight: 500 }}>Client Stores</label>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.4rem', color: T.cyan }}>
                  {clients}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={150}
                value={clients}
                step={1}
                onChange={(e) => setClients(Number(e.target.value))}
                style={{ width: '100%', accentColor: T.cyan, marginBottom: '1.5rem', cursor: 'pointer' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '.8rem' }}>
                {[
                  { val: groups, label: 'Groups Needed' },
                  { val: groups, label: 'Meta Dev Apps' },
                  { val: msgs.toLocaleString(), label: 'Est. Msgs/mo' },
                ].map(({ val, label }) => (
                  <div key={label} style={{ background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 10, padding: '.9rem', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.4rem', color: T.cyan }}>{val}</div>
                    <div style={{ fontSize: '.68rem', color: T.muted, marginTop: '.2rem' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: '2rem' }}>
              <div
                style={{
                  fontSize: '.78rem',
                  color: T.muted,
                  fontWeight: 500,
                  letterSpacing: '.06em',
                  textTransform: 'uppercase',
                  marginBottom: '1.2rem',
                }}
              >
                Recommended Plan
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '2rem', color: planColor }}>{plan}</div>
                <div
                  style={{
                    background: `rgba(${planColor === T.cyan ? '0,212,255' : '255,107,43'},0.1)`,
                    border: `1px solid rgba(${planColor === T.cyan ? '0,212,255' : '255,107,43'},0.2)`,
                    borderRadius: 8,
                    padding: '.3rem .8rem',
                    fontSize: '.75rem',
                    color: planColor,
                    fontWeight: 600,
                  }}
                >
                  Best Fit
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.9rem', marginBottom: '1.8rem' }}>
                {Array.from({ length: groups }, (_, i) => (
                  <div key={i} style={{ background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 10, padding: '.9rem 1.1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.6rem' }}>
                      <span
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontWeight: 700,
                          fontSize: '.82rem',
                          color: [T.cyan, T.orange, T.purple, T.green][i % 4],
                        }}
                      >
                        Group {String.fromCharCode(65 + i)}
                      </span>
                      <span style={{ fontSize: '.7rem', color: T.muted }}>
                        {i < groups - 1 ? perGroup : ((clients - 1) % perGroup) + 1} / {perGroup} clients
                      </span>
                    </div>
                    <div style={{ height: 4, background: T.border, borderRadius: 2, overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          borderRadius: 2,
                          background: [T.cyan, T.orange, T.purple, T.green][i % 4],
                          width: `${i < groups - 1 ? 100 : (((clients - 1) % perGroup) + 1) / perGroup * 100}%`,
                          transition: 'width .5s ease',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                style={{
                  width: '100%',
                  background: `linear-gradient(135deg, ${T.cyan}, ${T.cyanDim})`,
                  color: T.bg,
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: '.88rem',
                  padding: '.8rem',
                  borderRadius: 10,
                  border: 'none',
                  boxShadow: '0 0 24px rgba(0,212,255,0.2)',
                  transition: 'all .2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 38px rgba(0,212,255,0.4)')}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 24px rgba(0,212,255,0.2)')}
              >
                Get Started with {plan} →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
