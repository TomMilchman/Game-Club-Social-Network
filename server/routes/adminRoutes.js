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
var express = require("express");
var router = express.Router();
var server_1 = require("../server");
var persist_1 = require("../persist");
var featureFlags = {
    gamingtriviaEnabled: true,
    upcomingreleasesEnabled: true,
    unlikeEnabled: true,
    numoffollowersEnabled: true,
};
router.get("/loginactivity", function (req, res) {
    var e_1, _a;
    try {
        var allActivities_1 = [];
        var _loop_1 = function (username, user) {
            user.loginActivity.forEach(function (activity) {
                var userActivity = {
                    username: username,
                    type: activity.type,
                    timestamp: activity.timestamp,
                };
                allActivities_1.push(userActivity);
            });
        };
        try {
            for (var _b = __values(Object.entries(persist_1.default.usersData)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), username = _d[0], user = _d[1];
                _loop_1(username, user);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        res.status(200).json({ loginActivity: allActivities_1 });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error fetching login activity: ".concat(error.message) });
        console.log("Error fetching login activity: ".concat(error.message));
    }
});
router.delete("/deleteuser/:username", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tempPass, usernameToDelete, userToDelete, _a, _b, _c, tempPass_1, value, _d, _e, username, user, followerIndex, followingIndex, error_1;
    var e_2, _f, e_3, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _h.trys.push([0, 6, , 7]);
                tempPass = req.cookies.tempPass;
                if (!persist_1.default.usersData[server_1.loggedInUsers.get(tempPass).username].isAdmin) return [3 /*break*/, 4];
                usernameToDelete = req.params.username;
                userToDelete = persist_1.default.usersData[usernameToDelete];
                if (!(userToDelete !== undefined)) return [3 /*break*/, 2];
                // Remove the user from usersData
                delete persist_1.default.usersData[usernameToDelete];
                try {
                    // Remove the user from loggedInUsers if they are logged in
                    for (_a = __values(server_1.loggedInUsers.entries()), _b = _a.next(); !_b.done; _b = _a.next()) {
                        _c = __read(_b.value, 2), tempPass_1 = _c[0], value = _c[1];
                        if (value.username === usernameToDelete) {
                            server_1.loggedInUsers.delete(tempPass_1);
                            break;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                try {
                    // Remove the user from other users' followers and followed lists
                    for (_d = __values(Object.keys(persist_1.default.usersData)), _e = _d.next(); !_e.done; _e = _d.next()) {
                        username = _e.value;
                        user = persist_1.default.usersData[username];
                        followerIndex = user.followersUsernames.indexOf(usernameToDelete);
                        if (followerIndex !== -1) {
                            user.followersUsernames.splice(followerIndex, 1);
                        }
                        followingIndex = user.followedUsernames.indexOf(usernameToDelete);
                        if (followingIndex !== -1) {
                            user.followedUsernames.splice(followingIndex, 1);
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_g = _d.return)) _g.call(_d);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                return [4 /*yield*/, persist_1.default.saveUsersData()];
            case 1:
                _h.sent();
                res
                    .status(200)
                    .json({ message: "User ".concat(usernameToDelete, " deleted successfully") });
                console.log("User ".concat(usernameToDelete, " deleted successfully"));
                return [3 /*break*/, 3];
            case 2:
                res.status(404).json({ message: "User ".concat(usernameToDelete, " not found") });
                console.log("User ".concat(usernameToDelete, " not found"));
                _h.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                res.status(401).json({ message: "This user is not an admin" });
                console.log("This user is not an admin");
                _h.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _h.sent();
                res
                    .status(500)
                    .json({ message: "Error fetching login activity: ".concat(error_1.message) });
                console.log("Error fetching login activity: ".concat(error_1.message));
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
var enableDisableFeature = function (req, res, isEnable, type) {
    var tempPass = req.cookies.tempPass;
    if (persist_1.default.usersData[server_1.loggedInUsers.get(tempPass).username].isAdmin) {
        switch (type) {
            case "gamingtrivia":
                featureFlags.gamingtriviaEnabled = isEnable;
                break;
            case "upcomingreleases":
                featureFlags.upcomingreleasesEnabled = isEnable;
                break;
            case "unlike":
                featureFlags.unlikeEnabled = isEnable;
                break;
            case "numoffollowers":
                featureFlags.numoffollowersEnabled = isEnable;
                break;
            default:
                res.status(404).json({ message: "Feature not found" });
                console.log("Feature not found");
                return;
        }
        res
            .status(200)
            .json({ message: "Feature ".concat(type, ", updated status: ").concat(isEnable) });
        console.log("Feature ".concat(type, ", updated status: ").concat(isEnable));
    }
    else {
        res.status(401).json({ message: "This user is not an admin" });
        console.log("This user is not an admin");
    }
};
router.put("/enable/gamingtrivia", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            enableDisableFeature(req, res, true, "gamingtrivia");
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error changing privileges: ".concat(error.message) });
            console.log("Error changing privileges: ".concat(error.message));
        }
        return [2 /*return*/];
    });
}); });
router.put("/disable/gamingtrivia", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            enableDisableFeature(req, res, false, "gamingtrivia");
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error changing privileges: ".concat(error.message) });
            console.log("Error changing privileges: ".concat(error.message));
        }
        return [2 /*return*/];
    });
}); });
router.put("/enable/upcomingreleases", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            enableDisableFeature(req, res, true, "upcomingreleases");
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error changing privileges: ".concat(error.message) });
            console.log("Error changing privileges: ".concat(error.message));
        }
        return [2 /*return*/];
    });
}); });
router.put("/disable/upcomingreleases", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            enableDisableFeature(req, res, false, "upcomingreleases");
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error changing privileges: ".concat(error.message) });
            console.log("Error changing privileges: ".concat(error.message));
        }
        return [2 /*return*/];
    });
}); });
router.put("/enable/numoffollowers", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            enableDisableFeature(req, res, true, "numoffollowers");
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error changing privileges: ".concat(error.message) });
            console.log("Error changing privileges: ".concat(error.message));
        }
        return [2 /*return*/];
    });
}); });
router.put("/disable/numoffollowers", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            enableDisableFeature(req, res, false, "numoffollowers");
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error changing privileges: ".concat(error.message) });
            console.log("Error changing privileges: ".concat(error.message));
        }
        return [2 /*return*/];
    });
}); });
router.put("/enable/unlike", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            enableDisableFeature(req, res, true, "unlike");
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error changing privileges: ".concat(error.message) });
            console.log("Error changing privileges: ".concat(error.message));
        }
        return [2 /*return*/];
    });
}); });
router.put("/disable/unlike", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            enableDisableFeature(req, res, false, "unlike");
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Error changing privileges: ".concat(error.message) });
            console.log("Error changing privileges: ".concat(error.message));
        }
        return [2 /*return*/];
    });
}); });
exports.default = { router: router, featureFlags: featureFlags };
//# sourceMappingURL=adminRoutes.js.map