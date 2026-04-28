import { T } from '../../../design/pages/dashboard/designTokens.js'

export default function ActivityFeed() {
  const activities = [
    { title: 'Product "Laptop Pro" registered on Amazon', time: '2 hours ago', type: 'success' },
    { title: 'Bulk import of 15 products completed', time: '5 hours ago', type: 'success' },
    { title: 'Registration pending for "Phone X"', time: '1 day ago', type: 'pending' },
    { title: 'Plan upgraded to Professional', time: '3 days ago', type: 'info' },
    { title: 'Registration failed for "Tablet Y"', time: '1 week ago', type: 'error' },
  ]

  const getDotColor = (type) => {
    switch (type) {
      case 'success':
        return T.green
      case 'pending':
        return T.orange
      case 'error':
        return T.error
      default:
        return T.cyan
    }
  }

  return (
    <div>
      {activities.map((activity, idx) => (
        <div key={idx} className="activity-item">
          <div className="activity-dot" style={{ background: getDotColor(activity.type) }} />
          <div className="activity-content">
            <div className="activity-title">{activity.title}</div>
            <div className="activity-time">{activity.time}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
