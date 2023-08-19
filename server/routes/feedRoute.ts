import express = require("express");
let router = express.Router();
import bodyParser = require("body-parser");

import loggedInUsers from "../server";
import User from "../User";

router.use(bodyParser.json()); // Parse JSON request bodies

router.get("/", async (req, res) => {
  try {
    const tempPass = req.cookies.tempPass;
    const username = loggedInUsers.get(tempPass);
    res.status(200).json({ username: username });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
