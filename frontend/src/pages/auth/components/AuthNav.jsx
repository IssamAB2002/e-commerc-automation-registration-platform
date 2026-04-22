import { T } from '../designTokens.js'
import { hrefForPage, navigateTo } from '../../../utils/navigation.js'

export default function AuthNav({ isSignUp = false }) {
  return (
    <nav className="auth-nav">
      <div className="auth-nav-inner">
        <a
          href={hrefForPage('home')}
          onClick={(e) => {
            e.preventDefault()
            navigateTo('home')
          }}
          className="auth-logo"
        >
          <svg width={30} height={30} viewBox="0 0 32 32" fill="none">
            <rect width={32} height={32} rx={8} fill="rgba(0,212,255,0.08)" />
            <path
              d="M8 16L14 10L20 16L26 10"
              stroke={T.cyan}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 22L14 16L20 22L26 16"
              stroke={T.orange}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx={16} cy={16} r={2.5} fill={T.cyan} />
          </svg>
          <span className="auth-logo-text">
            Ecom<span>Auto</span>
          </span>
        </a>

        <div className="auth-nav-links">
          <a href={hrefForPage('home')} onClick={(e) => {
            e.preventDefault()
            navigateTo('home')
          }} className="auth-nav-link">
            Home
          </a>
          <a href={hrefForPage('pricing')} onClick={(e) => {
            e.preventDefault()
            navigateTo('pricing')
          }} className="auth-nav-link">
            Pricing
          </a>
          {!isSignUp ? (
            <button
              onClick={() => navigateTo('signup')}
              className="auth-nav-cta"
            >
              Sign Up
            </button>
          ) : (
            <button
              onClick={() => navigateTo('signin')}
              className="auth-nav-cta"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
