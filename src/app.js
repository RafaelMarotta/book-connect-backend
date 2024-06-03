const express = require('express');
const cors = require('cors');  // Import the cors package
const livroRoutes = require('./routes/livroRoutes');

const app = express();

app.use(express.json());
app.use(cors())

app.use('/api', livroRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});