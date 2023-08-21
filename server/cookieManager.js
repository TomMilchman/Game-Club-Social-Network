"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var server_1 = require("./server");
//Extend cookie's time to live
function refreshCookies(res, tempPass, maxAge) {
    attachCookiesToRes(res, tempPass, maxAge);
    console.log("Refreshed cookies for user ".concat(server_1.default.get(tempPass)));
}
function createNewCookies(res, maxAge, username) {
    var tempPass = (0, uuid_1.v4)();
    attachCookiesToRes(res, tempPass, maxAge);
    server_1.default.set(tempPass, username);
    console.log("Created cookies for user ".concat(server_1.default.get(tempPass), ", temp pass: ").concat(tempPass));
}
function deleteCookies(res, tempPass, maxAge) {
    var username = server_1.default.get(tempPass);
    server_1.default.delete(tempPass);
    res.cookie("tempPass", tempPass, {
        maxAge: -1,
        httpOnly: true,
    });
    res.cookie("timeToLive", maxAge, {
        maxAge: -1,
        httpOnly: true,
    });
    console.log("Deleted cookies for user ".concat(username));
}
function attachCookiesToRes(res, tempPass, maxAge) {
    res.cookie("tempPass", tempPass, {
        maxAge: maxAge,
        httpOnly: true,
    });
    res.cookie("timeToLive", maxAge, {
        maxAge: maxAge,
        httpOnly: true,
    });
}
exports.default = { refreshCookies: refreshCookies, createNewCookies: createNewCookies, deleteCookies: deleteCookies };
//# sourceMappingURL=cookieManager.js.map