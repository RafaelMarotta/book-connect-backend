const express = require('express');
const cors = require('cors');  // Import the cors package
const livroRoutes = require('./routes/livroRoutes');
const vendaRoutes = require('./routes/vendaRoutes');
const trocaRoutes = require('./routes/trocaRoutes');
const enderecoRoutes = require('./routes/enderecoRoutes'); // Import the endereco routes

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', livroRoutes);
app.use('/api', vendaRoutes);
app.use('/api', trocaRoutes);
app.use('/api', enderecoRoutes); // Use the endereco routes


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
