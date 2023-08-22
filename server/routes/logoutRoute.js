"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var server_1 = require("../server");
var cookieManager_1 = require("../cookieManager");
var persist_1 = require("../persist");
router.use(bodyParser.json()); // Parse JSON request bodies
router.use(cookieParser());
router.patch("/", function (req, res) {
    try {
        var tempPass = req.cookies.tempPass;
        var maxAge = req.cookies.timeToLive;
        if (server_1.default.get(tempPass) !== undefined) {
            var username = server_1.default.get(tempPass).username;
            var user = persist_1.default.findUserByUsername(username);
            user.addLogout();
            cookieManager_1.default.deleteCookies(res, tempPass, maxAge);
            res
                .status(200)
                .json({ message: "User ".concat(username, " successfully logged out") });
            console.log("User ".concat(username, " successfully logged out"));
        }
        else {
            res.status(400).json({ message: "No user is signed in to log out" });
        }
    }
    catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: error });
    }
});
exports.default = router;
//# sourceMappingURL=logoutRoute.js.map