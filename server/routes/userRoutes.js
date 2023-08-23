"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var persist_1 = require("../persist");
var router = express.Router();
var server_1 = require("../server");
var bodyParser = require("body-parser");
router.use(bodyParser.json()); // Parse JSON request bodies
router.route("/:username/userpage").get(function (req, res) {
    try {
        var username = req.params.username;
        for (var i = 0; i < persist_1.default.usersData.length; i++) {
            var user = persist_1.default.usersData[i];
            if (user.username === username) {
                res.status(200).json(user);
                return;
            }
        }
        res.status(404); // Set status code for user not found
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error"); // Handle loading error with status code
    }
});
function followOrUnfollowUser(req, res, action) {
    return __awaiter(this, void 0, void 0, function () {
        var tempPass, requestingUser_1, userToSearch, isFollowing, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    tempPass = req.cookies.tempPass;
                    if (!(server_1.default.get(tempPass) !== undefined)) return [3 /*break*/, 6];
                    requestingUser_1 = persist_1.default.findUserByUsername(server_1.default.get(tempPass).username);
                    userToSearch = persist_1.default.findUserByUsername(req.params.username);
                    if (!(userToSearch !== undefined)) return [3 /*break*/, 4];
                    isFollowing = userToSearch.followers.some(function (user) { return user.username === requestingUser_1.username; });
                    if (!((isFollowing && action === "follow") ||
                        (!isFollowing && action === "unfollow"))) return [3 /*break*/, 1];
                    res.status(400).json({
                        message: "You are already ".concat(action === "follow" ? "following" : "not following", " this user"),
                    });
                    return [3 /*break*/, 3];
                case 1:
                    if (action === "follow") {
                        userToSearch.addFollower(requestingUser_1);
                        requestingUser_1.addFollowing(userToSearch);
                    }
                    else {
                        userToSearch.removeFollower(requestingUser_1);
                        requestingUser_1.removeFollowing(userToSearch);
                    }
                    return [4 /*yield*/, persist_1.default.saveUsersData()];
                case 2:
                    _a.sent();
                    res.status(200).json({
                        message: "User ".concat(requestingUser_1.username, " is ").concat(action === "follow" ? "now following" : "no longer following", " user ").concat(userToSearch.username),
                    });
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    res.status(404).json({ message: "User not found" });
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    res
                        .status(401)
                        .json({ message: "User not logged in to follow/unfollow" });
                    _a.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_1 = _a.sent();
                    console.error(error_1);
                    res.status(500).send("Internal Server Error");
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
router.route("/:username/follow").patch(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, followOrUnfollowUser(req, res, "follow")];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.route("/:username/unfollow").patch(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, followOrUnfollowUser(req, res, "unfollow")];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.route("/:username/posts").get(function (req, res) {
    try {
        var username = req.params.username;
        var user = persist_1.default.findUserByUsername(username);
        if (user) {
            var orderedPosts = user.posts.sort(function (a, b) {
                return b.timestamp.getTime() - a.timestamp.getTime();
            });
            res.status(200).json(orderedPosts);
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.default = router;
//# sourceMappingURL=userRoutes.js.map