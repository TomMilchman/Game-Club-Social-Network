import express = require("express");
import persist from "../persist";
let router = express.Router();
import loggedInUsers from "../server";
import bodyParser = require("body-parser");

router.use(bodyParser.json()); // Parse JSON request bodies

async function followOrUnfollowUser(req, res, action) {
  try {
    const tempPass = req.cookies.tempPass;

    if (loggedInUsers.get(tempPass) !== undefined) {
      const requestingUser = persist.findUserByUsername(
        loggedInUsers.get(tempPass).username
      );
      const userToSearch = persist.findUserByUsername(req.params.username);

      if (userToSearch !== undefined) {
        const isFollowing = userToSearch.followers.some(
          (user) => user.username === requestingUser.username
        );

        if (
          (isFollowing && action === "follow") ||
          (!isFollowing && action === "unfollow")
        ) {
          res.status(400).json({
            message: `You are already ${
              action === "follow" ? "following" : "not following"
            } this user`,
          });
        } else {
          if (action === "follow") {
            userToSearch.addFollower(requestingUser);
            requestingUser.addFollowing(userToSearch);
          } else {
            userToSearch.removeFollower(requestingUser);
            requestingUser.removeFollowing(userToSearch);
          }

          await persist.saveUsersData();

          res.status(200).json({
            message: `User ${requestingUser.username} is ${
              action === "follow" ? "now following" : "no longer following"
            } user ${userToSearch.username}`,
          });
        }
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res
        .status(401)
        .json({ message: "User not logged in to follow/unfollow" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

router.route("/:username/follow").patch(async (req, res) => {
  await followOrUnfollowUser(req, res, "follow");
});

router.route("/:username/unfollow").patch(async (req, res) => {
  await followOrUnfollowUser(req, res, "unfollow");
});

router.route("/:username/data").get((req, res) => {
  try {
    const username = req.params.username;
    const user = persist.findUserByUsername(username);

    if (user) {
      user.posts.sort((a, b) => {
        return b.timestamp.getTime() - a.timestamp.getTime();
      });
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
