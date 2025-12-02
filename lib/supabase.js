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

// Locations operations
export const locationsService = {
  // Read all locations
  async getAll() {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error
    return data
  },
}

// Shifts operations
export const shiftsService = {
  // Read all shifts
  async getAll() {
    const { data, error } = await supabase
      .from('shifts')
      .select('*, location:locations(name)')
      .order('start_time', { ascending: true })

    if (error) throw error
    return data
  },
}
