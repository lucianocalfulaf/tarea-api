const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
  titulo: String,
  completado: Boolean
});

module.exports = mongoose.model('Tarea', tareaSchema);
