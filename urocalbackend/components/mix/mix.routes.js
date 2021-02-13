const express = require('express');
const controller = require('./mix.controller');

const router = express.Router();

router.get('/', controller.getMix);                                   // Coleccion (plural)
router.get('/:id', controller.getMixs);                                 // Documento (singular)  
router.delete('/:id', controller.deleteMix);
router.post('/', controller.createMix);
router.put('/:id', controller.updateMix);


module.exports = router;    