const mongoose = require('mongoose');

const enderecoSchema = new mongoose.Schema({
  contatoId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contato',  
    required: true
  },
  rua: {
    type: String,
    required: true
  },
  numero: {
    type: String
  },
  bairro: {
    type: String
  },
  cidade: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    required: true
  },
  CEP: {
    type: String,
    required: true
  },
  pais: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Endereco', enderecoSchema);
