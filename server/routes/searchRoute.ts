import express = require("express");
let router = express.Router();
import TrieSearch from "trie-search";

import persist from "../persist";
import { User } from "../User";

router.get("/:username", (req, res) => {
  try {
    const inputUsername = req.params.username;
    const userDataMap = persist.usersData;
    const usersDataArray: User[] = Object.values(userDataMap); // Convert the object to an array of users
    const trie = new TrieSearch("username");

    // Populate the trie with user data
    trie.addAll(usersDataArray);

    // Perform a prefix search on the input username
    const resultUsers = trie.get(inputUsername);
    const resultUsernames = resultUsers.map((user: User) => user.username);

    res.status(200).json(resultUsernames);
  } catch (error) {
    res.status(500).json("An error occured while searching: " + error.message);
  }
});

export default router;
