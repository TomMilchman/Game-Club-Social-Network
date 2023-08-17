"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var server_1 = require("./server");
//Refresh cookies and update object of logged in users
function refreshCookies(req, res) {
    var newTempPass = (0, uuid_1.v4)();
    var oldTempPass = req.cookie.tempPass;
    var maxAge = req.cookie.timeToLive;
    attachCookiesToRes(res, newTempPass, maxAge);
    server_1.default.set(newTempPass, server_1.default.get(oldTempPass));
    server_1.default.delete(oldTempPass);
}
function createNewCookies(res, maxAge, username) {
    var tempPass = (0, uuid_1.v4)();
    attachCookiesToRes(res, tempPass, maxAge);
    server_1.default.set(tempPass, username);
    console.log("Created cookies for user ".concat(server_1.default.get(tempPass), ", temp pass: ").concat(tempPass));
}
function deleteCookies(res, tempPass, timeToLive) {
    server_1.default.delete(tempPass);
    res.cookie("tempPass", tempPass, {
        maxAge: -1,
        httpOnly: true,
        secure: true,
    });
    res.cookie("timeToLive", timeToLive, {
        maxAge: -1,
        httpOnly: true,
        secure: true,
    });
}
function attachCookiesToRes(res, tempPass, maxAge) {
    res.cookie("tempPass", tempPass, {
        maxAge: maxAge,
        httpOnly: true,
        secure: true,
        overwrite: true,
    });
    res.cookie("timeToLive", maxAge, {
        maxAge: maxAge,
        httpOnly: true,
        secure: true,
        overwrite: true,
    });
}
exports.default = { refreshCookies: refreshCookies, createNewCookies: createNewCookies, deleteCookies: deleteCookies };
//# sourceMappingURL=cookieManager.js.map