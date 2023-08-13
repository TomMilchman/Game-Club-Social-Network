"use strict";

const express = require("express");
let router = express.Router();
const userAuthenticator = require('../security');
const { v4: uuidv4 } = require('uuid');
const loggedInUsers = require("../server");
const User = require("../User");

router.route("/signup")
.post(async(req, res) => {
    //TODO: update usersData in persist.js, create cookies for session
})

module.exports = router;