import express = require("express");
let router = express.Router();
import bodyParser = require("body-parser");
import TrieSearch from "trie-search";

import persist from "../persist";

router.use(bodyParser.json()); // Parse JSON request bodies

router.post("/:username", async (req, res) => {
  try {
    const inputUsername = req.params.username;
    const usersData = persist.usersData;
    const trie = new TrieSearch("username");
    trie.addAll(usersData);
    const resultUsernames = trie.search(inputUsername);
    console.log(`User search: found ${resultUsernames.length} results`);
    res.status(200).json(resultUsernames);
  } catch (error) {
    res.status(500).json("An error occured: " + error);
  }
});

export default router;
