const conductorPersonaDao = require('./ConductorPersona.dao');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {

    // INSERT: Agrega un registro
    async crearConductor(objeto){
        return conductorPersonaDao.crearConductor(objeto);
    },

    // SELECT: Devuelve todos los registros
    async obtenerConductores(){
        return conductorPersonaDao.obtenerConductores();
    },

    // UPDATE: Actualiza un registro
    async actualizarConductor(id, objeto){
        return conductorPersonaDao.actualizarConductor(id, objeto);
    },

    // DELETE: Elimina un registro
    async eliminarConductor(id){
        return conductorPersonaDao.eliminarConductor(id);
    },
}