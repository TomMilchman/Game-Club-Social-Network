"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var server_1 = require("../server");
var persist_1 = require("../persist");
router.use(bodyParser.json()); // Parse JSON request bodies
router.use(cookieParser());
//Check if user is admin
router.get("/", function (req, res) {
    try {
        var tempPass = req.cookies.tempPass;
        if (tempPass !== undefined) {
            if (server_1.default.get(tempPass) !== undefined) {
                var username_1 = server_1.default.get(tempPass).username;
                var user = persist_1.default.usersData.find(function (user) { return user.username === username_1; });
                if (user !== undefined) {
                    if (user.isAdmin === true) {
                        res.status(200).json({ message: "User is an admin" });
                        console.log("User is an admin");
                    }
                    else {
                        res.status(401).json({ message: "User is not an admin" });
                        console.log("User is not an admin");
                    }
                }
                else {
                    res.status(401).json({ message: "User is not an admin" });
                    console.log("User is not an admin");
                }
            }
            else {
                res.status(401).json({ message: "User is not an admin" });
                console.log("User is not an admin ");
            }
        }
        else {
            res.status(401).json({ message: "User is not an admin" });
            console.log("User is not an admin ");
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error checking if admin: ".concat(error) });
        console.log("Error checking if admin: ".concat(error));
    }
});
exports.default = router;
//# sourceMappingURL=adminRoute.js.map