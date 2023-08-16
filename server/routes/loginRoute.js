"use strict";

const express = require("express");
let router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const persist = require("../persist");
const cookieManager = require("../cookieManager");

router.use(bodyParser.json()); // Parse JSON request bodies

// Authenticate user
async function authenticateUser(username, password) {
  const users = persist.usersData;
  const user = users.find((u) => u.username === username);

  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      return { ok: true, message: "authentication successful" };
    }
    return { ok: false, message: "wrong password" };
  }

  return { ok: false, message: "wrong username" };
}

router.post("/", async (req, res) => {
  const { username, password, rememberMeChecked } = req.body;

  try {
    const loginSuccess = await authenticateUser(username, password);
    const message = { message: loginSuccess.message };

    if (loginSuccess.ok === true) {
      const maxAge = rememberMeChecked ? 864000000 : 1800000;
      cookieManager.createNewCookie(res, maxAge, username);
      res.status(200).json(message);
    } else {
      res.status(401).json(message);
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: error });
  }
});

module.exports = router;
