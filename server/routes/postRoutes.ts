import express = require("express");
import persist from "../persist";
let router = express.Router();
import loggedInUsers from "../server";
import bodyParser = require("body-parser");
import Post from "../Post";

router.use(bodyParser.json()); // Parse JSON request bodies

//User creates their own post
router.route("/createpost").post(async (req, res) => {
  const title: string = req.body.title;
  const content: string = req.body.content;

  if (content.length > 300) {
    res
      .status(400)
      .json({ message: "Post content must be shorter than 300 characters" });
    return;
  }

  try {
    const tempPass = req.cookies.tempPass;

    if (loggedInUsers.get(tempPass) !== undefined) {
      const username = loggedInUsers.get(tempPass).username;
      const user = persist.findUserByUsername(username);
      const currentPostId = user.currentPostId;
      const timestamp = new Date();

      const post = new Post(currentPostId, title, content, timestamp);
      user.currentPostId++;
      user.addPost(post);
      user.addNewPostActivity();

      res.status(200).json({
        message: `Successfully created post for user ${username}, post ID: ${currentPostId}`,
      });
    } else {
      res.status(401).json({ message: "User not logged in to post" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to create post: ${error.message}` });
  }
});

async function handleLikeUnlike(req, res, isLikeOperation: boolean) {
  try {
    const tempPass = req.cookies.tempPass;

    if (loggedInUsers.get(tempPass) !== undefined) {
      const requestingUsername = loggedInUsers.get(tempPass).username;
      const requestedUser = persist.findUserByUsername(req.params.username);
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
    } else {
      res.status(401).json({ message: "User not logged in to like/unlike" });
    }
  } catch (error) {
    res.status(500).json({
      message: `Error ${isLikeOperation ? "liking" : "unliking"} post: ${
        error.message
      }`,
    });
  }
}

router.route("/:username/like/:postid").patch(async (req, res) => {
  await handleLikeUnlike(req, res, true);
});

router.route("/:username/unlike/:postid").patch(async (req, res) => {
  await handleLikeUnlike(req, res, false);
});

export default router;
