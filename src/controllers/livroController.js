const db = require('../models/db');

// Listar todos os livros
exports.getLivros = async (req, res) => {
    try {
        console.log("Getting livros")
        const [rows] = await db.query('SELECT * FROM livro');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter um livro por ID
exports.getLivroById = async (req, res) => {
    console.log("Getting livro by id")
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM livro WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar um novo livro
exports.createLivro = async (req, res) => {
    console.log("Creating Livro")
    const { titulo, conservacao, autor, sinopse, data_cadastro, preco_estimado, preco_compra, nome_vendedor, data, imagem_base64 } = req.body;
    try {
        const [compra] = await db.query('INSERT INTO compra (preco, nome_vendedor, data, vendedor_id) VALUES (?, ?, ?, ?)', [preco_compra, nome_vendedor, data, null]);
        const compra_id = compra.insertId;
        const [livro] = await db.query('INSERT INTO livro (titulo, conservacao, autor, sinopse, data_cadastro, preco_estimado, compra_id, imagem_base64) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [titulo, conservacao, autor, sinopse, data_cadastro, preco_estimado, compra_id, imagem_base64]);
        res.json({ id: livro.insertId, titulo, conservacao, autor, sinopse, data_cadastro, preco_estimado, compra_id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Atualizar um livro existente
exports.updateLivro = async (req, res) => {
    console.log("Updating Livro")
    const { id } = req.params;
    const { titulo, conservacao, autor, sinopse, data_cadastro, preco_estimado, compra_id, imagem_base64 } = req.body;
    try {
        const [result] = await db.query('UPDATE livro SET titulo = ?, conservacao = ?, autor = ?, sinopse = ?, data_cadastro = ?, preco_estimado = ?, compra_id = ?, imagem_base64 = ? WHERE id = ?', [titulo, conservacao, autor, sinopse, data_cadastro, preco_estimado, compra_id, id, imagem_base64]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.json({ id, titulo, conservacao, autor, sinopse, data_cadastro, preco_estimado, compra_id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Deletar um livro
// Deletar um livro
exports.deleteLivro = async (req, res) => {
    console.log("Cheguei aqui")
    const { id } = req.params;
    try {
        console.log("Deletando livro")
        // First, fetch the compra_id
        const [rows] = await db.query('SELECT compra_id FROM livro WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }

        const compra_id = rows[0].compra_id;

        // Delete from livro first
        const [result] = await db.query('DELETE FROM livro WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }

        // Then delete from compra
        const [result2] = await db.query('DELETE FROM compra WHERE id = ?', [compra_id]);

        res.json({ message: 'Livro deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

