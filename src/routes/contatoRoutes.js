const express = require('express');
const contatoController = require('../controllers/contatoController');
const router = express.Router();

// ... rotas de livros (manter as rotas existentes)

router.get('/contatos', contatoController.getContatos);
router.get('/contatos/:id', contatoController.getContatoById);
router.post('/contatos', contatoController.createContato);
router.put('/contatos/:id', contatoController.updateContato);
router.delete('/contatos/:id', contatoController.deleteContato);

module.exports = router;
