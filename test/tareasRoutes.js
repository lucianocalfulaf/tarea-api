const express = require('express');
const router = express.Router();
const Tarea = require('./tareaModel');

// Ruta para listar todas las tareas
router.get('/tareas', async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.json(tareas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ruta para obtener una tarea por su identificador
router.get('/tareas/:id', getTarea, (req, res) => {
  res.json(res.tarea);
});

// Ruta para crear una nueva tarea
router.post('/tareas', async (req, res) => {
  const tarea = new Tarea({
    titulo: req.body.titulo,
    completado: req.body.completado
  });

  try {
    const nuevaTarea = await tarea.save();
    res.status(201).json(nuevaTarea);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta para actualizar una tarea existente
router.patch('/tareas/:id', getTarea, async (req, res) => {
  if (req.body.titulo != null) {
    res.tarea.titulo = req.body.titulo;
  }
  if (req.body.completado != null) {
    res.tarea.completado = req.body.completado;
  }
  try {
    const tareaActualizada = await res.tarea.save();
    res.json(tareaActualizada);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Ruta para borrar una tarea
router.delete('/tareas/:id', getTarea, async (req, res) => {
  try {
    await Tarea.deleteOne({ _id: req.params.id }); // Utiliza deleteOne para eliminar la tarea por su ID
    res.json({ message: 'Tarea eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware para obtener una tarea por su identificador
async function getTarea(req, res, next) {
  let tarea;
  try {
    tarea = await Tarea.findById(req.params.id);
    if (tarea == null) {
      return res.status(404).json({ message: 'No se encontró la tarea' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.tarea = tarea;
  next();
}

module.exports = router;
