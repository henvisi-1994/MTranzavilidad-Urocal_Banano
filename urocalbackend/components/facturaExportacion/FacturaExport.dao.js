const pool = require('../../services/postgresql/index');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {
    // INSERT: Agrega un registro
    async crearFacturaExport(factexport) {
        let query = `INSERT INTO public.facturaexportacion( facnumero, compradorid, vendedorid, facfecha, facpuertoembarque, facpuertodestino, facvapor, facsubtotal12, facsubtotal0, facsubtotalsiniva, facsubtotalivaexcento, facsubtotalsinimpuestos, factotaldesc, facice, faciva12, facirbpn, facvalortotal, facformapago, facplazo, factiempo, facdae, facpesoneto, facpesobruto, faclote, faccontenedor, facsemana, facfechazarpe, facmarca, faccertificaciones)
        VALUES (${factexport.facnumero},
                ${factexport.compradorid}, 
                ${factexport.vendedorid}, 
                '${factexport.facfecha}', 
                '${factexport.facpuertoembarque}', 
                '${factexport.facpuertodestino}', 
                '${factexport.facvapor}', 
                ${factexport.facsubtotal12}, 
                ${factexport.facsubtotal0},
                ${factexport.facsubtotalsiniva},
                ${factexport.facsubtotalivaexcento},
                ${factexport.facsubtotalsinimpuestos},
                ${factexport.factotaldesc},
                ${factexport.facice},
                ${factexport.faciva12},
                ${factexport.facirbpn}, 
                ${factexport.facvalortotal}, 
                '${factexport.facformapago}', 
                ${factexport.facplazo}, 
                '${factexport.factiempo}', 
                '${factexport.facdae}', 
                ${factexport.facpesoneto}, 
                ${factexport.facpesobruto}, 
                '${factexport.faclote}', 
                '${factexport.faccontenedor}', 
                ${factexport.facsemana}, 
                '${factexport.facfechazarpe}', 
                '${factexport.facmarca}', 
                '${factexport.faccertificaciones}');`
                //console.log(query);
                let result = await pool.query(query);  
                if (result.rows) {
                    const newdetalleFacturaExport = factexport.detalle.map(det => {
                        return [
                            det.detcodigoprincipal,
                            det.detcantidad,
                            det.detdescripcion,
                            det.detpreciounitario,
                            det.detporcentajedesc,
                            det.detpreciototal,
                            result.rows[0].facturaexportacionid
                        ]
                    })
                    query = format('INSERT INTO detallefacturaexportacion (detcodigoprincipal, detcantidad, detdescripcion, detpreciounitario, detporcentajedesc, detpreciototal, facturaexportacionid) VALUES %L', newdetalleFacturaExport);
                    result = await pool.query(query);
                }
        return factexport;
    },


    // SELECT: Devuelve todos los registros
    async obtenerFacturaExportes() {
        let query =`select  f.facturaexportacionid, facnumero, e.emprazonsocial as compradorid, em.emprazonsocial as vendedorid, TO_CHAR(facfecha, 'YYYY-MM-DD')as facfecha,
        facpuertoembarque, facsubtotalsiniva, facsubtotalivaexcento, facsubtotalsinimpuestos,
        factotaldesc, facvalortotal from facturaexportacion f join empresa e on e.empresaid = f.compradorid
        join empresa em on em.empresaid =f.vendedorid`
        let result = await pool.query(query);
        return result.rows; 
        // return result.rows;                     // Devuelve el array de json
    },
       // SELECT: Devuelve todos los registros
       async obtenerFacturaExportacion(id) {
        let query =`select f.facturaexportacionid, facnumero, f.compradorid,e.emprazonsocial as comprador,f.vendedorid, em.emprazonsocial as vendedor, TO_CHAR(facfecha, 'YYYY-MM-DD')as facfecha,
        facpuertoembarque, facpuertodestino, facvapor, facsubtotal12,facsubtotal0,facsubtotalsiniva, facsubtotalivaexcento, facsubtotalsinimpuestos,
        factotaldesc,facice,faciva12,facirbpn,facvalortotal,facformapago,facplazo,factiempo,facdae,facpesoneto,faclote,facpesobruto,faccontenedor,facsemana,TO_CHAR(facfechazarpe, 'YYYY-MM-DD')as facfechazarpe,facmarca,faccertificaciones from facturaexportacion f join empresa e on e.empresaid = f.compradorid
        join empresa em on em.empresaid =f.vendedorid where f.facturaexportacionid = ${id}`
        let result = await pool.query(query);
        return result.rows; 
        // return result.rows;                     // Devuelve el array de json
    },
    async obtenerDetalleFacturaExportacion(id) {
        let query = `SELECT detallefacturaexportacion,detcodigoprincipal,detcantidad,detdescripcion,detpreciounitario,detporcentajedesc,detpreciototal,facturaexportacionid FROM detallefacturaexportacion WHERE facturaexportacionid = ${id}`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el json del tratamiento encontrado
    },


    // UPDATE: Actualiza un registro
    async actualizarFacturaExport(id, factexport) {

        let query = `UPDATE public.facturaexportacion
        SET  facnumero=${factexport.facnumero}, 
        compradorid=${factexport.compradorid}, 
        vendedorid=${factexport.vendedorid}, 
        facfecha=${factexport.facfecha}, 
        facpuertoembarque=${factexport.facpuertoembarque}, 
        facpuertodestino=${factexport.facpuertodestino}, 
        facvapor=${factexport.facvapor}, 
        facsubtotal12=${factexport.facsubtotal12}, 
        facsubtotal0=${factexport.facsubtotal0}, 
        facsubtotalsiniva=${factexport.facsubtotalsiniva}, 
        facsubtotalivaexcento=${factexport.facsubtotalivaexcento}, 
        facsubtotalsinimpuestos=${factexport.facsubtotalsinimpuestos}, 
        factotaldesc=${factexport.factotaldesc}, 
        facice=${factexport.facice}, 
        faciva12=${factexport.faciva12}, 
        facirbpn=${factexport.facirbpn}, 
        facvalortotal=${factexport.facvalortotal}, 
        facformapago=${factexport.facformapago}, 
        facplazo=${factexport.facplazo}, 
        factiempo=${factexport.factiempo}, 
        facdae=${factexport.facdae}, 
        facpesoneto=${factexport.facpesoneto}, 
        facpesobruto=${factexport.facpesobruto}, 
        faclote=${factexport.faclote}, 
        faccontenedor=${factexport.faccontenedor}, 
        facsemana=${factexport.facsemana}, 
        facfechazarpe=${factexport.facfechazarpe}, 
        facmarca=${factexport.facmarca}, 
        faccertificaciones=${factexport.faccertificaciones}
        WHERE facturaexportacionid= '${id}'`;
        let result = await pool.query(query);
        let queryd = `SELECT * FROM public.detallefacturaexportacion where facturaexportacionid= ${id}`;
        let resultd = await pool.query(queryd);
        let actualizar = ''; 
        if (resultd.rows) {
            factexport.detalle.map(async det  =>  {

                      
                if (typeof det.detallefacturaexportacion === 'undefined') {
                actualizar = `Insert into public.detallefacturaexportacion (detcodigoprincipal, detcantidad, detdescripcion, detpreciounitario, detporcentajedesc, detpreciototal, facturaexportacionid) values ('${dt.detcodigoprincipal}','${dt.detcantidad}',${dt.detdescripcion},'${dt.detpreciounitario}','${dt.detporcentajedesc}', '${dt.detpreciototal}', ${id})`
                }else{
                actualizar = `UPDATE public.detallefacturaexportacion SET detcodigoprincipal='${dt.detcodigoprincipal}', detcantidad='${dt.detcantidad}', detdescripcion=${dt.detdescripcion}, detpreciounitario='${dt.detpreciounitario}', detporcentajedesc='${dt.detporcentajedesc}', detpreciototal=${dt.detpreciototal},facturaexportacionid=${id} WHERE detallefacturaexportacion=${dt.deta}`
                
                resultd.rows.forEach(function(x){
                   
                    if(x.dtraid!=dt.dtraid && dt.dtraid!= 'undefined'){
                    
                    let detdelete = `DELETE FROM public.detalletratamiento where dtraid=${x.dtraid}`
                    console.log(detdelete)
                    pool.query(detdelete)
                    }
                })

                }

                console.log(actualizar)
                pool.query(actualizar)
                
            })
        }

        return result.rowCount;                 // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó al usuario y 0 sino lo hizo.
    },


    // DELETE: Elimina un registro
    async eliminarFacturaExport(id) {
        queryd = `DELETE FROM detallefacturaexportacion WHERE facturaexportacionid = '${id}'`
        query = `DELETE FROM facturaexportacion WHERE facturaexportacionid = '${id}'`;
        resultd = await pool.query(queryd);
        result = await pool.query(query);
        return result.rowCount;

        //return result.rowCount;                 // Devuelve la cantidad de filas afectadas.
    },
}