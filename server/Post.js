"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Post = /** @class */ (function () {
    function Post(postId, content, timestamp) {
        this._postId = postId;
        this._content = content;
        this._timestamp = timestamp;
        this._likes = [];
    }
    Post.prototype.likePost = function (user) {
        this._likes.push(user);
    };
    Post.prototype.numOfLikes = function () {
        return this._likes.length;
    };
    return Post;
}());
exports.default = Post;
//# sourceMappingURL=Post.js.map