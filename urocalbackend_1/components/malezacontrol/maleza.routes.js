const express = require('express');
const controller = require('./maleza.controller');
//const authJWT = require('../../middlewares/authJWT');      

const router = express.Router();

router.get('/', controller.getMaleza);                                   // Coleccion (plural)
router.get('/:id', controller.getIdMaleza);                                 // Documento (singular)        
router.post('/', controller.createMaleza);                                 
router.put('/:id', controller.updateMaleza);        
//router.patch('/:id/update-passwd', controller.updatePasswd);            // (Controlador - verbos) POST /users/20/reset-password
router.delete('/:id', controller.deleteMaleza);

module.exports = router;