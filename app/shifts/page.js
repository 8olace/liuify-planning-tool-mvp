'use client'

import { useState, useEffect } from 'react'
import { shiftsService } from '@/lib/supabase'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

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

  const getStatusVariant = (status) => {
    if (status === 'filled') return 'success'
    if (status === 'open') return 'warning'
    return 'default'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shifts Management</h1>
          <p className="text-gray-600 mt-1">View and manage all shifts</p>
        </div>
        <Button disabled>+ Add New Shift (Coming Soon)</Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : shifts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">No shifts found</h3>
          <p className="text-gray-600 mt-1">Shifts management coming soon</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Required Guards</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shifts.map((shift) => (
                <TableRow key={shift.id}>
                  <TableCell className="font-medium">{shift.location?.name || 'N/A'}</TableCell>
                  <TableCell>{new Date(shift.start_time).toLocaleString()}</TableCell>
                  <TableCell>{new Date(shift.end_time).toLocaleString()}</TableCell>
                  <TableCell>{shift.required_guards}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(shift.status)}>
                      {shift.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
