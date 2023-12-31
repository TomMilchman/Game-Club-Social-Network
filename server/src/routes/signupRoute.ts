import express = require("express");
let router = express.Router();
import bcrypt = require("bcrypt");

import cookieManager from "../cookieManager";
import persist from "../persist";
import { User, LoginActivityType } from "../User";
import { loggedInUsers } from "../server";

async function registerUser(user: User) {
  try {
    const users = persist.usersData;
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    users[user.username] = user;
    await persist.saveUsersData();
    return { message: `User ${user.username} registration successful` };
  } catch (error) {
    return { message: error };
  }
}

router.post("/", async (req, res) => {
  const username: string = req.body.username;
  const password: string = req.body.password;
  const email: string = req.body.email;
  const rememberMeChecked: boolean = req.body.rememberMeChecked;

  try {
    const lowerCaseUsername = username.toLowerCase();

    if (lowerCaseUsername.length < 5) {
      res
        .status(400)
        .json({ message: "username must be at least 5 characters long" });
      return;
    }
    if (lowerCaseUsername.length > 15) {
      res
        .status(400)
        .json({ message: "username must be at most 15 characters long" });
      return;
    }
    if (password.length < 5) {
      res
        .status(400)
        .json({ message: "password must be at least 5 characters long" });
      return;
    }
    if (password.length > 20) {
      res
        .status(400)
        .json({ message: "password must be at most 20 characters long" });
      return;
    }
    if (email.indexOf("@") === -1) {
      res.status(400).json({ message: "invalid email format" });
      return;
    }

    const loginActivity = [
      { type: LoginActivityType.LOGIN, timestamp: new Date() },
    ];

    const user = new User(
      lowerCaseUsername,
      password,
      email,
      false,
      [],
      [],
      [],
      0,
      loginActivity
    );

    const maxAge = rememberMeChecked ? 864000000 : 1800000; // 10 days : 10 minutes
    const users = persist.usersData;

    //Check if a user of the same name exists, if it does, reject request.
    if (users.hasOwnProperty(lowerCaseUsername)) {
      res
        .status(400)
        .json({ message: "User with this username already exists" });
    } else {
      const signupSuccess = await registerUser(user);
      if (req.cookies.tempPass) {
        loggedInUsers.delete(req.cookies.tempPass);
      }
      cookieManager.createNewCookies(res, maxAge, user.username);
      const message = { message: signupSuccess.message };
      res.status(200).json(message);
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: error });
  }
});

export default router;
