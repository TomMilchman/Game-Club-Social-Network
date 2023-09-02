import express = require("express");
let router = express.Router();

import { loggedInUsers } from "../server";
import persist from "../persist";
import { LoginActivityType } from "../User";

const featureFlags = {
  enableGamingTrivia: true,
  enableUpcomingReleases: true,
  enableUnlike: true,
  enableNumberOfFollowers: true,
};

interface UserActivity {
  username: string;
  type: LoginActivityType;
  timestamp: Date;
}

router.get("/loginactivity", (req, res) => {
  try {
    const allActivities: UserActivity[] = [];

    persist.usersData.forEach((user) => {
      user.loginActivity.forEach((activity) => {
        const userActivity: UserActivity = {
          username: user.username,
          type: activity.type,
          timestamp: activity.timestamp,
        };
        allActivities.push(userActivity);
      });
    });

    res.status(200).json({ loginActivity: allActivities });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching login activity: ${error.message}` });
    console.log(`Error fetching login activity: ${error.message}`);
  }
});

router.delete("/deleteuser/:username", async (req, res) => {
  try {
    const tempPass = req.cookies.tempPass;

    if (
      persist.findUserByUsername(loggedInUsers.get(tempPass).username).isAdmin
    ) {
      const usernameToDelete: string = req.params.username;

      const userToDelete = persist.findUserByUsername(usernameToDelete);

      if (userToDelete !== undefined) {
        const index = persist.usersData.indexOf(userToDelete);
        persist.usersData.splice(index, 1);

        for (const [tempPass, value] of loggedInUsers) {
          if (value.username === usernameToDelete) {
            loggedInUsers.delete(tempPass);
            break;
          }
        }

        for (const user of persist.usersData) {
          for (const [index, follower] of user.followersUsernames.entries()) {
            if (follower === usernameToDelete) {
              user.followersUsernames.splice(index, 1);
              break;
            }
          }
          for (const [index, following] of user.followedUsernames.entries()) {
            if (following === usernameToDelete) {
              user.followedUsernames.splice(index, 1);
              break;
            }
          }
        }

        await persist.saveUsersData();

        res
          .status(200)
          .json({ message: `User ${usernameToDelete} deleted successfully` });
        console.log(`User ${usernameToDelete} deleted successfully`);
      } else {
        res.status(404).json({ message: `User ${usernameToDelete} not found` });
        console.log(`User ${usernameToDelete} not found`);
      }
    } else {
      res.status(401).json({ message: `This user is not an admin` });
      console.log(`This user is not an admin`);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching login activity: ${error.message}` });
    console.log(`Error fetching login activity: ${error.message}`);
  }
});

const enableDisableFeature = (req, res, isEnable: boolean, type: string) => {
  const tempPass = req.cookies.tempPass;

  if (
    persist.findUserByUsername(loggedInUsers.get(tempPass).username).isAdmin
  ) {
    switch (type) {
      case "gamingtrivia":
        featureFlags.enableGamingTrivia = isEnable;
        break;
      case "upcomingreleases":
        featureFlags.enableUpcomingReleases = isEnable;
        break;
      case "unlike":
        featureFlags.enableUnlike = isEnable;
        break;
      case "numoffollowers":
        featureFlags.enableNumberOfFollowers = isEnable;
        break;
      default:
        res.status(404).json({ message: `Feature not found` });
        console.log(`Feature not found`);
        return;
    }

    res
      .status(200)
      .json({ message: `Feature ${type}, updated status: ${isEnable}` });
    console.log(`Feature ${type}, updated status: ${isEnable}`);
  } else {
    res.status(401).json({ message: `This user is not an admin` });
    console.log(`This user is not an admin`);
  }
};

router.put("/gamingtrivia/enable", async (req, res) => {
  try {
    enableDisableFeature(req, res, true, "gamingtrivia");
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error changing privileges: ${error.message}` });
    console.log(`Error changing privileges: ${error.message}`);
  }
});

router.put("/gamingtrivia/disable", async (req, res) => {
  try {
    enableDisableFeature(req, res, false, "gamingtrivia");
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error changing privileges: ${error.message}` });
    console.log(`Error changing privileges: ${error.message}`);
  }
});

router.put("/upcomingreleases/enable", async (req, res) => {
  try {
    enableDisableFeature(req, res, true, "upcomingreleases");
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error changing privileges: ${error.message}` });
    console.log(`Error changing privileges: ${error.message}`);
  }
});

router.put("/upcomingreleases/disable", async (req, res) => {
  try {
    enableDisableFeature(req, res, false, "upcomingreleases");
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error changing privileges: ${error.message}` });
    console.log(`Error changing privileges: ${error.message}`);
  }
});

router.put("/numoffollowers/enable", async (req, res) => {
  try {
    enableDisableFeature(req, res, true, "numoffollowers");
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error changing privileges: ${error.message}` });
    console.log(`Error changing privileges: ${error.message}`);
  }
});

router.put("/numoffollowers/disable", async (req, res) => {
  try {
    enableDisableFeature(req, res, false, "numoffollowers");
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error changing privileges: ${error.message}` });
    console.log(`Error changing privileges: ${error.message}`);
  }
});

router.put("/unlike/enable", async (req, res) => {
  try {
    enableDisableFeature(req, res, true, "unlike");
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error changing privileges: ${error.message}` });
    console.log(`Error changing privileges: ${error.message}`);
  }
});

router.put("/unlike/disable", async (req, res) => {
  try {
    enableDisableFeature(req, res, false, "unlike");
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error changing privileges: ${error.message}` });
    console.log(`Error changing privileges: ${error.message}`);
  }
});

export default { router, featureFlags };
