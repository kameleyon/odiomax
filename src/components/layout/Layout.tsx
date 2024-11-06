import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'
import { useUser } from '@clerk/clerk-react'

export function Layout() {
  const { isSignedIn } = useUser()

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f0035] to-[#1859c7] dark:from-[#0f0035] dark:to-[#0e7584] text-white">
      <Navbar />
      {isSignedIn && <Sidebar />}
      <main className={`flex-grow container mx-auto px-4 py-8 ${isSignedIn ? 'ml-16' : ''}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}