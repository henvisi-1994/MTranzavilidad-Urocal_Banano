const express = require('express');
const controller = require('./loteCultivado.controller');

const router = express.Router();

router.get('/', controller.obtenerTodosLoteCultivado);                          // Obtiene lista de lotes cultivados
router.get('/:id', controller.obtenerLoteCultivado);                          // Obtiene lote cultivado por id
router.post('/', controller.crearLoteCultivado);
router.delete('/:id', controller.eliminarLoteCultivado);
router.put('/:id', controller.actualizarLoteCultivado);

module.exports = router;