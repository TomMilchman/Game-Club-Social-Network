import { v4 as uuidv4 } from "uuid";
import loggedInUsers from "./server";

//Refresh cookies and update object of logged in users
function refreshCookies(req, res) {
  const newTempPass = uuidv4();
  const oldTempPass = req.cookie.tempPass;
  const maxAge = req.cookie.timeToLive;

  attachCookiesToRes(res, newTempPass, maxAge);

  loggedInUsers.set(newTempPass, loggedInUsers.get(oldTempPass));
  loggedInUsers.delete(oldTempPass);
}

function createNewCookies(res, maxAge: number, username: string) {
  const tempPass = uuidv4();
  attachCookiesToRes(res, tempPass, maxAge);
  loggedInUsers.set(tempPass, username);
  console.log(
    `Created cookies for user ${loggedInUsers.get(
      tempPass
    )}, temp pass: ${tempPass}`
  );
}

function deleteCookies(res, tempPass: string, timeToLive: number) {
  loggedInUsers.delete(tempPass);
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

function attachCookiesToRes(res, tempPass: string, maxAge: number) {
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

export default { refreshCookies, createNewCookies, deleteCookies };
