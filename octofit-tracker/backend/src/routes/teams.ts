import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'List teams', data: [] });
});

router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Create team (placeholder)', data: req.body });
});

router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: 'Get team', id: req.params.id });
});

router.put('/:id', (req: Request, res: Response) => {
  res.json({ message: 'Update team', id: req.params.id, data: req.body });
});

router.delete('/:id', (req: Request, res: Response) => {
  res.status(204).send();
});

export default router;
