import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Guards operations
export const guardsService = {
  // Read all guards
  async getAll() {
    const { data, error } = await supabase
      .from('guards')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Read single guard
  async getById(id) {
    const { data, error } = await supabase
      .from('guards')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Create new guard
  async create(guardData) {
    const { data, error } = await supabase
      .from('guards')
      .insert([guardData])
      .select()

    if (error) throw error
    return data[0]
  },

  // Update guard
  async update(id, guardData) {
    const { data, error } = await supabase
      .from('guards')
      .update(guardData)
      .eq('id', id)
      .select()

    if (error) throw error
    return data[0]
  },

  // Delete guard
  async delete(id) {
    const { error } = await supabase
      .from('guards')
      .delete()
      .eq('id', id)

    if (error) throw error
  },
}

// Clients operations
export const clientsService = {
  // Read all clients
  async getAll() {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error
    return data
  },

  // Read single client
  async getById(id) {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Create new client
  async create(clientData) {
    const { data, error } = await supabase
      .from('clients')
      .insert([clientData])
      .select()

    if (error) throw error
    return data[0]
  },

  // Update client
  async update(id, clientData) {
    const { data, error } = await supabase
      .from('clients')
      .update(clientData)
      .eq('id', id)
      .select()

    if (error) throw error
    return data[0]
  },

  // Delete client
  async delete(id) {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id)

    if (error) throw error
  },
}

// Locations operations
export const locationsService = {
  // Read all locations with client details
  async getAll() {
    const { data, error } = await supabase
      .from('locations')
      .select('*, client:clients(name)')
      .order('name', { ascending: true })

    if (error) throw error
    return data
  },

  // Read single location
  async getById(id) {
    const { data, error } = await supabase
      .from('locations')
      .select('*, client:clients(name)')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Read locations by client
  async getByClient(clientId) {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('client_id', clientId)
      .order('name', { ascending: true })

    if (error) throw error
    return data
  },

  // Create new location
  async create(locationData) {
    const { data, error } = await supabase
      .from('locations')
      .insert([locationData])
      .select()

    if (error) throw error
    return data[0]
  },

  // Update location
  async update(id, locationData) {
    const { data, error } = await supabase
      .from('locations')
      .update(locationData)
      .eq('id', id)
      .select()

    if (error) throw error
    return data[0]
  },

  // Delete location
  async delete(id) {
    const { error } = await supabase
      .from('locations')
      .delete()
      .eq('id', id)

    if (error) throw error
  },
}

// Shifts operations
export const shiftsService = {
  // Read all shifts with location details
  async getAll() {
    const { data, error } = await supabase
      .from('shifts')
      .select('*, location:locations(name, address)')
      .order('starts_at', { ascending: true })

    if (error) throw error
    return data
  },

  // Read single shift
  async getById(id) {
    const { data, error } = await supabase
      .from('shifts')
      .select('*, location:locations(name, address)')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  // Read shifts by location
  async getByLocation(locationId) {
    const { data, error } = await supabase
      .from('shifts')
      .select('*')
      .eq('location_id', locationId)
      .order('starts_at', { ascending: true })

    if (error) throw error
    return data
  },

  // Read open shifts
  async getOpen() {
    const { data, error } = await supabase
      .from('shifts')
      .select('*, location:locations(name, address)')
      .eq('status', 'open')
      .order('starts_at', { ascending: true })

    if (error) throw error
    return data
  },

  // Create new shift
  async create(shiftData) {
    const { data, error } = await supabase
      .from('shifts')
      .insert([shiftData])
      .select()

    if (error) throw error
    return data[0]
  },

  // Update shift
  async update(id, shiftData) {
    const { data, error } = await supabase
      .from('shifts')
      .update(shiftData)
      .eq('id', id)
      .select()

    if (error) throw error
    return data[0]
  },

  // Delete shift
  async delete(id) {
    const { error } = await supabase
      .from('shifts')
      .delete()
      .eq('id', id)

    if (error) throw error
  },
}

// Guard Availability operations
export const guardAvailabilityService = {
  // Read availability for a guard
  async getByGuard(guardId) {
    const { data, error } = await supabase
      .from('guard_availability')
      .select('*')
      .eq('guard_id', guardId)
      .order('available_from', { ascending: true })

    if (error) throw error
    return data
  },

  // Create availability
  async create(availabilityData) {
    const { data, error } = await supabase
      .from('guard_availability')
      .insert([availabilityData])
      .select()

    if (error) throw error
    return data[0]
  },

  // Update availability
  async update(id, availabilityData) {
    const { data, error } = await supabase
      .from('guard_availability')
      .update(availabilityData)
      .eq('id', id)
      .select()

    if (error) throw error
    return data[0]
  },

  // Delete availability
  async delete(id) {
    const { error } = await supabase
      .from('guard_availability')
      .delete()
      .eq('id', id)

    if (error) throw error
  },
}

// Assignments operations
export const assignmentsService = {
  // Read all assignments
  async getAll() {
    const { data, error } = await supabase
      .from('assignments')
      .select('*, shift:shifts(starts_at, ends_at, location:locations(name)), guard:guards(full_name, email)')
      .order('offered_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Read assignments for a shift
  async getByShift(shiftId) {
    const { data, error } = await supabase
      .from('assignments')
      .select('*, guard:guards(full_name, email, phone)')
      .eq('shift_id', shiftId)
      .order('offered_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Read assignments for a guard
  async getByGuard(guardId) {
    const { data, error } = await supabase
      .from('assignments')
      .select('*, shift:shifts(starts_at, ends_at, location:locations(name))')
      .eq('guard_id', guardId)
      .order('offered_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Read pending assignments (offered status)
  async getPending() {
    const { data, error } = await supabase
      .from('assignments')
      .select('*, shift:shifts(starts_at, ends_at), guard:guards(full_name)')
      .eq('status', 'offered')
      .order('offered_at', { ascending: false })

    if (error) throw error
    return data
  },

  // Create assignment (offer)
  async create(assignmentData) {
    const { data, error } = await supabase
      .from('assignments')
      .insert([assignmentData])
      .select()

    if (error) throw error
    return data[0]
  },

  // Update assignment status
  async updateStatus(id, status, updateData = {}) {
    const timestamp = {
      'accepted': 'accepted_at',
      'declined': 'declined_at',
      'expired': 'expired_at'
    }[status]

    const updates = { status, ...updateData }
    if (timestamp) {
      updates[timestamp] = new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('assignments')
      .update(updates)
      .eq('id', id)
      .select()

    if (error) throw error
    return data[0]
  },

  // Delete assignment
  async delete(id) {
    const { error } = await supabase
      .from('assignments')
      .delete()
      .eq('id', id)

    if (error) throw error
  },
}
