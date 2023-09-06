import { Request, Response, Router } from 'express';
const router = Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response) {
  res.send('Karohy backend');
});

export default router;
