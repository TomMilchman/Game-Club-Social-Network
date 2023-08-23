import express = require("express");
import persist from "../persist";
let router = express.Router();
import loggedInUsers from "../server";
import bodyParser = require("body-parser");
import Post from "../Post";

router.use(bodyParser.json()); // Parse JSON request bodies

router.route("/:username/userpage").get((req, res) => {
  try {
    const username = req.params.username;

    for (let i = 0; i < persist.usersData.length; i++) {
      const user = persist.usersData[i];
      if (user.username === username) {
        res.status(200).json(user);
        return;
      }
    }
    res.status(404); // Set status code for user not found
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error"); // Handle loading error with status code
  }
});

async function followOrUnfollowUser(req, res, action) {
  try {
    const tempPass = req.cookies.tempPass;
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

router.route("/:username/posts").get((req, res) => {
  try {
    const username = req.params.username;
    const user = persist.findUserByUsername(username);

    if (user) {
      const orderedPosts = user.posts.sort((a, b) => {
        return b.timestamp.getTime() - a.timestamp.getTime();
      });
      res.status(200).json(orderedPosts);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
