import { T } from '../designTokens.js'

export default function StatCard({ label, value, change, changeType, icon, color = T.cyan }) {
  return (
    <div className="stat-card">
      <div className="stat-label">
        {icon && (
          <svg
            className="stat-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {icon}
          </svg>
        )}
        {label}
      </div>
      <div className="stat-value" style={{ color }}>
        {value}
      </div>
      {change && (
        <div className={`stat-change ${changeType === 'positive' ? 'positive' : 'negative'}`}>
          {changeType === 'positive' ? '↑' : '↓'} {change}
        </div>
      )}
    </div>
  )
}
