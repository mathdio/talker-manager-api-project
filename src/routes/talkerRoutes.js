const express = require('express');
const talkerJS = require('../talker');
const validateAuthorization = require('../middlewares/validateAuthorization');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateTalk = require('../middlewares/validateTalk');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const validateRate = require('../middlewares/validateRate');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await talkerJS.readTalkerFile();

  return res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const talker = await talkerJS.getTalkerById(id);

  if (!talker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  
  return res.status(200).json(talker);
});

router.post('/',
  validateAuthorization,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const talkers = await talkerJS.readTalkerFile();
    const newTalker = { id: talkers.length + 1, ...req.body };
    talkers.push(newTalker);
    await talkerJS.writeTalkerFile(talkers);
    return res.status(201).json(newTalker);
  });

router.put('/:id',
  validateAuthorization,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const id = Number(req.params.id);
    const content = req.body;
    const editedTalker = await talkerJS.editById(id, content);
    return res.status(200).json(editedTalker);
  });

module.exports = router;