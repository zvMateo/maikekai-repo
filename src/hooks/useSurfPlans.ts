import { useState, useEffect, useCallback } from 'react'
import { surfPlansService } from '@/services/supabase'
import { SurfPlan } from '@/types'
import { useCache } from '@/lib/cache'

export const useSurfPlans = () => {
  const [plans, setPlans] = useState<SurfPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPlans = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('🔍 Fetching surf plans...')
      const { data, error } = await surfPlansService.getAll()
      
      if (error) {
        console.error('❌ Error fetching surf plans:', error)
        setError(error)
      } else if (data) {
        console.log('✅ Surf plans loaded:', data.length, 'plans')
        setPlans(data)
      } else {
        console.warn('⚠️ No data returned from surfPlansService.getAll()')
        setError('No data available')
      }
    } catch (err) {
      console.error('❌ Exception in fetchPlans:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPlans()
  }, [fetchPlans])

  const getPlansByLevel = async (level: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await surfPlansService.getByLevel(level)
      
      if (error) {
        setError(error)
        return []
      }
      
      return data || []
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return []
    } finally {
      setLoading(false)
    }
  }

  return {
    plans,
    loading,
    error,
    getPlansByLevel,
    refetch: fetchPlans
  }
}

// Hook optimizado con caché
export const useSurfPlansCached = () => {
  return useCache(
    'surf-plans',
    () => surfPlansService.getAll().then(result => result.data || []),
    10 * 60 * 1000 // 10 minutos
  )
}
