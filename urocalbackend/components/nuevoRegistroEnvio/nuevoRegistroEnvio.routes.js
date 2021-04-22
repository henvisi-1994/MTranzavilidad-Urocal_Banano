const express = require('express');
const controller = require('./nuevoRegistroEnvio.controller');      

const router = express.Router();

router.get('/todos', controller.getnuevoRegistroEnvios);
router.get('/detalles', controller.getSeleccionDetalles);
router.get('/detalleenvio/:id', controller.getDetalleEnvio);
router.get('/:id', controller.getnuevoRegistroEnvio);
router.post('/', controller.createnuevoRegistroEnvio);
router.put('/:id', controller.updatenuevoRegistroEnvio);
router.delete('/:id', controller.deletenuevoRegistroEnvio);

module.exports = router;