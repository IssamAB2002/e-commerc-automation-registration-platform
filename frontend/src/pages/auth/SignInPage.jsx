import { useState } from 'react'
import { T } from '../../design/pages/auth/designTokens.js'
import ParticleBackground from '../../components/ParticleBackground.jsx'
import AuthNav from '../../components/pages/auth/AuthNav.jsx'
import AuthInput from '../../components/pages/auth/AuthInput.jsx'
import AuthButton from '../../components/pages/auth/AuthButton.jsx'
import { navigateTo } from '../../utils/navigation.js'
import '../../styles/pages/auth/auth.css'

const FB_APP_ID = 'YOUR_FACEBOOK_APP_ID'
const FB_REDIRECT_URI = 'https://yourdomain.com/auth/facebook/callback'

const FB_SCOPE = [
  'pages_show_list',
  'pages_messaging',
  'pages_read_engagement',
  'public_profile',
  'email',
].join(',')

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isFacebookLoading, setIsFacebookLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!email) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email format'
    if (!password) newErrors.password = 'Password is required'
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Sign In:', { email, password, rememberMe })
      // Redirect to dashboard after successful login
      // navigateTo('dashboard')
    } catch (err) {
      setErrors({ general: 'Sign in failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFacebookSignIn = () => {
    setIsFacebookLoading(true)

    const params = new URLSearchParams({
      client_id: FB_APP_ID,
      redirect_uri: FB_REDIRECT_URI,
      scope: FB_SCOPE,
      response_type: 'code',
      state: 'signin',
    })

    window.location.href = `https://www.facebook.com/v19.0/dialog/oauth?${params.toString()}`
  }

  return (
    <>
      <ParticleBackground />
      <AuthNav isSignUp={false} />

      <div className="auth-container" style={{ paddingTop: '5rem' }}>
        <div className="auth-wrapper">
          {/* Left Side - Content */}
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

          {/* Right Side - Form */}
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

              <div style={{ height: '1px', background: T.border, margin: '1.5rem 0' }} />

              <button
                type="button"
                onClick={handleFacebookSignIn}
                disabled={isFacebookLoading}
                className="facebook-login-btn"
                style={{ borderRadius: '10px' }}
              >
                {isFacebookLoading ? (
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
                  marginBottom: '1.25rem',
                  lineHeight: '1.5',
                }}
              >
                We only access your connected page&apos;s messages — nothing else.
              </p>

              {errors.general && (
                <div className="auth-error" style={{ marginBottom: '1.5rem', color: T.error }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                    <line x1="7" y1="3.5" x2="7" y2="8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="7" cy="10.5" r="0.5" fill="currentColor" />
                  </svg>
                  {errors.general}
                </div>
              )}

              <div className="auth-divider">or sign in with email</div>

              <form onSubmit={handleSubmit}>
                <AuthInput
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  required
                />

                <AuthInput
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  required
                />

                <div className="auth-checkbox">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="checkbox-input"
                  />
                  <label htmlFor="remember">Remember me on this device</label>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <span></span>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      // navigateTo('forgot-password')
                    }}
                    style={{ color: T.cyan, textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#00eeff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = T.cyan)}
                  >
                    Forgot password?
                  </a>
                </div>

                <AuthButton type="submit" isLoading={isLoading}>
                  Sign In to Your Account
                </AuthButton>
              </form>

              <div className="auth-footer">
                Don't have an account?{' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    navigateTo('signup')
                  }}
                >
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
