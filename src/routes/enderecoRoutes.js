const express = require('express');
const enderecoController = require('../controllers/enderecoController');
const router = express.Router();

router.post('/enderecos', enderecoController.createEndereco);

module.exports = router;
