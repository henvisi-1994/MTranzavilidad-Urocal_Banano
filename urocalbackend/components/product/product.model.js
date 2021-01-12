// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const productDao = require('./product.dao');

module.exports = {
    async createProduct(product) {
        return productDao.createProduct(product);
    },

    async getAllProducts() {
        return productDao.getAllProducts();
    },

    async getProduct(id) {
        return productDao.getProduct(id);
    },

    async updateProduct(id, product) {
        return productDao.updateProduct(id, product);
    },

    async deleteProduct(id) {
        return productDao.deleteProduct(id);
    }
}