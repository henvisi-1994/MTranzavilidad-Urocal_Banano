// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async createDespacho(despacho) {
        //let query, result;
        // Registro en tabla despacho * Ojo con el tipo booleano, desorganico y desspp*
        query = `INSERT INTO despacho (desnumero, desfechasalida, desdestino, desmotivo, desorganico, desspp) VALUES 
                    ('${despacho.desnumero}','${despacho.desfechasalida}','${despacho.desdestino}','${despacho.desmotivo}','${despacho.desorganico}','${despacho.desspp}')
                    RETURNING despachoid`;
        result = await pool.query(query);
        return result.rows[0];
    },


    async getDespacho() {
        let query = `SELECT de.despachoid, de.desnumero, TO_CHAR(de.desfechasalida, 'YYYY-MM-DD') as desfechasalida, 
        de.desdestino, de.desmotivo, de.desorganico, de.desspp, ta.detdesnumerobultos, ta.detdespesounitario, 
        ca.centroacopioid, ca.centroacopionombre
        FROM despacho de, detalledespacho ta, almacenamiento al, centroacopio ca
        WHERE de.despachoid = ta.despachoid AND ta.almacenamientoid = al.almacenamientoid 
        AND al.centroacopioid = ca.centroacopioid;`;
        //let query = `SELECT * FROM despacho`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene todos los despachos realizadas
    },


    async getIdDespacho(id) {
        let query = `SELECT despachoid, desnumero, TO_CHAR(desfechasalida, 'YYYY-MM-DD') as desfechasalida, 
                        desdestino, desmotivo, desorganico, desspp 
                    FROM despacho WHERE despachoid = ${id}`;
        //let query = `SELECT * FROM despacho WHERE despachoid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del despacho encontrado
    },


    async deleteDespacho(id) {
        //Borrado logico
        let query = `DELETE FROM despacho WHERE despachoid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró el despacho y 0 sino lo hizo.
    },

    async updateDespacho(id, despacho) {
        let query = `UPDATE despacho SET desnumero = '${despacho.desnumero}', desfechasalida = '${despacho.desfechasalida}', 
        desdestino = '${despacho.desdestino}', desmotivo = '${despacho.desmotivo}', desorganico = '${despacho.desorganico}', desspp = '${despacho.desspp}' 
        WHERE despachoid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó el despacho y 0 sino lo hizo.
    },

}