import express = require("express");
let router = express.Router();
import bodyParser = require("body-parser");

import loggedInUsers from "../server";
import { User } from "../User";
import persist from "../persist";
import Post from "../Post";

router.use(bodyParser.json()); // Parse JSON request bodies

//Return the posts of all the users that the requesting user follows by date (newest first)
router.get("/", async (req, res) => {
  try {
    const tempPass = req.cookies.tempPass;
    if (loggedInUsers.get(tempPass) !== undefined) {
      const requestingUser: User = persist.usersData.find(
        (user) => user.username === loggedInUsers.get(tempPass).username
      );

      const followedUsers: User[] = requestingUser.following;
      const posts: Post[] = [];

      for (let i = 0; i < followedUsers.length; i++) {
        posts.push(...followedUsers[i].posts);
      }

      posts.sort((a, b) => {
        return b.timestamp.getTime() - a.timestamp.getTime();
      });

      res.status(200).json({ username: requestingUser.username, posts: posts });
    } else {
      res
        .status(401)
        .json({ message: "User is not authenticated to view feed" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
    console.log("Error fetching feed: ", error);
  }
});

export default router;
