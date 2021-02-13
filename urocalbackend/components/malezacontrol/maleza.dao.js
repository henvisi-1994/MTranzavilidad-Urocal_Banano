// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');
//const { getUser, updatePasswd } = require('./users.model');

module.exports = {

    // INSERT: Agrega un registro
    async createMaleza(maleza) {
        let query, result;
        // Registro en tabla ControlMaleza
        query = `INSERT INTO controlmaleza
                    (confecha, conhectareas, conmetodo, conoperario, cultivoid) VALUES 
                    ('${maleza.confecha}','${maleza.conhectareas}','${maleza.conmetodo}','${maleza.conoperario}','${maleza.cultivoid}')
                    RETURNING controlmalezaid;`;
        result = await pool.query(query);
        return maleza;
    },

    // SELECT: Devuelve todos los registros
    async getMaleza() {
        let query = `Select cm.controlmalezaid, TO_CHAR(cm.confecha, 'YYYY-MM-DD') as confecha, cm.conhectareas, cm.conmetodo, 
                        cm.conoperario, cu.cultivoid, pr.pronombre, lc.lotnumero, fi.finnombrefinca 
                    FROM controlmaleza cm, cultivo cu, producto pr, lotecultivado lc, finca fi
                    WHERE cm.cultivoid = cu.cultivoid AND cu.productoid = pr.productoid AND cu.lotecultivadoid = lc.lotecultivadoid AND lc.fincaid = fi.fincaid;`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene todos los controles de maleza realizados
    },


    async getIdMaleza(id) {
        //let query = `SELECT * FROM controlmaleza WHERE controlmalezaid = ${id}`;
        let query = `Select controlmalezaid, TO_CHAR(confecha, 'YYYY-MM-DD') as confecha, conhectareas, conmetodo, conoperario, cultivoid
                    FROM controlmaleza WHERE controlmalezaid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del control de maleza encontrado
    },


    // SELECT: Devuelve el select del v-selec del formulario maleza
    async getDatosAdicionalesMaleza() {
        let query = `Select cu.cultivoid, pr.productoid, concat('Finca: ', fi.finnombrefinca, '   |   N. lote: ', lc.lotnumero, '   |   Cultivo: ', pr.pronombre) "detalles"
        FROM cultivo cu, producto pr, lotecultivado lc, finca fi
        WHERE cu.productoid = pr.productoid AND cu.lotecultivadoid = lc.lotecultivadoid 
        AND lc.fincaid = fi.fincaid;`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene todos los controles de maleza realizados
    },

    // DELETE: Elimina un registro
    async deleteMaleza(id) {
        //Borrado logico
        let query = `DELETE FROM controlmaleza WHERE controlmalezaid = '${id}'`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró el control de maleza y 0 sino lo hizo.
    },

    // UPDATE: Actualiza un registro
    async updateMaleza(id, maleza) {
        console.log("Dentro de actualizar id: " + id);
        console.log(maleza);
        let query = `UPDATE controlmaleza SET confecha = '${maleza.confecha}', conhectareas = '${maleza.conhectareas}', 
        conmetodo = '${maleza.conmetodo}', conoperario = '${maleza.conoperario}', cultivoid = '${maleza.cultivoid}' 
        WHERE controlmalezaid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó el control de maleza y 0 sino lo hizo.
    },

}