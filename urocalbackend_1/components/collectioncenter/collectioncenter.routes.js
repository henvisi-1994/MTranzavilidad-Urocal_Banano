const express = require('express');
const controller = require('./collectioncenter.controller');
//const authJWT = require('../../middlewares/authJWT');      

const router = express.Router();

router.get('/', controller.getCollectioncenters);                   // Coleccion (plural)
router.get('/:id', controller.getCollectioncenter);                 // Documento (singular)        
router.post('/', controller.createCollectioncenter);                                 
router.put('/:id', controller.updateCollectioncenter);        
router.delete('/:id', controller.deleteCollectioncenter);

module.exports = router;