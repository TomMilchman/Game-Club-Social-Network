import express = require("express");
import persist from "../persist";
let router = express.Router();
import User from "../User";

router
  .route("/:username")
  .get((req, res) => {
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
  })
  .post((req, res) => {
    // Handle POST request
  });

export default router;
