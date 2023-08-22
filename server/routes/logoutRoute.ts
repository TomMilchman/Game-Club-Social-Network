import express = require("express");
let router = express.Router();
import cookieParser = require("cookie-parser");
import bodyParser = require("body-parser");

import loggedInUsers from "../server";
import cookieManager from "../cookieManager";
import persist from "../persist";

router.use(bodyParser.json()); // Parse JSON request bodies
router.use(cookieParser());

router.patch("/", (req, res) => {
  try {
    const tempPass: string = req.cookies.tempPass;
    const maxAge: number = req.cookies.timeToLive;

    if (loggedInUsers.get(tempPass) !== undefined) {
      const username = loggedInUsers.get(tempPass).username;
      const user = persist.findUserByUsername(username);
      user.addLogout();
      cookieManager.deleteCookies(res, tempPass, maxAge);
      res
        .status(200)
        .json({ message: `User ${username} successfully logged out` });
      console.log(`User ${username} successfully logged out`);
    } else {
      res.status(400).json({ message: "No user is signed in to log out" });
    }
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: error });
  }
});

export default router;
