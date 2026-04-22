import { T } from '../designTokens.js'

export default function UserProfile({ userName = 'John Doe', userEmail = 'john@example.com', plan = 'Professional' }) {
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <div className="user-info-header">
      <div className="user-avatar">{initials}</div>
      <div className="user-details">
        <h2>{userName}</h2>
        <p>{userEmail}</p>
        <p style={{ color: T.cyan, marginTop: '0.5rem', fontSize: '0.8rem', fontWeight: 500 }}>
          {plan} Plan
        </p>
      </div>
    </div>
  )
}
