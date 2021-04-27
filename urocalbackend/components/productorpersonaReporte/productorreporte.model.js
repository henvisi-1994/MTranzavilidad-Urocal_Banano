const productorPersonaDao = require('./productorreporte.dao');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {

    // SELECT: Devuelve todos los registros
    async obtenerProductores(){
        return productorPersonaDao.obtenerProductores();
    },

    // SELECT: Devuelve todos los registros
    async obtenerProductor(id){
        return productorPersonaDao.obtenerProductor(id);
    },

    // SELECT: Devuelve todos los registros
    async obtenerProductoresMasculino(){
        return productorPersonaDao.obtenerProductoresMasculino();
    },

    // SELECT: Devuelve todos los registros
    async obtenerProductoresFemenino(){
        return productorPersonaDao.obtenerProductoresFemenino();
    },
}