const inspectorPersonaDao = require('./InspectorPersona.dao');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {

    // INSERT: Agrega un registro
    async crearInspector(objeto){
        return inspectorPersonaDao.crearInspector(objeto);
    },

    // SELECT: Devuelve todos los registros
    async obtenerInspectores(){
        return inspectorPersonaDao.obtenerInspectores();
    },

    // UPDATE: Actualiza un registro
    async actualizarInspector(id, objeto){
        return inspectorPersonaDao.actualizarInspector(id, objeto);
    },

    // DELETE: Elimina un registro
    async eliminarInspector(id){
        return inspectorPersonaDao.eliminarInspector(id);
    },
}