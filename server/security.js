"use strict";

const bcrypt = require("bcrypt");
const persist = require('./persist');
const { v4: uuidv4 } = require('uuid');
const loggedInUsers = require("./server");
const User = require('./User');

//Refresh cookies and update object of logged in users
function refreshCookie(req, res) {
    const newTempPass = uuidv4();
    const oldTempPass = req.cookie.tempPass;
    const maxAge = req.cookie.timeToLive;

    attachCookiesToRes(res, newTempPass, maxAge);

    loggedInUsers[newTempPass] = loggedInUsers[oldTempPass];
    delete loggedInUsers[oldTempPass];
}

function createNewCookie(res, maxAge, username) {
    const tempPass = uuidv4();
    attachCookiesToRes(res, tempPass, maxAge);
    loggedInUsers[tempPass] = username;
}

function attachCookiesToRes(res, tempPass, maxAge) {
    res.cookie('tempPass', tempPass, {maxAge: maxAge, httpOnly: true, secure: true});
    res.cookie('timeToLive', maxAge, {maxAge: maxAge, httpOnly: true, secure: true});    
}

// Register user and hash password
async function registerAndEncryptUser(res, rememberMeChecked, user) {
    const users = persist.usersData;
    const hashedPassword = await bcrypt.hash(user.password, 10); // Hash with bcrypt
    user.password = hashedPassword;
    users.push(user);
    await saveUserData(users);
    const maxAge = rememberMeChecked ? 864000000 : 1800000;
    createNewCookie(res, maxAge, user.username);
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

module.exports = { authenticateUser, registerAndEncryptUser, refreshCookie, createNewCookie};