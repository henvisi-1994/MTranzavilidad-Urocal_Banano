const express = require('express');
const controller = require('./almacenamiento.controller');

const router = express.Router();

router.get('/', controller.getAlmacenamiento);                                   // Coleccion (plural)
router.get('/:id', controller.getAlmacenamientos);                                 // Documento (singular)      
router.delete('/:id', controller.deleteAlmacenamiento);
router.post('/', controller.createAlmacenamiento); 
router.put('/:id', controller.updateAlmacenamiento);        


module.exports = router;