// Sistema de caché simple para optimizar rendimiento
interface CacheItem<T> {
  data: T
  timestamp: number
  ttl: number
}

class Cache {
  private cache = new Map<string, CacheItem<any>>()

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key)
    
    if (!item) return null
    
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return null
    }
    
    return item.data
  }

  has(key: string): boolean {
    const item = this.cache.get(key)
    return item ? Date.now() - item.timestamp <= item.ttl : false
  }

  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  size(): number {
    return this.cache.size
  }
}

export const cache = new Cache()

// Hook para usar caché en React
import { useState, useEffect, useCallback } from 'react'

export function useCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 5 * 60 * 1000
): { data: T | null; loading: boolean; error: Error | null; refetch: () => Promise<void> } {
  const [data, setData] = useState<T | null>(cache.get<T>(key))
  const [loading, setLoading] = useState(!cache.has(key))
  const [error, setError] = useState<Error | null>(null)

  const refetch = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await fetcher()
      cache.set(key, result, ttl)
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setLoading(false)
    }
  }, [key, fetcher, ttl])

  useEffect(() => {
    if (!cache.has(key)) {
      refetch()
    }
  }, [key, refetch])

  return { data, loading, error, refetch }
}

// Función para limpiar caché expirado
export function cleanupExpiredCache(): void {
  const now = Date.now()
  const entries = Array.from(cache['cache'].entries())
  for (const [key, item] of entries) {
    if (now - item.timestamp > item.ttl) {
      cache.delete(key)
    }
  }
}

// Limpiar caché cada 10 minutos
if (typeof window !== 'undefined') {
  setInterval(cleanupExpiredCache, 10 * 60 * 1000)
}
