const fs = require('fs').promises;
const { join } = require('path');

const path = './talker.json';

const readTalkerFile = async () => {
  const response = await fs.readFile(join(__dirname, path), 'utf-8');
  
  return JSON.parse(response);
};

const getTalkerById = async (id) => {
    const talkers = await readTalkerFile();
    const talker = talkers.find((t) => t.id === id);

    return talker;
};

module.exports = {
  readTalkerFile,
  getTalkerById,
};