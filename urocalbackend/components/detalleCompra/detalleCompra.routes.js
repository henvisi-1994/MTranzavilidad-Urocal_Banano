const express = require('express');
const controller = require('./detalleCompra.controller');

const router = express.Router();

router.get('/', controller.getTodosDetalleCompra);                                   // Coleccion (plural)
router.get('/:id', controller.getDetalleCompra);                                 // Documento (singular)  
router.get('/datos/:id', controller.getDatosDetalleCompra);
//router.delete('/:id', controller.deleteDetalleCompra);
router.post('/', controller.createDetalleCompra);
router.put('/:id', controller.updateDetalleCompra);


module.exports = router;