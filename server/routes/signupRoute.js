"use strict";

const express = require("express");
let router = express.Router();
const userAuthenticator = require('../userAuthenticator');
const { v4: uuidv4 } = require('uuid');
const loggedInUsers = require("../server");

router.route("/signup")
.post(async(req, res) => {
    
})

module.exports = router;