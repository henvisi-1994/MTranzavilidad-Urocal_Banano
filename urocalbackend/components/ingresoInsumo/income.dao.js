// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async createincome(income) {
        // Registro en tabla incomeo
        console.log("Esto tiene income ...", income)
        query = `INSERT INTO ingresoinsumo (inginsfechaingreso, inginsproducto, inginsfactura, inginsproveedor, inginscantidadingreso, inginsunidad, inginssaldo, ingencargado, centroacopioid) VALUES 
                    ('${income.inginsfechaingreso}','${income.inginsproducto}',
                    '${income.inginsfactura}','${income.inginsproveedor}','${income.inginscantidadingreso}',
                    '${income.inginsunidad}','${income.inginssaldo}','${income.ingencargado}', '${income.centroacopioid}')`;
                    //console.log("Esto tiene query ...", query)
                    result = await pool.query(query);

       
        
    },

    async getAllincomes() {
        let query = `SELECT ingresoinsumosid, TO_CHAR(inginsfechaingreso, 'YYYY-MM-DD') as inginsfechaingreso, inginsproducto,inginsfactura,inginsproveedor,inginscantidadingreso, inginsunidad, inginssaldo, ingencargado,centroacopioid FROM ingresoinsumo`;
        let result = await pool.query(query);
        //console.log("Esto tiene income ...", result)
        return result.rows; // Devuelve array de incomeos
    },

    async getincome(id) {
        let query = `SELECT ingresoinsumosid, TO_CHAR(inginsfechaingreso, 'YYYY-MM-DD') as inginsfechaingreso, inginsproducto,inginsfactura,inginsproveedor,inginscantidadingreso, inginsunidad, inginssaldo, ingencargado,centroacopioid FROM ingresoinsumo
        WHERE ingresoinsumosid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve objeto de incomeo
    },

    async updateincome(id, income) {
        let query = `UPDATE ingresoinsumo SET 
        inginsfechaingreso = '${income.inginsfechaingreso}', inginsproducto = '${income.inginsproducto}',
        inginsfactura = '${income.inginsfactura}', inginsproveedor = '${income.inginsproveedor}', inginscantidadingreso = '${income.inginscantidadingreso}',
        inginsunidad = '${income.inginsunidad}', inginssaldo = '${income.inginssaldo}', ingencargado = '${income.ingencargado}', centroacopioid = '${income.centroacopioid}'
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