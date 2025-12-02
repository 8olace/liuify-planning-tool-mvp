'use client'

import { useState, useEffect } from 'react'

export default function AddEditGuardModal({ isOpen, onClose, guard, onSave, isLoading }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tier: 1,
    is_available: true,
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (guard) {
      setFormData(guard)
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        tier: 1,
        is_available: true,
      })
    }
    setErrors({})
  }, [guard, isOpen])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (formData.phone && !/^\+?[\d\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone format'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    await onSave(formData)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : name === 'tier' ? parseInt(value) : value,
    }))

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{guard ? 'Edit Guard' : 'Add New Guard'}</h2>
          <button className="modal-close" onClick={onClose} disabled={isLoading}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter guard name"
                disabled={isLoading}
              />
              {errors.name && <span style={{ color: '#e74c3c', fontSize: '12px' }}>{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                disabled={isLoading}
              />
              {errors.email && <span style={{ color: '#e74c3c', fontSize: '12px' }}>{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                disabled={isLoading}
              />
              {errors.phone && <span style={{ color: '#e74c3c', fontSize: '12px' }}>{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="tier">Tier</label>
              <select
                id="tier"
                name="tier"
                value={formData.tier}
                onChange={handleChange}
                disabled={isLoading}
              >
                <option value={1}>Tier 1 - Basic</option>
                <option value={2}>Tier 2 - Advanced</option>
                <option value={3}>Tier 3 - Expert</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="is_available"
                  checked={formData.is_available}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {' '}Available for shifts
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Guard'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
