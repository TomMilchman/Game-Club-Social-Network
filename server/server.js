"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 3000;

const persist = require("./persist");
const userRoutes = require("./routes/userRoutes");
const loginRoute = require("./routes/loginRoute");
const logoutRoute = require("./routes/logoutRoute");
const signupRoute = require("./routes/signupRoute");

let loggedInUsers = {};

app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow cookies and other credentials to be included in requests
  })
);

//Check if user session is active and refresh cookies
// app.use((req, res, next) => {
//   const tempPass = req.cookies.tempPass;

//   //If cookies are not expired, refresh cookies and proceed with the request.
//   //If expired, delete user from logged in users, redirect to login and don't refresh cookies.
//   if (tempPass) {
//     if (loggedInUsers[tempPass] !== undefined) {
//       const maxAge = req.cookies.timeToLive;
//       security.refreshCookie(req, res, maxAge);
//       next();
//     }
//   }

//   //Might have to change
//   //Possibly: return res.status(401).json({ message: 'Unauthorized' });
//   //res.redirect("/login");
// });

app.route("/").get((req, res) => {
  try {
    res.send("hello world");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.use("/users", userRoutes); // Use userRoutes for routes starting with /users
app.use("/login", loginRoute); // Login page
app.use("/signup", signupRoute);
app.use("/logout", logoutRoute);

//Error 404 for non-existing pages
app.get("*", function (req, res) {
  res.status(404).send("Error 404: Page not found.");
});

// Start the server and load data from disk
app.listen(port, async (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Server is running on port ${port}`);

  try {
    persist.usersData = await persist.loadUsersData();
    console.log("User data loaded from disk:", persist.usersData);
  } catch (error) {
    console.error("Error loading user data:", error);
  }
});

module.exports = loggedInUsers;
