import express = require("express");
let router = express.Router();

import { loggedInUsers } from "../server";
import cookieManager from "../cookieManager";
import persist from "../persist";
import { LoginActivityType } from "../User";

router.put("/", async (req, res) => {
  try {
    const tempPass: string = req.cookies.tempPass;
    const maxAge: number = req.cookies.timeToLive;

    if (tempPass) {
      if (loggedInUsers.get(tempPass)) {
        const username = loggedInUsers.get(tempPass).username;
        const user = persist.usersData[username];

        user.loginActivity.push({
          type: LoginActivityType.LOGOUT,
          timestamp: new Date(),
        });

        await persist.saveUsersData();

        cookieManager.deleteCookies(res, tempPass, maxAge);
        res
          .status(200)
          .json({ message: `User ${username} successfully logged out` });
        console.log(`User ${username} successfully logged out`);
      } else {
        res.status(400).json({
          message: "User might have been logged in before server went down",
        });
      }
    } else {
      res.status(400).json({ message: "No user is signed in to log out" });
    }
  } catch (error) {
    console.error("Error during logout:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
