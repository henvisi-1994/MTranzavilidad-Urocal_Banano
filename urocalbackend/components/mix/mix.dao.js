  // Data Access Object
// Se comunica con la base de datos
const pool = require('../../services/postgresql/index');
module.exports = {
    async getMix() {
        let query = `select * from mix`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el array de json que contiene a todos los mix
    },
    async getMixs(id) {
        let query = `SELECT m.*, p.pronombre FROM mix m, cosecha c, cultivo cu, producto p
                     WHERE m.almacenamientoid = '${id}' AND m.cosechaid = c.cosechaid AND c.cultivoid = cu.cultivoid
                            AND cu.productoid = p.productoid`;
        let result = await pool.query(query);
        return result.rows; // Devuelve el json del mix encontrado
    },   
    async deleteMix(id) {
        query = `DELETE FROM mix WHERE mixid = ${id}`;
        result = await pool.query(query);
        console.log(result) ;  
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si borró al mix y 0 sino lo hizo.
    
   },
   
   //Crear un mix
    async createMix(mix) {
        //buscando la id de la almacenamiento
        /*let query = `SELECT almacenamientoid FROM public.almacenamiento WHERE almcontrato = '${mix.almacenamientoid}'`;
        let result = await pool.query(query);  
        var almid =result.rows[0].almacenamientoid  */
  
        // Registro en tabla almacenamiento
        let query = `INSERT INTO public.mix(almacenamientoid, cosechaid) VALUES
                    (${mix.almacenamientoid},${mix.cosechaid});`;
        await pool.query(query); 
        //console.log(query)
        //console.log(result)
        //return mix; 
    },  
    async updateMix(id,mix) { 
        //buscando la id de la almacenamiento
        let query = `SELECT almacenamientoid FROM public.almacenamiento WHERE almcontrato = '${mix.almacenamientoid}'`;
        let result = await pool.query(query);  
        var almid =result.rows[0].almacenamientoid        
        //modificando mix
        query = `UPDATE public.mix SET almacenamientoid = ${almid}, 
        //cosechaid = ${mix.cosechaid} where mixid = ${id}`;
        result = await pool.query(query);       
        return result.rowCount; // Devuelve la cantidad de filas afectadas. Devuelve 1 si actualizó al mix y 0 sino lo hizo.
    }
}
