import express = require("express");
let router = express.Router();
import bodyParser = require("body-parser");
import bcrypt = require("bcrypt");

import persist from "../persist";
import cookieManager from "../cookieManager";
import User from "../User";
import loggedInUsers from "../server";

router.use(bodyParser.json()); // Parse JSON request bodies

async function checkPasswordHash(username: string, password: string) {
  const users: User[] = persist.usersData;
  const user = users.find((u) => u.username === username);

  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      console.log(`User ${username} login successful`);
      return {
        ok: true,
        message: `User ${username} login successful`,
      };
    }
    return { ok: false, message: "wrong password" };
  }

  return { ok: false, message: "wrong username" };
}

router.post("/", async (req, res) => {
  const { username, password, rememberMeChecked } = req.body;

  try {
    const lowerCaseUsername = username.toLowerCase();
    const loginSuccess = await checkPasswordHash(lowerCaseUsername, password);
    const message = { message: loginSuccess.message };

    if (loginSuccess.ok === true) {
      const maxAge = rememberMeChecked ? 864000000 : 120000;
      if (req.cookies.tempPass !== undefined) {
        loggedInUsers.delete(req.cookies.tempPass);
      }
      cookieManager.createNewCookies(res, maxAge, lowerCaseUsername);
      res.status(200).json(message);
    } else {
      res.status(401).json(message);
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: error });
  }
});

export default router;
