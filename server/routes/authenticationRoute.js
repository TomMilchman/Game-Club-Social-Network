"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var server_1 = require("../server");
router.use(bodyParser.json()); // Parse JSON request bodies
router.use(cookieParser());
router.get("/", function (req, res) {
    var tempPass = req.cookies.tempPass;
    var maxAge = req.cookies.timeToLive;
    try {
        if (tempPass !== undefined) {
            var username = server_1.default.get(tempPass);
            if (username !== undefined) {
                //cookieManager.refreshCookies(res, tempPass, maxAge);
                console.log("User ".concat(username, " authentication successful"));
                res.status(200);
            }
        }
        else {
            res.status(401).json({ message: "User is not authenticated" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error authenticating user: ".concat(error) });
    }
});
exports.default = router;
//# sourceMappingURL=authenticationRoute.js.map