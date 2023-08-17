"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4 = require("uuid").v4;
var loggedInUsers = require("./server");
//Refresh cookies and update object of logged in users
function refreshCookie(req, res) {
    var newTempPass = uuidv4();
    var oldTempPass = req.cookie.tempPass;
    var maxAge = req.cookie.timeToLive;
    attachCookiesToRes(res, newTempPass, maxAge);
    loggedInUsers[newTempPass] = loggedInUsers[oldTempPass];
    delete loggedInUsers[oldTempPass];
}
function createNewCookie(res, maxAge, username) {
    var tempPass = uuidv4();
    attachCookiesToRes(res, tempPass, maxAge);
    loggedInUsers[tempPass] = username;
    console.log("Created cookies for user ".concat(loggedInUsers[tempPass], ", temp pass: ").concat(tempPass));
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
exports.default = { refreshCookie: refreshCookie, createNewCookie: createNewCookie };
//# sourceMappingURL=cookieManager.js.map