"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginActivityType = exports.User = void 0;
var LoginActivityType;
(function (LoginActivityType) {
    LoginActivityType[LoginActivityType["LOGIN"] = 0] = "LOGIN";
    LoginActivityType[LoginActivityType["LOGOUT"] = 1] = "LOGOUT";
    LoginActivityType[LoginActivityType["NEWPOST"] = 2] = "NEWPOST";
})(LoginActivityType || (exports.LoginActivityType = LoginActivityType = {}));
var User = /** @class */ (function () {
    function User(username, password, email, isAdmin, following, followers, posts, currentPostId, loginActivity) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.isAdmin = isAdmin;
        this.followedUsernames = following;
        this.followersUsernames = followers;
        this.posts = posts;
        this.currentPostId = currentPostId;
        this.loginActivity = loginActivity;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map