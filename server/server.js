"use strict";

const express = require("express"); 
const bodyParser = require('body-parser'); 
const app = express();
const port = 3000; 
const userRoutes = require('./routes/userRoutes'); // Import userRoutes module

// Middleware setup
app.use(bodyParser.json()); // Parse JSON request bodies

app.get('/', (req, res) => {
    res.send("This is the main page");
})

app.use('/users', userRoutes); // Use userRoutes for routes starting with /users

// Start the server
app.listen(port, err => {
    if (err) {
        return console.log("ERROR", err);
    }
    console.log(`Server is running on port ${port}`);
});