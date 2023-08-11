"use strict";

const express = require("express");
const persist = require("../persist");
let router = express.Router();
// import { User } from '../User';
const User = require('../User');

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
        persist.loadUsersData()
        .then(dataArray => {
            let userName = req.params.username;
            
            for (let i = 0; i < dataArray.length; i++) {
                if (dataArray[i].username === userName) {
                    res.send(`This is user ${userName}`);
                    return;
                } 
            } 

            res.send('User does not exist.')
        })
    })
    .post((req, res) => {
        
    })

module.exports = router;
