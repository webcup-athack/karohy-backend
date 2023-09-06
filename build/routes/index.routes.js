"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: ' Karohy' });
});
exports.default = router;
