import { useState, useEffect, useMemo } from 'react'
import ParticleBackground from '../../components/ParticleBackground.jsx'
import { T } from './designTokens.js'
import Nav from './components/Nav.jsx'
import StatCard from './components/StatCard.jsx'
import RegistrationsTable from './components/RegistrationsTable.jsx'
import QuickActions from './components/QuickActions.jsx'
import ActivityFeed from './components/ActivityFeed.jsx'
import UserProfile from './components/UserProfile.jsx'
import './dashboard.css'

function UploadIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  )
}

function CheckCircleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function ClockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function AlertCircleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

function TrendingUpIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 17" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
}

export default function DashboardPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const mockRegistrations = [
    { product: 'Laptop Pro', platform: 'Amazon', date: '2024-04-20', status: 'Active' },
    { product: 'Phone X', platform: 'eBay', date: '2024-04-19', status: 'Pending' },
    { product: 'Tablet Y', platform: 'Shopify', date: '2024-04-18', status: 'Completed' },
    { product: 'Camera Z', platform: 'Amazon', date: '2024-04-17', status: 'Active' },
  ]

  return (
    <>
      <ParticleBackground />
      <Nav />

      <div className="dashboard-container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* User Profile Header */}
        <UserProfile userName="Alex Johnson" userEmail="alex.johnson@example.com" plan="Professional" />

        {/* Dashboard Header */}
        <div className="dashboard-header">
          <h1 style={{ fontSize: '1.75rem', margin: 0, color: T.text }}>Your Dashboard</h1>
          <p style={{ margin: '0.5rem 0 0 0', color: T.muted, fontSize: '0.875rem' }}>
            Welcome back! Here's your registration overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="dashboard-stats-grid">
          <StatCard
            label="Total Registrations"
            value="24"
            change="12% increase"
            changeType="positive"
            icon={<TrendingUpIcon />}
            color={T.cyan}
          />
          <StatCard
            label="Active"
            value="18"
            change="2 new this week"
            changeType="positive"
            icon={<CheckCircleIcon />}
            color={T.green}
          />
          <StatCard
            label="Pending"
            value="4"
            change="1 awaiting approval"
            changeType="negative"
            icon={<ClockIcon />}
            color={T.orange}
          />
          <StatCard
            label="Failed"
            value="2"
            change="1 requires action"
            changeType="negative"
            icon={<AlertCircleIcon />}
            color={T.error}
          />
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-main-grid">
          {/* Registrations List */}
          <div className="dashboard-card">
            <div className="dashboard-section-title">
              <svg
                className="dashboard-section-title-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke={T.cyan}
                strokeWidth="2"
              >
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Registrations
            </div>
            <RegistrationsTable registrations={mockRegistrations} />
          </div>

          {/* Sidebar with Quick Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Quick Actions */}
            <div className="dashboard-card">
              <div className="dashboard-section-title">
                <svg
                  className="dashboard-section-title-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={T.purple}
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="1" />
                  <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m2.12 2.12l4.24 4.24M1 12h6m6 0h6m-16.78 7.78l4.24-4.24m2.12-2.12l4.24-4.24" />
                </svg>
                Quick Actions
              </div>
              <QuickActions />
            </div>

            {/* Subscription Status */}
            <div className="dashboard-card">
              <div className="dashboard-section-title">
                <svg
                  className="dashboard-section-title-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={T.orange}
                  strokeWidth="2"
                >
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                Subscription Status
              </div>
              <div style={{ padding: '0.75rem 0' }}>
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontSize: '0.75rem', color: T.muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                    Current Plan
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 600, color: T.cyan }}>Professional</div>
                </div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontSize: '0.75rem', color: T.muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                    Registrations Left
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 600, color: T.green }}>
                    476 / 500
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: T.muted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                    Renewal Date
                  </div>
                  <div style={{ fontSize: '0.875rem', color: T.text }}>May 22, 2024</div>
                </div>
                <button
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: `linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(155, 100, 255, 0.1))`,
                    border: `1px solid rgba(0, 212, 255, 0.4)`,
                    borderRadius: 8,
                    color: T.cyan,
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = `linear-gradient(135deg, rgba(0, 212, 255, 0.25), rgba(155, 100, 255, 0.15))`
                    e.target.style.borderColor = 'rgba(0, 212, 255, 0.6)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = `linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(155, 100, 255, 0.1))`
                    e.target.style.borderColor = 'rgba(0, 212, 255, 0.4)'
                  }}
                >
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="dashboard-card">
          <div className="dashboard-section-title">
            <svg
              className="dashboard-section-title-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke={T.green}
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
            Recent Activity
          </div>
          <ActivityFeed />
        </div>
      </div>
    </>
  )
}
