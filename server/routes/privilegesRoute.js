"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var server_1 = require("../server");
var persist_1 = require("../persist");
var adminRoutes_1 = require("./adminRoutes");
var router = express.Router();
router.get("/", function (req, res) {
    try {
        var isAdmin = false;
        var gamingTriviaEnabled = false;
        var upcomingReleasesEnabled = false;
        var unlikeEnabled = false;
        var numOfFollowersEnabled = false;
        var tempPass = req.cookies.tempPass;
        var username = server_1.loggedInUsers.get(tempPass).username;
        var user = persist_1.default.usersData[username];
        if (user.isAdmin === true) {
            isAdmin = true;
        }
        if (adminRoutes_1.default.featureFlags.unlikeEnabled === true) {
            unlikeEnabled = true;
        }
        if (adminRoutes_1.default.featureFlags.numoffollowersEnabled === true) {
            numOfFollowersEnabled = true;
        }
        if (adminRoutes_1.default.featureFlags.gamingtriviaEnabled === true) {
            gamingTriviaEnabled = true;
        }
        if (adminRoutes_1.default.featureFlags.upcomingreleasesEnabled === true) {
            upcomingReleasesEnabled = true;
        }
        res.status(200).json({
            username: username,
            isAdmin: isAdmin,
            gamingTriviaEnabled: gamingTriviaEnabled,
            upcomingReleasesEnabled: upcomingReleasesEnabled,
            unlikeEnabled: unlikeEnabled,
            numOfFollowersEnabled: numOfFollowersEnabled,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error checking privileges ".concat(error.message) });
        console.log("Error checking privileges: ".concat(error.message));
    }
});
exports.default = router;
//# sourceMappingURL=privilegesRoute.js.map