import express = require("express");
import persist from "../persist";
let router = express.Router();
import { loggedInUsers } from "../server";
import Post from "../Post";
import cookieManager from "../cookieManager";
import { LoginActivityType } from "../User";

//User creates their own post
router.route("/createpost").post(async (req, res) => {
  const title: string = req.body.title;
  const content: string = req.body.content;

  if (content.length > 300 || title.length > 50) {
    res.status(400).json({ message: "Post content or title are too long" });
    return;
  }

  try {
    const tempPass = req.cookies.tempPass;

    const username = loggedInUsers.get(tempPass).username;
    const user = persist.usersData[username];
    const currentPostId = user.currentPostId;
    const timestamp = new Date();

    const post = new Post(currentPostId, title, content, timestamp);
    user.currentPostId++;

    user.posts.push(post);

    user.loginActivity.push({
      type: LoginActivityType.NEWPOST,
      timestamp: new Date(),
    });

    await persist.saveUsersData();

    res.status(200).json({
      message: `Successfully created post for user ${username}, post ID: ${currentPostId}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to create post: ${error.message}` });
  }
});

async function handleLikeUnlike(req, res, isLikeOperation: boolean) {
  try {
    const tempPass = req.cookies.tempPass;
    const requestingUsername = loggedInUsers.get(tempPass).username;
    const requestedUser = persist.usersData[req.params.username];
    const posts = requestedUser.posts;
    const postId = parseInt(req.params.postid);

    if (isNaN(postId)) {
      res.status(400).json({ message: "Invalid post ID" });
      return;
    }

    const post = posts.find((post) => post.postId === postId);

    if (post !== undefined) {
      isLikeOperation
        ? post.usernamesWhoLiked.push(requestingUsername)
        : (post.usernamesWhoLiked = post.usernamesWhoLiked.filter(
            (username) => username !== requestingUsername
          ));

      await persist.saveUsersData();

      res.status(200).json({
        message: `User ${requestingUsername} ${
          isLikeOperation ? "liked" : "unliked"
        } user ${req.params.username}'s post number ${postId}`,
        updatedLikeNum: post.usernamesWhoLiked.length,
      });
    } else {
      res.status(404).json({
        message: `Post with ID ${postId} not found for user ${req.params.username}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error ${isLikeOperation ? "liking" : "unliking"} post: ${
        error.message
      }`,
    });
  }
}

router.route("/:username/like/:postid").put(async (req, res) => {
  await handleLikeUnlike(req, res, true);
});

router.route("/:username/unlike/:postid").put(async (req, res) => {
  await handleLikeUnlike(req, res, false);
});

export default router;
