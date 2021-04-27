// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const fincaDao = require('./reportefincaproductor.dao');

module.exports = {
    async obtenerFincas(){
        return fincaDao.obtenerFincas();
    },

    async obtenerPropietario(){
        return fincaDao.obtenerPropietario();
    },

    async obtenerFincasProductor(id){
        return fincaDao.obtenerFincasProductor(id);
    },
}