// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const limpiezacaDao = require('./limpiezacentroacopio.dao');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {

    // SELECT: Devuelve todos los registros

    /*async getLimpiezaCA(){
        return limpiezacaDao.getLimpiezaCA();
    },

    async getLimpiezaCA(page, limit){
        return limpiezacaDao.getLimpiezaCA(page, limit);
    },

    async getIdLimpiezaCA(id){
        return limpiezacaDao.getIdLimpiezaCA(id);
    },*/

    async getLimpiezaCA(){
        return limpiezacaDao.getLimpiezaCA();
    },

    // INSERT: Agrega un registro

    async createLimpiezaCA(limpiezaca){
        return limpiezacaDao.createLimpiezaCA(limpiezaca);
    },

    // UPDATE: Actualiza un registro

    async updateLimpiezaCA(id, limpiezaca){
        return limpiezacaDao.updateLimpiezaCA(id, limpiezaca);
    },

    // DELETE: Elimina un registro

    async deleteLimpiezaCA(id){
        return limpiezacaDao.deleteLimpiezaCA(id);
    },
}