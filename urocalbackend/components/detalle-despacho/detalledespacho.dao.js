// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async createDetalleDespacho(detalledespacho) {
        // Registro en tabla detalledespacho
        query = `INSERT INTO detalledespacho
                    (despachoid, almacenamientoid, detdesnumerobultos, detdespesounitario, detdespesototal) VALUES 
                    ('${detalledespacho.despachoid}','${detalledespacho.almacenamientoid}','${detalledespacho.detdesnumerobultos}','${detalledespacho.detdespesounitario}', ${detalledespacho.detdespesototal})`;
        result = await pool.query(query);
    },

    async getDetalleDespacho() {
        let query = `SELECT * FROM detalledespacho`;
        /*let query = `SELECT ta.detalledespachoid, ta.despachoid, ta.almacenamientoid, 
        ta.detdesnumerobultos, ta.detdespesounitario, ta.detdespesototal, 
        ca.centroacopioid, ca.centroacopionombre
        FROM detalledespacho ta, almacenamiento al, centroacopio ca
        WHERE ta.almacenamientoid = al.almacenamientoid AND al.centroacopioid = ca.centroacopioid;
        `;*/
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene todos los detalles de despachos realizadas
    },


    async getIdDetalleDespacho(id) {
        let query = `SELECT detalledespachoid, despachoid, almacenamientoid, detdesnumerobultos, detdespesounitario, detdespesototal
                    FROM detalledespacho
                    WHERE despachoid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del detalledespacho encontrado
    },


    // SELECT: Devuelve el select del v-selec del formulario maleza
    async getDatosAcopio() {
        let query = `SELECT al.almacenamientoid, ca.centroacopioid, ca.centroacopionombre, 
        concat('Centro de Acopio: ', ca.centroacopionombre, '   |   Propietario: ', pe.pernombres, ' ', pe.perapellidos) "detalles"
        FROM almacenamiento al, centroacopio ca, responsableacopio ra, persona pe
        WHERE al.centroacopioid = ca.centroacopioid AND ca.responsableacopioid = ra.responsableacopioid AND ra.responsableacopioid = pe.personaid;`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene todos los controles de maleza realizados
    },


    async deleteDetalleDespacho(id) {
        //Borrado logico
        let query = `DELETE FROM detalledespacho WHERE despachoid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró el detalledespacho y 0 sino lo hizo.
    },


    async updateDetalleDespacho(id, detalledespacho) {
        let query = `UPDATE detalledespacho SET almacenamientoid = '${detalledespacho.almacenamientoid}', 
        detdesnumerobultos = '${detalledespacho.detdesnumerobultos}', detdespesounitario = '${detalledespacho.detdespesounitario}', detdespesototal = '${detalledespacho.detdespesototal}' 
        WHERE despachoid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó el detalledespacho y 0 sino lo hizo.
    }
}