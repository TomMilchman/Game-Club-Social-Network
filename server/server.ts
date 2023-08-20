import express = require("express");
import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import cors = require("cors");
const app = express();
const port = 3000;

import persist from "./persist";
import feedRoute from "./routes/feedRoute";
import userRoutes from "./routes/userRoutes";
import loginRoute from "./routes/loginRoute";
import logoutRoute from "./routes/logoutRoute";
import signupRoute from "./routes/signupRoute";
import searchRoute from "./routes/searchRoute";
import cookieManager from "./cookieManager";

let loggedInUsers = new Map<string, string>();

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

//Authentication
app.use((req, res, next) => {
  const tempPass: string = req.cookies.tempPass;
  const maxAge: number = req.cookies.timeToLive;

  try {
    if (tempPass !== undefined) {
      const username = loggedInUsers.get(tempPass);
      if (username !== undefined) {
        //cookieManager.refreshCookies(res, tempPass, maxAge);
        console.log(`User ${username} authentication successful`);
        next();
      }
    }
    res.status(401).json({ message: "User is not authenticated" });
  } catch (error) {
    res.status(500).json({ message: `Error authenticating user: ${error}` });
  }
});

app.use("/feed", feedRoute);
app.use("/users", userRoutes);
app.use("/search", searchRoute);

//Error 404 for non-existing pages
app.get("*", function (req, res) {
  res.status(404).send("Error 404: Not found.");
});

// Start the server and load data from disk
app.listen(port, async () => {
  try {
    console.log(`Server is running on port ${port}`);
    persist.usersData = await persist.loadUsersData();
    console.log("User data loaded from disk:", persist.usersData);
  } catch (error) {
    console.error("Error loading user data:", error);
  }
});

export default loggedInUsers;
