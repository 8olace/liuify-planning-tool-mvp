'use client'

import { useState, useEffect } from 'react'
import { shiftsService, locationsService } from '@/lib/supabase'

export default function ShiftsPage() {
  const [shifts, setShifts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchShifts()
  }, [])

  const fetchShifts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await shiftsService.getAll()
      setShifts(data)
    } catch (err) {
      setError(err.message || 'Failed to load shifts')
      console.error('Error fetching shifts:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadgeClass = (status) => {
    if (status === 'filled') return 'badge-available'
    if (status === 'open') return 'badge-unavailable'
    return ''
  }

  return (
    <div>
      <div className="page-header">
        <h1>Shifts Management</h1>
        <button className="btn-primary" disabled>
          + Add New Shift (Coming Soon)
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading shifts...</p>
        </div>
      ) : shifts.length === 0 ? (
        <div className="empty-state" style={{ background: 'white', borderRadius: '8px', margin: '20px 0' }}>
          <h3>No shifts found</h3>
          <p>Shifts management coming soon</p>
        </div>
      ) : (
        <table className="guards-table">
          <thead>
            <tr>
              <th>Location</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Required Guards</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => (
              <tr key={shift.id}>
                <td>{shift.location?.name || 'N/A'}</td>
                <td>{new Date(shift.start_time).toLocaleString()}</td>
                <td>{new Date(shift.end_time).toLocaleString()}</td>
                <td>{shift.required_guards}</td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(shift.status)}`}>
                    {shift.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
