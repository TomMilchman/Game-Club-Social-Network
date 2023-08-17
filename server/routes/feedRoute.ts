import express = require("express");
let router = express.Router();
import bodyParser = require("body-parser");
import bcrypt = require("bcrypt");

import persist from "../persist";
import cookieManager from "../cookieManager";
import User from "../User";

router.use(bodyParser.json()); // Parse JSON request bodies

router.get("/:username", async (req, res) => {});
