const express = require('express');
const controller = require('./cultivo.controller');

const router = express.Router();

router.get('/', controller.obtenerTodosCultivo);                          // Obtiene lista de productos
router.get('/detalles', controller.obtenerTodosCultivoDestalles);  
router.get('/:id', controller.obtenerCultivo);                          // Obtiene producto por id
router.post('/', controller.crearCultivo);
router.delete('/:id', controller.eliminarCultivo);
router.put('/:id', controller.actualizarCultivo);

module.exports = router;