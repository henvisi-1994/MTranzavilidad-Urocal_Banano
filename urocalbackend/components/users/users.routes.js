const express = require('express');
const controller = require('./users.controller');
const authJWT = require('../../middlewares/authJWT');      

const router = express.Router();

router.get('/', controller.getUsers);                                   // Coleccion (plural)
router.get('/:id', controller.getPersona);                              // Documento (singular)        
router.post('/', controller.createUser);                                 
router.put('/:id', controller.updateUser);        
router.patch('/:id/update-passwd', controller.updatePasswd);            // (Controlador - verbos) POST /users/20/reset-password
//router.delete('/:id', controller.deleteUser);                         // Se aplica borrado lógico en Update

module.exports = router;