"use strict";
const fs = require("fs").promises;

let usersData = []; //holds up to date users' data

async function loadData(filePath) {
  try {
    const jsonData = await fs.readFile(filePath, "utf-8");
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error loading data:", error);
    throw error;
  }
}

async function saveData(filePath, jsonData) {
  try {
    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
    usersData = jsonData;
    console.log("Data saved successfully");
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

module.exports = {
  loadUsersData: () => loadData("./users.json"),
  saveUsersData: (data) => saveData("./users.json", data),
  usersData: usersData,
};
