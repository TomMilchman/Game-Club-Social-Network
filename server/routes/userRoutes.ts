import express = require("express");
import persist from "../persist";
let router = express.Router();
import User from "../User";

router
  .route("/")
  .get((req, res) => {
    res.send("This is the users screen");
  })
  .post((req, res) => {});

router
  .route("/:username")
  .get((req, res) => {
    try {
      const userName = req.params.username;

      for (let i = 0; i < persist.usersData.length; i++) {
        if (persist.usersData[i].username === userName) {
          res.send(`This is user ${userName}`);
          return;
        }
      }

      res.status(404).send("User does not exist."); // Set status code for user not found
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error"); // Handle loading error with status code
    }
  })
  .post((req, res) => {
    // Handle POST request
  });

export default router;
