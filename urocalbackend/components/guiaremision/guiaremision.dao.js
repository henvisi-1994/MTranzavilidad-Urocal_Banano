
const pool = require('../../services/postgresql/index');
const format = require('pg-format');

module.exports = {

    async getGuiaRemisiones() {
        let query = `SELECT g.guiaremisionid, guiserie, guinumero, TO_CHAR(guifechaemision, 'YYYY-MM-DD')as guifechaemision, TO_CHAR(guifechainicio, 'YYYY-MM-DD')as guifechainicio, guihorainicio, TO_CHAR(guifechafin, 'YYYY-MM-DD')as guifechafin, guihorafin, guipuntoinicio, guipuntofin, guicomprobanteventa, guimotivo, guidestinatario, guiformapago, guiobservacion, guiemiteurocal, g.conductorid, concat(pernombres, ' ',perapellidos) as conductor, g.vehiculoid, vehplaca, g.productorid  FROM guiaremision 
        g inner join persona p on p.personaid = g.conductorid
        inner join vehiculo v on v.vehiculoid = g.vehiculoid`;
        let result = await pool.query(query);
        return result.rows;
    },

    async getGuiaRemision(id) {
        let query = `SELECT g.guiaremisionid, guiserie, guinumero, TO_CHAR(guifechaemision, 'YYYY-MM-DD')as guifechaemision, TO_CHAR(guifechainicio, 'YYYY-MM-DD')as guifechainicio, guihorainicio, TO_CHAR(guifechafin, 'YYYY-MM-DD')as guifechafin, guihorafin, guipuntoinicio, guipuntofin, guicomprobanteventa, guimotivo, guidestinatario, guiformapago, guiobservacion, guiemiteurocal, g.conductorid, concat(pernombres, ' ',perapellidos) as conductor, g.vehiculoid, vehplaca, g.productorid  FROM guiaremision 
        g inner join persona p on p.personaid = g.conductorid
        inner join vehiculo v on v.vehiculoid = g.vehiculoid WHERE g.guiaremisionid = ${id}`;
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
                    c.carestado,
                    c.cosechaid,
                    result.rows[0].guiaremisionid,
                    c.cardescripcion
                ]
            })
            
            query = format('INSERT INTO carga (carcantidad, carunidad, carestado, cosechaid, guiaremisionid, cardescripcion) VALUES %L', newcarga);
            result = await pool.query(query);
        }

        return guiaremision;
    },

    async updateGuiaRemision(id, guiaremision) {
        let query = `UPDATE guiaremision SET guiserie = '${guiaremision.guiserie}', guinumero = '${guiaremision.guinumero}', guifechaemision = '${guiaremision.guifechaemision}', guifechainicio = '${guiaremision.guifechainicio}', guihorainicio = '${guiaremision.guihorainicio}', guifechafin = '${guiaremision.guifechafin}', guihorafin = '${guiaremision.guihorafin}', guipuntoinicio = '${guiaremision.guipuntoinicio}', guipuntofin = '${guiaremision.guipuntofin}', guicomprobanteventa = '${guiaremision.guicomprobanteventa}', guimotivo = '${guiaremision.guimotivo}', guidestinatario = '${guiaremision.guidestinatario}', guiformapago = '${guiaremision.guiformapago}', guiobservacion = '${guiaremision.guiobservacion}', guiemiteurocal = '${guiaremision.guiemiteurocal}', conductorid = '${guiaremision.conductorid}', vehiculoid = '${guiaremision.vehiculoid}', productorid = '${guiaremision.productorid}' WHERE guiaremisionid = ${id}`;
        let result = await pool.query(query);

        let queryd = `SELECT * FROM public.carga where guiaremisionid= ${id}`;
        let resultd = await pool.query(queryd);
        let actualizar = ''; 
        if (resultd.rows) {
            //console.log(guiaremision.carga.length);
            guiaremision.carga.map(async dt  =>  {
                
                if (typeof dt.cargaid === 'undefined') {
                
                actualizar = `Insert into public.carga (carcantidad, carunidad, carestado, cosechaid, guiaremisionid, cardescripcion) values (${dt.carcantidad},'${dt.carunidad}','${dt.carestado}',${dt.cosechaid},${id},'${dt.cardescripcion}')`
                }else{
                actualizar = `UPDATE public.carga SET carcantidad=${dt.carcantidad}, carunidad='${dt.carunidad}', carestado='${dt.carestado}', cosechaid=${dt.cosechaid}, guiaremisionid=${id}, cardescripcion='${dt.cardescripcion}' WHERE cargaid =${dt.cargaid}`
                
                }
                pool.query(actualizar)
                
            })
        }

        return result.rowCount;
    },
    
    async deleteGuiaRemision(id) {
        let queryc = `DELETE FROM carga WHERE guiaremisionid = '${id}'`;
        await pool.query(queryc);

        query = `DELETE FROM guiaremision WHERE guiaremisionid = '${id}'`;
        result = await pool.query(query);
        return result.rowCount;
    },

    async deleteCarga(id) {
        let queryc = `DELETE FROM carga WHERE cargaid = '${id}'`;
        await pool.query(queryc);
        
        
    },
    
}