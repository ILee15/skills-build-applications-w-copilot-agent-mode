import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit-tracker';

app.use(express.json());

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
    app.listen(PORT, () => {
      console.log(`Backend running on http://0.0.0.0:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
