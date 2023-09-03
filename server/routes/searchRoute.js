"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var trie_search_1 = require("trie-search");
var persist_1 = require("../persist");
router.get("/:username", function (req, res) {
    try {
        var inputUsername = req.params.username;
        var userDataMap = persist_1.default.usersData;
        var usersDataArray = Object.values(userDataMap); // Convert the object to an array of users
        var trie = new trie_search_1.default("username");
        // Populate the trie with user data
        trie.addAll(usersDataArray);
        // Perform a prefix search on the input username
        var resultUsernames = trie.get(inputUsername);
        res.status(200).json(resultUsernames);
    }
    catch (error) {
        res.status(500).json("An error occured while searching: " + error.message);
    }
});
exports.default = router;
//# sourceMappingURL=searchRoute.js.map