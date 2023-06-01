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

const editById = async (id, content) => {
  const talkers = await readTalkerFile();
  const editTalkers = talkers.map((t) => {
    if (t.id === id) {
      return { ...t, ...content };
    }
    return t;
  });

  await fs.writeFile(filePath, JSON.stringify(editTalkers, null, 2));
  return { id, ...content };
};

const deleteById = async (id) => {
  const talkers = await readTalkerFile();
  const newTalkers = talkers.filter((t) => t.id !== id);

  await fs.writeFile(filePath, JSON.stringify(newTalkers, null, 2));
};

const getByQuery = async (query) => {
  const talkers = await readTalkerFile();
  const searched = talkers.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase()));
  
  return searched;
};

module.exports = {
  readTalkerFile,
  getTalkerById,
  writeTalkerFile,
  editById,
  deleteById,
  getByQuery,
};