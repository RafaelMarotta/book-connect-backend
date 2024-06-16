const express = require('express');
const livroController = require('../controllers/livroController');
const router = express.Router();

router.get('/livros', livroController.getLivros);
router.get('/livros/:id', livroController.getLivroById);
router.get('/livros/image/:id', livroController.getLivroImage);
router.post('/livros', livroController.upload.single('imagem'), livroController.createLivro);
router.put('/livros/:id', livroController.upload.single('imagem'), livroController.updateLivro);
router.delete('/livros/:id', livroController.deleteLivro);

module.exports = router;
