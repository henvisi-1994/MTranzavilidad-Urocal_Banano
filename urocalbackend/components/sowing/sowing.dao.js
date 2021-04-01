// Data Access Object
// Se comunica con la base de datos
//const bcrypt = require('bcryptjs');
const pool = require('../../services/postgresql/index');
//const { getUser, updatePasswd } = require('./users.model');

module.exports = {
    async createSowing(sowing) {

        let query, result;

        // Registro en tabla Siembra
        query = `INSERT INTO siembra
                    (siefechacomprasemilla, sieproveedorsemilla, siefechasiembra, siecantidadplantas, siehectareas, sieoperario, cultivoid) VALUES 
                    ('${sowing.siefechacomprasemilla}','${sowing.sieproveedorsemilla}','${sowing.siefechasiembra}','${sowing.siecantidadplantas}','${sowing.siehectareas}','${sowing.sieoperario}', '${sowing.cultivoid}')
                    RETURNING siembraid;`;
        result = await pool.query(query);

        //sendEmail(PerEmail, temporal);        // No eliminar esta linea
        return sowing;
    },

    // SELECT: Devuelve todos los registros
    async getSowings() {
        //let query = `SELECT * FROM siembra`;
        let query = `Select si.siembraid, TO_CHAR(si.siefechacomprasemilla, 'YYYY-MM-DD') as siefechacomprasemilla, 
        si.sieproveedorsemilla, TO_CHAR(si.siefechasiembra, 'YYYY-MM-DD') as siefechasiembra, 
        si.siecantidadplantas, si.siehectareas, si.sieoperario, cu.cultivoid, concat(pr.pronombre, ' | ', pr.provariedad) as pronombre, lc.lotnumero, fi.finnombrefinca 
        FROM siembra si, cultivo cu, producto pr, lotecultivado lc, finca fi
         WHERE si.cultivoid = cu.cultivoid AND cu.productoid = pr.productoid AND cu.lotecultivadoid = lc.lotecultivadoid AND lc.fincaid = fi.fincaid;`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todas las Siembras registradas
    },

    /*
    async getSowing(id) {
        //let query = `SELECT * FROM siembra WHERE siembraid = ${id}`;
        let query = `Select siembraid, TO_CHAR(siefechacomprasemilla, 'YYYY-MM-DD') as siefechacomprasemilla, sieproveedorsemilla, TO_CHAR(siefechasiembra, 'YYYY-MM-DD') as siefechasiembra, 
                        siecantidadplantas, siehectareas, sieoperario, cultivoid
                    FROM siembra WHERE siembraid =  ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json de la Siembra encontrada
    },
    */

    async getSowing(id) {
        //let query = `SELECT * FROM siembra WHERE siembraid = ${id}`;
        let query = `Select siembraid, TO_CHAR(siefechacomprasemilla, 'YYYY-MM-DD') as siefechacomprasemilla, sieproveedorsemilla, TO_CHAR(siefechasiembra, 'YYYY-MM-DD') as siefechasiembra, 
        siecantidadplantas, siehectareas, sieoperario, c.cultivoid, concat(pronombre, ' | ', provariedad) as cultivo, lc.lotecultivadoid as loteid, lotnumero,
        f.fincaid, finnombrefinca, fincodigo
                FROM  siembra 
                    inner join cultivo c on c.cultivoid = siembra.cultivoid
                    inner join producto p on p.productoid = c.productoid
                    inner join lotecultivado lc on lc.lotecultivadoid = c.lotecultivadoid
                    inner join finca f on f.fincaid = lc.fincaid
                WHERE siembra.siembraid =  ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json de la Siembra encontrada
    },

    // SELECT: Devuelve el select del v-selec del formulario Siembra
    async getDatosDetalleSowing() {
        let query = `Select cu.cultivoid, pr.productoid, concat('Finca: ', fi.finnombrefinca, '   |   N. lote: ', lc.lotnumero, '   |   Cultivo: ', pr.pronombre) "detalles"
        FROM cultivo cu, producto pr, lotecultivado lc, finca fi
        WHERE cu.productoid = pr.productoid AND cu.lotecultivadoid = lc.lotecultivadoid 
        AND lc.fincaid = fi.fincaid;`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene todos los controles de maleza realizados
    },

    async deleteSowing(id) {
        //Borrado logico
        let query = `DELETE FROM siembra WHERE siembraid = '${id}'`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró una Siembra y 0 sino lo hizo.
    },

    async updateSowing(id, sowing) {
        let query = `UPDATE siembra SET siefechacomprasemilla = '${sowing.siefechacomprasemilla}', sieproveedorsemilla = '${sowing.sieproveedorsemilla}', 
        siefechasiembra = '${sowing.siefechasiembra}', siecantidadplantas = '${sowing.siecantidadplantas}', siehectareas = '${sowing.siehectareas}', 
        sieoperario = '${sowing.sieoperario}', cultivoid = '${sowing.cultivoid}' WHERE siembraid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó una Siembra y 0 sino lo hizo.
    },

}