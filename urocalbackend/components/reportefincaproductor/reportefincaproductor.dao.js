// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {

     async obtenerFincas() {
         let query = `SELECT f.fincaid, f.fincodigo, f.finnombrefinca, f.finsuperficietotal, f.finsuperficiecultivada, f.fincoordenadax, f.fincoordenaday, 
         TO_CHAR(f.finproductosprohibidos, 'YYYY-MM-DD') as finproductosprohibidos, TO_CHAR(f.finprimerainspeccion, 'YYYY-MM-DD') as finprimerainspeccion, TO_CHAR(f.finultimainspeccion, 'YYYY-MM-DD') as finultimainspeccion,
         f.finnoconformidades, f.fincertificacioneu, f.fincertificacionnop, f.fincertificacionjas, f.finobservacion, a.asociacionid, a.asonombre, f.propietarioid, p.productorid, concat(pe.pernombres, ' ' , pe.perapellidos) "propietario", 
         s.sitioid, s.sitionombre FROM  finca f, productor p, persona pe, asociacion a, sitio s 
         WHERE p.productorid = pe.personaid AND f.propietarioid = p.productorid AND a.asociacionid = f.asociacionid AND s.sitioid = f.sitioid`;
         let result = await pool.query(query);
         return result.rows; // Devuelve el array de json que contiene la tabla finca
    },

    async obtenerPropietario() {
        let query = `SELECT p.productorid,  concat(pe.pernombres, ' ' , pe.perapellidos) "propietario" FROM  productor p, persona pe WHERE p.productorid = pe.personaid`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el json de finca encontrado
    },

    async obtenerFincasProductor(id) {
        let query = `SELECT f.fincaid, f.fincodigo, f.finnombrefinca, f.finsuperficietotal, f.finsuperficiecultivada, f.fincoordenadax, f.fincoordenaday, 
        TO_CHAR(f.finproductosprohibidos, 'YYYY-MM-DD') as finproductosprohibidos, TO_CHAR(f.finprimerainspeccion, 'YYYY-MM-DD') as finprimerainspeccion, TO_CHAR(f.finultimainspeccion, 'YYYY-MM-DD') as finultimainspeccion,
        f.finnoconformidades, f.fincertificacioneu, f.fincertificacionnop, f.fincertificacionjas, f.finobservacion, a.asociacionid, a.asonombre, f.propietarioid, p.productorid, concat(pe.pernombres, ' ' , pe.perapellidos) "propietario", 
        s.sitioid, s.sitionombre FROM  finca f, productor p, persona pe, asociacion a, sitio s 
        WHERE f.propietarioid = ${id} AND p.productorid = pe.personaid AND f.propietarioid = p.productorid AND a.asociacionid = f.asociacionid AND s.sitioid = f.sitioid`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene la tabla finca
    },
}