import { v4 as uuidv4 } from "uuid";
import { loggedInUsers } from "./server";

function calculateExpirationTime(maxAge: number) {
  return Date.now() + maxAge;
}

//Extend cookie's time to live
function refreshCookies(res, tempPass: string, maxAge: number) {
  if (loggedInUsers.get(tempPass) === undefined) {
    console.log(`User with temp pass ${tempPass} not found`);
    return;
  }

  attachCookiesToRes(res, tempPass, maxAge);
}

function createNewCookies(res, maxAge: number, username: string) {
  const tempPass = uuidv4();
  const expirationTime = calculateExpirationTime(maxAge);
  attachCookiesToRes(res, tempPass, maxAge);
  loggedInUsers.set(tempPass, { username, expirationTime });
  console.log(
    `Created cookies for user ${
      loggedInUsers.get(tempPass).username
    }, temp pass: ${tempPass}`
  );
}

function deleteCookies(res, tempPass: string, maxAge: number) {
  if (loggedInUsers.get(tempPass) === undefined) {
    console.log(`User with temp pass ${tempPass} not found`);
    return;
  }

  const username = loggedInUsers.get(tempPass).username;
  loggedInUsers.delete(tempPass);
  res.cookie("tempPass", tempPass, {
    maxAge: -1,
    httpOnly: true,
  });
  res.cookie("timeToLive", maxAge, {
    maxAge: -1,
    httpOnly: true,
  });
  console.log(`Deleted cookies for user ${username}`);
}

function attachCookiesToRes(res, tempPass: string, maxAge: number) {
  res.cookie("tempPass", tempPass, {
    maxAge: maxAge,
    httpOnly: true,
  });
  res.cookie("timeToLive", maxAge, {
    maxAge: maxAge,
    httpOnly: true,
  });
}

export default { refreshCookies, createNewCookies, deleteCookies };
