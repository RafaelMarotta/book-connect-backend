const db = require('../models/db');

exports.getTrocas = async (req, res) => {
    try {
        console.log("Getting trocas");
        const [rows] = await db.query('SELECT * FROM troca');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTrocaById = async (req, res) => {
    console.log("Getting troca by id");
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM troca WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Troca não encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createTroca = async (req, res) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        
        console.log("Creating Troca");
        const { data, livro_oferecido_id, novo_livro, contato_id } = req.body;
        const { titulo, conservacao, autor, sinopse, data_cadastro, preco_estimado, preco_compra, nome_vendedor, data: data_cadastro_novo_livro } = novo_livro;
        const imagemBlob = req.file ? req.file.buffer : null;

        // Inserir na tabela compra
        const [compra] = await connection.query(
            'INSERT INTO compra (preco, nome_vendedor, data, vendedor_id) VALUES (?, ?, ?, ?)', 
            [preco_compra, nome_vendedor, data_cadastro_novo_livro, null]
        );
        const compra_id = compra.insertId;

        // Inserir o novo livro
        const [livroResult] = await connection.query(
            'INSERT INTO livro (titulo, conservacao, autor, sinopse, data_cadastro, preco_estimado, compra_id, imagem_blob) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
            [titulo, conservacao, autor, sinopse, data_cadastro, preco_estimado, compra_id, imagemBlob]
        );
        const livro_doado_id = livroResult.insertId;

        // Inserir a troca
        const [trocaResult] = await connection.query(
            'INSERT INTO troca (data, livro_oferecido_id, livro_doado_id, contato_id) VALUES (?, ?, ?, ?)', 
            [data, livro_oferecido_id, livro_doado_id, contato_id]
        );

        await connection.commit();

        res.json({ id: trocaResult.insertId, data, livro_oferecido_id, livro_doado_id, contato_id });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ error: error.message });
    } finally {
        connection.release();
    }
};

exports.updateTroca = async (req, res) => {
    console.log("Updating Troca");
    const { id } = req.params;
    const { data, livro_oferecido_id, livro_doado_id, contato_id } = req.body;
    try {
        const [result] = await db.query('UPDATE troca SET data = ?, livro_oferecido_id = ?, livro_doado_id = ?, contato_id = ? WHERE id = ?', [data, livro_oferecido_id, livro_doado_id, contato_id, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Troca não encontrada' });
        }
        res.json({ id, data, livro_oferecido_id, livro_doado_id, contato_id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTroca = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM troca WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Troca não encontrada' });
        }
        res.json({ message: 'Troca deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
