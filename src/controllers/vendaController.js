const db = require('../models/db');

// Listar todas as vendas
exports.getVendas = async (req, res) => {
    try {
        console.log("Getting vendas")
        const [rows] = await db.query('SELECT * FROM venda');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter uma venda por ID
exports.getVendaById = async (req, res) => {
    console.log("Getting venda by id")
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM venda WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Venda não encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Criar uma nova venda
exports.createVenda = async (req, res) => {
    console.log("Creating Venda")
    const { valor, cliente_id, data_venda, delivery, valor_frete, endereco_id } = req.body;
    try {
        const [result] = await db.query('INSERT INTO venda (valor, cliente_id, data_venda, delivery, valor_frete, endereco_id) VALUES (?, ?, ?, ?, ?, ?)', [valor, cliente_id, data_venda, delivery, valor_frete, endereco_id]);
        res.json({ id: result.insertId, valor, cliente_id, data_venda, delivery, valor_frete, endereco_id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar uma venda existente
exports.updateVenda = async (req, res) => {
    console.log("Updating Venda")
    const { id } = req.params;
    const { valor, cliente_id, data_venda, delivery, valor_frete, endereco_id } = req.body;
    try {
        const [result] = await db.query('UPDATE venda SET valor = ?, cliente_id = ?, data_venda = ?, delivery = ?, valor_frete = ?, endereco_id = ? WHERE id = ?', [valor, cliente_id, data_venda, delivery, valor_frete, endereco_id, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Venda não encontrada' });
        }
        res.json({ id, valor, cliente_id, data_venda, delivery, valor_frete, endereco_id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Deletar uma venda
exports.deleteVenda = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM venda WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Venda não encontrada' });
        }
        res.json({ message: 'Venda deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
