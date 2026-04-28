import { useState } from 'react'
import { T } from '../../design/pages/auth/designTokens.js'
import ParticleBackground from '../../components/ParticleBackground.jsx'
import AuthNav from '../../components/pages/auth/AuthNav.jsx'
import AuthInput from '../../components/pages/auth/AuthInput.jsx'
import AuthButton from '../../components/pages/auth/AuthButton.jsx'
import { navigateTo } from '../../utils/navigation.js'
import '../../styles/pages/auth/auth.css'

export default function SignUpPage() {
  const [step, setStep] = useState('signup') // 'signup' | 'onboarding'
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

  const [onboardingData, setOnboardingData] = useState({
    businessNiche: '',
    monthlyAdSpend: '',
    teamSize: '',
    primaryGoal: '',
    phoneNumber: '',
    website: '',
  })

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

  const validateOnboarding = () => {
    const newErrors = {}
    if (!onboardingData.businessNiche.trim()) newErrors.businessNiche = 'Business niche is required'
    if (!onboardingData.monthlyAdSpend) newErrors.monthlyAdSpend = 'Please select your monthly ad spend'
    if (!onboardingData.primaryGoal) newErrors.primaryGoal = 'Please select your primary goal'
    if (!onboardingData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleOnboardingChange = (e) => {
    const { name, value } = e.target
    setOnboardingData(prev => ({ ...prev, [name]: value }))
  }

  const handleFacebookLogin = async () => {
    if (!agreedToTerms) {
      setErrors(prev => ({ ...prev, terms: 'You must agree to the terms and conditions' }))
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      // TODO: Replace with real Facebook OAuth/SDK flow
      await new Promise(resolve => setTimeout(resolve, 1500))
      setStep('onboarding')
    } catch (err) {
      setErrors({ general: 'Facebook login failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
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
      setStep('onboarding')
    } catch (err) {
      setErrors({ general: 'Sign up failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOnboardingSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateOnboarding()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      // TODO: Submit onboarding data to your API
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Onboarding Data:', onboardingData)
      // navigateTo('dashboard')
    } catch (err) {
      setErrors({ general: 'Failed to save your information. Please try again.' })
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
              Connect Your <span>Facebook Page</span> &amp;
              <br />
              Let AI Handle Your Customers
            </h1>
            <p>
              Link your business Facebook page in seconds. Our AI will automatically reply to customer messages 24/7 — no
              manual work, no missed leads.
            </p>

            <div className="auth-benefits">
              <div className="auth-benefit">
                <div className="auth-benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2}>
                    <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5C16.5 22.15 20 17.25 20 12V6l-8-4z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <div className="auth-benefit-text">
                  <h3>Your Page Stays Yours</h3>
                  <p>We only request the permissions needed to read &amp; reply to messages — nothing else.</p>
                </div>
              </div>

              <div className="auth-benefit">
                <div className="auth-benefit-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2}>
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <div className="auth-benefit-text">
                  <h3>Live in Under 5 Minutes</h3>
                  <p>Connect your page, tell us about your business, and your AI agent goes live instantly.</p>
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
                  <h3>AI Trained on Your Business</h3>
                  <p>Responds using your tone, products, and FAQs — feels like a real team member.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="auth-form-container">
            <div className="auth-form-box" style={{ maxWidth: '100%' }}>
              {step === 'signup' && (
                <>
                  <h2>Create Your Account</h2>
                  <p className="auth-form-subtitle">Start your free 30-day trial today</p>

                  <div
                    style={{
                      background: `linear-gradient(160deg, ${T.surface3} 0%, rgba(17, 29, 48, 0.6) 100%)`,
                      border: `1px solid ${T.border}`,
                      borderRadius: '12px',
                      padding: '1rem',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <div style={{ display: 'grid', gap: '0.85rem' }}>
                      {[
                        { step: '1', text: 'Connect your Facebook Page' },
                        { step: '2', text: 'Approve messaging permissions' },
                        { step: '3', text: "We’ll handle the rest" },
                      ].map(({ step: stepNumber, text }) => (
                        <div key={stepNumber} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
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
                            {stepNumber}
                          </div>
                          <span style={{ fontSize: '0.9rem', color: T.text }}>{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="auth-checkbox" style={{ marginBottom: '1.25rem' }}>
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreedToTerms}
                      onChange={(e) => {
                        setAgreedToTerms(e.target.checked)
                        if (e.target.checked) setErrors(prev => ({ ...prev, terms: undefined }))
                      }}
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
                    <div className="auth-error" style={{ marginTop: '-0.75rem', marginBottom: '1rem' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="7" y1="3.5" x2="7" y2="8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="7" cy="10.5" r="0.5" fill="currentColor" />
                      </svg>
                      {errors.terms}
                    </div>
                  )}

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

                  <button type="button" onClick={handleFacebookLogin} disabled={isLoading} className="facebook-login-btn">
                    {isLoading ? (
                      <span>Connecting...</span>
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
                    We request only <strong>pages_messaging</strong> &amp; <strong>pages_show_list</strong> permissions. We never
                    post on your behalf or access your personal account data.
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1.5rem',
                      color: T.textMuted || '#6b7a94',
                      fontSize: '0.875rem',
                    }}
                  >
                    <div style={{ flex: 1, height: '1px', backgroundColor: T.border || '#1a2540' }} />
                    <span>or</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: T.border || '#1a2540' }} />
                  </div>

                  <form onSubmit={handleSubmit}>
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
                        style={{
                          cursor: 'pointer',
                          appearance: 'none',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%236b7a94' d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 10px center',
                          paddingRight: '32px',
                        }}
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
                </>
              )}

              {step === 'onboarding' && (
                <>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: '#22c55e',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span style={{ fontSize: '0.875rem', color: '#22c55e', fontWeight: '500' }}>Connected</span>
                    </div>
                    <h2 style={{ margin: '0 0 0.25rem 0' }}>Tell Us About Your Business</h2>
                    <p className="auth-form-subtitle">Help us customize your automation experience</p>
                  </div>

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

                  <form onSubmit={handleOnboardingSubmit}>
                    <div className="auth-form-group" style={{ marginBottom: '1rem' }}>
                      <label className="auth-label">
                        Business Niche / Industry
                        <span style={{ color: T.orange }}>*</span>
                      </label>
                      <select
                        name="businessNiche"
                        value={onboardingData.businessNiche}
                        onChange={handleOnboardingChange}
                        className={`auth-input ${errors.businessNiche ? 'error' : ''}`}
                        style={{
                          cursor: 'pointer',
                          appearance: 'none',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%236b7a94' d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 10px center',
                          paddingRight: '32px',
                        }}
                      >
                        <option value="">Select your niche...</option>
                        <option value="fashion">Fashion & Apparel</option>
                        <option value="beauty">Beauty & Cosmetics</option>
                        <option value="electronics">Electronics & Gadgets</option>
                        <option value="home">Home & Garden</option>
                        <option value="health">Health & Wellness</option>
                        <option value="food">Food & Beverages</option>
                        <option value="pets">Pet Supplies</option>
                        <option value="toys">Toys & Games</option>
                        <option value="sports">Sports & Outdoors</option>
                        <option value="jewelry">Jewelry & Accessories</option>
                        <option value="digital">Digital Products</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.businessNiche && (
                        <div className="auth-error">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                            <line x1="7" y1="3.5" x2="7" y2="8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <circle cx="7" cy="10.5" r="0.5" fill="currentColor" />
                          </svg>
                          {errors.businessNiche}
                        </div>
                      )}
                    </div>

                    <div className="auth-form-group" style={{ marginBottom: '1rem' }}>
                      <label className="auth-label">
                        Monthly Meta Ad Spend
                        <span style={{ color: T.orange }}>*</span>
                      </label>
                      <select
                        name="monthlyAdSpend"
                        value={onboardingData.monthlyAdSpend}
                        onChange={handleOnboardingChange}
                        className={`auth-input ${errors.monthlyAdSpend ? 'error' : ''}`}
                        style={{
                          cursor: 'pointer',
                          appearance: 'none',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%236b7a94' d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 10px center',
                          paddingRight: '32px',
                        }}
                      >
                        <option value="">Select range...</option>
                        <option value="0-1000">$0 - $1,000</option>
                        <option value="1000-5000">$1,000 - $5,000</option>
                        <option value="5000-10000">$5,000 - $10,000</option>
                        <option value="10000-50000">$10,000 - $50,000</option>
                        <option value="50000+">$50,000+</option>
                      </select>
                      {errors.monthlyAdSpend && (
                        <div className="auth-error">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                            <line x1="7" y1="3.5" x2="7" y2="8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <circle cx="7" cy="10.5" r="0.5" fill="currentColor" />
                          </svg>
                          {errors.monthlyAdSpend}
                        </div>
                      )}
                    </div>

                    <div className="auth-form-group" style={{ marginBottom: '1rem' }}>
                      <label className="auth-label">
                        Primary Automation Goal
                        <span style={{ color: T.orange }}>*</span>
                      </label>
                      <select
                        name="primaryGoal"
                        value={onboardingData.primaryGoal}
                        onChange={handleOnboardingChange}
                        className={`auth-input ${errors.primaryGoal ? 'error' : ''}`}
                        style={{
                          cursor: 'pointer',
                          appearance: 'none',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%236b7a94' d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 10px center',
                          paddingRight: '32px',
                        }}
                      >
                        <option value="">Select your goal...</option>
                        <option value="leads">Capture & Qualify Leads</option>
                        <option value="sales">Drive Direct Sales</option>
                        <option value="support">Customer Support Automation</option>
                        <option value="retargeting">Retargeting & Follow-ups</option>
                        <option value="abandoned">Abandoned Cart Recovery</option>
                        <option value="all">All of the Above</option>
                      </select>
                      {errors.primaryGoal && (
                        <div className="auth-error">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                            <line x1="7" y1="3.5" x2="7" y2="8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <circle cx="7" cy="10.5" r="0.5" fill="currentColor" />
                          </svg>
                          {errors.primaryGoal}
                        </div>
                      )}
                    </div>

                    <div className="auth-form-group" style={{ marginBottom: '1rem' }}>
                      <label className="auth-label">Team Size</label>
                      <select
                        name="teamSize"
                        value={onboardingData.teamSize}
                        onChange={handleOnboardingChange}
                        className="auth-input"
                        style={{
                          cursor: 'pointer',
                          appearance: 'none',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%236b7a94' d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 10px center',
                          paddingRight: '32px',
                        }}
                      >
                        <option value="">Select team size...</option>
                        <option value="solo">Just Me</option>
                        <option value="2-5">2 - 5 people</option>
                        <option value="6-15">6 - 15 people</option>
                        <option value="16-50">16 - 50 people</option>
                        <option value="50+">50+ people</option>
                      </select>
                    </div>

                    <AuthInput
                      label="Phone Number"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      name="phoneNumber"
                      value={onboardingData.phoneNumber}
                      onChange={handleOnboardingChange}
                      error={errors.phoneNumber}
                      required
                    />

                    <AuthInput
                      label={
                        <>
                          Website / Store URL <span style={{ color: T.textMuted, fontWeight: '400' }}>(Optional)</span>
                        </>
                      }
                      type="url"
                      placeholder="https://yourstore.com"
                      name="website"
                      value={onboardingData.website}
                      onChange={handleOnboardingChange}
                    />

                    <AuthButton type="submit" isLoading={isLoading}>
                      Complete Setup & Go to Dashboard
                    </AuthButton>
                  </form>

                  <div className="auth-footer">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setErrors({})
                        setStep('signup')
                      }}
                    >
                      Back to sign up
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
