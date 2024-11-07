import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config as dotenvConfig } from 'dotenv';
import { router } from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenvConfig();

const app = express();

// Logging middleware
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

// Security middleware
//app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Serve generated static audio files
app.use('/audios', express.static(path.join(__dirname, 'audios')));

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
app.use('/', router);

// 404 handler
app.use((req, res, next) => {
  console.log(`404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    error: {
      message: 'Route not found',
      path: req.path
    }
  });
});

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
