import { promises as fs } from "fs";
import User from "./User";

let usersData: User[] = []; //holds up to date users' data

async function loadData(filePath: string) {
  try {
    const jsonData = await fs.readFile(filePath, "utf-8");
    const userObjects = JSON.parse(jsonData);

    const users = userObjects.map((u) => {
      return new User(u._username, u._password, u._email);
    });
    return users;
  } catch (error) {
    console.error("Error loading data:", error);
    throw error;
  }
}

async function saveData(filePath: string, data: User[]) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    usersData = data;
    console.log("Data saved successfully");
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

async function loadUsersData() {
  usersData = await loadData("./users.json");
  return usersData;
}

async function saveUsersData(data) {
  await saveData("./users.json", data);
  usersData = data;
}

export default { loadUsersData, saveUsersData, usersData };
