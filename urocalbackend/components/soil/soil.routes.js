const express = require('express');
const controller = require('./soil.controller');

const router = express.Router();

router.get('/', controller.getAllSoils);                          // Obtiene lista de productos
router.get('/:id', controller.getSoil);                          // Obtiene producto por id
router.post('/', controller.createSoil);
router.delete('/:id', controller.deleteSoil);
router.put('/:id', controller.updateSoil);

module.exports = router;