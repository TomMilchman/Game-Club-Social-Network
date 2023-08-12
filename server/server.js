"use strict";

const express = require("express"); 
const bodyParser = require('body-parser'); 
const persist = require("./persist");
const app = express();
const port = 3000; 
const userRoutes = require('./routes/userRoutes'); // Import userRoutes module

app.use(bodyParser.json()); // Parse JSON request bodies

app.route("/")
.get(async (req, res) => {
    try {
        res.send("hello world");
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}); 

app.use('/users', userRoutes); // Use userRoutes for routes starting with /users

//Error 404 for non-existing pages
app.get('*', function(req, res){
    res.status(404).send('Error 404: Page not found.');
});

// Start the server and load data from disk
app.listen(port, async(err) => {
    if (err) {
        return console.log("ERROR", err);
    }
    console.log(`Server is running on port ${port}`);
    
    try {
        persist.usersData = await persist.loadUsersData();
        console.log("User data loaded from disk:", persist.usersData);
    } catch (error) {
        console.error("Error loading user data:", error);
    }
});