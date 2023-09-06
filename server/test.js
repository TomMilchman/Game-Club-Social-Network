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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
var adminRoutes_1 = require("./routes/adminRoutes");
var persist_1 = require("./persist");
var BASE_URL = "http://localhost:".concat(server_1.PORT);
var tempPass;
var maxAge;
var numberOfTests = 0;
var numberOfTestsPassed = 0;
var getCookies = function (response) {
    var cookies = response.headers.get("set-cookie");
    if (cookies) {
        tempPass = cookies.split(";")[0].split("=")[1];
        maxAge = parseInt(cookies.split(";")[1].split("=")[1]);
        console.log("Cookies retrieved: tempPass: ".concat(tempPass, ", maxAge: ").concat(maxAge));
    }
    else {
        console.log("No cookies retrieved");
    }
};
var signupTest = function (userData) { return __awaiter(void 0, void 0, void 0, function () {
    var response, responseData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 5]);
                return [4 /*yield*/, fetch("".concat(BASE_URL, "/signup"), {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(userData),
                    })];
            case 1:
                response = _a.sent();
                getCookies(response);
                return [4 /*yield*/, response.json()];
            case 2:
                responseData = _a.sent();
                if (response.ok) {
                    if (server_1.loggedInUsers.has(tempPass)) {
                        console.log("Signup test PASSED");
                        numberOfTestsPassed++;
                    }
                    else {
                        console.log("Signup test FAILED: ".concat(responseData.message));
                        console.log("If the test failed because there is already a user called test123, delete the user from usersData.json and try again");
                    }
                }
                return [3 /*break*/, 5];
            case 3:
                error_1 = _a.sent();
                console.error("Signup FAILED: Error during signup:", error_1.message);
                return [3 /*break*/, 5];
            case 4:
                numberOfTests++;
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
var createPostTest = function (postData) { return __awaiter(void 0, void 0, void 0, function () {
    var response, responseData, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 5]);
                return [4 /*yield*/, fetch("".concat(BASE_URL, "/posts/createpost"), {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                            cookie: "tempPass=".concat(tempPass, "; timeToLive=").concat(maxAge),
                        },
                        body: JSON.stringify(postData),
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                responseData = _a.sent();
                if (response.ok) {
                    console.log("Create post test PASSED");
                    numberOfTestsPassed++;
                }
                else {
                    console.log("Create post test FAILED: ".concat(responseData.message));
                }
                return [3 /*break*/, 5];
            case 3:
                error_2 = _a.sent();
                console.error("Create post FAILED: Error during create post:", error_2);
                return [3 /*break*/, 5];
            case 4:
                numberOfTests++;
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
var userPostsTest = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var response, responseData, posts, i, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 5]);
                return [4 /*yield*/, fetch("".concat(BASE_URL, "/users/").concat(username, "/posts"), {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                            cookie: "tempPass=".concat(tempPass, "; timeToLive=").concat(maxAge),
                        },
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                responseData = _a.sent();
                if (response.ok) {
                    posts = responseData.posts;
                    if (posts.length === 0) {
                        console.log("".concat(username, " has no posts"));
                    }
                    else {
                        console.log("".concat(username, "'s posts:"));
                        for (i = 0; i < posts.length; i++) {
                            console.log("Post ".concat(i, ": Title: ").concat(posts[i].title, ", Content: ").concat(posts[i].content));
                        }
                    }
                    console.log("Get user posts test PASSED");
                    numberOfTestsPassed++;
                }
                else {
                    console.log("Get user posts test FAILED: ".concat(responseData.message));
                }
                return [3 /*break*/, 5];
            case 3:
                error_3 = _a.sent();
                console.error("Get user posts FAILED: Error during get user posts:", error_3);
                return [3 /*break*/, 5];
            case 4:
                numberOfTests++;
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
var followUnfollowUserTest = function (username, action) { return __awaiter(void 0, void 0, void 0, function () {
    var response, responseData, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("".concat(BASE_URL, "/users/").concat(username, "/").concat(action), {
                        method: "PUT",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                            cookie: "tempPass=".concat(tempPass, "; timeToLive=").concat(maxAge),
                        },
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                responseData = _a.sent();
                if (response.ok) {
                    action === "follow"
                        ? console.log("Follow user test PASSED")
                        : console.log("Unfollow user test PASSED");
                }
                else {
                    action === "follow"
                        ? console.log("Follow user test FAILED: ".concat(responseData.message))
                        : console.log("Unfollow user test FAILED: ".concat(responseData.message));
                }
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                action === "follow"
                    ? console.error("Follow user FAILED: ", error_4.message)
                    : console.error("Unfollow user FAILED: ", error_4.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var followInfoTest = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var response, responseData, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 5]);
                return [4 /*yield*/, fetch("".concat(BASE_URL, "/users/").concat(username, "/followinfo"), {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                            cookie: "tempPass=".concat(tempPass, "; timeToLive=").concat(maxAge),
                        },
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                responseData = _a.sent();
                if (response.ok) {
                    console.log(responseData.message);
                    console.log("Follow info test PASSED");
                    numberOfTestsPassed++;
                }
                else {
                    console.log("Follow info test FAILED: ".concat(responseData.message));
                }
                return [3 /*break*/, 5];
            case 3:
                error_5 = _a.sent();
                console.error("Follow info FAILED: Error during follow info:", error_5);
                return [3 /*break*/, 5];
            case 4:
                numberOfTests++;
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
var privilegesTest = function (expectedPriveleges) { return __awaiter(void 0, void 0, void 0, function () {
    var response, responseData, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 5]);
                return [4 /*yield*/, fetch("".concat(BASE_URL, "/privileges"), {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                            cookie: "tempPass=".concat(tempPass, "; timeToLive=").concat(maxAge),
                        },
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                responseData = _a.sent();
                if (response.ok) {
                    console.log("Privileges: isAdmin: ".concat(responseData.isAdmin, ", \n        gamingTriviaEnabled: ").concat(responseData.gamingTriviaEnabled, ", \n        upcomingReleasesEnabled: ").concat(responseData.upcomingReleasesEnabled, ", \n        unlikeEnabled: ").concat(responseData.unlikeEnabled, ", \n        numOfFollowersEnabled: ").concat(responseData.numOfFollowersEnabled));
                    if (responseData.isAdmin === expectedPriveleges.isAdmin &&
                        responseData.gamingTriviaEnabled ===
                            expectedPriveleges.gamingTriviaEnabled &&
                        responseData.upcomingReleasesEnabled ===
                            expectedPriveleges.upcomingReleasesEnabled &&
                        responseData.unlikeEnabled === expectedPriveleges.unlikeEnabled) {
                        console.log("Privileges test PASSED");
                        numberOfTestsPassed++;
                    }
                    else {
                        console.log("Privileges test FAILED: ".concat(responseData.message));
                    }
                }
                else {
                    console.log("Privileges test FAILED: ".concat(responseData.message));
                }
                return [3 /*break*/, 5];
            case 3:
                error_6 = _a.sent();
                console.error("Privileges FAILED: Error during privileges:", error_6);
                return [3 /*break*/, 5];
            case 4:
                numberOfTests++;
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
var logoutTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, responseData, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 5]);
                return [4 /*yield*/, fetch("".concat(BASE_URL, "/logout"), {
                        method: "PUT",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                            cookie: "tempPass=".concat(tempPass, "; timeToLive=").concat(maxAge),
                        },
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                responseData = _a.sent();
                if (response.ok) {
                    console.log("Logout test PASSED");
                    numberOfTestsPassed++;
                }
                else {
                    console.log("Logout test FAILED: ".concat(responseData.message));
                }
                return [3 /*break*/, 5];
            case 3:
                error_7 = _a.sent();
                console.error("Logout FAILED: Error during logout:", error_7);
                return [3 /*break*/, 5];
            case 4:
                numberOfTests++;
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
var loginTest = function (userData) { return __awaiter(void 0, void 0, void 0, function () {
    var response, responseData, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 5]);
                return [4 /*yield*/, fetch("".concat(BASE_URL, "/login"), {
                        method: "PUT",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(userData),
                    })];
            case 1:
                response = _a.sent();
                getCookies(response);
                return [4 /*yield*/, response.json()];
            case 2:
                responseData = _a.sent();
                if (response.ok) {
                    if (server_1.loggedInUsers.has(tempPass)) {
                        console.log("Login test PASSED");
                        numberOfTestsPassed++;
                    }
                    else {
                        console.log("Login test FAILED: ".concat(responseData.message));
                    }
                }
                else {
                    console.log("Login test FAILED: ".concat(responseData.message));
                }
                return [3 /*break*/, 5];
            case 3:
                error_8 = _a.sent();
                console.error("Login FAILED: Error during login:", error_8);
                return [3 /*break*/, 5];
            case 4:
                numberOfTests++;
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
var searchTest = function (searchTerm, expectedUsername) { return __awaiter(void 0, void 0, void 0, function () {
    var response, responseData, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 5]);
                return [4 /*yield*/, fetch("".concat(BASE_URL, "/search/").concat(searchTerm), {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                            cookie: "tempPass=".concat(tempPass, "; timeToLive=").concat(maxAge),
                        },
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                responseData = _a.sent();
                if (response.ok) {
                    if (responseData.includes(expectedUsername)) {
                        console.log("Search test PASSED");
                    }
                    else {
                        console.log("Search test FAILED: ".concat(expectedUsername, " not found"));
                    }
                    numberOfTestsPassed++;
                }
                else {
                    console.log("Search test FAILED: ".concat(responseData));
                }
                return [3 /*break*/, 5];
            case 3:
                error_9 = _a.sent();
                console.error("Search FAILED: Error during search:", error_9);
                return [3 /*break*/, 5];
            case 4:
                numberOfTests++;
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
var feedTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, responseData, posts, requestingUsername, i, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 5]);
                return [4 /*yield*/, fetch("".concat(BASE_URL, "/feed"), {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                            cookie: "tempPass=".concat(tempPass, "; timeToLive=").concat(maxAge),
                        },
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                responseData = _a.sent();
                if (response.ok) {
                    posts = responseData.posts;
                    requestingUsername = responseData.requestingUsername;
                    if (posts.length === 0) {
                        console.log("No posts in admin's feed");
                    }
                    else {
                        console.log("".concat(requestingUsername, "'s feed:"));
                        for (i = 0; i < posts.length; i++) {
                            console.log("User ".concat(posts[i].username, " post ").concat(i, ": Title: ").concat(posts[i].title, ", Content: ").concat(posts[i].content));
                        }
                    }
                    console.log("Feed test PASSED");
                    numberOfTestsPassed++;
                }
                else {
                    console.log("Feed test FAILED: ".concat(responseData.message));
                }
                return [3 /*break*/, 5];
            case 3:
                error_10 = _a.sent();
                console.error("Feed FAILED: Error during feed:", error_10);
                return [3 /*break*/, 5];
            case 4:
                numberOfTests++;
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
var likeUnlikePostTest = function (username, postId, action) { return __awaiter(void 0, void 0, void 0, function () {
    var previousLikes, response, responseData, currentLikes, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 5]);
                previousLikes = persist_1.default.usersData[username].posts[postId].usernamesWhoLiked.length;
                return [4 /*yield*/, fetch("".concat(BASE_URL, "/posts/").concat(username, "/").concat(action, "/").concat(postId), {
                        method: "PUT",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                            cookie: "tempPass=".concat(tempPass, "; timeToLive=").concat(maxAge),
                        },
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                responseData = _a.sent();
                if (response.ok) {
                    currentLikes = responseData.updatedLikeNum;
                    if (action === "like") {
                        if (currentLikes === previousLikes + 1) {
                            console.log("Like post test PASSED");
                            numberOfTestsPassed++;
                        }
                        else {
                            console.log("Like post test FAILED: likes not updated correctly");
                        }
                    }
                    else {
                        if (currentLikes === previousLikes - 1) {
                            console.log("Unlike post test PASSED");
                            numberOfTestsPassed++;
                        }
                        else {
                            console.log("Unlike post test FAILED: likes not updated correctly");
                        }
                    }
                }
                else {
                    action === "like"
                        ? console.log("Like post test FAILED: ".concat(responseData.message))
                        : console.log("Unlike post test FAILED: ".concat(responseData.message));
                }
                return [3 /*break*/, 5];
            case 3:
                error_11 = _a.sent();
                action === "like"
                    ? console.error("Like post FAILED: ", error_11.message)
                    : console.error("Unlike post FAILED: ", error_11.message);
                return [3 /*break*/, 5];
            case 4:
                numberOfTests++;
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
var followingTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, responseData, followedUsers, requestingUser, i, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 5]);
                return [4 /*yield*/, fetch("".concat(BASE_URL, "/users/following"), {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                            cookie: "tempPass=".concat(tempPass, "; timeToLive=").concat(maxAge),
                        },
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                responseData = _a.sent();
                if (response.ok) {
                    followedUsers = responseData.followedUsers;
                    requestingUser = responseData.requestingUser;
                    if (followedUsers.length === 0) {
                        console.log("".concat(requestingUser, " is not following anyone"));
                    }
                    else {
                        console.log("".concat(requestingUser, " is following:"));
                        for (i = 0; i < followedUsers.length; i++) {
                            console.log("".concat(followedUsers[i]));
                        }
                    }
                    console.log("Following test PASSED");
                    numberOfTestsPassed++;
                }
                else {
                    console.log("Following test FAILED: ".concat(responseData.message));
                }
                return [3 /*break*/, 5];
            case 3:
                error_12 = _a.sent();
                console.error("Following FAILED: Error during following:", error_12);
                return [3 /*break*/, 5];
            case 4:
                numberOfTests++;
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
var nonAdminTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, responseData, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 5]);
                return [4 /*yield*/, fetch("".concat(BASE_URL, "/users/nonadmin"), {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                            cookie: "tempPass=".concat(tempPass, "; timeToLive=").concat(maxAge),
                        },
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                responseData = _a.sent();
                if (response.ok) {
                    console.log("Non admin usernames:");
                    responseData.usernames.forEach(function (username) {
                        console.log(username);
                    });
                    console.log("Non admin test PASSED");
                    numberOfTestsPassed++;
                }
                else {
                    console.log("Non admin test FAILED: ".concat(responseData.message));
                }
                return [3 /*break*/, 5];
            case 3:
                error_13 = _a.sent();
                console.error("Non admin FAILED: Error during non admin:", error_13);
                return [3 /*break*/, 5];
            case 4:
                numberOfTests++;
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
var loginActivityTest = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, responseData, error_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 5]);
                return [4 /*yield*/, fetch("".concat(BASE_URL, "/admin/loginactivity"), {
                        method: "GET",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                            cookie: "tempPass=".concat(tempPass, "; timeToLive=").concat(maxAge),
                        },
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                responseData = _a.sent();
                if (response.ok) {
                    console.log("Login activity:");
                    responseData.loginActivity.forEach(function (login) {
                        console.log(login);
                    });
                    console.log("Login activity test PASSED");
                    numberOfTestsPassed++;
                }
                else {
                    console.log("Login activity test FAILED: ".concat(responseData.message));
                }
                return [3 /*break*/, 5];
            case 3:
                error_14 = _a.sent();
                console.error("Login activity FAILED: Error during login activity:", error_14);
                return [3 /*break*/, 5];
            case 4:
                numberOfTests++;
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
var enableDisableFeatureTest = function (feature, action, expectedEnabled) { return __awaiter(void 0, void 0, void 0, function () {
    var response, responseData, error_15;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 5]);
                return [4 /*yield*/, fetch("".concat(BASE_URL, "/admin/").concat(action, "/").concat(feature), {
                        method: "PUT",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                            cookie: "tempPass=".concat(tempPass, "; timeToLive=").concat(maxAge),
                        },
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                responseData = _a.sent();
                if (response.ok) {
                    if (adminRoutes_1.default.featureFlags["".concat(feature, "Enabled")] === expectedEnabled) {
                        console.log("".concat(feature, " ").concat(action, " test PASSED"));
                        numberOfTestsPassed++;
                    }
                    else {
                        console.log("".concat(feature, " ").concat(action, " test FAILED: ").concat(feature, " not updated correctly"));
                    }
                }
                else {
                    console.log("".concat(feature, " ").concat(action, " test FAILED: ").concat(responseData.message));
                }
                return [3 /*break*/, 5];
            case 3:
                error_15 = _a.sent();
                console.error("".concat(feature, " ").concat(action, " FAILED: Error during ").concat(feature, " ").concat(action, ":"), error_15);
                return [3 /*break*/, 5];
            case 4:
                numberOfTests++;
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
var deleteUserTest = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var response, responseData, loggedInUsers_1, loggedInUsers_1_1, _a, key, value, error_16;
    var e_1, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, 4, 5]);
                return [4 /*yield*/, fetch("".concat(BASE_URL, "/admin/deleteuser/").concat(username), {
                        method: "DELETE",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                            cookie: "tempPass=".concat(tempPass, "; timeToLive=").concat(maxAge),
                        },
                    })];
            case 1:
                response = _c.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                responseData = _c.sent();
                if (response.ok) {
                    if (!persist_1.default.usersData[username]) {
                        try {
                            for (loggedInUsers_1 = __values(server_1.loggedInUsers), loggedInUsers_1_1 = loggedInUsers_1.next(); !loggedInUsers_1_1.done; loggedInUsers_1_1 = loggedInUsers_1.next()) {
                                _a = __read(loggedInUsers_1_1.value, 2), key = _a[0], value = _a[1];
                                if (value.username === username) {
                                    console.log("Delete user test FAILED: ".concat(username, " still logged in"));
                                    return [2 /*return*/];
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (loggedInUsers_1_1 && !loggedInUsers_1_1.done && (_b = loggedInUsers_1.return)) _b.call(loggedInUsers_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        console.log("Delete user test PASSED");
                        numberOfTestsPassed++;
                    }
                    else {
                        console.log("Delete user test FAILED: ".concat(username, " wasn't deleted from usersData"));
                    }
                }
                else {
                    console.log("Delete user test FAILED: ".concat(responseData.message));
                }
                return [3 /*break*/, 5];
            case 3:
                error_16 = _c.sent();
                console.error("Delete user FAILED: Error during delete user:", error_16);
                return [3 /*break*/, 5];
            case 4:
                numberOfTests++;
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
//Test start-------------------------------------------------------------------------
console.log("------------------------------");
console.log("Commencing tests...");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("------------------------------");
                return [4 /*yield*/, signupTest({
                        username: "test123",
                        password: "test123",
                        email: "test@email.com",
                        rememberMeChecked: false,
                    })];
            case 1:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, createPostTest({
                        title: "testing create post",
                        content: "this is a test post",
                    })];
            case 2:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, userPostsTest("admin")];
            case 3:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, followUnfollowUserTest("admin", "follow")];
            case 4:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, followInfoTest("admin")];
            case 5:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, followUnfollowUserTest("admin", "unfollow")];
            case 6:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, followInfoTest("admin")];
            case 7:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, privilegesTest({
                        isAdmin: false,
                        gamingTriviaEnabled: true,
                        upcomingReleasesEnabled: true,
                        unlikeEnabled: true,
                        numOfFollowersEnabled: true,
                    })];
            case 8:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, logoutTest()];
            case 9:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, loginTest({
                        username: "admin",
                        password: "admin",
                    })];
            case 10:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, searchTest("t", "test123")];
            case 11:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, followUnfollowUserTest("test123", "follow")];
            case 12:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, feedTest()];
            case 13:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, likeUnlikePostTest("test123", "0", "like")];
            case 14:
                _a.sent();
                return [4 /*yield*/, likeUnlikePostTest("test123", "0", "unlike")];
            case 15:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, followingTest()];
            case 16:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, followUnfollowUserTest("test123", "unfollow")];
            case 17:
                _a.sent();
                return [4 /*yield*/, followingTest()];
            case 18:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, nonAdminTest()];
            case 19:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, loginActivityTest()];
            case 20:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, enableDisableFeatureTest("gamingtrivia", "enable", true)];
            case 21:
                _a.sent();
                return [4 /*yield*/, enableDisableFeatureTest("gamingtrivia", "disable", false)];
            case 22:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, enableDisableFeatureTest("upcomingreleases", "enable", true)];
            case 23:
                _a.sent();
                return [4 /*yield*/, enableDisableFeatureTest("upcomingreleases", "disable", false)];
            case 24:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, enableDisableFeatureTest("numoffollowers", "enable", true)];
            case 25:
                _a.sent();
                return [4 /*yield*/, enableDisableFeatureTest("numoffollowers", "disable", false)];
            case 26:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, enableDisableFeatureTest("unlike", "enable", true)];
            case 27:
                _a.sent();
                return [4 /*yield*/, enableDisableFeatureTest("unlike", "disable", false)];
            case 28:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, deleteUserTest("test123")];
            case 29:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, logoutTest()];
            case 30:
                _a.sent();
                console.log("------------------------------");
                console.log("Tests complete: ".concat(numberOfTestsPassed, "/").concat(numberOfTests, " passed"));
                console.log("------------------------------");
                return [2 /*return*/];
        }
    });
}); })();
//Test end---------------------------------------------------------------------------
//# sourceMappingURL=test.js.map