import { SignUp as ClerkSignUp } from '@clerk/clerk-react'
import { useUser } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'

export function SignUp() {
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) {
    return null
  }

  if (isSignedIn) {
    return <Navigate to="/studio" />
  }

  return (
    <div className="flex min-h-[calc(100vh-16rem)] gap-12 items-center">
      {/* Hero Section */}
      <div className="flex-1">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text animate-gradient">
          Join AUDIOMAX Today
        </h1>
        <p className="text-xl text-white/80 max-w-xl">
          Create stunning audio content with AI-powered voice technology. Perfect for content creators, educators, and storytellers.
        </p>
      </div>

      {/* Auth Section */}
      <div className="flex-1 max-w-md">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
          <ClerkSignUp 
            routing="hash"
            path="/sign-up"
            signInUrl="/"
            afterSignUpUrl="/studio"
            redirectUrl="/studio"
            appearance={{
              elements: {
                formButtonPrimary: 'bg-primary hover:bg-primary/80',
                card: 'bg-transparent',
                headerTitle: 'text-white',
                headerSubtitle: 'text-white/80',
                socialButtonsBlockButton: 'bg-white/10 border-white/20 text-white hover:bg-white/20',
                dividerLine: 'bg-white/20',
                dividerText: 'text-white/60',
                formFieldLabel: 'text-white/80',
                formFieldInput: 'bg-white/10 border-white/20 text-white',
                footerActionLink: 'text-primary hover:text-primary/80',
                footerAction: 'flex items-center justify-center mt-4'
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}