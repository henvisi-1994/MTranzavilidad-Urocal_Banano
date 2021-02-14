// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const despachoDao = require('./despacho.dao');

module.exports = {
    
    async createDespacho(despacho){
        return despachoDao.createDespacho(despacho);
    },

    async getDespacho(){
        return despachoDao.getDespacho();
    },

    async getIdDespacho(id){
        return despachoDao.getIdDespacho(id);
    },

    async updateDespacho(id, despacho){
        return despachoDao.updateDespacho(id, despacho);
    },

    async deleteDespacho(id){
        return despachoDao.deleteDespacho(id);
    },
}