import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'List activities', data: [] });
});

router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Create activity (placeholder)', data: req.body });
});

router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: 'Get activity', id: req.params.id });
});

router.put('/:id', (req: Request, res: Response) => {
  res.json({ message: 'Update activity', id: req.params.id, data: req.body });
});

router.delete('/:id', (req: Request, res: Response) => {
  res.status(204).send();
});

export default router;
