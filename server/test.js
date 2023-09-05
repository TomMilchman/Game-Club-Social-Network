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
var server_1 = require("./server");
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
var signup = function (userData) { return __awaiter(void 0, void 0, void 0, function () {
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
var createPost = function (postData) { return __awaiter(void 0, void 0, void 0, function () {
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
var userPosts = function (username) { return __awaiter(void 0, void 0, void 0, function () {
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
                        posts.map(function (post) {
                            return {
                                title: post.title,
                                content: post.content,
                            };
                        });
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
var followUnfollowUser = function (username, action) { return __awaiter(void 0, void 0, void 0, function () {
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
var followInfo = function (username) { return __awaiter(void 0, void 0, void 0, function () {
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
var logout = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, responseData, error_6;
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
                error_6 = _a.sent();
                console.error("Logout FAILED: Error during logout:", error_6);
                return [3 /*break*/, 5];
            case 4:
                numberOfTests++;
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
var login = function (userData) { return __awaiter(void 0, void 0, void 0, function () {
    var response, responseData, error_7;
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
                error_7 = _a.sent();
                console.error("Login FAILED: Error during login:", error_7);
                return [3 /*break*/, 5];
            case 4:
                numberOfTests++;
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
var search = function (searchTerm, expectedUsername) { return __awaiter(void 0, void 0, void 0, function () {
    var response, responseData, error_8;
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
                error_8 = _a.sent();
                console.error("Search FAILED: Error during search:", error_8);
                return [3 /*break*/, 5];
            case 4:
                numberOfTests++;
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
var deleteUser = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var response, responseData, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 5]);
                return [4 /*yield*/, fetch("".concat(BASE_URL, "/admin/deleteuser/").concat(username), {
                        method: "DELETE",
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
                    console.log("Delete user test PASSED");
                    numberOfTestsPassed++;
                }
                else {
                    console.log("Delete user test FAILED: ".concat(responseData.message));
                }
                return [3 /*break*/, 5];
            case 3:
                error_9 = _a.sent();
                console.error("Delete user FAILED: Error during delete user:", error_9);
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
                return [4 /*yield*/, signup({
                        username: "test123",
                        password: "test123",
                        email: "test@email.com",
                        rememberMeChecked: false,
                    })];
            case 1:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, createPost({
                        title: "testing create post",
                        content: "this is a test post",
                    })];
            case 2:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, userPosts("admin")];
            case 3:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, followUnfollowUser("admin", "follow")];
            case 4:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, followInfo("admin")];
            case 5:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, followUnfollowUser("admin", "unfollow")];
            case 6:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, followInfo("admin")];
            case 7:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, logout()];
            case 8:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, login({
                        username: "admin",
                        password: "genericpass123",
                    })];
            case 9:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, search("t", "test123")];
            case 10:
                _a.sent();
                console.log("------------------------------");
                return [4 /*yield*/, deleteUser("test123")];
            case 11:
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