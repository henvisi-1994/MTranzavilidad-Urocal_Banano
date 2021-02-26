// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const detalledespachoDao = require('./detalledespacho.dao');

module.exports = {

    // INSERT: Agrega un registro
    async createDetalleDespacho(detalledespacho){
        return detalledespachoDao.createDetalleDespacho(detalledespacho);
    },

    // SELECT: Devuelve todos los registros
    async getDetalleDespacho(){
        return detalledespachoDao.getDetalleDespacho();
    },

    async getIdDetalleDespacho(id){
        return detalledespachoDao.getIdDetalleDespacho(id);
    },

    //SELECT PARA DETALLES
    async getDatosAcopio(){
        return detalledespachoDao.getDatosAcopio();
    },

    // UPDATE: Actualiza un registro
    async updateDetalleDespacho(id, detalledespacho){
        return detalledespachoDao.updateDetalleDespacho(id, detalledespacho);
    },

    // DELETE: Elimina un registro
    async deleteDetalleDespacho(id){
        return detalledespachoDao.deleteDetalleDespacho(id);
    },
}