import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Leaderboard placeholder', rankings: [] });
});

router.get('/top/:n', (req: Request, res: Response) => {
  const n = Number(req.params.n) || 10;
  res.json({ message: `Top ${n} leaderboard entries`, data: [] });
});

export default router;
