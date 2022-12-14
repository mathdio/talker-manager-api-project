const express = require('express');
// const talkerJS = require('../talker');
const generateToken = require('../utils/generateToken');

const router = express.Router();

router.post('/', (req, res) => {
  // const { name, email } = req.body;

  // if (![name, email].includes(undefined)) {
    const token = generateToken();

    return res.status(200).json({ token });
});

module.exports = router;