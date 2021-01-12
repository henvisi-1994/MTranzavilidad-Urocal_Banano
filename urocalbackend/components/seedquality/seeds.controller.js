// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores
//const userDto = require('./users.dto');

const seedsModel = require('./seeds.model');


module.exports = {

    // Crear un nuevo registro de Calidad de semilla 
    async createSeed(req, res) {

        // Añadir capa de validación

        const { siecriterioaltura, siecriteriopeso, siesignosplaga, sieproductoaplicado, sieingredienteactivo, siedosishectarea, sietotalproducto, siemetodoaplicacion, siemaquinaria, siembraid } = req.body;

        try {
            await seedsModel.createSeed({
                siecriterioaltura: siecriterioaltura, 
                siecriteriopeso: siecriteriopeso, 
                siesignosplaga: siesignosplaga, 
                sieproductoaplicado: sieproductoaplicado, 
                sieingredienteactivo: sieingredienteactivo, 
                siedosishectarea: siedosishectarea, 
                sietotalproducto: sietotalproducto, 
                siemetodoaplicacion: siemetodoaplicacion, 
                siemaquinaria: siemaquinaria, 
                siembraid: siembraid
            });
        } catch (error) {
            return res.status(500).send({ message: "Registro fallido" });
         }

        return res.status(201).send({ message: "Registro exitoso" });
    },


    // Obtener todo el registro de Calidad de Semillas
    async getSeeds(req, res) {
        const seeds = await seedsModel.getSeeds()
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(seeds); // <--
    },

    // Obtener un registro de Calidad de Semilla por Id
    async getSeed(req, res) {
        const { id } = req.params;
        const rows = await seedsModel.getSeed(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Registro no encontrado" });
    },

    // Actualiza informacion de un registro de Calidad de Semilla
    async updateSeed(req, res) {
        const { id } = req.params;
        const { siecriterioaltura, siecriteriopeso, siesignosplaga, sieproductoaplicado, sieingredienteactivo, siedosishectarea, sietotalproducto, siemetodoaplicacion, siemaquinaria, siembraid } = req.body;

        const rowCount = await seedsModel.updateSeed(id, {
            siecriterioaltura: siecriterioaltura, 
            siecriteriopeso: siecriteriopeso, 
            siesignosplaga: siesignosplaga, 
            sieproductoaplicado: sieproductoaplicado, 
            sieingredienteactivo: sieingredienteactivo, 
            siedosishectarea: siedosishectarea, 
            sietotalproducto: sietotalproducto, 
            siemetodoaplicacion: siemetodoaplicacion, 
            siemaquinaria: siemaquinaria, 
            siembraid: siembraid
        });
        
        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });

    },


    // Elimina un registro de Calidad de Semilla
    async deleteSeed(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await seedsModel.deleteSeed(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "Calidad de semilla no registrada", tipo: "error" });
            
        } catch (err) {
            return res.json({ message: "Error al tratar de eliminar un registro", tipo: "error" });
        }
    },

}
