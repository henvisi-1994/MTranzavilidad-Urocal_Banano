const express = require('express');
const controller = require('./income.controller');
const router = express.Router();

router.get('/', controller.getAllincomes);                          // Obtiene lista de incomeos
router.get('/:id', controller.getincome);                          // Obtiene incomeo por id
router.post('/', controller.createincome);
router.delete('/:id', controller.deleteincome);
router.put('/:id', controller.updateincome);

module.exports = router;