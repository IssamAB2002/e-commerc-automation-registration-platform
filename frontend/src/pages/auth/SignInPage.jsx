import { useState } from 'react'
import { T } from '../../design/pages/auth/designTokens.js'
import ParticleBackground from '../../components/ParticleBackground.jsx'
import AuthNav from '../../components/pages/auth/AuthNav.jsx'
import AuthInput from '../../components/pages/auth/AuthInput.jsx'
import AuthButton from '../../components/pages/auth/AuthButton.jsx'
import { navigateTo } from '../../utils/navigation.js'
import '../../styles/pages/auth/auth.css'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
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
            <p>Sign in to your account and continue automating your e-commerce business. Access your dashboard, manage subscriptions, and track your automation metrics.</p>

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
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="auth-benefit-text">
                  <h3>Instant Setup</h3>
                  <p>Seamlessly integrate with your e-commerce platform in minutes</p>
                </div>
              </div>

              <div className="auth-benefit">
                <div className="auth-benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div className="auth-benefit-text">
                  <h3>Enterprise Security</h3>
                  <p>Your data is protected with industry-leading encryption standards</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="auth-form-container">
            <div className="auth-form-box">
              <h2>Sign In</h2>
              <p className="auth-form-subtitle">Access your EcomAuto dashboard</p>

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

              <div className="auth-divider">or continue with</div>

              <div className="auth-social">
                <button
                  type="button"
                  className="auth-social-button"
                  onClick={() => console.log('Google Sign In')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8" />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="auth-social-button"
                  onClick={() => console.log('GitHub Sign In')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8" />
                  </svg>
                  GitHub
                </button>
              </div>

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
