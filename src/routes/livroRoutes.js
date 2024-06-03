const express = require('express');
const livroController = require('../controllers/livroController');
const router = express.Router();

router.get('/livros', livroController.getLivros);
router.get('/livros/:id', livroController.getLivroById);
router.post('/livros', livroController.createLivro);
router.put('/livros/:id', livroController.updateLivro);
router.delete('/livros/:id', livroController.deleteLivro);

module.exports = router;
