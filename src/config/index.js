export const config = {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || 'development',
  clerkPublishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173'
};