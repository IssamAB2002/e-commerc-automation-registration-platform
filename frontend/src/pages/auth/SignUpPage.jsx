import { useState } from 'react'
import { T } from '../../design/pages/auth/designTokens.js'
import ParticleBackground from '../../components/ParticleBackground.jsx'
import AuthNav from '../../components/pages/auth/AuthNav.jsx'
import AuthInput from '../../components/pages/auth/AuthInput.jsx'
import AuthButton from '../../components/pages/auth/AuthButton.jsx'
import { navigateTo } from '../../utils/navigation.js'
import '../../styles/pages/auth/auth.css'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    businessType: '',
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [agreedToMarketing, setAgreedToMarketing] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'

    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email format'

    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password))
      newErrors.password = 'Password must contain uppercase, lowercase, and numbers'

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password'
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match'

    if (!formData.company.trim()) newErrors.company = 'Company name is required'
    if (!formData.businessType) newErrors.businessType = 'Please select a business type'

    if (!agreedToTerms) newErrors.terms = 'You must agree to the terms and conditions'

    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Sign Up:', { ...formData, agreedToMarketing })
      // Redirect to verification or onboarding
      // navigateTo('verify-email')
    } catch (err) {
      setErrors({ general: 'Sign up failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <ParticleBackground />
      <AuthNav isSignUp={true} />

      <div className="auth-container" style={{ paddingTop: '5rem', paddingBottom: '2rem' }}>
        <div className="auth-wrapper">
          {/* Left Side - Content */}
          <div className="auth-content">
            <h1>
              Start <span>Automating</span> Your
              <br />
              E-commerce Business
            </h1>
            <p>Join thousands of e-commerce businesses already using EcomAuto to streamline their operations, reduce manual work, and scale faster.</p>

            <div className="auth-benefits">
              <div className="auth-benefit">
                <div className="auth-benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2}>
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                    <polyline points="13 2 13 9 20 9" />
                  </svg>
                </div>
                <div className="auth-benefit-text">
                  <h3>30-Day Free Trial</h3>
                  <p>No credit card required. Experience the full power of automation</p>
                </div>
              </div>

              <div className="auth-benefit">
                <div className="auth-benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="auth-benefit-text">
                  <h3>Quick Setup</h3>
                  <p>Get up and running in under 5 minutes with our guided onboarding</p>
                </div>
              </div>

              <div className="auth-benefit">
                <div className="auth-benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2}>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="auth-benefit-text">
                  <h3>Expert Support</h3>
                  <p>Dedicated support team ready to help you succeed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="auth-form-container">
            <div className="auth-form-box" style={{ maxWidth: '100%' }}>
              <h2>Create Your Account</h2>
              <p className="auth-form-subtitle">Start your free 30-day trial today</p>

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
                {/* Name Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <AuthInput
                    label="First Name"
                    placeholder="John"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    required
                  />
                  <AuthInput
                    label="Last Name"
                    placeholder="Doe"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    required
                  />
                </div>

                <AuthInput
                  label="Email Address"
                  type="email"
                  placeholder="you@company.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />

                <AuthInput
                  label="Company Name"
                  placeholder="Your e-commerce company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  error={errors.company}
                  required
                />

                <div className="auth-form-group">
                  <label className="auth-label">
                    Business Type
                    <span style={{ color: T.orange }}>*</span>
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className={`auth-input ${errors.businessType ? 'error' : ''}`}
                    style={{ cursor: 'pointer', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%236b7a94' d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', paddingRight: '32px' }}
                  >
                    <option value="">Select your business type...</option>
                    <option value="dropshipping">Dropshipping</option>
                    <option value="woocommerce">WooCommerce Store</option>
                    <option value="shopify">Shopify Store</option>
                    <option value="marketplace">Marketplace Seller</option>
                    <option value="saas">SaaS Business</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.businessType && (
                    <div className="auth-error">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="7" y1="3.5" x2="7" y2="8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="7" cy="10.5" r="0.5" fill="currentColor" />
                      </svg>
                      {errors.businessType}
                    </div>
                  )}
                </div>

                <AuthInput
                  label="Password"
                  type="password"
                  placeholder="Min 8 characters with uppercase & numbers"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  required
                />

                <AuthInput
                  label="Confirm Password"
                  type="password"
                  placeholder="Re-enter your password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  required
                />

                <div className="auth-checkbox">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="checkbox-input"
                  />
                  <label htmlFor="terms">
                    I agree to the{' '}
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      Privacy Policy
                    </a>
                  </label>
                </div>
                {errors.terms && (
                  <div className="auth-error" style={{ marginTop: '-1rem', marginBottom: '1rem' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="7" y1="3.5" x2="7" y2="8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="7" cy="10.5" r="0.5" fill="currentColor" />
                    </svg>
                    {errors.terms}
                  </div>
                )}

                <div className="auth-checkbox">
                  <input
                    type="checkbox"
                    id="marketing"
                    checked={agreedToMarketing}
                    onChange={(e) => setAgreedToMarketing(e.target.checked)}
                    className="checkbox-input"
                  />
                  <label htmlFor="marketing">Send me product updates and automation tips</label>
                </div>

                <AuthButton type="submit" isLoading={isLoading} style={{ marginTop: '1.5rem' }}>
                  Create My Free Account
                </AuthButton>
              </form>

              <div className="auth-footer">
                Already have an account?{' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    navigateTo('signin')
                  }}
                >
                  Sign in here
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
