const express = require('express');
const controller = require('./environment.controller');

const router = express.Router();

router.get('/', controller.getAllEnvironment);                          // Obtiene lista de productos
router.get('/:id', controller.getEnvironment);                          // Obtiene producto por id
router.post('/', controller.createEnvironment);
router.delete('/:id', controller.deleteEnvironment);
router.put('/:id', controller.updateEnvironment);

module.exports = router;