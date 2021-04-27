const express = require('express');
const controller = require('./empresa.controller');
const router = express.Router();

router.get('/', controller.getAllempresas);                          // Obtiene lista de eempresaos
router.get('/:id', controller.getempresa);                          // Obtiene eempresao por id
router.post('/', controller.createempresa);
router.delete('/:id', controller.deleteempresa);
router.put('/:id', controller.updateempresa);

module.exports = router;