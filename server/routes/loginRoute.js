"use strict";

const express = require("express");
let router = express.Router();
const security = require('../security');

router.route("/login")
.post(async(req, res) => {
    const { username, password, rememberMeChecked } = req.body;
    const loginSuccess = JSON.parse(await security.authenticateUser(username, password));
    
    if (loginSuccess.ok === true) {
        //864000000 = 10 days, 1800000 = 30 mins
        const maxAge = rememberMeChecked ? 864000000 : 1800000;
        security.createNewCookie(res, maxAge, username);
        console.log(`User ${username}: login successful.`);
    } else {
        console.log(`User ${username}: login failure, ${loginSuccess.issue}.`)
    }

    res.json(loginSuccess);
})

module.exports = router;