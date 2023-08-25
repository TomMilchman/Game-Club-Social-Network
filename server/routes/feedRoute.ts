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

      const followedUsers: string[] = requestingUser.followedUsernames;
      const posts: Post[] = [];

      // for (let i = 0; i < followedUsers.length; i++) {
      //   posts.push(...persist.findUserByUsername(followedUsers[i]).posts);
      // }

      res.status(200).json({ username: requestingUser.username, posts: posts });
    } else {
      res.status(401).json({ message: "User is not logged in to view feed" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
    console.log("Error fetching feed: ", error.message);
  }
});

export default router;
