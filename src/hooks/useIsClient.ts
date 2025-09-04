'use client'

import { useState, useEffect } from 'react'

/**
 * Hook para detectar si el componente está renderizando en el cliente
 * Útil para evitar problemas de hidratación con animaciones
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}
