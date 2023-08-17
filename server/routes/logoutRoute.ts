import express = require("express");
let router = express.Router();
import cookieParser = require("cookie-parser");
import bodyParser = require("body-parser");

import loggedInUsers from "../server";

router.use(bodyParser.json()); // Parse JSON request bodies
router.use(cookieParser());

router.post("/", (req, res) => {
  try {
    const tempPass: string = req.cookies.tempPass;
    const timeToLive: number = req.cookies.timeToLive;
    const username = loggedInUsers[tempPass];
    delete loggedInUsers[tempPass];
    res.cookie("tempPass", tempPass, {
      maxAge: -1,
      httpOnly: true,
      secure: true,
    });
    res.cookie("timeToLive", timeToLive, {
      maxAge: -1,
      httpOnly: true,
      secure: true,
    });
    res
      .status(200)
      .json({ message: `User ${username} successfully logged out` });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: error });
  }
});

export default router;
