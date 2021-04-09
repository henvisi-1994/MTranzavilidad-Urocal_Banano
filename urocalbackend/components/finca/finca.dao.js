// Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');

module.exports = {
    async crearFinca(finca) {

        let query, result;

        // Registro en tabla finca
        query = `INSERT INTO finca
                    (fincodigo, finnombrefinca, finsuperficietotal, finsuperficiecultivada, fincoordenadax, fincoordenaday, 
                    finproductosprohibidos, finprimerainspeccion, finultimainspeccion, finnoconformidades, fincertificacioneu, 
                    fincertificacionnop, fincertificacionjas, finobservacion, asociacionid, propietarioid, sitioid) VALUES 
                    ('${finca.fincodigo}','${finca.finnombrefinca}','${finca.finsuperficietotal}','${finca.finsuperficiecultivada}',
                    '${finca.fincoordenadax}','${finca.fincoordenaday}', '${finca.finproductosprohibidos}', '${finca.finprimerainspeccion}', 
                    '${finca.finultimainspeccion}', '${finca.finnoconformidades}', '${finca.fincertificacioneu}', '${finca.fincertificacionnop}', 
                    '${finca.fincertificacionjas}', '${finca.finobservacion}', '${finca.asociacionid}', '${finca.propietarioid}', '${finca.sitioid}')
                    RETURNING fincaid;`;
        result = await pool.query(query);

        //sendEmail(PerEmail, temporal);        // No eliminar esta linea
        return finca;
    },

    // async obtenerFincas() {
    //     let query = `SELECT f.fincaid, f.fincodigo, f.finnombrefinca, f.finsuperficietotal, f.finsuperficiecultivada, f.fincoordenadax, f.fincoordenaday, 
    //     TO_CHAR(f.finproductosprohibidos, 'YYYY-MM-DD') as finproductosprohibidos, TO_CHAR(f.finprimerainspeccion, 'YYYY-MM-DD') as finprimerainspeccion, TO_CHAR(f.finultimainspeccion, 'YYYY-MM-DD') as finultimainspeccion,
    //     f.finnoconformidades, f.fincertificacioneu, f.fincertificacionnop, f.fincertificacionjas, f.finobservacion, a.asociacionid, a.asonombre, f.propietarioid, p.productorid, concat(pe.pernombres, ' ' , pe.perapellidos) "propietario", 
    //     s.sitioid, s.sitionombre FROM  finca f, productor p, persona pe, asociacion a, sitio s 
    //     WHERE p.productorid = pe.personaid AND f.propietarioid = p.productorid AND a.asociacionid = f.asociacionid AND s.sitioid = f.sitioid`;
    //     let result = await pool.query(query);
    //     return result.rows; // Devuelve el array de json que contiene la tabla finca
    // },
    async obtenerFincas() {
        let query = `SELECT * FROM finca`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene la tabla finca
    },
    

    async obtenerPropietario() {
        let query = `SELECT p.productorid,  concat(pe.pernombres, ' ' , pe.perapellidos) "propietario" FROM  productor p, persona pe WHERE p.productorid = pe.personaid`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el json de finca encontrado
    },

    async obtenerFincaProductor(id){
        let query=`SELECT *from finca where propietarioid='${id}'`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el json de finca encontrado
    },

    async eliminarFinca(id) {
        //Borrado logico
        let query = `DELETE FROM finca WHERE fincaid = '${id}'`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró a finca y 0 sino lo hizo.
    },

    async actualizarFinca(id, finca) {
        let query = `UPDATE finca SET fincodigo = '${finca.fincodigo}', finnombrefinca = '${finca.finnombrefinca}', 
        finsuperficietotal = '${finca.finsuperficietotal}', finsuperficiecultivada = '${finca.finsuperficiecultivada}', fincoordenadax = '${finca.fincoordenadax}', 
        fincoordenaday = '${finca.fincoordenaday}', finproductosprohibidos = '${finca.finproductosprohibidos}', finprimerainspeccion = '${finca.finprimerainspeccion}', 
        finultimainspeccion = '${finca.finultimainspeccion}', finnoconformidades = '${finca.finnoconformidades}', fincertificacioneu = '${finca.fincertificacioneu}', 
        fincertificacionnop = '${finca.fincertificacionnop}', fincertificacionjas = '${finca.fincertificacionjas}', finobservacion = '${finca.finobservacion}', 
        asociacionid = '${finca.asociacionid}', propietarioid = '${finca.propietarioid}', sitioid = '${finca.sitioid}' WHERE fincaid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó a finca y 0 sino lo hizo.
    }
}