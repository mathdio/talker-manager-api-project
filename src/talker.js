const fs = require('fs').promises;
const { join } = require('path');

const path = './talker.json';
const filePath = join(__dirname, path);

const readTalkerFile = async () => {
  const response = await fs.readFile(filePath, 'utf-8');
  
  return JSON.parse(response);
};

const getTalkerById = async (id) => {
  const talkers = await readTalkerFile();
  const talker = talkers.find((t) => t.id === id);

  return talker;
};

const writeTalkerFile = async (content) => {
  await fs.writeFile(filePath, JSON.stringify(content, null, 2));
};

module.exports = {
  readTalkerFile,
  getTalkerById,
  writeTalkerFile,
};