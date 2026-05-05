import { useEffect, useState } from 'react'
import { hrefForPage, navigateTo } from '../../../utils/navigation.js'
import { getUser, clearTokens } from '../../../api/client.js'

export default function Nav() {
  const [navScrolled, setNavScrolled] = useState(false)
  const user = getUser()

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = (e) => {
    e.preventDefault()
    clearTokens()
    navigateTo('home')
  }

  const initials = user?.firstName
    ? user.firstName.slice(0, 2).toUpperCase()
    : '?'

  return (
    <nav className={navScrolled ? 'nav-scrolled' : undefined} style={{ position: 'sticky' }}>
      <div className="wrap nav-inner">
        <a
          href={hrefForPage('home')}
          className="logo"
          aria-label="EcomAuto home"
          onClick={(e) => { e.preventDefault(); navigateTo('home') }}
        >
          <div className="logo-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="rgba(0,212,255,0.08)" />
              <path d="M8 16L14 10L20 16L26 10" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 22L14 16L20 22L26 16" stroke="#ff6b2b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="16" cy="16" r="2.5" fill="#00d4ff" />
            </svg>
          </div>
          <span className="logo-text">Ecom<span>Auto</span></span>
        </a>

        <ul className="nav-links">
          <li>
            <a href={hrefForPage('pricing')} onClick={(e) => { e.preventDefault(); navigateTo('pricing') }}>
              Upgrade Plan
            </a>
          </li>
        </ul>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {/* User chip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.firstName}
                style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(0,212,255,0.3)' }}
              />
            ) : (
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00d4ff, #0099cc)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '0.75rem',
                color: '#04080f',
                flexShrink: 0,
              }}>
                {initials}
              </div>
            )}
            <span style={{ color: '#e8edf5', fontSize: '0.875rem', fontWeight: 500 }}>
              {user?.firstName || 'User'}
            </span>
          </div>

          <a href="#" className="nav-cta" onClick={handleLogout}>
            Logout →
          </a>
        </div>
      </div>
    </nav>
  )
}
