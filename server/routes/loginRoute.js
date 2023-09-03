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
var router = express.Router();
var bcrypt = require("bcrypt");
var persist_1 = require("../persist");
var cookieManager_1 = require("../cookieManager");
var User_1 = require("../User");
var server_1 = require("../server");
function checkPasswordHash(username, password) {
    return __awaiter(this, void 0, void 0, function () {
        var users, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    users = persist_1.default.usersData;
                    user = users[username];
                    if (!user) return [3 /*break*/, 2];
                    return [4 /*yield*/, bcrypt.compare(password, user.password)];
                case 1:
                    if (_a.sent()) {
                        return [2 /*return*/, {
                                ok: true,
                                message: "User ".concat(username, " login successful"),
                            }];
                    }
                    return [2 /*return*/, { ok: false, message: "wrong password" }];
                case 2: return [2 /*return*/, { ok: false, message: "wrong username" }];
            }
        });
    });
}
router.put("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, rememberMeChecked, lowerCaseUsername, loginSuccess, message, maxAge, tempPass, previousUser, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password, rememberMeChecked = _a.rememberMeChecked;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                lowerCaseUsername = username.toLowerCase();
                return [4 /*yield*/, checkPasswordHash(lowerCaseUsername, password)];
            case 2:
                loginSuccess = _b.sent();
                message = { message: loginSuccess.message };
                if (!(loginSuccess.ok === true)) return [3 /*break*/, 4];
                maxAge = rememberMeChecked ? 864000000 : 1800000;
                tempPass = req.cookies.tempPass;
                if (tempPass !== undefined) {
                    if (server_1.loggedInUsers.get(tempPass) !== undefined) {
                        previousUser = persist_1.default.usersData[server_1.loggedInUsers.get(tempPass).username];
                        previousUser.loginActivity.push({
                            type: User_1.LoginActivityType.LOGOUT,
                            timestamp: new Date(),
                        });
                        console.log("Previous user ".concat(previousUser.username, " logged out"));
                        server_1.loggedInUsers.delete(tempPass);
                    }
                }
                cookieManager_1.default.createNewCookies(res, maxAge, lowerCaseUsername);
                user = persist_1.default.usersData[lowerCaseUsername];
                user.loginActivity.push({
                    type: User_1.LoginActivityType.LOGIN,
                    timestamp: new Date(),
                });
                return [4 /*yield*/, persist_1.default.saveUsersData()];
            case 3:
                _b.sent();
                console.log("User ".concat(lowerCaseUsername, " login successful"));
                res.status(200).json(message);
                return [3 /*break*/, 5];
            case 4:
                res.status(401).json(message);
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                console.error("Error during login:", error_1.message);
                res.status(500).json({ message: error_1.message });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=loginRoute.js.map