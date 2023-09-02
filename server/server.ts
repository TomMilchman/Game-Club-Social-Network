import express = require("express");
import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import cors = require("cors");
const app = express();
const PORT = 3000;

import persist from "./persist";
import feedRoute from "./routes/feedRoute";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import loginRoute from "./routes/loginRoute";
import logoutRoute from "./routes/logoutRoute";
import signupRoute from "./routes/signupRoute";
import searchRoute from "./routes/searchRoute";
import adminRoutes from "./routes/adminRoutes";
import privilegesRoute from "./routes/privilegesRoute";
import cookieManager from "./cookieManager";

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
app.use("/search", searchRoute);

//Authentication middleware
app.use((req, res, next) => {
  if (res.headersSent) {
    return next();
  }

  const tempPass = req.cookies.tempPass;
  const maxAge = req.cookies.timeToLive;

  if (loggedInUsers.has(tempPass)) {
    cookieManager.refreshCookies(res, tempPass, maxAge);
    next();
  } else {
    res.status(401).json({ message: "User not logged in" });
  }
});

app.use("/privileges", privilegesRoute);
app.use("/feed", feedRoute);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/admin", adminRoutes.router);

//Error 404 for non-existing pages
app.all("*", function (req, res) {
  res.status(404).send("Error 404: Not found.");
});

// Start the server and load data from disk
app.listen(PORT, async () => {
  try {
    console.log(`Server is running on port ${PORT}`);
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
    console.error("Error loading user data:", error.message);
  }
});

export { app, PORT, loggedInUsers };
