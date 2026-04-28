import { T } from '../../../design/pages/dashboard/designTokens.js'

export default function RegistrationsTable({ registrations }) {
  if (!registrations || registrations.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: T.muted }}>
        <p>No registrations yet</p>
      </div>
    )
  }

  return (
    <table className="registrations-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Platform</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {registrations.map((reg, idx) => (
          <tr key={idx}>
            <td>{reg.product}</td>
            <td>{reg.platform}</td>
            <td>{reg.date}</td>
            <td>
              <span className={`status-badge ${reg.status.toLowerCase()}`}>
                {reg.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
