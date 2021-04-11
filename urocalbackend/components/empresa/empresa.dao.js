const pool = require('../../services/postgresql/index');

module.exports = {
    async createempresa(empresa) {
        // Registro en tabla empresao
        query = `INSERT INTO empresa (emprazonsocial, empruc, emptipo, empdireccion, emptelefono, empemail, paisid) VALUES 
                    ('${empresa.emprazonsocial}',
                    '${empresa.empruc}', 
                    '${empresa.emptipo}',
                    '${empresa.empdireccion}', 
                    '${empresa.emptelefono}',
                    '${empresa.empemail}',
                    '${empresa.paisid}')`;
                    result = await pool.query(query);
    },

    async getAllempresas() {
        let query = `select * from empresa emp INNER JOIN pais p on p.paisid = emp.paisid `;
        let result = await pool.query(query);
        return result.rows; // Devuelve array de empresaos
    },

    async getempresa(id) {
        let query = `select * from empresa emp INNER JOIN pais p on p.paisid = emp.paisid  WHERE empresaid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve objeto de empresao
    },

    async updateempresa(id, empresa) {
        let query = `UPDATE empresa SET 
        emprazonsocial = '${empresa.emprazonsocial}',
        empruc = '${empresa.empruc}', 
        emptipo = '${empresa.emptipo}',
        egrinsdosis = '${empresa.egrinsdosis}',
        empdireccion = '${empresa.empdireccion}', 
        emptelefono = '${empresa.emptelefono}',
        empemail = '${empresa.empemail}',
        paisid = '${empresa.paisid}'
        WHERE empresasid = '${id}'`;
        let result = await pool.query(query);
        return result.rowCount; // Devuelve 1 si actualizó el empresao y 0 sino lo hizo.
    },

    async deleteempresa(id) {
        let query = `DELETE FROM empresa WHERE empresaid = '${id}'`;
        let result = await pool.query(query);
        return result.rowCount; // Devuelve 1 si borró el empresao y 0 sino lo hizo.
    }
}