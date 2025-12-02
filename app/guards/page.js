'use client'

import { useState, useEffect } from 'react'
import AddEditGuardModal from '@/components/AddEditGuardModal'
import { guardsService } from '@/lib/supabase'

export default function GuardsPage() {
  const [guards, setGuards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedGuard, setSelectedGuard] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchGuards()
  }, [])

  const fetchGuards = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await guardsService.getAll()
      setGuards(data)
    } catch (err) {
      setError(err.message || 'Failed to load guards')
      console.error('Error fetching guards:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (guard = null) => {
    setSelectedGuard(guard)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedGuard(null)
  }

  const handleSaveGuard = async (formData) => {
    try {
      setIsSaving(true)
      setError(null)

      if (selectedGuard) {
        // Update existing guard
        await guardsService.update(selectedGuard.id, formData)
        setSuccess('Guard updated successfully')
      } else {
        // Create new guard
        await guardsService.create(formData)
        setSuccess('Guard added successfully')
      }

      // Refresh the list
      await fetchGuards()
      handleCloseModal()

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err.message || 'Failed to save guard')
      console.error('Error saving guard:', err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteGuard = async (id) => {
    if (!confirm('Are you sure you want to delete this guard?')) {
      return
    }

    try {
      setError(null)
      await guardsService.delete(id)
      setSuccess('Guard deleted successfully')
      await fetchGuards()

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err.message || 'Failed to delete guard')
      console.error('Error deleting guard:', err)
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1>Guards Management</h1>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          + Add New Guard
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading guards...</p>
        </div>
      ) : guards.length === 0 ? (
        <div className="empty-state" style={{ background: 'white', borderRadius: '8px', margin: '20px 0' }}>
          <h3>No guards found</h3>
          <p>Get started by adding your first guard</p>
          <button className="btn-primary" onClick={() => handleOpenModal()}>
            Add First Guard
          </button>
        </div>
      ) : (
        <table className="guards-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Tier</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {guards.map((guard) => (
              <tr key={guard.id}>
                <td>{guard.name}</td>
                <td>{guard.email || '-'}</td>
                <td>{guard.phone || '-'}</td>
                <td>Tier {guard.tier}</td>
                <td>
                  <span className={guard.is_available ? 'badge badge-available' : 'badge badge-unavailable'}>
                    {guard.is_available ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td>
                  <div className="actions">
                    <button
                      className="btn-primary"
                      onClick={() => handleOpenModal(guard)}
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => handleDeleteGuard(guard.id)}
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <AddEditGuardModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        guard={selectedGuard}
        onSave={handleSaveGuard}
        isLoading={isSaving}
      />
    </div>
  )
}
