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
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var server_1 = require("../server");
var persist_1 = require("../persist");
var cookieManager_1 = require("../cookieManager");
router.use(bodyParser.json()); // Parse JSON request bodies
router.use(cookieParser());
var featureFlags = {
    enableGamingTrivia: true,
    enableUpcomingReleases: true,
    enableUnlike: true,
    enableNumberOfFollowers: true,
};
router.get("/checkprivileges", function (req, res) {
    try {
        var isAdmin = false;
        var gamingTriviaEnabled = false;
        var upcomingReleasesEnabled = false;
        var unlikeEnabled = false;
        var numOfFollowersEnabled = false;
        var tempPass = req.cookies.tempPass;
        if (tempPass !== undefined) {
            if (server_1.default.get(tempPass) !== undefined) {
                var username = server_1.default.get(tempPass).username;
                var user = persist_1.default.findUserByUsername(username);
                if (user.isAdmin === true) {
                    isAdmin = true;
                }
                if (featureFlags.enableUnlike === true) {
                    unlikeEnabled = true;
                }
                if (featureFlags.enableNumberOfFollowers === true) {
                    numOfFollowersEnabled = true;
                }
                if (featureFlags.enableGamingTrivia === true) {
                    gamingTriviaEnabled = true;
                }
                if (featureFlags.enableUpcomingReleases === true) {
                    upcomingReleasesEnabled = true;
                }
                res.status(200).json({
                    isAdmin: isAdmin,
                    gamingTriviaEnabled: gamingTriviaEnabled,
                    upcomingReleasesEnabled: upcomingReleasesEnabled,
                    unlikeEnabled: unlikeEnabled,
                    numOfFollowersEnabled: numOfFollowersEnabled,
                });
            }
            else {
                res.status(401).json({ message: "This user is not logged in" });
                console.log("This user is not logged in");
            }
        }
        else {
            res.status(401).json({ message: "This user is not logged in" });
            console.log("This user is not logged in");
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error checking privileges ".concat(error.message) });
        console.log("Error checking privileges: ".concat(error.message));
    }
});
router.get("/loginactivity", function (req, res) {
    try {
        var allActivities_1 = [];
        persist_1.default.usersData.forEach(function (user) {
            user.loginActivity.forEach(function (activity) {
                var userActivity = {
                    username: user.username,
                    type: activity.type,
                    timestamp: activity.timestamp,
                };
                allActivities_1.push(userActivity);
            });
        });
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
    var tempPass, maxAge, usernameToDelete, userToDelete, index, loggedInUsers_1, loggedInUsers_1_1, _a, tempPass_1, value, _b, _c, user, _d, _e, _f, index_1, follower, _g, _h, _j, index_2, following, error_1;
    var e_1, _k, e_2, _l, e_3, _m, e_4, _o;
    return __generator(this, function (_p) {
        switch (_p.label) {
            case 0:
                _p.trys.push([0, 8, , 9]);
                tempPass = req.cookies.tempPass;
                maxAge = req.cookies.timeToLive;
                if (!(server_1.default.get(tempPass) !== undefined)) return [3 /*break*/, 6];
                cookieManager_1.default.refreshCookies(res, tempPass, maxAge);
                if (!persist_1.default.findUserByUsername(server_1.default.get(tempPass).username).isAdmin) return [3 /*break*/, 4];
                usernameToDelete = req.params.username;
                userToDelete = persist_1.default.findUserByUsername(usernameToDelete);
                if (!(userToDelete !== undefined)) return [3 /*break*/, 2];
                index = persist_1.default.usersData.indexOf(userToDelete);
                persist_1.default.usersData.splice(index, 1);
                try {
                    for (loggedInUsers_1 = __values(server_1.default), loggedInUsers_1_1 = loggedInUsers_1.next(); !loggedInUsers_1_1.done; loggedInUsers_1_1 = loggedInUsers_1.next()) {
                        _a = __read(loggedInUsers_1_1.value, 2), tempPass_1 = _a[0], value = _a[1];
                        if (value.username === usernameToDelete) {
                            server_1.default.delete(tempPass_1);
                            break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (loggedInUsers_1_1 && !loggedInUsers_1_1.done && (_k = loggedInUsers_1.return)) _k.call(loggedInUsers_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                try {
                    for (_b = __values(persist_1.default.usersData), _c = _b.next(); !_c.done; _c = _b.next()) {
                        user = _c.value;
                        try {
                            for (_d = (e_3 = void 0, __values(user.followersUsernames.entries())), _e = _d.next(); !_e.done; _e = _d.next()) {
                                _f = __read(_e.value, 2), index_1 = _f[0], follower = _f[1];
                                if (follower === usernameToDelete) {
                                    user.followersUsernames.splice(index_1, 1);
                                    break;
                                }
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_e && !_e.done && (_m = _d.return)) _m.call(_d);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        try {
                            for (_g = (e_4 = void 0, __values(user.followedUsernames.entries())), _h = _g.next(); !_h.done; _h = _g.next()) {
                                _j = __read(_h.value, 2), index_2 = _j[0], following = _j[1];
                                if (following === usernameToDelete) {
                                    user.followedUsernames.splice(index_2, 1);
                                    break;
                                }
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_h && !_h.done && (_o = _g.return)) _o.call(_g);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_l = _b.return)) _l.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                return [4 /*yield*/, persist_1.default.saveUsersData()];
            case 1:
                _p.sent();
                res
                    .status(200)
                    .json({ message: "User ".concat(usernameToDelete, " deleted successfully") });
                console.log("User ".concat(usernameToDelete, " deleted successfully"));
                return [3 /*break*/, 3];
            case 2:
                res
                    .status(404)
                    .json({ message: "User ".concat(usernameToDelete, " not found") });
                console.log("User ".concat(usernameToDelete, " not found"));
                _p.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                res.status(401).json({ message: "This user is not an admin" });
                console.log("This user is not an admin");
                _p.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                res.status(404).json({ message: "This user is not logged in" });
                console.log("This user is not logged in");
                _p.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                error_1 = _p.sent();
                res
                    .status(500)
                    .json({ message: "Error fetching login activity: ".concat(error_1.message) });
                console.log("Error fetching login activity: ".concat(error_1.message));
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); });
var enableDisableFeature = function (req, res, isEnable, type) {
    var tempPass = req.cookies.tempPass;
    var maxAge = req.cookies.timeToLive;
    if (server_1.default.get(tempPass) !== undefined) {
        cookieManager_1.default.refreshCookies(res, tempPass, maxAge);
        if (persist_1.default.findUserByUsername(server_1.default.get(tempPass).username).isAdmin) {
            switch (type) {
                case "gamingtrivia":
                    featureFlags.enableGamingTrivia = isEnable;
                    break;
                case "upcomingreleases":
                    featureFlags.enableUpcomingReleases = isEnable;
                    break;
                case "unlike":
                    featureFlags.enableUnlike = isEnable;
                    break;
                case "numoffollowers":
                    featureFlags.enableNumberOfFollowers = isEnable;
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
    }
    else {
        res.status(404).json({ message: "This user is not logged in" });
        console.log("This user is not logged in");
    }
};
router.put("/gamingtrivia/enable", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
router.put("/gamingtrivia/disable", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
router.put("/upcomingreleases/enable", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
router.put("/upcomingreleases/disable", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
router.put("/numoffollowers/enable", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
router.put("/numoffollowers/disable", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
router.put("/unlike/enable", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
router.put("/unlike/disable", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
exports.default = router;
//# sourceMappingURL=adminRoutes.js.map