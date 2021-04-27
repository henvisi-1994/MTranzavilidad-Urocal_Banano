// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');
module.exports = {
    async getCompra() {
        let query = `SELECT c.compraid, c.comnumero, c.comsubtotal, c.comdescuentos, c.comotrosvalores, c.comtotal, 
        c.comobservaciones, TO_CHAR(c.comfechaemision, 'YYYY-MM-DD') as comfechaemision, CONCAT(per.pernombres,' ',per.perapellidos) as productor,a.asonombre,  c.comcod,v.vehplaca as transporte, c.comlugar 
        FROM compra c
		inner join asociacion a on a.asociacionid =c.asociacionid
        inner join guiaremision g on g.guiaremisionid = c.guiaremisionid
        inner join productor p on p.productorid = g.productorid
        inner join vehiculo v on v.vehiculoid= g.vehiculoid
        inner join persona per on per.personaid = p.productorid`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todos los usuarios
    },
    async getCompras(id) {
        let query = `SELECT c.compraid, c.comnumero, c.comsubtotal, c.comdescuentos, c.comotrosvalores, c.comtotal, 
        c.comobservaciones, TO_CHAR(c.comfechaemision, 'YYYY-MM-DD') as comfechaemision, g.productorid, CONCAT(per.pernombres,' ',per.perapellidos) as productor,c.asociacionid, a.asonombre, c.comcod,g.vehiculoid,v.vehplaca as transporte, c.guiaremisionid, c.comlugar 
        FROM compra c
		inner join asociacion a on a.asociacionid =c.asociacionid
        inner join guiaremision g on g.guiaremisionid = c.guiaremisionid
        inner join productor p on p.productorid = g.productorid
        inner join vehiculo v on v.vehiculoid= g.vehiculoid
        inner join persona per on per.personaid = p.productorid WHERE c.compraid = '${id}'`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del usuario encontrado
    },
    async deleteCompra(id) {
        //Borrar detalle de compra
        detalleCompra = `select detallecompraid from  detallecompra where compraid = ${id}`
        result = await pool.query(detalleCompra);
        let detalle = result.rows;
        detalle.map(dt => {
            let queryd = `DELETE FROM mix where cosechaid = ${dt.detallecompraid}`;
            result =  pool.query(queryd);
        });
        query = `DELETE FROM detallecompra where compraid =  ${id}`;
        result = await pool.query(query);
        // //Borrar compra
        query = `DELETE FROM compra where compraid = '${id}'`;
        result = await pool.query(query);
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró al usuario y 0 sino lo hizo.

    },
    async createCompra(compra) {
        //buscando la id de la guia remision
        /*let query = `SELECT guiaremisionid FROM public.guiaremision WHERE guiserie = '${compra.guiaremisionid}'`;
        let result = await pool.query(query);
        var guia = result.rows[0].guiaremisionid
        console.log(guia)
        compra.comtotal = (parseInt(compra.comsubtotal) - parseInt(compra.comdescuentos) + parseInt(compra.comotrosvalores));*/
        // Registro en tabla compra
        query = `INSERT INTO public.compra (comnumero, comfechaemision, comsubtotal, 
            comdescuentos, comotrosvalores, comtotal, comobservaciones, guiaremisionid, asociacionid, comcod, comlugar, vehiculoid, productorid) VALUES
            (${compra.comnumero},'${compra.comfechaemision}',${compra.comsubtotal},
            ${compra.comdescuentos},${compra.comotrosvalores},${compra.comtotal},'${compra.comobservaciones}',
            ${compra.guiaremisionid}, ${compra.asociacionid},${compra.comcod},'${compra.comlugar}',${compra.vehiculoid},${compra.productorid}) RETURNING compraid;`;

        let result = await pool.query(query);
        //console.log(query)
        //console.log(result)
        return result.rows[0];
    },
    async updateCompra(id, compra) {
        //buscando la id de la guia remision
        /*let query = `SELECT guiaremisionid FROM public.guiaremision WHERE guiserie = '${compra.guiaremisionid}'`;
        let result = await pool.query(query);
        var guia = result.rows[0].guiaremisionid
        console.log(guia)
        compra.comtotal = (parseInt(compra.comsubtotal) - parseInt(compra.comdescuentos) + parseInt(compra.comotrosvalores));*/
        //modificando compra
        query = `UPDATE public.compra SET comnumero = '${compra.comnumero}', comfechaemision = '${compra.comfechaemision}', 
        comsubtotal = ${compra.comsubtotal} , comdescuentos = ${compra.comdescuentos},
        comotrosvalores = ${compra.comotrosvalores},comtotal = ${compra.comtotal},
        comobservaciones = '${compra.comobservaciones}', guiaremisionid = ${compra.guiaremisionid} ,
        asociacionid='${compra.asociacionid}', comcod='${compra.comcod}',comlugar='${compra.comlugar}',vehiculoid='${compra.vehiculoid}',productorid='${compra.productorid}'
        where compraid = '${id}'`;
        console.log(query);
        result = await pool.query(query);
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó la compra y 0 sino lo hizo.
    }
}
