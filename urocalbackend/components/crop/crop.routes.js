const express = require('express');
const controller = require('./crop.controller');

const router = express.Router();

router.get('/', controller.getAllCrops);                          // Obtiene lista de productos
router.get('/:id', controller.getCrop);                          // Obtiene producto por id
router.post('/', controller.createCrop);
router.delete('/:id', controller.deleteCrop);
router.put('/:id', controller.updateCrop);

module.exports = router;