import express = require("express");
import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import cors = require("cors");
const app = express();
const port = 3000;

import persist from "./persist";
import feedRoute from "./routes/feedRoute";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import loginRoute from "./routes/loginRoute";
import logoutRoute from "./routes/logoutRoute";
import signupRoute from "./routes/signupRoute";
import searchRoute from "./routes/searchRoute";
import authenticationRoute from "./routes/authenticationRoute";
import adminRoute from "./routes/adminRoute";

const loggedInUsers = new Map<
  string,
  { username: string; expirationTime: number }
>();

app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow cookies and other credentials to be included in requests
  })
);

app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/logout", logoutRoute);
app.use("/authentication", authenticationRoute);
app.use("/feed", feedRoute);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/search", searchRoute);
app.use("/admin", adminRoute);

//Error 404 for non-existing pages
app.get("*", function (req, res) {
  res.status(404).send("Error 404: Not found.");
});

// Start the server and load data from disk
app.listen(port, async () => {
  try {
    console.log(`Server is running on port ${port}`);
    persist.usersData = await persist.loadUsersData();
    console.log(
      "User data loaded from disk:",
      JSON.stringify(persist.usersData, null, 2)
    );

    // Set up a setInterval function to periodically check for expired tokens
    setInterval(() => {
      const currentTime = Date.now();

      // Convert loggedInUsers Map entries to an array for iteration
      const entriesArray = Array.from(loggedInUsers.entries());

      for (const [tempPass, { username, expirationTime }] of entriesArray) {
        if (expirationTime <= currentTime) {
          loggedInUsers.delete(tempPass);
          console.log(`Expired token removed: ${tempPass}, user ${username}`);
        }
      }
    }, 60000);
  } catch (error) {
    console.error("Error loading user data:", error);
  }
});

export default loggedInUsers;
