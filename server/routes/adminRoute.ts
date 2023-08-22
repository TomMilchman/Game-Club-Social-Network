import express = require("express");
let router = express.Router();
import cookieParser = require("cookie-parser");
import bodyParser = require("body-parser");

import loggedInUsers from "../server";
import persist from "../persist";

router.use(bodyParser.json()); // Parse JSON request bodies
router.use(cookieParser());

//Check if user is admin
router.get("/", (req, res) => {
  try {
    const tempPass: string = req.cookies.tempPass;
    if (tempPass !== undefined) {
      if (loggedInUsers.get(tempPass) !== undefined) {
        const username = loggedInUsers.get(tempPass).username;
        const user = persist.usersData.find(
          (user) => user.username === username
        );

        if (user !== undefined) {
          if (user.isAdmin === true) {
            res.status(200).json({ message: `User ${username} is an admin` });
            console.log(`User ${username} is an admin`);
          } else {
            res
              .status(401)
              .json({ message: `User ${username} is not an admin` });
            console.log(`User ${username} is not an admin`);
          }
        } else {
          res.status(401).json({ message: `This user is not logged in` });
          console.log(`This user is not logged in`);
        }
      } else {
        res.status(401).json({ message: `This user is not logged in` });
        console.log(`This user is not logged in`);
      }
    } else {
      res.status(401).json({ message: `This user is not logged in` });
      console.log(`This user is not logged in`);
    }
  } catch (error) {
    res.status(500).json({ message: `Error checking if admin: ${error}` });
    console.log(`Error checking if admin: ${error}`);
  }
});

export default router;
