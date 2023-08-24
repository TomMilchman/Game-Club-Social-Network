"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Post = /** @class */ (function () {
    function Post(postId, title, content, timestamp) {
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.timestamp = timestamp;
        this.usernamesWhoLiked = [];
    }
    return Post;
}());
exports.default = Post;
//# sourceMappingURL=Post.js.map