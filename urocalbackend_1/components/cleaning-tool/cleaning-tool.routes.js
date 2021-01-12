const express = require('express');
const controller = require('./cleaning-tool.controller');

const router = express.Router();

router.get('/', controller.getCleaningTools);                                   // Coleccion (plural)
router.get('/:id', controller.getCleaningTool);                                 // Documento (singular)        
router.post('/', controller.createCleaningTool);                                 
router.put('/:id', controller.updateCleaningTool);        
router.delete('/:id', controller.deleteCleaningTool);

module.exports = router;