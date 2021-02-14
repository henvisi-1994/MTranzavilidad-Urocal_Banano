const express = require('express');
const controller = require('./medioAmbiente.controller');

const router = express.Router();

router.get('/', controller.obtenerTodosMedioAmbiente);                          // Obtiene lista de productos
router.get('/:id', controller.obtenerMedioAmbiente);                          // Obtiene producto por id
router.post('/', controller.crearMedioAmbiente);
router.delete('/:id', controller.eliminarMedioAmbiente);
router.put('/:id', controller.actualizarMedioAmbiente);

module.exports = router;