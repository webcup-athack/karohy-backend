"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
/* GET home page. */
router.get('/', function (req, res) {
    res.send('Karohy backend | |');
});
exports.default = router;
