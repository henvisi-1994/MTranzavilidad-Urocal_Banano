const express = require('express');
const controller = require('./sowing.controller');

const router = express.Router();

router.get('/', controller.getSowings);                                   // Coleccion (plural)
router.get('/sowinginformacion', controller.getDatosDetalleSowing); 
router.get('/:id', controller.getSowing);                                 // Documento (singular)        
router.post('/', controller.createSowing);                                 
router.put('/:id', controller.updateSowing);        
router.delete('/:id', controller.deleteSowing);

module.exports = router;