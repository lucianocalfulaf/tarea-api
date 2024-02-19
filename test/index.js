const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const tareasRoutes = require('./tareasRoutes');
require('./db');

app.use(express.json());
app.use('/api', tareasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
