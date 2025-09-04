'use client'

import { useEffect, useState } from 'react'

const DebugInfo = () => {
  const [envVars, setEnvVars] = useState<Record<string, string>>({})

  useEffect(() => {
    setEnvVars({
      'NEXT_PUBLIC_SUPABASE_URL': process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET',
      'NODE_ENV': process.env.NODE_ENV || 'NOT SET'
    })
  }, [])

  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed top-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">🔍 Debug Info</h3>
      {Object.entries(envVars).map(([key, value]) => (
        <div key={key} className="mb-1">
          <span className="text-gray-300">{key}:</span>
          <span className={`ml-2 ${value === 'NOT SET' ? 'text-red-400' : 'text-green-400'}`}>
            {value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default DebugInfo

