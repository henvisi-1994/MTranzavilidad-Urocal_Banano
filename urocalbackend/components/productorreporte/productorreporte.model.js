const productorPersonaDao = require('./productorreporte.dao');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {

    // SELECT: Devuelve todos los registros
    async obtenerProductor(id){
        return productorPersonaDao.obtenerProductor(id);
    },
}