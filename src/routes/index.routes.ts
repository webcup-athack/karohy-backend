import { Request, Response, Router } from 'express';
const router = Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response) {
  res.send('Karohy backend API');
});

export default router;
