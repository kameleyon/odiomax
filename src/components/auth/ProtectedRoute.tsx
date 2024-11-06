import { useUser } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) {
    return null
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}