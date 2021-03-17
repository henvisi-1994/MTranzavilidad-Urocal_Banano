// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores
//const userDto = require('./users.dto');

const modeloVehiculo = require('./vehiculo.model');
const validation = require('../../utils/validations');

module.exports = {

    // Obtener todos los productos
    async obtenerTodosVehiculos(req, res) {
        const result = await modeloVehiculo.obtenerTodosVehiculo()
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(result); // <--
    },
}
