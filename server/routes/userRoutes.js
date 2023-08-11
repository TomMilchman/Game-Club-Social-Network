"use strict";

const express = require("express");
let router = express.Router();

router 
    .route("/")
    .get((req, res) => {
        res.send("This is the users screen");
    })
    .post((req, res) => {

    })

router 
    .route("/:username")
    .get((req, res) => {
        res.send(`This is user ${req.params.username}`);
    })
    .post((req, res) => {
        
    })

module.exports = router;
