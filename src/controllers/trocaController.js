const db = require('../models/db');

// Listar todas as trocas
exports.getTrocas = async (req, res) => {
    try {
        console.log("Getting trocas")
        const [rows] = await db.query('SELECT * FROM troca');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter uma troca por ID
exports.getTrocaById = async (req, res) => {
    console.log("Getting troca by id")
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

// Criar uma nova troca
exports.createTroca = async (req, res) => {
    console.log("Creating Troca")
    const { data, livro_oferecido_id, livro_doado_id, contato_id } = req.body;
    try {
        const [result] = await db.query('INSERT INTO troca (data, livro_oferecido_id, livro_doado_id, contato_id) VALUES (?, ?, ?, ?)', [data, livro_oferecido_id, livro_doado_id, contato_id]);
        res.json({ id: result.insertId, data, livro_oferecido_id, livro_doado_id, contato_id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar uma troca existente
exports.updateTroca = async (req, res) => {
    console.log("Updating Troca")
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

// Deletar uma troca
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
