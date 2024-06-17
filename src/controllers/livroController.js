const db = require('../models/db');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Listar todos os livros
exports.getLivros = async (req, res) => {
    try {
        console.log("Getting livros");
        const [rows] = await db.query('SELECT id, titulo, conservacao, autor, sinopse, data_cadastro, preco_estimado, compra_id FROM livro');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to retrieve a specific livro's image blob
exports.getLivroImage = async (req, res) => {
    const livroId = req.params.id;
    try {
        console.log("Getting livro image");
        const [rows] = await db.query('SELECT imagem_blob FROM livro WHERE id = ?', [livroId]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Livro not found' });
        }
        const imageBlob = rows[0].imagem_blob;
        res.set('Content-Type', 'image/jpeg'); // Set appropriate content type
        res.send(imageBlob);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter um livro por ID
exports.getLivroById = async (req, res) => {
    console.log("Getting livro by id")
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT l.id, l.titulo, l.conservacao, l.autor, l.sinopse, l.data_cadastro, l.preco_estimado, l.compra_id, c.preco as preco_compra FROM livro as l JOIN compra c ON c.id = l.compra_id WHERE l.id = ?', [id]);
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
    console.log("Creating Livro");
    const { titulo, conservacao, autor, sinopse, data_cadastro, preco_estimado, preco_compra, nome_vendedor, data } = req.body;
    const imagemBlob = req.file ? req.file.buffer : null; // The binary data is here

    try {
        // Insert into compra table
        const [compra] = await db.query('INSERT INTO compra (preco, nome_vendedor, data, vendedor_id) VALUES (?, ?, ?, ?)', [preco_compra, nome_vendedor, data, null]);
        const compra_id = compra.insertId;

        // Insert into livro table
        const [livro] = await db.query('INSERT INTO livro (titulo, conservacao, autor, sinopse, data_cadastro, preco_estimado, compra_id, imagem_blob) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
        [titulo, conservacao, autor, sinopse, data_cadastro, preco_estimado, compra_id, imagemBlob]);
        
        res.json({ id: livro.insertId, titulo, conservacao, autor, sinopse, data_cadastro, preco_estimado, compra_id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar um livro existente
exports.updateLivro = async (req, res) => {
    console.log("Updating Livro");
    const { id } = req.params;
    const { titulo, conservacao, autor, sinopse, data_cadastro, preco_estimado, compra_id } = req.body;
    const imagemBlob = req.file ? req.file.buffer : null;

    try {
        // Build the SQL query and values dynamically
        const fields = ['titulo', 'conservacao', 'autor', 'sinopse', 'data_cadastro', 'preco_estimado', 'compra_id'];
        const values = [titulo, conservacao, autor, sinopse, data_cadastro, preco_estimado, compra_id];

        if (imagemBlob) {
            fields.push('imagem_blob');
            values.push(imagemBlob);
        }
        values.push(id);

        const setClause = fields.map(field => `${field} = ?`).join(', ');

        const [result] = await db.query(`UPDATE livro SET ${setClause} WHERE id = ?`, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.json({ id, titulo, conservacao, autor, sinopse, data_cadastro, preco_estimado, compra_id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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

// Export the upload middleware for use in routes
exports.upload = upload;
