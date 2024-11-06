import { useState, useEffect } from 'react'
import { checkGoogleAuth } from '../../services/auth.service'
import { AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react'

export function GoogleAuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const checkAuth = async () => {
    setIsLoading(true)
    try {
      const authenticated = await checkGoogleAuth()
      setIsAuthenticated(authenticated)
    } catch (error) {
      setIsAuthenticated(false)
      console.error('Auth check failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-white/60">
        <RefreshCw className="w-4 h-4 animate-spin" />
        <span>Checking Google Cloud authentication...</span>
      </div>
    )
  }

  return (
    <div className={`p-4 rounded-lg border ${
      isAuthenticated 
        ? 'bg-green-500/10 border-green-500/20' 
        : 'bg-red-500/10 border-red-500/20'
    }`}>
      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <>
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span className="text-green-400">Connected to Google Cloud TTS</span>
          </>
        ) : (
          <>
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-400">Not connected to Google Cloud TTS</span>
          </>
        )}
      </div>
      
      {!isAuthenticated && (
        <button
          onClick={checkAuth}
          className="mt-2 px-3 py-1 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          Retry Connection
        </button>
      )}
    </div>
  )
}