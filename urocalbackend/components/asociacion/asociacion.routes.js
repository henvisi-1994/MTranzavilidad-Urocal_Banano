const express = require('express');
const controller = require('./asociacion.controller');

const router = express.Router();

router.get('/', controller.obtenerAsociaciones);                                   // Coleccion (plural)
router.get('/responsable', controller.obtenerResponsable);                                 // Documento (singular)        
router.post('/', controller.crearAsociacion);                                 
router.put('/:id', controller.actualizarAsociacion);        
router.delete('/:id', controller.eliminarAsociacion);

module.exports = router;