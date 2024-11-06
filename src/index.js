import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config as dotenvConfig } from 'dotenv';
import { router } from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { config } from './config/index.js';

dotenvConfig();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api', router);

// Error handling
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`AUDIOMAX server running on port ${config.port}`);
});