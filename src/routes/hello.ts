import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('👋 Hello from TypeScript route!');
});

export default router;
