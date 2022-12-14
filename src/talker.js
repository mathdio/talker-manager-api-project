const fs = require('fs').promises;
const { join } = require('path');

const path = './talker.json';

const readTalkerFile = async () => {
  try {
    const response = await fs.readFile(join(__dirname, path), 'utf-8');
    
    return JSON.parse(response);
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

module.exports = {
  readTalkerFile,
};