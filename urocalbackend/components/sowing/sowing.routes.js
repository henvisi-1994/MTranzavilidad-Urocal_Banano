const express = require('express');
const controller = require('./sowing.controller');
//const authJWT = require('../../middlewares/authJWT');      

const router = express.Router();

router.get('/', controller.getSowings);                                   // Coleccion (plural)
router.get('/:id', controller.getSowing);                                 // Documento (singular)        
router.post('/', controller.createSowing);                                 
router.put('/:id', controller.updateSowing);        
//router.patch('/:id/update-passwd', controller.updatePasswd);            // (Controlador - verbos) POST /users/20/reset-password
router.delete('/:id', controller.deleteSowing);

module.exports = router;