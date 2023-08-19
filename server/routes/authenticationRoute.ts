import express = require("express");
let router = express.Router();
import bodyParser = require("body-parser");

import loggedInUsers from "../server";
import cookieManager from "../cookieManager";

router.use(bodyParser.json()); // Parse JSON request bodies

router.get("/", async (req, res) => {
  const tempPass: string = req.cookies.tempPass;
  const maxAge: number = req.cookies.timeToLive;

  try {
    if (tempPass !== undefined) {
      if (loggedInUsers.get(tempPass) !== undefined) {
        cookieManager.refreshCookies(res, tempPass, maxAge);
        res.status(200);
        return;
      } else {
        cookieManager.deleteCookies(res, tempPass, maxAge);
      }
    }
    res.status(401);
  } catch (error) {
    res.status(500).json({ message: `Error authenticating user: ${error}` });
  }
});

export default router;
