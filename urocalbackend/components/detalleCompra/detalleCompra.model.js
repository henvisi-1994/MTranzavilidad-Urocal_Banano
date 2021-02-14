// Realiza llamadas a la base de datos
const detalleCompraDao = require('./detalleCompra.dao');

module.exports = {
    async getTodosDetalleCompra() {
        return detalleCompraDao.getTodosDetalleCompra();
    },

    async getDetalleCompra(id) {
        return detalleCompraDao.getDetalleCompra(id);
    },

    async getDatosDetalleCompra(id) {
        return detalleCompraDao.getDatosDetalleCompra(id);
    },
    //async deleteDetalleCompra(id){
    //    return detalleCompraDao.deleteDetalleCompra(id);
    //},

    async createDetalleCompra(detalleCompra) {
        return detalleCompraDao.createDetalleCompra(detalleCompra);
    },

    async updateDetalleCompra(id, detalleCompra) {
        return detalleCompraDao.updateDetalleCompra(id, detalleCompra);
    },

}