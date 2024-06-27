const express = require('express');
const trocaController = require('../controllers/trocaController');
const multer = require('multer');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/trocas', trocaController.getTrocas);
router.get('/trocas/:id', trocaController.getTrocaById);
router.post('/trocas', upload.single('imagem'), trocaController.createTroca);
router.put('/trocas/:id', upload.single('imagem'), trocaController.updateTroca);
router.delete('/trocas/:id', trocaController.deleteTroca);

module.exports = router;
