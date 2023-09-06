import { Request, Response, Router } from 'express';
const router = Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response) {
  res.render('index', { title: ' Karohy' });
});

export default router;
