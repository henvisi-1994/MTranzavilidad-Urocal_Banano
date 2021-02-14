const express = require('express');
const controller = require('./compra.controller');

const router = express.Router();

router.get('/', controller.getCompra);                                   // Coleccion (plural)
router.get('/:id', controller.getCompras);                                 // Documento (singular)  
router.delete('/:id', controller.deleteCompra);
router.post('/', controller.createCompra); 
router.put('/:id', controller.updateCompra);        


module.exports = router;