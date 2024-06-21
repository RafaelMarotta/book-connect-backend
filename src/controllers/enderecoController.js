const express = require('express');
const Endereco = require('../models/enderecoModel');

const router = express.Router();

router.get('/enderecos', async (req, res) => {
  try {
    const enderecos = await Endereco.find().populate('contatoId'); 
    res.json(enderecos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar endereços' });
  }
});

router.get('/enderecos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const endereco = await Endereco.findById(id).populate('contatoId'); 
    if (!endereco) {
      return res.status(404).json({ message: 'Endereço não encontrado' });
    }
    res.json(endereco);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar endereço' });
  }
});

router.post('/enderecos', async (req, res) => {
  const { contatoId, rua, numero, bairro, cidade, estado, CEP, pais } = req.body;

  try {
    const novoEndereco = new Endereco({ contatoId, rua, numero, bairro, cidade, estado, CEP, pais });
    await novoEndereco.save();
    res.status(201).json({ message: 'Endereço criado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar endereço' });
  }
});

router.put('/enderecos/:id', async (req, res) => {
  const id = req.params.id;
  const { rua, numero, bairro, cidade, estado, CEP, pais } = req.body;

  try {
    const endereco = await Endereco.findByIdAndUpdate(id, { rua, numero, bairro, cidade, estado, CEP, pais });
    if (!endereco) {
      return res.status(404).json({ message: 'Endereço não encontrado' });
    }
    res.json({ message: 'Endereço atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar endereço' });
  }
});

router.delete('/enderecos/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const endereco = await Endereco.findByIdAndDelete(id);
    if (!endereco) {
      return res.status(404).json({ message: 'Endereço não encontrado' });
    }
    res.json({ message: 'Endereço excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir endereço' });
  }
});

module.exports = router;
