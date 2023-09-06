"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/authentication.js
var express_1 = require("express");
var router = (0, express_1.Router)();
var authentification_controller_1 = require("../controller/authentification.controller");
// Endpoint pour l'authentification (login)
router.post('/login', authentification_controller_1.loginAdmin);
exports.default = router;
