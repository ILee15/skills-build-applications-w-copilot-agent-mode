import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();
const PORT = 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());

// CORS configuration with Codespaces-aware origin support
const allowedOrigins: string[] = ['http://localhost:5173'];
const codespaceName = process.env.CODESPACE_NAME;
if (codespaceName) {
  // Codespaces preview domain for forwarded ports
  allowedOrigins.push(`https://${codespaceName}-8000.preview.app.github.dev`);
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('CORS policy does not allow access from this origin'), false as any);
    },
  })
);

// Mount API routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'OctoFit Tracker backend is running on port 8000.' });
});

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB', MONGODB_URI);
    if (codespaceName) {
      console.log(`Codespace detected: ${codespaceName}`);
      console.log(`API available at https://${codespaceName}-8000.preview.app.github.dev`);
    }
    app.listen(PORT, () => {
      console.log(`Backend running on http://0.0.0.0:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
