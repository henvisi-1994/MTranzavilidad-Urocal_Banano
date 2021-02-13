const express = require('express');
const controller = require('./detalledespacho.controller');    

const router = express.Router();

router.get('/', controller.getDetalleDespacho);                                   // Coleccion (plural)
router.get('/acopioinformacion', controller.getDatosAcopio);    
router.get('/:id', controller.getIdDetalleDespacho);                                 // Documento (singular)        
router.post('/', controller.createDetalleDespacho);                                 
router.put('/:id', controller.updateDetalleDespacho);        
router.delete('/:id', controller.deleteDetalleDespacho);

module.exports = router;