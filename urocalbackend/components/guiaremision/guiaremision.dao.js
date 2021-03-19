
const pool = require('../../services/postgresql/index');
const format = require('pg-format');

module.exports = {

    async getGuiaRemisiones() {
        let query = `SELECT * FROM guiaremision`;
        let result = await pool.query(query);
        return result.rows;
    },

    async getGuiaRemision(id) {
        let query = `SELECT * FROM guiaremision WHERE guiaremisionid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0];
    },

    async createGuiaRemision(guiaremision) {
        let query, result;
        

        query = `INSERT INTO guiaremision
                    (guiserie, guinumero, guifechaemision, guifechainicio, guihorainicio, guifechafin, guihorafin, guipuntoinicio, guipuntofin, guicomprobanteventa, guimotivo, guidestinatario, guiformapago, guiobservacion, guiemiteurocal, conductorid, vehiculoid, productorid) VALUES
                    ('${guiaremision.guiserie}','${parseInt(guiaremision.guinumero)}','${guiaremision.guifechaemision}','${guiaremision.guifechainicio}','${guiaremision.guihorainicio}','${guiaremision.guifechafin}','${guiaremision.guihorafin}', '${guiaremision.guipuntoinicio}','${guiaremision.guipuntofin}','${parseInt(guiaremision.guicomprobanteventa)}','${guiaremision.guimotivo}','${guiaremision.guidestinatario}','${guiaremision.guiformapago}','${guiaremision.guiobservacion}','${false}','${guiaremision.conductorid}','${guiaremision.vehiculoid}','${guiaremision.productorid}') RETURNING guiaremisionid;`
                    
        result = await pool.query(query);

        if(result.rows){
            const newcarga = guiaremision.carga.map(c => {
                return [
                    c.carcantidad,
                    c.carunidad,
                    c.cardescripcion,
                    c.carestado,
                    c.cosechaid,
                    result.rows[0].guiaremisionid
                ]
            })

            query = format('INSERT INTO carga (carcantidad, carunidad, cardescripcion, carestado, cosechaid, guiaremisionid) VALUES %L', newcarga);
            
            result = await pool.query(query);
        }

        return guiaremision;
    },

    async updateGuiaRemision(id, guiaremision) {
        let query = `UPDATE guiaremision SET guiserie = '${guiaremision.guiserie}', guinumero = '${guiaremision.guinumero}', guifechaemision = '${guiaremision.guifechaemision}', guifechainicio = '${guiaremision.guifechainicio}', guihorainicio = '${guiaremision.guihorainicio}', guifechafin = '${guiaremision.guifechafin}', guihorafin = '${guiaremision.guihorafin}', guipuntoinicio = '${guiaremision.guipuntoinicio}', guipuntofin = '${guiaremision.guipuntofin}', guicomprobanteventa = '${guiaremision.guicomprobanteventa}', guimotivo = '${guiaremision.guimotivo}', guidestinatario = '${guiaremision.guidestinatario}', guiformapago = '${guiaremision.guiformapago}', guiobservacion = '${guiaremision.guiobservacion}', guiemiteurocal = '${guiaremision.guiemiteurocal}', conductorid = '${guiaremision.conductorid}', vehiculoid = '${guiaremision.vehiculoid}', productorid = '${guiaremision.productorid}' WHERE guiaremisionid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount;
    },
    
    async deleteGuiaRemision(id) {
        let query = `DELETE FROM guiaremision WHERE guiaremisionid = '${id}'`;
        let result = await pool.query(query);

        query = `DELETE FROM guiaremision WHERE guiaremisionid = '${id}'`;
        result = await pool.query(query);
        return result.rowCount;
    },
    
}