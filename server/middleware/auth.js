import { TextToSpeechClient } from '@google-cloud/text-to-speech';

const client = new TextToSpeechClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    project_id: process.env.GOOGLE_PROJECT_ID,
  },
});

export async function validateGoogleCredentials(req, res, next) {
  try {
    // Test the credentials by listing voices
    await client.listVoices({});
    next();
  } catch (error) {
    console.error('Google Cloud Authentication Error:', error);
    res.status(500).json({
      error: {
        message: 'Failed to authenticate with Google Cloud',
        details: error.message
      }
    });
  }
}