import express = require("express");
let router = express.Router();
import bodyParser = require("body-parser");
import bcrypt = require("bcrypt");

import cookieManager from "../cookieManager";
import persist from "../persist";
import User from "../User";

router.use(bodyParser.json()); // Parse JSON request bodies

// Register user and hash password
async function registerUser(user: User) {
  try {
    const users: User[] = persist.usersData;
    const hashedPassword = await bcrypt.hash(user.password, 10); // Hash with bcrypt
    user.password = hashedPassword;
    users.push(user);
    await persist.saveUsersData(users);
    return { message: "registration successful" };
  } catch (error) {
    return { message: error };
  }
}

router.post("/", async (req, res) => {
  const { username, password, email, rememberMeChecked } = req.body;

  try {
    const user = new User(username, password, email);
    const maxAge = rememberMeChecked ? 864000000 : 1800000; // 10 days : 10 minutes
    const users = persist.usersData;

    //Check if a user of the same name exists, if it does, reject request.
    if (users.find((u: User) => u.username === username)) {
      res
        .status(400)
        .json({ message: "user with this username already exists" });
      return;
    }

    const signupSuccess = await registerUser(user);
    cookieManager.createNewCookie(res, maxAge, user.username);
    const message = { message: signupSuccess.message };
    res.status(200).json(message);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: error });
  }
});

export default router;
