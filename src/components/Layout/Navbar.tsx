import { useTheme } from '../../contexts/ThemeContext';
import { UserButton, useUser } from '@clerk/clerk-react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isSignedIn } = useUser();

  return (
    <nav className="bg-white dark:bg-dark shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            AUDIOMAX
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-6 w-6 text-yellow-500" />
              ) : (
                <MoonIcon className="h-6 w-6 text-gray-600" />
              )}
            </button>
            
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Link
                to="/sign-in"
                className="bg-primary hover:bg-purple-dark text-white px-4 py-2 rounded-md transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}