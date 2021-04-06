// Data Access Object
// Se comunica con la base de datos
const bcrypt = require('bcryptjs');
const { query } = require('../../services/postgresql/index');
const pool = require('../../services/postgresql/index');
//const { getUser, updatePasswd } = require('./users.model');

module.exports = {
    async createHarvest(harvest) {

        //cosFecha, cosCantidad, cosUnidad, cosPesoTotal, cosObservacion, cosCodigo, tratamientoId, cultivoId 
        // Registro en tabla cosecha
        let query = `INSERT INTO cosecha
                    (cosfecha, coscantidad, cosunidad, cospesototal, cosobservacion, coscodigo, tratamientoid, cultivoid) VALUES 
                    ('${harvest.cosfecha}','${harvest.coscantidad}','${harvest.cosunidad}','${harvest.cospesototal}','${harvest.cosobservacion}','${harvest.coscodigo}',null, '${harvest.cultivoid}')
                    RETURNING cosechaid;`;
                    
        result = await pool.query(query);

        return harvest;
    },

    async getHarvests() {
        let query = `SELECT co.cosechaid, cu.cultivoid, TO_CHAR(cosfecha, 'YYYY-MM-DD') as cosfecha, coscantidad, cosunidad, cospesototal, cosobservacion, coscodigo, cu.lotecultivadoid, lo.fincaid, CONCAT(pronombre, ' ',provariedad) AS cultivo
        FROM cosecha co INNER JOIN cultivo cu ON cu.cultivoid=co.cultivoid INNER JOIN lotecultivado lo ON lo.lotecultivadoid = cu.cultivoid INNER JOIN producto pr ON pr.productoid = cu.productoid;`;

        /*let query = `SELECT co.cosechaid, TO_CHAR(co.cosfecha, 'YYYY-MM-DD') AS cosfecha, co.coscantidad, co.cosunidad, co.cospesototal, co.cosobservacion,
        co.coscodigo, tr.tratamientoid, cu.cultivoid FROM cosecha co, tratamiento tr, cultivo cu WHERE co.cultivoid = cu.cultivoid AND co.tratamientoid = tr.tratamientoid`;      */
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
        let query = `SELECT co.cosechaid, cu.cultivoid, TO_CHAR(cosfecha, 'YYYY-MM-DD') as cosfecha, coscantidad, cosunidad, cospesototal, cosobservacion, coscodigo, cu.lotecultivadoid, lo.fincaid, CONCAT(pronombre, ' ',provariedad) AS cultivo
        FROM cosecha co INNER JOIN cultivo cu ON cu.cultivoid=co.cultivoid INNER JOIN lotecultivado lo ON lo.lotecultivadoid = cu.cultivoid INNER JOIN producto pr ON pr.productoid = cu.productoid WHERE co.cosechaid = ${id}`;
       /* let query = `SELECT cosechaid, TO_CHAR(cosfecha, 'YYYY-MM-DD') as cosfecha, coscantidad, cosunidad, 
        cospesototal, cosobservacion, coscodigo, tratamientoid, cultivoid FROM cosecha WHERE cosechaid = ${id}`;*/
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json de la cosecha encontrada
    },

    async deleteHarvest(id) {
        //Borrado logico        
        let query = `DELETE FROM cosecha WHERE cosechaid = ${id}`;
        console.log(query);
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