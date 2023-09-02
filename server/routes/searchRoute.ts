import express = require("express");
let router = express.Router();
import TrieSearch from "trie-search";

import persist from "../persist";
import { User } from "../User";

router.get("/:username", (req, res) => {
  try {
    const inputUsername = req.params.username;
    const usersData: User[] = persist.usersData;
    const trie = new TrieSearch("username");
    trie.addAll(usersData);
    const resultUsernames = trie.search(inputUsername);
    res.status(200).json(resultUsernames);
  } catch (error) {
    res.status(500).json("An error occured while searching: " + error.message);
  }
});

export default router;
