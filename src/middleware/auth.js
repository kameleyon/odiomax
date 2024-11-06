import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

export const requireAuth = ClerkExpressRequireAuth({
  // Optional configuration
  onError: (err, req, res) => {
    res.status(401).json({
      error: {
        message: 'Unauthorized access'
      }
    });
  }
});