const express = require('express');
const controller = require('./responsiblecollection.controller');
//const authJWT = require('../../middlewares/authJWT');      

const router = express.Router();

router.get('/', controller.getResponsiblecollections);                                   // Coleccion (plural)
router.get('/:id', controller.getResponsiblecollection);                                 // Documento (singular)        
router.post('/', controller.createResponsiblecollection);                                 
router.put('/:id', controller.updateResponsiblecollection);        
router.delete('/:id', controller.deleteResponsiblecollection);

module.exports = router;