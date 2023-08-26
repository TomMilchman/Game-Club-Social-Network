import express = require("express");
let router = express.Router();
import bodyParser = require("body-parser");

import loggedInUsers from "../server";
import persist from "../persist";
import Post from "../Post";

router.use(bodyParser.json()); // Parse JSON request bodies

//Return the posts of all the users that the requesting user follows
router.get("/", async (req, res) => {
  try {
    const tempPass = req.cookies.tempPass;
    if (loggedInUsers.get(tempPass) !== undefined) {
      const requestingUser = persist.findUserByUsername(
        loggedInUsers.get(tempPass).username
      );

      const followedUsers: string[] = requestingUser.followedUsernames;
      const posts: Post[] = [];

      for (let i = 0; i < followedUsers.length; i++) {
        const user = persist.findUserByUsername(followedUsers[i]);
        const userPostsWithUsername = user.posts.map((post) => ({
          ...post,
          username: user.username, // Add the username to the post
        }));
        posts.push(...userPostsWithUsername);
      }

      res
        .status(200)
        .json({ posts: posts, requestingUsername: requestingUser.username });
    } else {
      res.status(401).json({ message: "User is not logged in to view feed" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
    console.log("Error fetching feed: ", error.message);
  }
});

export default router;
