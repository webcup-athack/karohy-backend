"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/authentication.js
var express_1 = require("express");
var router = (0, express_1.Router)();
var authentification_controller_1 = require("../controller/authentification.controller");
/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});
// Endpoint pour l'authentification (login)
router.post('/login', authentification_controller_1.login);
// Endpoint pour l'inscription (inscription)
router.post('/register', authentification_controller_1.inscription);
exports.default = router;
