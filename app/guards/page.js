'use client'

import { useState, useEffect } from 'react'
import AddEditGuardModal from '@/components/AddEditGuardModal'
import { guardsService } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AlertCircle, CheckCircle, Trash2, Edit2, Plus } from 'lucide-react'

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Guards Management</h1>
          <p className="text-gray-600 mt-1">Manage all security guards in your system</p>
        </div>
        <Button onClick={() => handleOpenModal()} size="lg">
          <Plus className="w-4 h-4 mr-2" />
          Add New Guard
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert variant="success">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : guards.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">No guards found</h3>
          <p className="text-gray-600 mt-1 mb-4">Get started by adding your first guard</p>
          <Button onClick={() => handleOpenModal()}>
            <Plus className="w-4 h-4 mr-2" />
            Add First Guard
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guards.map((guard) => (
                <TableRow key={guard.id}>
                  <TableCell className="font-medium">{guard.name}</TableCell>
                  <TableCell>{guard.email || '-'}</TableCell>
                  <TableCell>{guard.phone || '-'}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Tier {guard.tier}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={guard.is_available ? 'success' : 'warning'}>
                      {guard.is_available ? 'Available' : 'Unavailable'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenModal(guard)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteGuard(guard.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
