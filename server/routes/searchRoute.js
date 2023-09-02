"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var trie_search_1 = require("trie-search");
var persist_1 = require("../persist");
router.get("/:username", function (req, res) {
    try {
        var inputUsername = req.params.username;
        var usersData = persist_1.default.usersData;
        var trie = new trie_search_1.default("username");
        trie.addAll(usersData);
        var resultUsernames = trie.search(inputUsername);
        res.status(200).json(resultUsernames);
    }
    catch (error) {
        res.status(500).json("An error occured while searching: " + error.message);
    }
});
exports.default = router;
//# sourceMappingURL=searchRoute.js.map