"use strict";

const bcrypt = require("bcrypt");

// Register user and hash password
async function registerUser(username, password) {
    const users = await loadUserData();
    const hashedPassword = await bcrypt.hash(password, 10); // Hash with bcrypt
    users.push({ username, password: hashedPassword });
    await saveUserData(users);
}
  
// Authenticate user
async function authenticateUser(username, password) {
    const users = await loadUserData();
    const user = users.find(u => u.username === username);
    if (user && await bcrypt.compare(password, user.password)) {
      return true; // Password matches
    }
    return false; // Password doesn't match or user not found
}