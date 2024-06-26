const express = require('express');
const trocaController = require('../controllers/trocaController');
const router = express.Router();

router.get('/trocas', trocaController.getTrocas);
router.get('/trocas/:id', trocaController.getTrocaById);
router.post('/trocas', trocaController.createTroca);
router.put('/trocas/:id', trocaController.updateTroca);
router.delete('/trocas/:id', trocaController.deleteTroca);

module.exports = router;
