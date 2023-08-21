import { v4 as uuidv4 } from "uuid";
import loggedInUsers from "./server";

//Extend cookie's time to live
function refreshCookies(res, tempPass: string, maxAge: number) {
  attachCookiesToRes(res, tempPass, maxAge);
  console.log(`Refreshed cookies for user ${loggedInUsers.get(tempPass)}`);
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

function deleteCookies(res, tempPass: string, maxAge: number) {
  const username = loggedInUsers.get(tempPass);
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
