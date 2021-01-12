const express = require('express');
const controller = require('./product.controller');

const router = express.Router();

router.get('/', controller.getAllProducts);                          // Obtiene lista de productos
router.get('/:id', controller.getProduct);                          // Obtiene producto por id
router.post('/', controller.createProduct);
router.delete('/:id', controller.deleteProduct);
router.put('/:id', controller.updateProduct);

module.exports = router;