"use strict";

class User {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.isAdmin = false;
        this.email = email;
        this.following = [];
        this.followers = [];
        this.posts = [];
    }
}

module.exports = User;
