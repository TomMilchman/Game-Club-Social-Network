"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginActivityType = exports.User = void 0;
var persist_1 = require("./persist");
var LoginActivityType;
(function (LoginActivityType) {
    LoginActivityType[LoginActivityType["LOGIN"] = 0] = "LOGIN";
    LoginActivityType[LoginActivityType["LOGOUT"] = 1] = "LOGOUT";
})(LoginActivityType || (exports.LoginActivityType = LoginActivityType = {}));
var User = /** @class */ (function () {
    function User(username, password, email, isAdmin, currentPostId, loginActivity) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.isAdmin = isAdmin;
        this.following = [];
        this.followers = [];
        this.posts = [];
        this.currentPostId = currentPostId;
        this.loginActivity = loginActivity;
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
    User.prototype.addLogin = function () {
        this.loginActivity.push({
            type: LoginActivityType.LOGIN,
            timestamp: new Date(),
        });
        persist_1.default.saveUsersData();
    };
    User.prototype.addLogout = function () {
        this.loginActivity.push({
            type: LoginActivityType.LOGOUT,
            timestamp: new Date(),
        });
        persist_1.default.saveUsersData();
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map