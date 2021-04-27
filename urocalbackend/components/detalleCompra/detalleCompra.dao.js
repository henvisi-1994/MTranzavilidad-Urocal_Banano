// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async getTodosDetalleCompra() {
        let query = `select * from detallecompra`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todos los usuarios
    },

    async getDetalleCompra(id) {
        let query = `select * from detallecompra WHERE compraid = ${id}`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el json del usuario encontrado
    },

    async getDatosDetalleCompra(id) {
        let query = `SELECT * FROM detallecompra WHERE detallecompraid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0];
    },

    async createDetalleCompra(detalleCompra) {
        //buscando la id de la compra
        /*let query = `SELECT compraid FROM public.compra WHERE comnumero = ${detalleCompra.compraid}`;
        let result = await pool.query(query);  
        var c =result.rows[0].compraid 
        console.log(c)  
        query = `SELECT comsubtotal FROM public.compra WHERE comnumero = ${detalleCompra.compraid}`;
        result = await pool.query(query);  
        var t =result.rows[0].comsubtotal 
        console.log(t)    */
        // Registro en tabla detalle compra
        query = `INSERT INTO public.detallecompra(detallecompraid, detporcentajefermentacion, detporcentajehumedad, 
            detporcentajeimpurezas, detmoho, detpizarra, detvioleta, detsemivioleta, detoptimio, detpenalidad, 
            detestimulo, dettara, detestado, detunidad, detpreciounidad, detcantidadunidades, detpreciototal, 
            compraid) VALUES (${detalleCompra.detallecompraid}, ${detalleCompra.detporcentajefermentacion},${detalleCompra.detporcentajehumedad},
            ${detalleCompra.detporcentajeimpurezas},${detalleCompra.detmoho},${detalleCompra.detpizarra},
            ${detalleCompra.detvioleta},${detalleCompra.detsemivioleta},${detalleCompra.detoptimio},
            '${detalleCompra.detpenalidad}',${detalleCompra.detestimulo},${detalleCompra.dettara},       
            '${detalleCompra.detestado}','${detalleCompra.detunidad}',${detalleCompra.detpreciounidad},       
            ${detalleCompra.detcantidadunidades},${detalleCompra.detpreciototal},${detalleCompra.compraid});`;
        result = await pool.query(query);

        //console.log(result)
    },
    async updateDetalleCompra(id, detalleCompra) {
        //buscando la id de la compra
        /*let query = `SELECT compraid FROM public.compra WHERE comnumero = ${detalleCompra.compraid}`;
        let result = await pool.query(query);
        var c = result.rows[0].compraid
        console.log(c)
        query = `SELECT comsubtotal FROM public.compra WHERE comnumero = ${detalleCompra.compraid}`;
        result = await pool.query(query);
        var t = result.rows[0].comsubtotal
        console.log(t)*/
        //modificando el detalle de compra
        query = `UPDATE public.detallecompra SET detporcentajefermentacion = ${detalleCompra.detporcentajefermentacion}, 
        detporcentajehumedad = ${detalleCompra.detporcentajehumedad} , detporcentajeimpurezas = ${detalleCompra.detporcentajeimpurezas},
        detmoho = ${detalleCompra.detmoho},detpizarra = ${detalleCompra.detpizarra}, detvioleta = ${detalleCompra.detvioleta},
        detsemivioleta = ${detalleCompra.detsemivioleta}, detoptimio = ${detalleCompra.detoptimio}, detpenalidad = '${detalleCompra.detpenalidad}',
        detestimulo = ${detalleCompra.detestimulo}, dettara = ${detalleCompra.dettara}, detestado = '${detalleCompra.detestado}',
        detunidad = '${detalleCompra.detunidad}', detpreciounidad = ${detalleCompra.detpreciounidad}, detcantidadunidades = ${detalleCompra.detcantidadunidades},
        detpreciototal = ${detalleCompra.detpreciototal} where detallecompraid =  ${id}`;
        result = await pool.query(query);
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó al usuario y 0 sino lo hizo.
    },
    async deleteDetalleCompra(id) {
        let query = `DELETE FROM detallecompra where detallecompraid =  ${id} `
        result = await pool.query(query);
        return result.rowCount;
    }
}
