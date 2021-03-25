const express = require('express');
const controller = require('./treatments.controller');
//const authJWT = require('../../middlewares/authJWT');      

const router = express.Router();

router.get('/', controller.getTreatments);   
router.get('/detalle/:id', controller.getDetalleTreatment);                                 // Coleccion (plural)
router.get('/:id', controller.getTreatment);                                 // Documento (singular)        
router.post('/', controller.createTreatment);                                // crea un tratamiento
router.put('/:id', controller.updateTreatment);                             //acualiza un tratamiento
router.delete('/:id', controller.deleteTreatment);                          //elimina un tratamiento

module.exports = router;