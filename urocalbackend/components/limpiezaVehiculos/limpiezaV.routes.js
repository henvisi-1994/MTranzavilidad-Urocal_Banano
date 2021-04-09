const express = require('express');
const controller = require('./limpiezaV.controller');      

const router = express.Router();

router.get('/todos', controller.getLimpiezasV);
router.get('/todos/:id', controller.getLimpiezasVProductor);
router.get('/:id', controller.getLimpiezaV);
router.post('/', controller.createLimpiezaV);
router.put('/:id', controller.updateLimpiezaV);
router.delete('/:id', controller.deleteLimpiezaV);


module.exports = router;