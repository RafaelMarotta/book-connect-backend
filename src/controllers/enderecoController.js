const db = require('../models/db');

// Inserir um novo endereço
exports.createEndereco = async (req, res) => {
    console.log("Creating Endereco");
    const { logradouro, numero, complemento, bairro, cidade, estado, pais, cep } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO endereco (logradouro, numero, complemento, bairro, cidade, estado, pais, cep) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
            [logradouro, numero, complemento, bairro, cidade, estado, pais, cep]
        );
        res.json({ id: result.insertId, logradouro, numero, complemento, bairro, cidade, estado, pais, cep });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
