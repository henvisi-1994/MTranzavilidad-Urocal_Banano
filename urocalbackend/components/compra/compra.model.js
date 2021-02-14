// Realiza llamadas a la base de datos
const compraDao = require('./compra.dao');

module.exports = {
    async getCompra(){
        return compraDao.getCompra();
    },
    async getCompras(id){
        return compraDao.getCompras(id);
    },
    async deleteCompra(id){
        return compraDao.deleteCompra(id);
    },
    async createCompra(compra){
        return compraDao.createCompra(compra);
    },
    async updateCompra(id, compra){
        return compraDao.updateCompra(id, compra);
    },

}