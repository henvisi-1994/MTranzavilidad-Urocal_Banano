
const pool = require('../../services/postgresql/index');

module.exports = {
    async createnuevoRegistroEnvio(registroenvio) {

        query = `INSERT INTO registroenvio (regfecha, reglote, regdestino, regtipo, regorganico, regspp) VALUES 
                    ('${registroenvio.regfecha}','${registroenvio.reglote}',
                    '${registroenvio.regdestino}', '${registroenvio.regtipo}',
                    '${registroenvio.regorganico}', '${registroenvio.regspp}') RETURNING registroenvioid`;
        result = await pool.query(query);
        let registroenvioid = result.rows[0].registroenvioid;
        registroenvio.regdetalle.forEach(async e => {
            let datosDetalleEnvio = {
                detenviocantidad: e.entregados,
                registroenvioid: registroenvioid,
                guiaremisionid: e.guiaremisionid,
                cosechaid: e.cosechaid,
                fecha: e.fecha,
                productor: e.productor,
                codigofinca: e.codigo
            }
            query = `INSERT INTO detalleenvio(detenvcantidad, detenvunidades, registroenvioid, guiaremisionid, cosechaid,fecha, productor, codigofinca)
                VALUES ('${datosDetalleEnvio.detenviocantidad}','0', '${datosDetalleEnvio.registroenvioid}',
                 '${datosDetalleEnvio.guiaremisionid}', '${datosDetalleEnvio.cosechaid}','${datosDetalleEnvio.fecha}',
                 '${datosDetalleEnvio.productor}', '${datosDetalleEnvio.codigofinca}');`;
            result = await pool.query(query);
        });
    },

    async getnuevoRegistroEnvios() {
        let query = `SELECT registroenvioid, TO_CHAR(regfecha, 'YYYY-MM-DD') as regfecha, reglote, regdestino, regtipo, regorganico, regspp FROM registroenvio`;
        let result = await pool.query(query);
        return result.rows; // Devuelve array de registro envios

    },

    async getnuevoRegistroEnvio(id) {
        let query = `SELECT * FROM registroenvio WHERE registroenvioid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve objeto de registro envios
    },
    async getDetalleEnvio(id) {
        let query = `
        SELECT codigofinca,TO_CHAR(fecha, 'YYYY-MM-DD') as fecha,
        productor,detenvcantidad from detalleenvio where registroenvioid='${id}';
        `;
        let result = await pool.query(query);
        return result.rows; // Devuelve objeto de registro envios
    },

    async updatenuevoRegistroEnvio(id, registroenvio) {


        try {
            let query = `UPDATE registroenvio SET regfecha = '${registroenvio.regfecha}', reglote = '${registroenvio.reglote}', 
        regdestino = '${registroenvio.regdestino}', regtipo = '${registroenvio.regtipo}', 
        regorganico = '${registroenvio.regorganico}', regspp = '${registroenvio.regspp}'
        WHERE registroenvioid = ${id}`;
            let result = await pool.query(query);

            query = `select detalleenvioid,registroenvioid,detenvcantidad,TO_CHAR(fecha, 'YYYY-MM-DD') as fecha,
        productor,codigofinca from detalleenvio where registroenvioid=${id}`;
            let filasBDDetalleEnvio = await pool.query(query);
            filasBDDetalleEnvio = filasBDDetalleEnvio.rows;

            let DetalleEnvioIdsBd = [];
            let DetalleEnvioIdsBdConservar = [];
            let ElementosParaRegistrarBD = []
            //IDS DE BASE DE DATOS
            filasBDDetalleEnvio.forEach(f => {
                DetalleEnvioIdsBd.push(f.detalleenvioid);
            })
            registroenvio.regdetalle.forEach(async e => {

                let elementoLista = {
                    detenviocantidad: e.entregados,
                    registroenvioid: id,
                    guiaremisionid: e.guiaremisionid,
                    cosechaid: e.cosechaid,
                    fecha: e.fecha,
                    productor: e.productor,
                    codigofinca: e.codigo
                }
                //verificar si existe en bd
                let estaEnBD = false;
                for (let i = 0; i < filasBDDetalleEnvio.length && !estaEnBD; i++) {

                    let elementoBD = filasBDDetalleEnvio[i];
                    if (
                        elementoBD.codigofinca === elementoLista.codigofinca &&
                        elementoBD.fecha === elementoLista.fecha &&
                        elementoBD.productor === elementoLista.productor &&
                        parseFloat(elementoBD.detenvcantidad) ===
                        parseFloat(elementoLista.detenviocantidad)
                    ) {
                        estaEnBD = true;
                        DetalleEnvioIdsBdConservar.push(elementoBD.detalleenvioid);
                    }
                }
                if (!estaEnBD) {
                    ElementosParaRegistrarBD.push(elementoLista);
                }
            });

            let RegistrosEliminar = DetalleEnvioIdsBd.filter(el => !DetalleEnvioIdsBdConservar.includes(el));
            RegistrosEliminar.forEach(async detalleenvioid => {
                query = `delete from detalleenvio where detalleenvioid = ${detalleenvioid}`;
                await pool.query(query);
            });

            //Agregar nuevos datos
            ElementosParaRegistrarBD.forEach(async datosDetalleEnvio => {
                query = `INSERT INTO detalleenvio(detenvcantidad, detenvunidades, registroenvioid, guiaremisionid, cosechaid,fecha, productor, codigofinca)
                VALUES ('${datosDetalleEnvio.detenviocantidad}','0', '${datosDetalleEnvio.registroenvioid}',
                 '${datosDetalleEnvio.guiaremisionid}', '${datosDetalleEnvio.cosechaid}','${datosDetalleEnvio.fecha}',
                 '${datosDetalleEnvio.productor}', '${datosDetalleEnvio.codigofinca}');`;
                await pool.query(query);
            });

            return result.rowCount; // Devuelve 1 si actualizó el registro envio y 0 sino lo hizo.
        } catch (error) {
            return 'Error al registrar a la BD';
        }
    },

    async deletenuevoRegistroEnvio(id) {
        let query = `DELETE FROM registroenvio WHERE registroenvioid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve 1 si borró el producto y 0 sino lo hizo.
    },

    async getTiposnuevoRegistroEnvio() {
        let query = `select distinct regtipo from registroenvio where regtipo is not null`;
        let result = await pool.query(query);
        return result.rows;
    },
    async getSeleccionDetalles() {
        let query = `select 
        dc.detallecompraid as cosechaid,g.guiaremisionid,
        f.fincodigo as codigo,
        TO_CHAR(c.comfechaemision, 'YYYY-MM-DD') as fecha,
        CONCAT(per.pernombres,' ', per.perapellidos) as productor,
        dc.detcantidadunidades as entregados, 
		CONCAT(f.fincodigo, ' | ',TO_CHAR(c.comfechaemision, 'YYYY-MM-DD'),' | ',per.pernombres,' ', per.perapellidos,' | ',dc.detcantidadunidades) as datosunidos 
        from compra c 
        inner join guiaremision g on c.guiaremisionid=g.guiaremisionid
        inner join productor p on g.productorid=p.productorid
        inner join persona per on p.productorid=per.personaid
        inner join finca f on p.productorid=f.propietarioid
        inner join detallecompra dc on c.compraid=dc.compraid;`;
        let result = await pool.query(query);
        return result.rows; // Devuelve array de registro envios
    },

}