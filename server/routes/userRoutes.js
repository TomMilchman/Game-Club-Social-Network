"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var persist_1 = require("../persist");
var router = express.Router();
router
    .route("/:username")
    .get(function (req, res) {
    try {
        var username = req.params.username;
        for (var i = 0; i < persist_1.default.usersData.length; i++) {
            var user = persist_1.default.usersData[i];
            if (user.username === username) {
                res.status(200).json(user);
                return;
            }
        }
        res.status(404); // Set status code for user not found
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error"); // Handle loading error with status code
    }
})
    .post(function (req, res) {
    // Handle POST request
});
exports.default = router;
//# sourceMappingURL=userRoutes.js.map