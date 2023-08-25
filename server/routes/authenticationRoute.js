"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var server_1 = require("../server");
var cookieManager_1 = require("../cookieManager");
router.use(bodyParser.json()); // Parse JSON request bodies
router.use(cookieParser());
router.get("/", function (req, res) {
    var tempPass = req.cookies.tempPass;
    var maxAge = req.cookies.timeToLive;
    try {
        if (server_1.default.get(tempPass) !== undefined) {
            var username = server_1.default.get(tempPass).username;
            if (username !== undefined) {
                console.log("User ".concat(username, " authentication successful"));
                cookieManager_1.default.refreshCookies(res, tempPass, maxAge);
                res
                    .status(200)
                    .json({ message: "User ".concat(username, " authentication successful") });
            }
            else {
                res.status(401).json({ message: "User is not authenticated" });
            }
        }
        else {
            res.status(401).json({ message: "User is not authenticated" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error authenticating user: ".concat(error.message) });
    }
});
exports.default = router;
//# sourceMappingURL=authenticationRoute.js.map