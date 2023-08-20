"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Post = /** @class */ (function () {
    function Post(postId, content, timestamp) {
        this.postId = postId;
        this.content = content;
        this.timestamp = timestamp;
        this.usernamesWhoLiked = [];
    }
    Post.prototype.likePost = function (username) {
        this.usernamesWhoLiked.push(username);
    };
    Post.prototype.unlikePost = function (usernameToRemove) {
        this.usernamesWhoLiked.filter(function (username) { return username !== usernameToRemove; });
    };
    Post.prototype.numOfLikes = function () {
        return this.usernamesWhoLiked.length;
    };
    return Post;
}());
exports.default = Post;
//# sourceMappingURL=Post.js.map