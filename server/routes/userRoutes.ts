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

function followOrUnfollowUser(req, res, action) {
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

router.route("/:username/follow").patch((req, res) => {
  followOrUnfollowUser(req, res, "follow");
});

router.route("/:username/unfollow").patch((req, res) => {
  followOrUnfollowUser(req, res, "unfollow");
});

router.route("/:username/createpost").post(async (req, res) => {
  const content: string = req.body.content;

  try {
    const tempPass = req.cookies.tempPass;
    const username = loggedInUsers.get(tempPass).username;
    const user = persist.findUserByUsername(username);
    const currentPostId = user.currentPostId;
    const timestamp = new Date();

    const post = new Post(currentPostId, content, timestamp);
    user.currentPostId++;
    user.addPost(post);

    await persist.saveUsersData();

    res
      .status(200)
      .json({ message: `Successfully created post for user ${username}` });
  } catch (error) {
    res.status(500).json({ message: `Failed to create post: ${error}` });
  }
});

router.route("/:username/posts/:postid/deletepost").post(async (req, res) => {
  const postid = parseInt(req.params.postid);

  try {
    const tempPass = req.cookies.tempPass;
    const username = loggedInUsers.get(tempPass).username;
    const user = persist.findUserByUsername(username);
    const post = user.posts.find((post) => post.postId === postid);
    user.deletePostById(post.postId);

    await persist.saveUsersData();

    res
      .status(200)
      .json({ message: `Successfully created post for user ${username}` });
  } catch (error) {
    res.status(500).json({ message: `Failed to create post: ${error}` });
  }
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

async function handleLikeUnlike(req, res, isLikeOperation: boolean) {
  try {
    const tempPass = req.cookies.tempPass;
    const requestingUsername = loggedInUsers.get(tempPass).username;
    const requestedUser = persist.findUserByUsername(req.params.username);
    const postId = parseInt(req.params.postid);
    const post = requestedUser.posts.find((post) => post.postId === postId);

    isLikeOperation
      ? post.likePost(requestingUsername)
      : post.unlikePost(requestingUsername);

    await persist.saveUsersData();

    res.status(200).json({
      message: `User ${requestingUsername} ${
        isLikeOperation ? "liked" : "unliked"
      } user ${req.params.username}'s post number ${postId}`,
      updatedLikeNum: post.numOfLikes,
    });
  } catch (error) {
    res.status(500).json({
      message: `Error ${
        isLikeOperation ? "liking" : "unliking"
      } post: ${error}`,
    });
  }
}

router.route("/:username/posts/:postid/like").patch(async (req, res) => {
  await handleLikeUnlike(req, res, true);
});

router.route("/:username/posts/:postid/unlike").patch(async (req, res) => {
  await handleLikeUnlike(req, res, false);
});

export default router;
