"use strict";
const fs = require('fs').promises;

async function loadData(filePath) {
    try {
      const jsonData = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(jsonData);
    } catch (error) {
      console.error('Error loading data:', error);
      throw error; 
    }
}
  
async function saveData(filePath, data) {
    try {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
}

module.exports = {
    loadUsersData: () => loadData('./users.json'),
    saveUsersData: data => saveData('./users.json', data),
};