import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'List users', data: [] });
});

router.post('/', (req: Request, res: Response) => {
  const payload = req.body;
  res.status(201).json({ message: 'Create user (placeholder)', data: payload });
});

router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: 'Get user', id: req.params.id });
});

router.put('/:id', (req: Request, res: Response) => {
  res.json({ message: 'Update user', id: req.params.id, data: req.body });
});

router.delete('/:id', (req: Request, res: Response) => {
  res.status(204).send();
});

export default router;
