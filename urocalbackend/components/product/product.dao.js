// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async createProduct(product) {
        // Registro en tabla producto
        query = `INSERT INTO producto (pronombre, provariedad, procaracteristica, procodigo) VALUES 
                    ('${product.pronombre}','${product.provariedad}',
                    '${product.procaracteristica}', '${product.procodigo}')`;
        result = await pool.query(query);
    },

    async getAllProducts() {
        let query = `SELECT * FROM producto`;
        let result = await pool.query(query);
        return result.rows; // Devuelve array de productos
    },

    async getProduct(id) {
        let query = `SELECT * FROM producto WHERE productoid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve objeto de producto
    },

    async updateProduct(id, product) {
        let query = `UPDATE producto SET pronombre = '${product.pronombre}', provariedad = '${product.provariedad}', 
        procaracteristica = '${product.procaracteristica}', procodigo = '${product.procodigo}'
        WHERE productoid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si actualizó el producto y 0 sino lo hizo.
    },

    async deleteProduct(id) {
        let query = `DELETE FROM producto WHERE productoid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si borró el producto y 0 sino lo hizo.
    }
}