const express = require('express');
const controller = require('./finca.controller');

const router = express.Router();

router.get('/', controller.obtenerFincas);                                   // Coleccion (plural)
router.get('/propietario', controller.obtenerPropietario);  
router.get('/detalle/:id', controller.obtenerDetalleFinca);                                    // Documento (singular)        
router.post('/', controller.crearFinca);                                 
router.put('/:id', controller.actualizarFinca);        
router.delete('/:id', controller.eliminarFinca);
router.delete('/detalle/:id', controller.eliminarDetalle);
router.get('/:id', controller.obtenerFincaProductor);


module.exports = router;