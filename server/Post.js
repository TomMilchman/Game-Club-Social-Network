"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Post = /** @class */ (function () {
    function Post(postId, content, timestamp) {
        this.postId = postId;
        this.content = content;
        this.timestamp = timestamp;
        this.likes = [];
    }
    Post.prototype.likePost = function (user) {
        this.likes.push(user);
    };
    Post.prototype.numOfLikes = function () {
        return this.likes.length;
    };
    return Post;
}());
exports.default = Post;
//# sourceMappingURL=Post.js.map