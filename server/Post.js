"use strict";

class Post {
    constructor(postId, content, timestamp) {
      this.postId = postId;
      this.content = content;
      this.timestamp = timestamp;
      this.likes = [];
    }
}

module.exports = Post;