const express = require('express');
const controller = require('./certificaciones.controller');

const router = express.Router();

router.get('/', controller.obtenerCertificaciones);                                   // Coleccion (plural)
router.get('/:id', controller.obtenerCertificacion);                                 // Documento (singular)        
router.post('/', controller.crearCertificacion);                                 
router.put('/:id', controller.actualizarCertificacion);        
router.delete('/:id', controller.eliminarCertificacion);

module.exports = router;