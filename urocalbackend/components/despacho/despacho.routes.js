const express = require('express');
const controller = require('./despacho.controller');    

const router = express.Router();

router.get('/', controller.getDespacho);                                   // Coleccion (plural)
router.get('/:id', controller.getIdDespacho);                                 // Documento (singular)        
router.post('/', controller.createDespacho);                                 
router.put('/:id', controller.updateDespacho);
router.delete('/:id', controller.deleteDespacho);

module.exports = router;