const pool = require('../../services/postgresql/index');

module.exports = {

    async getLimpiezasV(id) {
        let query = `SELECT * FROM limpiezavehiculo inner join vehiculo on limpiezavehiculo.vehiculoid=vehiculo.vehiculoid 
        inner join finca on vehiculo.fincaid=finca.fincaid where finca.propietarioid=${id}`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todos los usuarios
    },

    async getLimpiezaV(id) {
        let query = `SELECT * FROM limpiezavehiculo WHERE limpiezavehiculoid = ${id}`;
        let result = await pool.query(query);
        return result.rows[0]; // Devuelve el json del usuario encontrado
    },

    async createLimpiezaV(limpiezaV) {
        let query, result;
        query = `INSERT INTO limpiezavehiculo
                    (limvehfecha, limvehproductoutilizado, limvehescobillon, limvehescoba, limvehagua, limvehaspiradora, vehiculoid) VALUES
                    ('${limpiezaV.limvehfecha}', '${limpiezaV.limvehproductoutilizado}','${limpiezaV.limvehescobillon}','${limpiezaV.limvehescoba}','${limpiezaV.limvehagua}','${limpiezaV.limvehaspiradora}','${limpiezaV.vehiculoid}') RETURNING limpiezavehiculoid;`
        
        result = await pool.query(query);
        
        return limpiezaV;
    },

    async updateLimpiezaV(id, limpiezaV) {
        let query = `UPDATE limpiezavehiculo SET limvehfecha = '${limpiezaV.limvehfecha}', limvehproductoutilizado = '${limpiezaV.limvehproductoutilizado}', limvehescobillon = '${limpiezaV.limvehescobillon}', limvehescoba = '${limpiezaV.limvehescoba}', limvehagua = '${limpiezaV.limvehagua}', limvehaspiradora = '${limpiezaV.limvehaspiradora}', vehiculoid = '${limpiezaV.vehiculoid}' WHERE limpiezavehiculoid = ${id}`;
        console.log(query);
        let result = await pool.query(query);

        return result.rowCount;
    },
    
    async deleteLimpiezaV(id) {
        //Borrado logico
        let query = `DELETE FROM limpiezavehiculo WHERE limpiezavehiculoid = '${id}'`;
        let result = await pool.query(query);

        query = `DELETE FROM limpiezavehiculo WHERE limpiezavehiculoid = '${id}'`;
        result = await pool.query(query);
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró al usuario y 0 sino lo hizo.
    },
    
}