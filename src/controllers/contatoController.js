const express = require('express');
const Contato = require('../models/contatoModel');

const router = express.Router();

router.get('/contatos', async (req, res) => {
  try {
    const contatos = await Contato.find();
    res.json(contatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar contatos' });
  }
});

router.get('/contatos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const contato = await Contato.findById(id);
    if (!contato) {
      return res.status(404).json({ message: 'Contato não encontrado' });
    }
    res.json(contato);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar contato' });
  }
});

router.post('/contatos', async (req, res) => {
  const { nome, email, telefone } = req.body;

  try {
    const novoContato = new Contato({ nome, email, telefone });
    await novoContato.save();
    res.status(201).json({ message: 'Contato criado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar contato' });
  }
});

router.put('/contatos/:id', async (req, res) => {
  const id = req.params.id;
  const { nome, email, telefone } = req.body;

  try {
    const contato = await Contato.findByIdAndUpdate(id, { nome, email, telefone });
    if (!contato) {
      return res.status(404).json({ message: 'Contato não encontrado' });
    }
    res.json({ message: 'Contato atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro'

  })}
});