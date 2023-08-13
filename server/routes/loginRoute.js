"use strict";

const express = require("express");
let router = express.Router();
const userAuthenticator = require('../userAuthenticator');
const { v4: uuidv4 } = require('uuid');
const loggedInUsers = require("../server");

router.route("/login")
.post(async(req, res) => {
    const { username, password, rememberMeChecked } = req.body;
    const correctLogin = JSON.parse(await userAuthenticator.authenticateUser(username, password));
    
    if (correctLogin.ok === true) {
        const tempPass = uuidv4();
        //864000000 = 10 days, 1800000 = 30 mins
        const maxAge = rememberMeChecked ? 864000000 : 1800000; 
        res.cookie('tempPass', tempPass, {maxAge: maxAge, httpOnly: true, secure: true});
        res.cookie('timeToLive', maxAge, {maxAge: maxAge, httpOnly: true, secure: true});
        loggedInUsers['tempPass'] = username;
        console.log(`User ${username}: login successful.`);
    } else {
        console.log(`User ${username}: login failure.`)
    }

    res.json(correctLogin);
})

module.exports = router;