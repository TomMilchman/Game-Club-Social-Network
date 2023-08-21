"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(username, password, email, isAdmin) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.isAdmin = isAdmin;
        this.following = [];
        this.followers = [];
        this.posts = [];
        this.currentPostId = 0;
        //this.lastLogin = lastLogin;
    }
    User.prototype.addPost = function (post) {
        this.posts.push(post);
    };
    User.prototype.deletePostById = function (postId) {
        this.posts.filter(function (post) { return post.postId != postId; });
    };
    User.prototype.addFollower = function (user) {
        this.followers.push(user);
    };
    User.prototype.removeFollower = function (user) {
        this.followers.filter(function (follower) { return follower.username != user.username; });
    };
    User.prototype.addFollowing = function (user) {
        this.following.push(user);
    };
    User.prototype.removeFollowing = function (user) {
        this.following.filter(function (following) { return following.username != user.username; });
    };
    return User;
}());
exports.default = User;
//# sourceMappingURL=User.js.map