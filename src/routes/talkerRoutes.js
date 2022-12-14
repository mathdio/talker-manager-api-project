const express = require('express');
const talkerJSON = require('../talker');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await talkerJSON.readTalkerFile();

  return res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const talker = await talkerJSON.getTalkerById(id);

  if (!talker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  
  return res.status(200).json(talker);
});

module.exports = router;