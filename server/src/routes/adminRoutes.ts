import express = require("express");
let router = express.Router();

import { loggedInUsers } from "../server";
import persist from "../persist";
import { LoginActivityType } from "../User";

const featureFlags = {
  gamingtriviaEnabled: true,
  upcomingreleasesEnabled: true,
  unlikeEnabled: true,
  numoffollowersEnabled: true,
};

interface UserActivity {
  username: string;
  type: LoginActivityType;
  timestamp: Date;
}

router.get("/loginactivity", (req, res) => {
  try {
    const allActivities: UserActivity[] = [];

    for (const [username, user] of Object.entries(persist.usersData)) {
      user.loginActivity.forEach((activity) => {
        const userActivity: UserActivity = {
          username,
          type: activity.type,
          timestamp: activity.timestamp,
        };
        allActivities.push(userActivity);
      });
    }

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

    if (persist.usersData[loggedInUsers.get(tempPass).username].isAdmin) {
      const usernameToDelete: string = req.params.username;

      const userToDelete = persist.usersData[usernameToDelete];

      if (userToDelete) {
        // Remove the user from usersData
        delete persist.usersData[usernameToDelete];

        // Remove the user from loggedInUsers if they are logged in
        for (const [tempPass, value] of loggedInUsers.entries()) {
          if (value.username === usernameToDelete) {
            loggedInUsers.delete(tempPass);
            break;
          }
        }

        // Remove the user from other users' followers and followed lists
        for (const username of Object.keys(persist.usersData)) {
          const user = persist.usersData[username];

          // Remove from followers
          const followerIndex =
            user.followersUsernames.indexOf(usernameToDelete);
          if (followerIndex !== -1) {
            user.followersUsernames.splice(followerIndex, 1);
          }

          // Remove from followed
          const followingIndex =
            user.followedUsernames.indexOf(usernameToDelete);
          if (followingIndex !== -1) {
            user.followedUsernames.splice(followingIndex, 1);
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

  if (persist.usersData[loggedInUsers.get(tempPass).username].isAdmin) {
    switch (type) {
      case "gamingtrivia":
        featureFlags.gamingtriviaEnabled = isEnable;
        break;
      case "upcomingreleases":
        featureFlags.upcomingreleasesEnabled = isEnable;
        break;
      case "unlike":
        featureFlags.unlikeEnabled = isEnable;
        break;
      case "numoffollowers":
        featureFlags.numoffollowersEnabled = isEnable;
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

router.put("/enable/gamingtrivia", async (req, res) => {
  try {
    enableDisableFeature(req, res, true, "gamingtrivia");
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error changing privileges: ${error.message}` });
    console.log(`Error changing privileges: ${error.message}`);
  }
});

router.put("/disable/gamingtrivia", async (req, res) => {
  try {
    enableDisableFeature(req, res, false, "gamingtrivia");
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error changing privileges: ${error.message}` });
    console.log(`Error changing privileges: ${error.message}`);
  }
});

router.put("/enable/upcomingreleases", async (req, res) => {
  try {
    enableDisableFeature(req, res, true, "upcomingreleases");
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error changing privileges: ${error.message}` });
    console.log(`Error changing privileges: ${error.message}`);
  }
});

router.put("/disable/upcomingreleases", async (req, res) => {
  try {
    enableDisableFeature(req, res, false, "upcomingreleases");
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error changing privileges: ${error.message}` });
    console.log(`Error changing privileges: ${error.message}`);
  }
});

router.put("/enable/numoffollowers", async (req, res) => {
  try {
    enableDisableFeature(req, res, true, "numoffollowers");
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error changing privileges: ${error.message}` });
    console.log(`Error changing privileges: ${error.message}`);
  }
});

router.put("/disable/numoffollowers", async (req, res) => {
  try {
    enableDisableFeature(req, res, false, "numoffollowers");
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error changing privileges: ${error.message}` });
    console.log(`Error changing privileges: ${error.message}`);
  }
});

router.put("/enable/unlike", async (req, res) => {
  try {
    enableDisableFeature(req, res, true, "unlike");
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error changing privileges: ${error.message}` });
    console.log(`Error changing privileges: ${error.message}`);
  }
});

router.put("/disable/unlike", async (req, res) => {
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
