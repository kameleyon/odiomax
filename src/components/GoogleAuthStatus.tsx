import { useEffect, useState } from 'react';
import { checkGoogleAuth, GoogleAuthResponse } from '../services/auth.service';

export function GoogleAuthStatus() {
  const [authStatus, setAuthStatus] = useState<GoogleAuthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const status = await checkGoogleAuth();
        setAuthStatus(status);
      } catch (error) {
        console.error('Failed to check auth status:', error);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-white/60">
        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span>Checking Google Cloud connection...</span>
      </div>
    );
  }

  if (!authStatus?.authenticated) {
    return (
      <div className="text-red-400">
        ✗ Not connected to Google Cloud TTS
        {authStatus?.error && (
          <p className="text-sm text-red-400/60 mt-1">
            {authStatus.error.message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="text-green-400">
      ✓ Connected to Google Cloud TTS
      {authStatus.voicesAvailable && (
        <p className="text-sm text-green-400/60 mt-1">
          {authStatus.voicesAvailable} voices available
        </p>
      )}
    </div>
  );
}