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

    addPost(post) {
        this.posts.push(post);
    }

    deletePost(postId) {
        this.posts.splice(postId, 1);
    }
}

module.exports = User;
