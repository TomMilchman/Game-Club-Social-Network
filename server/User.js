"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(username, password, email) {
        this._username = username;
        this._password = password;
        this._email = email;
        this._isAdmin = false;
        this._following = [];
        this._followers = [];
        this._posts = [];
        //this.lastLogin = lastLogin;
    }
    Object.defineProperty(User.prototype, "username", {
        get: function () {
            return this.username;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "password", {
        get: function () {
            return this.password;
        },
        set: function (newPassword) {
            this.password = newPassword;
        },
        enumerable: false,
        configurable: true
    });
    User.prototype.addPost = function (post) {
        this._posts.push(post);
    };
    User.prototype.deletePost = function (postId) {
        this._posts.splice(postId, 1);
    };
    return User;
}());
exports.default = User;
//# sourceMappingURL=User.js.map