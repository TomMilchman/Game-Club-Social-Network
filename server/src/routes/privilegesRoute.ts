import express = require("express");
import { loggedInUsers } from "../server";
import persist from "../persist";
import adminRoutes from "./adminRoutes";
let router = express.Router();

router.get("/", (req, res) => {
  try {
    let isAdmin: boolean = false;
    let gamingTriviaEnabled: boolean = false;
    let upcomingReleasesEnabled: boolean = false;
    let unlikeEnabled: boolean = false;
    let numOfFollowersEnabled: boolean = false;

    const tempPass: string = req.cookies.tempPass;
    const username = loggedInUsers.get(tempPass).username;
    const user = persist.usersData[username];
    isAdmin = user.isAdmin;

    unlikeEnabled = adminRoutes.featureFlags.unlikeEnabled;
    numOfFollowersEnabled = adminRoutes.featureFlags.numoffollowersEnabled;
    gamingTriviaEnabled = adminRoutes.featureFlags.numoffollowersEnabled;
    upcomingReleasesEnabled = adminRoutes.featureFlags.upcomingreleasesEnabled;

    res.status(200).json({
      username: username,
      isAdmin: isAdmin,
      gamingTriviaEnabled: gamingTriviaEnabled,
      upcomingReleasesEnabled: upcomingReleasesEnabled,
      unlikeEnabled: unlikeEnabled,
      numOfFollowersEnabled: numOfFollowersEnabled,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error checking privileges ${error.message}` });
    console.log(`Error checking privileges: ${error.message}`);
  }
});

export default router;
