"use strict";

const { v4: uuidv4 } = require("uuid");
const loggedInUsers = require("./server");

//Refresh cookies and update object of logged in users
function refreshCookie(req, res) {
  const newTempPass = uuidv4();
  const oldTempPass = req.cookie.tempPass;
  const maxAge = req.cookie.timeToLive;

  attachCookiesToRes(res, newTempPass, maxAge);

  loggedInUsers[newTempPass] = loggedInUsers[oldTempPass];
  delete loggedInUsers[oldTempPass];
}

function createNewCookie(res, maxAge, username) {
  const tempPass = uuidv4();
  attachCookiesToRes(res, tempPass, maxAge);
  loggedInUsers[tempPass] = username;
  console.log(
    `Created cookies for user ${loggedInUsers[tempPass]}, temp pass: ${tempPass}`
  );
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

module.exports = {
  refreshCookie,
  createNewCookie,
};
