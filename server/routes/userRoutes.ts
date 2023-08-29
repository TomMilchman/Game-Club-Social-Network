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
        if (requestingUser.username === userToSearch.username) {
          res.status(400).json({
            message: "You cannot follow/unfollow yourself",
          });
        } else {
          const isFollowing = userToSearch.followersUsernames.some(
            (username) => username === requestingUser.username
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
              userToSearch.addFollower(requestingUser.username);
              requestingUser.addFollowing(userToSearch.username);
            } else {
              userToSearch.removeFollower(requestingUser.username);
              requestingUser.removeFollowing(userToSearch.username);
            }

            await persist.saveUsersData();

            res.status(200).json({
              message: `User ${requestingUser.username} is ${
                action === "follow" ? "now following" : "no longer following"
              } user ${userToSearch.username}`,
            });
          }
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
    console.error(error.message);
    res.status(500).send("Internal Server Error" + error.message);
  }
}

router.route("/:username/follow").patch(async (req, res) => {
  await followOrUnfollowUser(req, res, "follow");
});

router.route("/:username/unfollow").patch(async (req, res) => {
  await followOrUnfollowUser(req, res, "unfollow");
});

router.route("/:username/followinfo").get((req, res) => {
  try {
    const tempPass = req.cookies.tempPass;

    if (loggedInUsers.get(tempPass) !== undefined) {
      const requestingUser = persist.findUserByUsername(
        loggedInUsers.get(tempPass).username
      );
      const userToSearch = persist.findUserByUsername(req.params.username);

      if (userToSearch !== undefined && requestingUser !== undefined) {
        const isFollowing = userToSearch.followersUsernames.some(
          (username) => username === requestingUser.username
        );

        res.status(200).json({
          message: `User ${requestingUser.username} following user ${userToSearch.username}: ${isFollowing}`,
          isFollowing: isFollowing,
          numOfFollowers: userToSearch.followersUsernames.length,
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(401).json({ message: "User not logged in" });
    }
  } catch (error) {
    console.error(`Error while checking if following: ${error}`);
    res.status(500).send(`Internal Server Error: ${error}`);
  }
});

router.route("/:username/posts").get((req, res) => {
  try {
    const requestedUsername = req.params.username;
    const requestedUser = persist.findUserByUsername(requestedUsername);

    if (loggedInUsers.get(req.cookies.tempPass) !== undefined) {
      if (requestedUser !== undefined) {
        res.status(200).json({
          posts: requestedUser.posts,
          requestingUsername: loggedInUsers.get(req.cookies.tempPass).username,
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(401).json({ message: "User not logged in" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error: " + error.message);
  }
});

router.route("/following").get((req, res) => {
  try {
    const tempPass = req.cookies.tempPass;

    if (loggedInUsers.get(tempPass) !== undefined) {
      const requestingUser = persist.findUserByUsername(
        loggedInUsers.get(tempPass).username
      );

      const followedUsers: string[] = requestingUser.followedUsernames;

      console.log(
        `User ${requestingUser.username} is following ${followedUsers.length} users}`
      );
      res.status(200).json({
        followedUsers: followedUsers,
        requestingUser: requestingUser.username,
      });
    } else {
      res.status(401).json({ message: "User not logged in" });
    }
  } catch (error) {
    console.error(`Error while checking followed users: ${error.message}`);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

//Returns an array of all users' usernames registered in the system (aside from admins)
router.route("/nonadmin").get((req, res) => {
  try {
    const nonAdminUsernames = persist.usersData
      .filter((user) => user.isAdmin === false)
      .map((user) => user.username);

    res.status(200).json({
      usernames: nonAdminUsernames,
    });
  } catch (error) {
    console.error(`Error while getting non-admin users: ${error.message}`);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

export default router;
