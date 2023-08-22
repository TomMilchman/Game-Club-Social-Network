import express = require("express");
let router = express.Router();
import bodyParser = require("body-parser");

import loggedInUsers from "../server";
import User from "../User";

router.use(bodyParser.json()); // Parse JSON request bodies

router.get("/", async (req, res) => {
  try {
    const tempPass = req.cookies.tempPass;
    if (loggedInUsers.get(tempPass) !== undefined) {
      const username = loggedInUsers.get(tempPass).username;
      res.status(200).json({ username: username });
    } else {
      res.status(401).json({ message: "User is not authenticated" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
    console.log("Error fetching feed: ", error);
  }
});

export default router;
