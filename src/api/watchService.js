import { supabase } from '../services/supabase.js'

export async function getWatches() {
  try {
    const { data, error } = await supabase
      .from('watches')
      .select('*')
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching watches:', error)
    return []
  }
}

export async function getSingleWatch(id) {
  try {
    const { data, error } = await supabase
      .from('watches')
      .select('*')
      .eq('id', id)
      .single()
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching watch:', error)
    return null
  }
}

export async function searchWatches(searchTerm) {
  try {
    const { data, error } = await supabase
      .from('watches')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%,model.ilike.%${searchTerm}%`)
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error searching watches:', error)
    return []
  }
}

export async function filterWatches(price, rating, model) {
  try {
    let query = supabase.from('watches').select('*')

    if (price) {
      query = query.lte('price', price)
    }
    if (rating) {
      query = query.gte('rating', rating)
    }
    if (model) {
      query = query.ilike('model', `%${model}%`)
    }

    const { data, error } = await query
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error filtering watches:', error)
    return []
  }
}

export async function addWatch(watchData) {
  try {
    const { data, error } = await supabase
      .from('watches')
      .insert([watchData])
      .select()
    if (error) throw error
    return { success: true, data, error: null }
  } catch (error) {
    console.error('Error adding watch:', error)
    return { success: false, data: null, error: error.message || 'Failed to add watch' }
  }
}