// Data Access Object
// Se comunica con la base de datos
const bcrypt = require('bcryptjs');
const pool = require('../../services/postgresql/index');
//const { getUser, updatePasswd } = require('./users.model');

module.exports = {
    async createHarvest(harvest) {

        //cosFecha, cosCantidad, cosUnidad, cosPesoTotal, cosObservacion, cosCodigo, tratamientoId, cultivoId 
        // Registro en tabla cosecha
        query = `INSERT INTO cosecha
                    (cosfecha, coscantidad, cosunidad, cospesototal, cosobservacion, coscodigo, cultivoid) VALUES 
                    ('${harvest.cosfecha}','${harvest.coscantidad}','${harvest.cosunidad}','${harvest.cospesototal}','${harvest.cosobservacion}','${harvest.coscodigo}', '${harvest.cultivoid}')
                    RETURNING cosechaid;`;
                    console.log(query);
                    result = await pool.query(query);
        
        return harvest;
    },

    async getHarvests() {
        let query = `SELECT cu.cultivoid, TO_CHAR(cosfecha, 'YYYY-MM-DD') as cosfecha, coscantidad, cosunidad, cospesototal, cosobservacion, coscodigo
        FROM cosecha co, cultivo cu,  producto pro WHERE co.cultivoid=cu.cultivoid and cu.productoid=pro.productoid`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todas las cosechas
    },

    async obtenerCosechasSinDetalleCompra() {
        let query = `SELECT * FROM cosecha c WHERE NOT EXISTS 
                    (SELECT NULL FROM detallecompra d WHERE d.detallecompraid = c.cosechaid);`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todas las cosechas
    },

    async obtenerCosechasConDetalleCompra() {
        let query = `SELECT c.*, p.pronombre
                     FROM cosecha c, detallecompra d, cultivo cu, producto p 
                     WHERE c.cosechaid = d.detallecompraid AND c.cultivoid = cu.cultivoid AND cu.productoid = p.productoid;`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todas las cosechas
    },

    async getHarvest(id) {
        let query = `SELECT * FROM cosecha WHERE cosechaid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json de la cosecha encontrada
    },

    async deleteHarvest(id) {
        //Borrado logico
        query = `DELETE FROM cosecha WHERE cosechaid = ${id}`;
        result = await pool.query(query);
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró la cosecha y 0 sino lo hizo.
    },

    async updateHarvest(id, harvest) {
        //cosFecha, cosCantidad, cosUnidad, cosPesoTotal, cosObservacion, cosCodigo, tratamientoId, cultivoId 
        let query = `UPDATE cosecha SET cosfecha = '${harvest.cosfecha}',  coscantidad = '${harvest.coscantidad}', 
        cosunidad = '${harvest.cosunidad}', cospesototal = '${harvest.cospesototal}', cosobservacion = '${harvest.cosobservacion}', 
        coscodigo = '${harvest.coscodigo}', cultivoid = '${harvest.cultivoid}' 
        WHERE cosechaid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó  y 0 sino lo hizo.
    }

}