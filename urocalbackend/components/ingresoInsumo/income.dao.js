// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async createincome(income) {
        // Registro en tabla incomeo
        console.log("Esto tiene income ...", income)
        query = `INSERT INTO ingresoinsumo (ingresoinsumosid, inginsfechaingreso, inginsproducto, inginsfactura, inginsproveedor, inginscantidadingreso, inginsunidad, inginssaldo, ingencargado) VALUES 
                    ('${income.ingresoinsumosid}','${income.inginsfechaingreso}','${income.inginsproducto}','
                    ${income.inginsfactura}','${income.inginsproveedor}','${income.inginscantidadingreso}','
                    ${income.inginsunidad}','${income.inginssaldo}','${income.ingencargado}')`;
                    console.log("Esto tiene query ...", query)
                    result = await pool.query(query);

       
        
    },

    async getAllincomes() {
        let query = `SELECT * FROM ingresoinsumo`;
        let result = await pool.query(query);
        return result.rows; // Devuelve array de incomeos
    },

    async getincome(id) {
        let query = `SELECT * FROM ingresoinsumo WHERE ingresoinsumosid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve objeto de incomeo
    },

    async updateincome(id, income) {
        let query = `UPDATE ingresoinsumo SET 
        ingresoinsumosid = '${income.ingresoinsumosid}', inginsfechaingreso = '${income.inginsfechaingreso}', inginsproducto = '${income.inginsproducto}',
        inginsfactura = '${income.inginsfactura}', inginsproveedor = '${income.inginsproveedor}', inginscantidadingreso = '${income.inginscantidadingreso}',
        inginsunidad = '${income.inginsunidad}', inginssaldo = '${income.inginssaldo}', ingencargado = '${income.ingencargado}'
        WHERE ingresoinsumosid = '${id}'`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si actualizó el incomeo y 0 sino lo hizo.
    },

    async deleteincome(id) {
        let query = `DELETE FROM ingresoinsumo WHERE ingresoinsumosid = '${id}'`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si borró el incomeo y 0 sino lo hizo.
    }
}