const express = require('express');
const controller = require('./carga.controller');      

const router = express.Router();

router.get('/:id', controller.getCargas);

module.exports = router;