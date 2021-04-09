// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');
module.exports = {
    async getCompra() {
        let query = `SELECT c.compraid, c.comnumero, c.comsubtotal, c.comdescuentos, c.comotrosvalores, c.comtotal, 
        c.comobservaciones, TO_CHAR(c.comfechaemision, 'YYYY-MM-DD') as comfechaemision, CONCAT(per.pernombres,' ',per.perapellidos) as productor, c.organizacion, c.cod,v.vehplaca as transporte, c.lugar 
        FROM compra c
        inner join guiaremision g on g.guiaremisionid = c.guiaremisionid
        inner join productor p on p.productorid = g.productorid
        inner join vehiculo v on v.vehiculoid= g.vehiculoid
        inner join persona per on per.personaid = p.productorid`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todos los usuarios
    },
    async getCompras(id) {
        let query = `SELECT c.compraid, c.comnumero, c.comsubtotal, c.comdescuentos, c.comotrosvalores, c.comtotal, 
        c.comobservaciones, TO_CHAR(c.comfechaemision, 'YYYY-MM-DD') as comfechaemision, CONCAT(per.pernombres,' ',per.perapellidos) as productor, c.organizacion, c.cod,v.vehplaca as transporte, c.lugar 
        FROM compra c
        inner join guiaremision g on g.guiaremisionid = c.guiaremisionid
        inner join productor p on p.productorid = g.productorid
        inner join vehiculo v on v.vehiculoid= g.vehiculoid
        inner join persona per on per.personaid = p.productorid WHERE c.compraid = '${id}'`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del usuario encontrado
    },
    async deleteCompra(id) {
        //Borrar
        query = `DELETE FROM mix WHERE cosechaid = ${id}`;
        result = await pool.query(query);
        query = `DELETE FROM detallecompra where compraid =  ${id}`;
        result = await pool.query(query);
        query = `DELETE FROM compra where compraid = '${id}'`;
        result = await pool.query(query);
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró al usuario y 0 sino lo hizo.

    },
    async createCompra(compra) {
        // Registro en tabla compra
        query = `compra(comnumero, comfechaemision, comsubtotal, comdescuentos, comotrosvalores, comtotal, comobservaciones, guiaremisionid, asociacionid, comcod, comlugar, vehiculoid, productorid) VALUES
                    (${compra.comnumero},'${compra.comfechaemision}',${compra.comsubtotal},
                    ${compra.comdescuentos},${compra.comotrosvalores},${compra.comtotal},'${compra.comobservaciones}',
                    ${compra.guiaremisionid}, ${compra.asociacionid},${compra.comcod},${compra.comlugar},${compra.vehiculoid},${compra.productorid}) RETURNING compraid;`;
        let result = await pool.query(query);
        return result.rows[0];
    },
    async updateCompra(id, compra) {
        //modificando compra
        query = `UPDATE public.compra SET comnumero = '${compra.comnumero}', comfechaemision = '${compra.comfechaemision}', 
        comsubtotal = ${compra.comsubtotal} , comdescuentos = ${compra.comdescuentos},
        comotrosvalores = ${compra.comotrosvalores},comtotal = ${compra.comtotal},
        comobservaciones = '${compra.comobservaciones}', guiaremisionid = ${compra.guiaremisionid} ,
        asociacionid='${compra.asociacionid}', comcod='${compra.comcod}',comlugar='${compra.comlugar}',vehiculoid=${compra.vehiculoid},productorid=${compra.productorid}
        where compraid = ${id}`;
        result = await pool.query(query);
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó la compra y 0 sino lo hizo.
    }
}
