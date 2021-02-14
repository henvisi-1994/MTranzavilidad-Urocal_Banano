// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async createCleaningTool(cleaningTool) {

        let query, result;

        // Registro en tabla limpieza herramienta
        query = `INSERT INTO limpiezaherramienta
                    (limfecha, limproducto, limequipos, limmaquinaria, limherramientas, limcajones, limtendales, limoperario, cultivoid) VALUES 
                    ('${cleaningTool.limfecha}','${cleaningTool.limproducto}','${cleaningTool.limequipos}','${cleaningTool.limmaquinaria}','${cleaningTool.limherramientas}','${cleaningTool.limcajones}', '${cleaningTool.limtendales}', '${cleaningTool.limoperario}', '${cleaningTool.cultivoid}')
                    RETURNING limpiezaherramientaid;`;
        result = await pool.query(query);

        //sendEmail(PerEmail, temporal);        // No eliminar esta linea
        return cleaningTool;
    },

    async getCleaningTools() {
        let query = `SELECT lim.limpiezaherramientaid, TO_CHAR(lim.limfecha, 'YYYY-MM-DD') as limfecha, lim.limproducto, lim.limequipos, lim.limmaquinaria,
        lim.limherramientas, lim.limcajones, lim.limtendales, lim.limoperario, lim.cultivoid, c.productoid, p.pronombre FROM limpiezaherramienta lim, cultivo c, producto p
         WHERE c.cultivoid = lim.cultivoid AND c.productoid = p.productoid`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene la tabla limpieza herramienta
    },

    async getProduct() {
        let query = `SELECT  p.pronombre, c.cultivoid, c.productoid FROM producto p, cultivo c WHERE c.productoid = p.productoid`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el json del usuario encontrado
    },

    async deleteCleaningTool(id) {
        //Borrado logico
        let query = `DELETE FROM limpiezaherramienta WHERE limpiezaherramientaid = '${id}'`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró al limpieza herramienta y 0 sino lo hizo.
    },

    async updateCleaningTool(id, cleaningTool) {
        let query = `UPDATE limpiezaherramienta SET limfecha = '${cleaningTool.limfecha}', limproducto = '${cleaningTool.limproducto}', 
        limequipos = '${cleaningTool.limequipos}', limmaquinaria = '${cleaningTool.limmaquinaria}', limherramientas = '${cleaningTool.limherramientas}', 
        limcajones = '${cleaningTool.limcajones}', limtendales = '${cleaningTool.limtendales}', limoperario = '${cleaningTool.limoperario}', 
        cultivoid = '${cleaningTool.cultivoid}' WHERE limpiezaherramientaid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó al limpieza herramienta y 0 sino lo hizo.
    }
}