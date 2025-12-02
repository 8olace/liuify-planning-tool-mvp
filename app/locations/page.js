'use client'

import { useState, useEffect } from 'react'
import { locationsService } from '@/lib/supabase'

export default function LocationsPage() {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await locationsService.getAll()
      setLocations(data)
    } catch (err) {
      setError(err.message || 'Failed to load locations')
      console.error('Error fetching locations:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1>Locations Management</h1>
        <button className="btn-primary" disabled>
          + Add New Location (Coming Soon)
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading locations...</p>
        </div>
      ) : locations.length === 0 ? (
        <div className="empty-state" style={{ background: 'white', borderRadius: '8px', margin: '20px 0' }}>
          <h3>No locations found</h3>
          <p>Locations management coming soon</p>
        </div>
      ) : (
        <table className="guards-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr key={location.id}>
                <td>{location.name}</td>
                <td>{location.address || '-'}</td>
                <td>{new Date(location.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
