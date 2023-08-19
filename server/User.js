"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.isAdmin = false;
        this.following = [];
        this.followers = [];
        this.posts = [];
        //this.lastLogin = lastLogin;
    }
    User.prototype.addPost = function (post) {
        this.posts.push(post);
    };
    User.prototype.deletePost = function (postId) {
        this.posts.splice(postId, 1);
    };
    return User;
}());
exports.default = User;
//# sourceMappingURL=User.js.map