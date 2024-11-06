import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useClerk, useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import {
  Wand2,
  FolderOpen,
  Mic,
  Settings,
  Sun,
  Moon,
  HelpCircle,
  Bell,
  Info,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Headphones,
  Shield
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { signOut } = useClerk()
  const navigate = useNavigate()
  const { user } = useUser()
  
  const isAdmin = user?.publicMetadata?.role === 'admin'

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const menuItems = [
    { icon: Wand2, label: 'Studio', path: '/studio' },
    { icon: FolderOpen, label: 'My Files', path: '/files' },
    { icon: Mic, label: 'My Voices', path: '/voice-cloning' },
    { icon: Headphones, label: 'TTS Test', path: '/tts-test' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: HelpCircle, label: 'Support', path: '/help' },
    { icon: Bell, label: 'Updates', path: '/notifications' },
    { icon: Info, label: 'About Us', path: '/about' },
    ...(isAdmin ? [{ icon: Shield, label: 'Admin', path: '/admin' }] : [])
  ]

  return (
    <div
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-20 bg-[#0f0035]/50 backdrop-blur-sm border-r border-white/10 transition-all duration-300 ${
        isExpanded ? 'w-52' : 'w-16'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <button
        className="absolute -right-3 top-6 bg-primary rounded-full p-1.5 text-white"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>

      <div className="py-4 flex flex-col h-full">
        <nav className="flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="flex items-center px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <item.icon className="w-6 h-6" />
                  {isExpanded && (
                    <span className="ml-4">{item.label}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/10 pt-4 space-y-2">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
            {isExpanded && (
              <span className="ml-4"> Theme</span>
            )}
          </button>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-6 h-6" />
            {isExpanded && (
              <span className="ml-4">Logout</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}