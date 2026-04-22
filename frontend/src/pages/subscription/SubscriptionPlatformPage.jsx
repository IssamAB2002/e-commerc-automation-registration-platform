import { useEffect, useMemo, useState } from 'react'
import ParticleBackground from '../../components/ParticleBackground.jsx'
import { T } from './designTokens.js'
import { PLANS } from './data.js'
import Nav from './components/Nav.jsx'
import BillingToggle from './components/BillingToggle.jsx'
import PlanCard from './components/PlanCard.jsx'
import SectionTag from './components/SectionTag.jsx'
import CompareTable from './components/CompareTable.jsx'
import GroupCalculator from './components/GroupCalculator.jsx'
import FAQList from './components/FAQ.jsx'
import TrustBadges from './components/TrustBadges.jsx'
import './subscription.css'

export default function SubscriptionPlatformPage() {
  const [billing, setBilling] = useState('monthly')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const wrap = useMemo(
    () => ({ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 2 }),
    [],
  )
  const section = useMemo(() => ({ padding: '6rem 0', position: 'relative', zIndex: 2 }), [])
  const divider = useMemo(
    () => ({
      height: 1,
      background: `linear-gradient(to right, transparent, ${T.border}, transparent)`,
      position: 'relative',
      zIndex: 2,
    }),
    [],
  )

  return (
    <>
      <ParticleBackground />
      <Nav scrolled={scrolled} />

      <section style={{ ...section, paddingTop: '9rem', paddingBottom: '3rem' }}>
        <div style={wrap}>
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.5rem',
                background: 'rgba(0,212,255,0.07)',
                border: '1px solid rgba(0,212,255,0.18)',
                borderRadius: 100,
                padding: '.3rem .9rem .3rem .5rem',
                marginBottom: '1.5rem',
                animation: 'fadeup .8s ease both',
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: T.cyan,
                  display: 'inline-block',
                  animation: 'pulse 2s infinite',
                }}
              />
              <span
                style={{
                  fontSize: '.75rem',
                  color: T.cyan,
                  fontWeight: 500,
                  letterSpacing: '.05em',
                  textTransform: 'uppercase',
                }}
              >
                Simple, Transparent Pricing
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
                letterSpacing: '-.03em',
                lineHeight: 1.08,
                marginBottom: '1.2rem',
                animation: 'fadeup .85s .08s ease both',
              }}
            >
              Choose Your <span style={{ color: T.cyan }}>Automation</span>
              <br />
              <span style={{ color: T.orange }}>Scale</span>
            </h1>
            <p
              style={{
                color: T.muted,
                fontSize: '1.02rem',
                lineHeight: 1.75,
                fontWeight: 300,
                marginBottom: '2rem',
                animation: 'fadeup .85s .16s ease both',
              }}
            >
              Every plan includes auto group assignment, Make.com integration, and Meta API distribution. Pick the scale
              that matches your client roster.
            </p>
          </div>

          <div style={{ animation: 'fadeup .85s .24s ease both' }}>
            <BillingToggle billing={billing} onChange={setBilling} />
          </div>

          <div className="sub-plans-grid">
            {PLANS.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} billing={billing} idx={i} />
            ))}
          </div>

          <div
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 14,
              padding: '1.5rem 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: 'rgba(155,100,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M3 7l7-4 7 4v6l-7 4-7-4V7z" stroke={T.purple} strokeWidth={1.4} />
                  <path
                    d="M10 3v14M3 7l7 4 7-4"
                    stroke={T.purple}
                    strokeWidth={1.4}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '.95rem', color: T.text }}>
                  Enterprise / Agency
                </div>
                <div style={{ fontSize: '.8rem', color: T.muted, fontWeight: 300 }}>
                  Custom workflows, white-label portal, SLA agreement, and dedicated onboarding.
                </div>
              </div>
            </div>
            <button
              type="button"
              style={{
                background: 'transparent',
                border: `1px solid ${T.purple}`,
                color: T.purple,
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '.85rem',
                padding: '.65rem 1.5rem',
                borderRadius: 9,
                letterSpacing: '.02em',
                transition: 'all .2s',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(155,100,255,0.1)'
                e.currentTarget.style.boxShadow = '0 0 20px rgba(155,100,255,0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Contact Sales →
            </button>
          </div>
        </div>
      </section>

      <div style={divider} />

      <section style={{ ...section, paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div style={wrap}>
          <TrustBadges />
        </div>
      </section>

      <div style={divider} />

      <section style={section} id="compare">
        <div style={wrap}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <SectionTag label="Compare" />
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(1.8rem,3.5vw,2.6rem)',
                letterSpacing: '-.03em',
                lineHeight: 1.1,
                marginBottom: '.8rem',
              }}
            >
              Full Feature Breakdown
            </h2>
            <p style={{ color: T.muted, fontSize: '.95rem', fontWeight: 300 }}>See exactly what’s included at every level.</p>
          </div>
          <CompareTable />
        </div>
      </section>

      <div style={divider} />

      <GroupCalculator />

      <div style={divider} />

      <section style={section} id="faq">
        <div style={wrap}>
          <div className="sub-faq-grid">
            <div>
              <SectionTag label="FAQ" />
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(1.8rem,3vw,2.4rem)',
                  letterSpacing: '-.03em',
                  lineHeight: 1.1,
                  marginBottom: '1rem',
                }}
              >
                Frequently Asked
              </h2>
              <p style={{ color: T.muted, fontSize: '.9rem', fontWeight: 300, lineHeight: 1.75 }}>
                Everything you need to know about EcomAuto’s pricing, automation architecture, and billing.
              </p>
              <div
                style={{
                  marginTop: '2rem',
                  padding: '1.5rem',
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  borderRadius: 14,
                }}
              >
                <div style={{ fontSize: '.8rem', color: T.muted, marginBottom: '.5rem' }}>Still have questions?</div>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: '.95rem',
                    color: T.text,
                    marginBottom: '1rem',
                  }}
                >
                  We’re here to help
                </div>
                <button
                  type="button"
                  style={{
                    background: 'transparent',
                    border: `1px solid ${T.cyan}`,
                    color: T.cyan,
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: '.8rem',
                    padding: '.6rem 1.2rem',
                    borderRadius: 8,
                    letterSpacing: '.02em',
                    transition: 'all .2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,212,255,0.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  Chat with Support
                </button>
              </div>
            </div>

            <FAQList />
          </div>
        </div>
      </section>

      <div style={divider} />

      <section style={{ ...section, paddingTop: '7rem', paddingBottom: '7rem' }}>
        <div style={wrap}>
          <div
            style={{
              background: T.surface,
              border: '1px solid rgba(0,212,255,0.15)',
              borderRadius: 24,
              padding: '4.5rem',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -100,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 600,
                height: 300,
                background: 'radial-gradient(ellipse,rgba(0,212,255,0.06),transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: -80,
                right: -80,
                width: 300,
                height: 300,
                background: 'radial-gradient(circle,rgba(255,107,43,0.05),transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(1.9rem,3.5vw,2.8rem)',
                letterSpacing: '-.03em',
                marginBottom: '1rem',
                position: 'relative',
              }}
            >
              Start Automating Your
              <br />
              <span style={{ color: T.cyan }}>E-Commerce Messaging</span>
            </h2>
            <p style={{ color: T.muted, fontSize: '.98rem', fontWeight: 300, marginBottom: '2.5rem', position: 'relative' }}>
              1‑month free trial on the Starter plan, then 20% off for 2 months. No credit card required.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
              <button
                type="button"
                style={{
                  background: `linear-gradient(135deg, ${T.cyan}, ${T.cyanDim})`,
                  color: T.bg,
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: '.95rem',
                  padding: '.9rem 2.2rem',
                  borderRadius: 10,
                  border: 'none',
                  boxShadow: '0 0 32px rgba(0,212,255,0.28)',
                  transition: 'all .2s',
                  letterSpacing: '.02em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 0 50px rgba(0,212,255,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = '0 0 32px rgba(0,212,255,0.28)'
                }}
              >
                Start Free Trial
              </button>
              <button
                type="button"
                style={{
                  background: 'transparent',
                  border: `1px solid ${T.border}`,
                  color: T.text,
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: '.95rem',
                  padding: '.9rem 2.2rem',
                  borderRadius: 10,
                  transition: 'all .2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = T.cyan
                  e.currentTarget.style.color = T.cyan
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = T.border
                  e.currentTarget.style.color = T.text
                }}
              >
                View Docs
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ padding: '2.5rem 0', borderTop: `1px solid ${T.border}`, position: 'relative', zIndex: 2 }}>
        <div style={{ ...wrap, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem', color: T.muted }}>
            Ecom<span style={{ color: T.cyan }}>Auto</span> App
          </span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy', 'Terms', 'Docs', 'Contact'].map((l) => (
              <a
                key={l}
                href="#"
                style={{ color: T.muted, fontSize: '.82rem', transition: 'color .2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
              >
                {l}
              </a>
            ))}
          </div>
          <span style={{ fontSize: '.75rem', color: 'rgba(107,122,148,0.45)' }}>© 2025 EcomAuto. All rights reserved.</span>
        </div>
      </footer>
    </>
  )
}
