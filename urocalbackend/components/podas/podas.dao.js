
const pool = require('../../services/postgresql/index');

module.exports = {
    async getPodas() {
        let query = `SELECT f.fincaid,f.fincodigo ,l.lotecultivadoid,c.cultivoid,
        l.lotnumero,p.podaid,TO_CHAR(p.podfecha, 'YYYY-MM-DD') as podfecha,
        p.podtipo,p.podhectareas,p.podcantidadplantas,p.podherramienta,p.podoperario 
        FROM lotecultivado l INNER JOIN finca f ON f.fincaid= l.fincaid 
        INNER JOIN cultivo c ON l.lotecultivadoid = c.lotecultivadoid 
        INNER JOIN poda p ON c.cultivoid = p.cultivoid`;
        let result = await pool.query(query);

        // console.log(result.rows); // Devuelve el array de json que contiene a todos los usuarios

        // let query = `SELECT * FROM poda`;
        // let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todos los usuarios
    },

    async getPoda(id) {
        // let query = `SELECT f.fincaid,f.fincodigo ,l.lotecultivadoid,c.cultivoid,
        // l.lotnumero,p.podaid,TO_CHAR(p.podfecha, 'YYYY-MM-DD') as podfecha,
        // p.podtipo,p.podhectareas,p.podcantidadplantas,p.podherramienta,p.podoperario 
        // FROM lotecultivado l INNER JOIN finca f ON f.fincaid= l.fincaid 
        // INNER JOIN cultivo c ON l.lotecultivadoid = c.lotecultivadoid 
        // INNER JOIN poda p ON c.cultivoid = p.cultivoid WHERE p.podaid = ${id}`;
        
        // let query = `SELECT * FROM poda WHERE podaid = ${id}`;
                let query = `SELECT f.fincaid,f.fincodigo ,l.lotecultivadoid,c.cultivoid,l.lotnumero,p.podaid,p.podfecha,p.podtipo,p.podhectareas,p.podcantidadplantas,p.podherramienta,p.podoperario
        FROM lotecultivado l INNER JOIN finca f ON f.fincaid= l.fincaid
        INNER JOIN cultivo c ON l.lotecultivadoid = c.lotecultivadoid
        INNER JOIN poda p ON c.cultivoid = p.cultivoid AND p.podaid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del usuario encontrado
    },

    async createPoda(poda) {
        let query, result;

        query = `INSERT INTO poda
                    (podfecha, podtipo, podhectareas, podcantidadplantas, podherramienta, podoperario, cultivoid) VALUES
                    ('${poda.podfecha}', '${poda.podtipo}', '${poda.podhectareas}', '${poda.podcantidadplantas}', '${poda.podherramienta}', '${poda.podoperario}', '${poda.cultivoid}') RETURNING podaid;`

        result = await pool.query(query);

        return poda;
    },

    async updatePoda(id, poda) {
        let query = `UPDATE poda SET podfecha = '${poda.podfecha}', podtipo = '${poda.podtipo}', 
        podhectareas = '${poda.podhectareas}', podcantidadplantas = '${poda.podcantidadplantas}', podherramienta = '${poda.podherramienta}', 
        podoperario = '${poda.podoperario}', cultivoid = '${poda.cultivoid}' WHERE podaid = ${id}`;
        let result = await pool.query(query);

        return result.rowCount;
    },

    async deletePoda(id) {
        let query = `DELETE FROM poda WHERE podaid = '${id}'`;
        let result = await pool.query(query);

        query = `DELETE FROM poda WHERE podaid = '${id}'`;
        result = await pool.query(query);
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró al usuario y 0 sino lo hizo.
    },

    async getTiposPodas() {
        let query = `select distinct podtipo from poda where podtipo is not null`;
        let result = await pool.query(query);
        // console.log(result.rows); // Devuelve el array de json que contiene a todos los usuarios

        // let query = `SELECT * FROM poda`;
        // let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todos los usuarios
    },

}