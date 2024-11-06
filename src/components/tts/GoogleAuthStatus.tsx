import { useState, useEffect } from 'react';
import { checkGoogleAuth } from '../../services/auth.service';

export function GoogleAuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuth = async () => {
    try {
      const response = await checkGoogleAuth();
      setIsAuthenticated(response.authenticated);
      setError(null);
    } catch (err) {
      setIsAuthenticated(false);
      setError(err instanceof Error ? err.message : 'Authentication check failed');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return <div className="text-white/60">Checking Google Cloud TTS connection...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className={isAuthenticated ? 'text-green-500' : 'text-red-500'}>
      {isAuthenticated ? '✓ Connected to Google Cloud TTS' : '✗ Not connected to Google Cloud TTS'}
    </div>
  );
}