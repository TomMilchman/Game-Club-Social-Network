"use strict";

const bcrypt = require("bcrypt");
const persist = require('./persist');

// Register user and hash password
async function registerUser(username, password) {
    const users = persist.usersData;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash with bcrypt
    users.push({ username, password: hashedPassword });
    await saveUserData(users);
}
  
// Authenticate user
async function authenticateUser(username, password) {
    const users = persist.usersData;
    const user = users.find(u => u.username === username);
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        return JSON.stringify({ok: true, issue: "none"}); // Password matches
      }
      return JSON.stringify({ok: false, issue: "password"});
    }
    return JSON.stringify({ok: false, issue: "username"});
}

module.exports = { authenticateUser, registerUser};