import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config as dotenvConfig } from 'dotenv';
import { router } from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenvConfig();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Test Google Cloud credentials on startup
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

const client = new TextToSpeechClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    project_id: process.env.GOOGLE_PROJECT_ID,
  },
});

// Test credentials
client.listVoices({})
  .then(() => console.log('✓ Successfully connected to Google Cloud TTS'))
  .catch(error => console.error('✗ Failed to connect to Google Cloud TTS:', error.message));

// Routes
app.use('/api', router);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});