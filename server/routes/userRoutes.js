"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var persist_1 = require("../persist");
var router = express.Router();
router
    .route("/")
    .get(function (req, res) {
    res.send("This is the users screen");
})
    .post(function (req, res) { });
router
    .route("/:username")
    .get(function (req, res) {
    try {
        var userName = req.params.username;
        for (var i = 0; i < persist_1.default.usersData.length; i++) {
            if (persist_1.default.usersData[i].username === userName) {
                res.send("This is user ".concat(userName));
                return;
            }
        }
        res.status(404).send("User does not exist."); // Set status code for user not found
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