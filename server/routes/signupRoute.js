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
var bodyParser = require("body-parser");
var bcrypt = require("bcrypt");
var cookieManager_1 = require("../cookieManager");
var persist_1 = require("../persist");
var User_1 = require("../User");
var server_1 = require("../server");
router.use(bodyParser.json()); // Parse JSON request bodies
function registerUser(user) {
    return __awaiter(this, void 0, void 0, function () {
        var users, hashedPassword, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    users = persist_1.default.usersData;
                    return [4 /*yield*/, bcrypt.hash(user.password, 10)];
                case 1:
                    hashedPassword = _a.sent();
                    user.password = hashedPassword;
                    users.push(user);
                    return [4 /*yield*/, persist_1.default.saveUsersData(users)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, { message: "User ".concat(user.username, " registration successful") }];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, { message: error_1 }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
router.post("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, email, rememberMeChecked, lowerCaseUsername_1, user, maxAge, users, signupSuccess, message, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.body.username;
                password = req.body.password;
                email = req.body.email;
                rememberMeChecked = req.body.rememberMeChecked;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                lowerCaseUsername_1 = username.toLowerCase();
                if (lowerCaseUsername_1.length < 5) {
                    res
                        .status(400)
                        .json({ message: "username must be at least 5 characters long" });
                    return [2 /*return*/];
                }
                if (password.length < 6) {
                    res
                        .status(400)
                        .json({ message: "password must be at least 6 characters long" });
                    return [2 /*return*/];
                }
                if (email.indexOf("@") === -1) {
                    res.status(400).json({ message: "invalid email format" });
                    return [2 /*return*/];
                }
                user = new User_1.default(lowerCaseUsername_1, password, email);
                maxAge = rememberMeChecked ? 864000000 : 1800000;
                users = persist_1.default.usersData;
                if (!users.find(function (u) { return u.username === lowerCaseUsername_1; })) return [3 /*break*/, 2];
                res
                    .status(400)
                    .json({ message: "user with this username already exists" });
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, registerUser(user)];
            case 3:
                signupSuccess = _a.sent();
                if (req.cookies.tempPass !== undefined) {
                    server_1.default.delete(req.cookies.tempPass);
                }
                cookieManager_1.default.createNewCookies(res, maxAge, user.username);
                message = { message: signupSuccess.message };
                res.status(200).json(message);
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                console.error("Error during signup:", error_2);
                res.status(500).json({ message: error_2 });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=signupRoute.js.map