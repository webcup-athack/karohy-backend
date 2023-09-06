// routes/authentication.js
import { Router } from 'express';
const router = Router();
import { loginAdmin } from '../controller/authentification.controller';

// Endpoint pour l'authentification (login)
router.post('/login', loginAdmin);

export default router;
