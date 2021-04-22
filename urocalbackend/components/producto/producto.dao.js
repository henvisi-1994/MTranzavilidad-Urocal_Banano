// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async crearProducto(producto) {
        // Registro en tabla producto
        query = `INSERT INTO producto (pronombre, provariedad, procaracteristica, procodigo) VALUES 
                    ('${producto.pronombre}','${producto.provariedad}',
                    '${producto.procaracteristica}', '${producto.procodigo}')`;
        result = await pool.query(query);
    },

    async obtenerTodosProducto() {
        let query = `SELECT * FROM producto`;
        let result = await pool.query(query);
        return result.rows; // Devuelve array de productos
    },

    async obtenerProducto(id) {
        let query = `SELECT * FROM producto WHERE productoid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve objeto de producto
    },

    async actualizarProducto(id, producto) {
        let query = `UPDATE producto SET pronombre = '${producto.pronombre}', provariedad = '${producto.provariedad}', 
        procaracteristica = '${producto.procaracteristica}', procodigo = '${producto.procodigo}'
        WHERE productoid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si actualizó el producto y 0 sino lo hizo.
    },

    async eliminarProducto(id) {
        let query = `DELETE FROM producto WHERE productoid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si borró el producto y 0 sino lo hizo.
    },
    async obtenerDetallesCacao() {
         let query = `select concat(pronombre,' ',provariedad, ' ',procaracteristica) as tipocacao from producto 
         where lower(pronombre)='cacao';`;
        let result = await pool.query(query);
        return result.rows; // Devuelve array de productos
    },
}