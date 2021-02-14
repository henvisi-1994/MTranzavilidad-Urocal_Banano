const exportadorPersonaDao = require('./ExportadorPersona.dao');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {

    // INSERT: Agrega un registro
    async crearExportador(objeto){
        return exportadorPersonaDao.crearExportador(objeto);
    },

    // SELECT: Devuelve todos los registros
    async obtenerExportadores(){
        return exportadorPersonaDao.obtenerExportadores();
    },

    // UPDATE: Actualiza un registro
    async actualizarExportador(id, objeto){
        return exportadorPersonaDao.actualizarExportador(id, objeto);
    },

    // DELETE: Elimina un registro
    async eliminarExportador(id){
        return exportadorPersonaDao.eliminarExportador(id);
    },
}