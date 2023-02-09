import express, { Response, Router } from 'express';

const router: Router = express.Router();

router.get('/first', (_, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'First route message!'
  });
});

export const firstRoutes = router;