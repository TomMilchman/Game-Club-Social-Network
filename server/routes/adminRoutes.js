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
router.get("/checkadmin", function (req, res) {
    try {
        var tempPass = req.cookies.tempPass;
        if (tempPass !== undefined) {
            if (server_1.default.get(tempPass) !== undefined) {
                var username_1 = server_1.default.get(tempPass).username;
                var user = persist_1.default.usersData.find(function (user) { return user.username === username_1; });
                if (user !== undefined) {
                    if (user.isAdmin === true) {
                        res.status(200).json({ message: "User ".concat(username_1, " is an admin") });
                        console.log("User ".concat(username_1, " is an admin"));
                    }
                    else {
                        res
                            .status(401)
                            .json({ message: "User ".concat(username_1, " is not an admin") });
                        console.log("User ".concat(username_1, " is not an admin"));
                    }
                }
                else {
                    res.status(401).json({ message: "This user is not logged in" });
                    console.log("This user is not logged in");
                }
            }
            else {
                res.status(401).json({ message: "This user is not logged in" });
                console.log("This user is not logged in");
            }
        }
        else {
            res.status(401).json({ message: "This user is not logged in" });
            console.log("This user is not logged in");
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error checking if admin: ".concat(error.message) });
        console.log("Error checking if admin: ".concat(error.message));
    }
});
router.get("/loginactivity", function (req, res) {
    try {
        var allActivities_1 = [];
        persist_1.default.usersData.forEach(function (user) {
            user.loginActivity.forEach(function (activity) {
                var userActivity = {
                    username: user.username,
                    type: activity.type,
                    timestamp: activity.timestamp,
                };
                allActivities_1.push(userActivity);
            });
        });
        res.status(200).json({ loginActivity: allActivities_1 });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error fetching login activity: ".concat(error.message) });
        console.log("Error fetching login activity: ".concat(error.message));
    }
});
exports.default = router;
//# sourceMappingURL=adminRoutes.js.map