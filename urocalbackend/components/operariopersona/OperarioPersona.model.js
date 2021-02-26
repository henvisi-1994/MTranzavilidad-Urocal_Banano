const operarioPersonaDao = require('./OperarioPersona.dao');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {

    // INSERT: Agrega un registro
    async crearOperario(objeto){
        return operarioPersonaDao.crearOperario(objeto);
    },

    // SELECT: Devuelve todos los registros
    async obtenerOperarios(){
        return operarioPersonaDao.obtenerOperarios();
    },

    // UPDATE: Actualiza un registro
    async actualizarOperario(id, objeto){
        return operarioPersonaDao.actualizarOperario(id, objeto);
    },

    // DELETE: Elimina un registro
    async eliminarOperario(id){
        return operarioPersonaDao.eliminarOperario(id);
    },
}