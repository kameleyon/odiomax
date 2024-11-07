import express from 'express';
import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenvConfig();

const app = express();
app.use(cors());
app.use(express.json());

// Audio files directory
const audiosDir = path.join(__dirname, 'audios');
if (!fs.existsSync(audiosDir)) {
  fs.mkdirSync(audiosDir, { recursive: true });
}

// Serve audio files
app.use('/audios', express.static(audiosDir, {
  setHeaders: (res) => {
    res.set('Content-Type', 'audio/mpeg');
  }
}));

// API routes
app.use('/api', (await import('./routes/index.js')).router);

// Root route - list available audio files
app.get('/', (req, res) => {
  const files = fs.readdirSync(audiosDir)
    .filter(file => file.endsWith('.mp3'))
    .map(file => `/audios/${file}`);

  res.json({
    status: 'Server is running',
    audioFiles: files
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
