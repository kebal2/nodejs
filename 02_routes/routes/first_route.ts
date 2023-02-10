import { Response, Router } from 'express';

const router: Router = Router();

export const firstRoutes = router;

router.get('/first', (_, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'First route message!'
  });
});
