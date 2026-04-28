import { useEffect, useState } from 'react'
import { hrefForPage, navigateTo } from '../../../utils/navigation.js'

export default function Nav() {
  const [navScrolled, setNavScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={navScrolled ? 'nav-scrolled' : undefined} style={{ position: 'sticky' }}>
      <div className="wrap nav-inner">
        <a
          href={hrefForPage('home')}
          className="logo"
          aria-label="EcomAuto home"
          onClick={(e) => {
            e.preventDefault()
            navigateTo('home')
          }}
        >
          <div className="logo-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="rgba(0,212,255,0.08)" />
              <path
                d="M8 16L14 10L20 16L26 10"
                stroke="#00d4ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 22L14 16L20 22L26 16"
                stroke="#ff6b2b"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="16" cy="16" r="2.5" fill="#00d4ff" />
            </svg>
          </div>
          <span className="logo-text">
            Ecom<span>Auto</span>
          </span>
        </a>

        <ul className="nav-links">
          <li>
            <a
              href={hrefForPage('pricing')}
              onClick={(e) => {
                e.preventDefault()
                navigateTo('pricing')
              }}
            >
              Upgrade Plan
            </a>
          </li>
          <li>
            <a
              href={hrefForPage('signin')}
              onClick={(e) => {
                e.preventDefault()
                navigateTo('signin')
              }}
            >
              Settings
            </a>
          </li>
        </ul>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a
            href={hrefForPage('home')}
            onClick={(e) => {
              e.preventDefault()
              navigateTo('home')
            }}
            style={{
              color: '#e8edf5',
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'color 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#00d4ff')}
            onMouseLeave={(e) => (e.target.style.color = '#e8edf5')}
          >
            Home
          </a>
          <a
            href={hrefForPage('home')}
            className="nav-cta"
            onClick={(e) => {
              e.preventDefault()
              navigateTo('home')
            }}
          >
            Logout {'\u2192'}
          </a>
        </div>
      </div>
    </nav>
  )
}
