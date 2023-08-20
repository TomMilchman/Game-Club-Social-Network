import express = require("express");
import persist from "../persist";
let router = express.Router();
import loggedInUsers from "../server";
import bodyParser = require("body-parser");
import Post from "../Post";

router.use(bodyParser.json()); // Parse JSON request bodies

router.route("/:username/createpost").post(async (req, res) => {
  const content: string = req.body.content;

  try {
    const tempPass = req.cookies.tempPass;
    const username = loggedInUsers.get(tempPass);
    const user = persist.usersData.find((user) => user.username === username);
    const currentPostId = user.currentPostId;
    const timestamp = new Date();

    const post = new Post(currentPostId, content, timestamp);
    user.currentPostId++;
    user.addPost(post);

    await persist.saveUsersData(persist.usersData);

    res
      .status(200)
      .json({ message: `Successfully created post for user ${username}` });
  } catch (error) {
    res.status(500).json({ message: `Failed to create post: ${error}` });
  }
});

router.route("/:username/createpost").post(async (req, res) => {
  const content: string = req.body.content;

  try {
    const tempPass = req.cookies.tempPass;
    const username = loggedInUsers.get(tempPass);
    const user = persist.usersData.find((user) => user.username === username);
    const currentPostId = user.currentPostId;
    const timestamp = new Date();

    const post = new Post(currentPostId, content, timestamp);
    user.currentPostId++;
    user.addPost(post);

    await persist.saveUsersData(persist.usersData);

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
    const user = persist.usersData.find((user) => user.username === username);

    if (user) {
      const posts = user.posts;
      res.status(200).json(posts);
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
    const requestingUsername = loggedInUsers.get(tempPass);
    const requestedUser = persist.usersData.find(
      (user) => user.username === req.params.username
    );
    const postId = parseInt(req.params.postid);
    const post = requestedUser.posts.find((post) => post.postId === postId);

    isLikeOperation
      ? post.likePost(requestingUsername)
      : post.unlikePost(requestingUsername);

    await persist.saveUsersData(persist.usersData);

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
