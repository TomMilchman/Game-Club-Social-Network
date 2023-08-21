import express = require("express");
let router = express.Router();
import cookieParser = require("cookie-parser");
import bodyParser = require("body-parser");

import loggedInUsers from "../server";
import cookieManager from "../cookieManager";

router.use(bodyParser.json()); // Parse JSON request bodies
router.use(cookieParser());

router.get("/", (req, res) => {
  const tempPass: string = req.cookies.tempPass;
  const maxAge: number = req.cookies.timeToLive;

  try {
    if (tempPass !== undefined) {
      const username = loggedInUsers.get(tempPass);
      if (username !== undefined) {
        //cookieManager.refreshCookies(res, tempPass, maxAge);
        console.log(`User ${username} authentication successful`);
        res.status(200);
      }
    } else {
      res.status(401).json({ message: "User is not authenticated" });
    }
  } catch (error) {
    res.status(500).json({ message: `Error authenticating user: ${error}` });
  }
});

export default router;
