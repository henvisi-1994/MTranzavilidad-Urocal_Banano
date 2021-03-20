// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const fincaDao = require('./finca.dao');

module.exports = {
    async obtenerFincas(){
        return fincaDao.obtenerFincas();
    },

    async obtenerPropietario(){
        return fincaDao.obtenerPropietario();
    },

    async crearFinca(finca){
        return fincaDao.crearFinca(finca);
    },

    async actualizarFinca(id, finca){
        return fincaDao.actualizarFinca(id, finca);
    },

    async eliminarFinca(id){
        return fincaDao.eliminarFinca(id);
    },
    async obtenerFincaProductor(id){
        return fincaDao.obtenerFincaProductor(id);
    },
}