import { useState } from 'react'
import { T } from '../../design/pages/auth/designTokens.js'
import ParticleBackground from '../../components/ParticleBackground.jsx'
import AuthNav from '../../components/pages/auth/AuthNav.jsx'
import { navigateTo } from '../../utils/navigation.js'
import { getFacebookAuthUrl } from '../../api/auth.js'
import '../../styles/pages/auth/auth.css'

export default function SignInPage({ onNavigate }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFacebookSignIn = async () => {
    setIsLoading(true)
    setError('')
    try {
      const data = await getFacebookAuthUrl()
      window.location.href = data.auth_url
    } catch {
      setError('Could not initiate Facebook login. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <>
      <ParticleBackground />
      <AuthNav isSignUp={false} />

      <div className="auth-container" style={{ paddingTop: '5rem' }}>
        <div className="auth-wrapper">
          {/* Left Side */}
          <div className="auth-content">
            <h1>
              Welcome Back to <span>EcomAuto</span>
            </h1>
            <p>
              Reconnect your Facebook page and let your AI agent keep handling customer messages — 24/7, while you focus on
              growing your business.
            </p>

            <div className="auth-benefits">
              <div className="auth-benefit">
                <div className="auth-benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="16 12 12 8 8 12" />
                    <line x1="12" y1="16" x2="12" y2="8" />
                  </svg>
                </div>
                <div className="auth-benefit-text">
                  <h3>Real-time Analytics</h3>
                  <p>Monitor your automation performance with live dashboards and detailed metrics</p>
                </div>
              </div>

              <div className="auth-benefit">
                <div className="auth-benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2}>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <line x1="9" y1="10" x2="15" y2="10" />
                    <line x1="9" y1="14" x2="13" y2="14" />
                  </svg>
                </div>
                <div className="auth-benefit-text">
                  <h3>AI Always On</h3>
                  <p>Your agent replies to customers instantly — no delays, no missed messages</p>
                </div>
              </div>

              <div className="auth-benefit">
                <div className="auth-benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div className="auth-benefit-text">
                  <h3>Secure Access</h3>
                  <p>Authenticated through Facebook — no passwords stored, no security risks</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="auth-form-container">
            <div className="auth-form-box">
              <h2>Sign In</h2>
              <p className="auth-form-subtitle">Access your EcomAuto dashboard</p>

              <div style={{ margin: '1.75rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {[
                  { step: '1', text: 'Click below & log in with your Facebook account' },
                  { step: '2', text: 'Confirm access to your connected page' },
                  { step: '3', text: 'Land straight on your dashboard' },
                ].map(({ step, text }) => (
                  <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${T.orange}, ${T.orange}cc)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: '#fff',
                        flexShrink: 0,
                      }}
                    >
                      {step}
                    </div>
                    <span style={{ fontSize: '0.9rem', color: T.text }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={{ height: '1px', background: T.border, marginBottom: '1.5rem' }} />

              {error && (
                <div className="auth-error" style={{ marginBottom: '1.25rem', color: T.error }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="7" y1="3.5" x2="7" y2="8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="7" cy="10.5" r="0.5" fill="currentColor" />
                  </svg>
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={handleFacebookSignIn}
                disabled={isLoading}
                className="facebook-login-btn"
                style={{ borderRadius: '10px' }}
              >
                {isLoading ? (
                  <span>Redirecting...</span>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Continue with Facebook
                  </>
                )}
              </button>

              <p
                style={{
                  fontSize: '0.75rem',
                  color: T.muted,
                  textAlign: 'center',
                  marginTop: '-0.75rem',
                  lineHeight: '1.5',
                }}
              >
                We only access your connected page&apos;s messages — nothing else.
              </p>

              <div className="auth-footer">
                Don&apos;t have an account?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('signup') }}>
                  Create one
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
