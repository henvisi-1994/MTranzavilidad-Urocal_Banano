const productorPersonaDao = require('./ProductorPersona.dao');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {

    // INSERT: Agrega un registro
    async crearProductor(objeto){
        return productorPersonaDao.crearProductor(objeto);
    },

    // SELECT: Devuelve todos los registros
    async obtenerProductores(){
        return productorPersonaDao.obtenerProductores();
    },
    async obtenerProductor(id){
        return productorPersonaDao.obtenerProductor(id);
    },

    // UPDATE: Actualiza un registro
    async actualizarProductor(id, objeto){
        return productorPersonaDao.actualizarProductor(id, objeto);
    },

    // DELETE: Elimina un registro
    async eliminarProductor(id){
        return productorPersonaDao.eliminarProductor(id);
    },
}