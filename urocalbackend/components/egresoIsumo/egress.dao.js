// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async createegress(egress) {
        // Registro en tabla egresso

        console.log('Esto contiene egress ', egress)
        query = `INSERT INTO egresoinsumo (egrinsfechaegreso, egrinsparacontrolar, egrinsdosis,egrinscantidadentregada,egrencargado,ingresoinsumosid,fincaid) VALUES 
                    ('${egress.egrinsfechaegreso}',
                    '${egress.egrinsparacontrolar}', '${egress.egrinsdosis}',
                    '${egress.egrinscantidadentregada}', '${egress.egrencargado}',
                    '${egress.ingresoinsumosid}', '${egress.fincaid}')`;
                    console.log("Esto tiene query ...", query)
                    result = await pool.query(query);
    },

    async getAllegresss() {
        /*let query = `SELECT * FROM egresoinsumo`;*/
        let query = `Select eg.egresoinsumosid, ig.inginsproducto, fi.finnombrefinca, TO_CHAR(eg.egrinsfechaegreso, 'YYYY-MM-DD') as egrinsfechaegreso, 
        eg.egrinsparacontrolar, eg.egrinsdosis, eg.egrinscantidadentregada, eg.egrencargado
        FROM egresoinsumo eg, ingresoinsumo ig, finca fi
        WHERE eg.ingresoinsumosid = ig.ingresoinsumosid AND eg.fincaid = fi.fincaid;`;
        let result = await pool.query(query);
        console.log(result.rows);
        return result.rows; // Devuelve array de egressos
    },

    async getegress(id) {
        let query = `SELECT * FROM egresoinsumo WHERE egresoinsumosid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve objeto de egresso
    },

    async updateegress(id, egress) {
        let query = `UPDATE egresoinsumo SET 
        egresoinsumosid = '${egress.egresoinsumosid}', egrinsfechaegreso = '${egress.egrinsfechaegreso}', egrinsparacontrolar = '${egress.egrinsparacontrolar}',
        egrinsdosis = '${egress.egrinsdosis}', egrinscantidadentregada = '${egress.egrinscantidadentregada}', egrencargado = '${egress.egrencargado}',
        ingresoinsumosid = '${egress.ingresoinsumosid}'
        WHERE egresoinsumosid = '${id}'`;
        console.log("Este id viene por parametro", id)
        console.log("Esto tiene query ...", query)
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si actualizó el egresso y 0 sino lo hizo.
    },

    async deleteegress(id) {
        let query = `DELETE FROM egresoinsumo WHERE egresoinsumosid = '${id}'`;

        console.log("esto contiene query.. ", query)
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si borró el egresso y 0 sino lo hizo.
    }
}