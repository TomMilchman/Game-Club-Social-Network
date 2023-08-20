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
var Post_1 = require("../Post");
router.use(bodyParser.json()); // Parse JSON request bodies
router.route("/:username/createpost").post(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var content, tempPass, username_1, user, currentPostId, timestamp, post, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                content = req.body.content;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                tempPass = req.cookies.tempPass;
                username_1 = server_1.default.get(tempPass);
                user = persist_1.default.usersData.find(function (user) { return user.username === username_1; });
                currentPostId = user.currentPostId;
                timestamp = new Date();
                post = new Post_1.default(currentPostId, content, timestamp);
                user.currentPostId++;
                user.addPost(post);
                return [4 /*yield*/, persist_1.default.saveUsersData(persist_1.default.usersData)];
            case 2:
                _a.sent();
                res
                    .status(200)
                    .json({ message: "Successfully created post for user ".concat(username_1) });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                res.status(500).json({ message: "Failed to create post: ".concat(error_1) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.route("/:username/createpost").post(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var content, tempPass, username_2, user, currentPostId, timestamp, post, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                content = req.body.content;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                tempPass = req.cookies.tempPass;
                username_2 = server_1.default.get(tempPass);
                user = persist_1.default.usersData.find(function (user) { return user.username === username_2; });
                currentPostId = user.currentPostId;
                timestamp = new Date();
                post = new Post_1.default(currentPostId, content, timestamp);
                user.currentPostId++;
                user.addPost(post);
                return [4 /*yield*/, persist_1.default.saveUsersData(persist_1.default.usersData)];
            case 2:
                _a.sent();
                res
                    .status(200)
                    .json({ message: "Successfully created post for user ".concat(username_2) });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(500).json({ message: "Failed to create post: ".concat(error_2) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.route("/:username/posts").get(function (req, res) {
    try {
        var username_3 = req.params.username;
        var user = persist_1.default.usersData.find(function (user) { return user.username === username_3; });
        if (user) {
            var posts = user.posts;
            res.status(200).json(posts);
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
function handleLikeUnlike(req, res, isLikeOperation) {
    return __awaiter(this, void 0, void 0, function () {
        var tempPass, requestingUsername, requestedUser, postId_1, post, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    tempPass = req.cookies.tempPass;
                    requestingUsername = server_1.default.get(tempPass);
                    requestedUser = persist_1.default.usersData.find(function (user) { return user.username === req.params.username; });
                    postId_1 = parseInt(req.params.postid);
                    post = requestedUser.posts.find(function (post) { return post.postId === postId_1; });
                    isLikeOperation
                        ? post.likePost(requestingUsername)
                        : post.unlikePost(requestingUsername);
                    return [4 /*yield*/, persist_1.default.saveUsersData(persist_1.default.usersData)];
                case 1:
                    _a.sent();
                    res.status(200).json({
                        message: "User ".concat(requestingUsername, " ").concat(isLikeOperation ? "liked" : "unliked", " user ").concat(req.params.username, "'s post number ").concat(postId_1),
                        updatedLikeNum: post.numOfLikes,
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    res.status(500).json({
                        message: "Error ".concat(isLikeOperation ? "liking" : "unliking", " post: ").concat(error_3),
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
router.route("/:username/posts/:postid/like").patch(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, handleLikeUnlike(req, res, true)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.route("/:username/posts/:postid/unlike").patch(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, handleLikeUnlike(req, res, false)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=userRoutes.js.map