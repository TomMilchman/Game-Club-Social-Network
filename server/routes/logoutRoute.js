"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var server_1 = require("../server");
router.use(bodyParser.json()); // Parse JSON request bodies
router.use(cookieParser());
router.post("/", function (req, res) {
    try {
        var tempPass = req.cookies.tempPass;
        var timeToLive = req.cookies.timeToLive;
        var username = server_1.default[tempPass];
        delete server_1.default[tempPass];
        res.cookie("tempPass", tempPass, {
            maxAge: -1,
            httpOnly: true,
            secure: true,
        });
        res.cookie("timeToLive", timeToLive, {
            maxAge: -1,
            httpOnly: true,
            secure: true,
        });
        res
            .status(200)
            .json({ message: "User ".concat(username, " successfully logged out") });
    }
    catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: error });
    }
});
exports.default = router;
//# sourceMappingURL=logoutRoute.js.map