import express = require("express");
let router = express.Router();

import { loggedInUsers } from "../server";
import persist from "../persist";
import Post from "../Post";

//Return the posts of all the users that the requesting user follows
router.get("/", async (req, res) => {
  try {
    const tempPass = req.cookies.tempPass;
    const requestingUser =
      persist.usersData[loggedInUsers.get(tempPass).username];

    const followedUsers: string[] = requestingUser.followedUsernames;
    const posts: Post[] = [];

    for (let i = 0; i < followedUsers.length; i++) {
      const user = persist.usersData[followedUsers[i]];
      const userPostsWithUsername = user.posts.map((post) => ({
        ...post,
        username: user.username, // Add the username to the post
      }));
      posts.push(...userPostsWithUsername);
    }

    res
      .status(200)
      .json({ posts: posts, requestingUsername: requestingUser.username });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log("Error fetching feed: ", error.message);
  }
});

export default router;
