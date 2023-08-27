// routes/authentication.js
const express = require('express');
const router = express.Router();
const authenticationController = require('../controller/authentification.controller');

// Endpoint pour l'authentification (login)
router.post('/login', authenticationController.loginAdmin);

module.exports = router;