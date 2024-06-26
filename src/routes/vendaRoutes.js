const express = require('express');
const vendaController = require('../controllers/vendaController');
const router = express.Router();

router.get('/vendas', vendaController.getVendas);
router.get('/vendas/:id', vendaController.getVendaById);
router.post('/vendas', vendaController.createVenda);
router.put('/vendas/:id', vendaController.updateVenda);
router.delete('/vendas/:id', vendaController.deleteVenda);

module.exports = router;
