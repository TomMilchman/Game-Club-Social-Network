"use strict";

class Post {
    constructor(postId, content, timestamp) {
        this.postId = postId;
        this.content = content;
        this.timestamp = timestamp;
        this.likes = [];
    }

    likePost(user) {
        this.likes.push(user);
    }

    numOfLikes() {
        return this.likes.length;
    }
}

module.exports = Post;