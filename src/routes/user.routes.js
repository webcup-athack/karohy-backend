// routes/authentication.js
const express = require('express');
const router = express.Router();
const authenticationController = require('../controller/authentification.controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Endpoint pour l'authentification (login)
router.post('/login', authenticationController.login);

// Endpoint pour l'inscription (inscription)
router.post('/register', authenticationController.inscription);

module.exports = router;