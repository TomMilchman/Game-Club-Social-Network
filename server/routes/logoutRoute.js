"use strict";

const express = require("express");
let router = express.Router();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const loggedInUsers = require("../server");
const persist = require("../persist");
const cookieManager = require("../cookieManager");

router.use(bodyParser.json()); // Parse JSON request bodies
router.use(cookieParser());

router.post("/", (req, res) => {
  try {
    const tempPass = req.cookies.tempPass;
    const timeToLive = req.cookies.timeToLive;
    const username = loggedInUsers.tempPass;
    delete loggedInUsers[tempPass];
    res.cookie("tempPass", tempPass, {
      maxAge: -1,
      httpOnly: true,
      secure: true,
      overwrite: true,
    });
    res.cookie("timeToLive", timeToLive, {
      maxAge: -1,
      httpOnly: true,
      secure: true,
      overwrite: true,
    });
    res
      .status(200)
      .json({ message: `User ${username} successfully logged out` });
  } catch {
    console.error("Error during signup:", error);
    res.status(500).json({ message: error });
  }
});

module.exports = router;
