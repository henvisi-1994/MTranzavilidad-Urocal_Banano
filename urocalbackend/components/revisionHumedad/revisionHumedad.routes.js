const express = require('express');
const controller = require('./revisionHumedad.controller');

const router = express.Router();

router.get('/almacenamiento/:id', controller.getRevisionHumedadByAlmacenamientoID);                                   // Coleccion (plural)
router.get('/:id', controller.getRevisionHumedads);                                 // Documento (singular)  
router.delete('/:id', controller.deleteRevisionHumedad);
router.post('/', controller.createRevisionHumedad); 
router.put('/', controller.updateRevisionHumedad);        


module.exports = router;