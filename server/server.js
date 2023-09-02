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
exports.loggedInUsers = exports.PORT = exports.app = void 0;
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var app = express();
exports.app = app;
var PORT = 3000;
exports.PORT = PORT;
var persist_1 = require("./persist");
var feedRoute_1 = require("./routes/feedRoute");
var userRoutes_1 = require("./routes/userRoutes");
var postRoutes_1 = require("./routes/postRoutes");
var loginRoute_1 = require("./routes/loginRoute");
var logoutRoute_1 = require("./routes/logoutRoute");
var signupRoute_1 = require("./routes/signupRoute");
var searchRoute_1 = require("./routes/searchRoute");
var adminRoutes_1 = require("./routes/adminRoutes");
var privilegesRoute_1 = require("./routes/privilegesRoute");
var cookieManager_1 = require("./cookieManager");
var loggedInUsers = new Map();
exports.loggedInUsers = loggedInUsers;
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow cookies and other credentials to be included in requests
}));
app.use("/login", loginRoute_1.default);
app.use("/signup", signupRoute_1.default);
app.use("/logout", logoutRoute_1.default);
app.use("/search", searchRoute_1.default);
//Authentication middleware
app.use(function (req, res, next) {
    if (res.headersSent) {
        return next();
    }
    var tempPass = req.cookies.tempPass;
    var maxAge = req.cookies.timeToLive;
    if (loggedInUsers.has(tempPass)) {
        cookieManager_1.default.refreshCookies(res, tempPass, maxAge);
        next();
    }
    else {
        res.status(401).json({ message: "User not logged in" });
    }
});
app.use("/privileges", privilegesRoute_1.default);
app.use("/feed", feedRoute_1.default);
app.use("/users", userRoutes_1.default);
app.use("/posts", postRoutes_1.default);
app.use("/admin", adminRoutes_1.default.router);
//Error 404 for non-existing pages
app.all("*", function (req, res) {
    res.status(404).send("Error 404: Not found.");
});
// Start the server and load data from disk
app.listen(PORT, function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                console.log("Server is running on port ".concat(PORT));
                _a = persist_1.default;
                return [4 /*yield*/, persist_1.default.loadUsersData()];
            case 1:
                _a.usersData = _b.sent();
                console.log("User data loaded from disk:", JSON.stringify(persist_1.default.usersData, null, 2));
                // Set up a setInterval function to periodically check for expired tokens
                setInterval(function () {
                    var e_1, _a;
                    var currentTime = Date.now();
                    // Convert loggedInUsers Map entries to an array for iteration
                    var entriesArray = Array.from(loggedInUsers.entries());
                    try {
                        for (var entriesArray_1 = __values(entriesArray), entriesArray_1_1 = entriesArray_1.next(); !entriesArray_1_1.done; entriesArray_1_1 = entriesArray_1.next()) {
                            var _b = __read(entriesArray_1_1.value, 2), tempPass = _b[0], _c = _b[1], username = _c.username, expirationTime = _c.expirationTime;
                            if (expirationTime <= currentTime) {
                                loggedInUsers.delete(tempPass);
                                console.log("Expired token removed: ".concat(tempPass, ", user ").concat(username));
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (entriesArray_1_1 && !entriesArray_1_1.done && (_a = entriesArray_1.return)) _a.call(entriesArray_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }, 60000);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.error("Error loading user data:", error_1.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=server.js.map