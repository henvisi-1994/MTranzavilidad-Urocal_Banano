// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');
module.exports = {
    async getCompra() {
        let query = `SELECT c.compraid, c.comnumero, c.comsubtotal, c.comdescuentos, c.comotrosvalores, c.comtotal, 
                        c.comobservaciones, TO_CHAR(c.comfechaemision, 'YYYY-MM-DD') as comfechaemision, c.productor, c.organizacion, c.cod, c.transporte, c.lugar 
                     FROM compra c`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todos los usuarios
    },
    async getCompras(id) {
        let query = `select c.compraid, c.comnumero, c.comsubtotal, c.comdescuentos, c.comotrosvalores, c.comtotal, 
                            c.comobservaciones, TO_CHAR(c.comfechaemision, 'YYYY-MM-DD') as comfechaemision, c.guiaremisionid,
                            c.productor, c.organizacion, c.cod, c.transporte, c.lugar 
                     FROM compra c WHERE compraid = '${id}'`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del usuario encontrado
    },
    async deleteCompra(id) {
        //Borrar mix 
        query = `DELETE FROM mix WHERE cosechaid = ${id}`;
        result = await pool.query(query);
        //console.log(result);
        //Borrar detalle de compra 
        query = `DELETE FROM detallecompra where compraid =  ${id}`;
        result = await pool.query(query);
        //console.log(result);
        //Borrar compra
        query = `DELETE FROM compra where compraid = '${id}'`;
        result = await pool.query(query);
        //console.log(result);
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
            comdescuentos, comotrosvalores, comtotal, comobservaciones, guiaremisionid) VALUES
                    (${compra.comnumero},'${compra.comfechaemision}',${compra.comsubtotal},
                    ${compra.comdescuentos},${compra.comotrosvalores},${compra.comtotal},'${compra.comobservaciones}',
                    ${compra.guiaremisionid}) RETURNING compraid;`;
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

        let extra = ``;
        if (compra.transporte) { extra = `transporte='${compra.transporte}',`;}

        query = `UPDATE public.compra SET comnumero = '${compra.comnumero}', comfechaemision = '${compra.comfechaemision}', 
        comsubtotal = ${compra.comsubtotal} , comdescuentos = ${compra.comdescuentos},
        comotrosvalores = ${compra.comotrosvalores},comtotal = ${compra.comtotal},
        comobservaciones = '${compra.comobservaciones}', guiaremisionid = ${compra.guiaremisionid} ,
        productor = '${compra.productor}', organizacion='${compra.organizacion}', cod='${compra.cod}', 
        ${extra} lugar='${compra.lugar}'
        where compraid = ${id}`;
        result = await pool.query(query);
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó la compra y 0 sino lo hizo.
    }
}
