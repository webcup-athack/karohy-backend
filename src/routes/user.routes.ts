// routes/authentication.js
import { Router } from 'express';
const router = Router();
import { login, inscription } from '../controller/authentification.controller';

/* GET users listing. */
router.get('/', function (req, res) {
  res.send('respond with a resource');
});

// Endpoint pour l'authentification (login)
router.post('/login', login);

// Endpoint pour l'inscription (inscription)
router.post('/register', inscription);

export default router;
