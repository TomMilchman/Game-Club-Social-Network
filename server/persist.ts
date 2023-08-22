import { promises as fs } from "fs";
import { User } from "./User";

let usersData: User[] = []; //holds up to date users' data

async function loadData(filePath: string) {
  try {
    const jsonData = await fs.readFile(filePath, "utf-8");
    const userObjects = JSON.parse(jsonData);

    const users = userObjects.map((u) => {
      return new User(
        u.username,
        u.password,
        u.email,
        u.isAdmin,
        u.currentPostId,
        u.loginActivity
      );
    });
    return users;
  } catch (error) {
    console.error("Error loading data:", error);
    throw error;
  }
}

async function saveData(filePath: string) {
  try {
    await fs.writeFile(filePath, JSON.stringify(usersData, null, 2), "utf-8");
    console.log("Data saved successfully");
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

async function loadUsersData() {
  usersData = await loadData("./users.json");
  return usersData;
}

async function saveUsersData() {
  await saveData("./users.json");
}

function findUserByUsername(username: string) {
  return usersData.find((u) => u.username === username);
}

export default { loadUsersData, saveUsersData, usersData, findUserByUsername };
