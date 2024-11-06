import { useUser } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'

interface AdminRouteProps {
  children: React.ReactNode
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user, isLoaded } = useUser()
  const isAdmin = user?.publicMetadata?.role === 'admin'

  if (!isLoaded) {
    return null
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}