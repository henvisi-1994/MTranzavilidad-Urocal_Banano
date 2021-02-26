// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {

    // INSERT: Agrega un registro
    async createLimpiezaCA(limpiezaca) {

        let query, result;

        // Registro en tabla limpiezacentroacopio
        query = `INSERT INTO limpiezacentroacopio
                    (limcenfecha, limcenareas, limcenmateriales, limcenproductos, limcenmotivo, centroacopioid) VALUES 
                    ('${limpiezaca.limcenfecha}','${limpiezaca.limcenareas}','${limpiezaca.limcenmateriales}','${limpiezaca.limcenproductos}','${limpiezaca.limcenmotivo}','${limpiezaca.centroacopioid}')
                    RETURNING limpiezacentroacopioid;`;
        result = await pool.query(query);

        return limpiezaca;
    },

    // SELECT: Devuelve todos los registros
    async getLimpiezaCA() {
        let query = `SELECT lca.limpiezacentroacopioid, TO_CHAR(lca.limcenfecha, 'YYYY-MM-DD') as limcenfecha, 
                        lca.limcenareas, lca.limcenmateriales, lca.limcenproductos, 
                        lca.limcenmotivo, ca.centroacopioid, ca.centroacopionombre
                    FROM limpiezacentroacopio lca, centroacopio ca 
                    WHERE lca.centroacopioid = ca.centroacopioid;`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene todas las Limpiezas del centro de acopio realizadas
    },


    async getIdLimpiezaCA(id) {
        let query = `SELECT * FROM vista_limpiezacentroacopio WHERE limpiezacentroacopioid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json de la Limpieza del centro de acopio encontrada
    },

    
    // DELETE: Elimina un registro
    async deleteLimpiezaCA(id) {
        //Borrado logico
        let query = `DELETE FROM limpiezacentroacopio WHERE limpiezacentroacopioid = '${id}'`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró la Limpieza del centro de acopio y 0 sino lo hizo.
    },


    // UPDATE: Actualiza un registro
    async updateLimpiezaCA(id, limpiezaca) {
        console.log("Dentro de actualizar id: " + id);
        console.log(limpiezaca);
        let query = `UPDATE limpiezacentroacopio SET limcenfecha = '${limpiezaca.limcenfecha}', limcenareas = '${limpiezaca.limcenareas}', 
        limcenmateriales = '${limpiezaca.limcenmateriales}', limcenproductos = '${limpiezaca.limcenproductos}', limcenmotivo = '${limpiezaca.limcenmotivo}', centroacopioid = '${limpiezaca.centroacopioid}' 
        WHERE limpiezacentroacopioid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó la Limpieza del centro de acopio y 0 sino lo hizo.
    },
}