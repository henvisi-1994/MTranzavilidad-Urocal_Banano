const { obtenerFacturaExportacion } = require('./FacturaExport.dao');
const facturaExportDao = require('./FacturaExport.dao');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {
    // INSERT: Agrega un registro
    async crearFacturaExport(objeto) {
        return facturaExportDao.crearFacturaExport(objeto);
    },

    // SELECT: Devuelve todos los registros
    async obtenerFacturaExportes() {
        return facturaExportDao.obtenerFacturaExportes();
    },
    // SELECT: Devuelve todos los registros
    async obtenerFacturaExportacion(id) {
        return facturaExportDao.obtenerFacturaExportacion(id);
    },

    // UPDATE: Actualiza un registro
    async actualizarFacturaExport(id, objeto) {
        return facturaExportDao.actualizarFacturaExport(id, objeto);
    },

    // DELETE: Elimina un registro
    async eliminarFacturaExport(id) {
        return facturaExportDao.eliminarFacturaExport(id);
    },
}