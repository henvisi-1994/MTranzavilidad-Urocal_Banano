// Maneja la lógica del negocio
// No saben cómo funciona la base de datos
// Realiza llamadas a la base de datos
const productoDao = require('./producto.dao');

module.exports = {
    async crearProducto(producto) {
        return productoDao.crearProducto(producto);
    },

    async obtenerTodosProducto() {
        return productoDao.obtenerTodosProducto();
    },

    async obtenerProducto(id) {
        return productoDao.obtenerProducto(id);
    },

    async actualizarProducto(id, producto) {
        return productoDao.actualizarProducto(id, producto);
    },

    async eliminarProducto(id) {
        return productoDao.eliminarProducto(id);
    },
    async obtenerDetallesCacao() {
        return  productoDao.obtenerDetallesCacao();
    }

}