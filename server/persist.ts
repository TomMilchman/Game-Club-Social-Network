import { promises as fs } from "fs";
import { User } from "./User";

let usersData: { [key: string]: User } = {}; //holds up to date users' data

async function loadData(filePath: string) {
  try {
    const jsonData = await fs.readFile(filePath, "utf-8");
    const userObjects: { [key: string]: User } = JSON.parse(jsonData);

    return userObjects;
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

export default { loadUsersData, saveUsersData, usersData };
