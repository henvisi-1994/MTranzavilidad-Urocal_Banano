// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores
//const userDto = require('./users.dto');

const modeloVehiculo = require('./vehiculo.model');
const validation = require('../../utils/validations');
const vehiculodto = require('./vehiculo.dto');

module.exports = {
        // Obtener todos los productos
        async obtenerTodosVehiculos(req, res) {
            const result = await modeloVehiculo.obtenerTodosVehiculo();
            //return res.status(200).send(userDto.multiple(users, req.user)); //<--
            return res.status(200).send(vehiculodto.Vehiculos(result)); // <--
        },

    async obtenerVehiculo(req, res) {
        const { id } = req.params;
        const rows = await modeloVehiculo.obtenerVehiculo(id);
        //return res.status(200).send(limpiezaVeh.LimpiezaVe(limpiezasV)); 
        return rows != null ? res.status(200).send(vehiculodto.Vehiculos(rows)): res.status(404).send({ message: "Vehiculo no encontrado" });
    },


    async obtenerVehiculoFinca(req, res) {
        const { id } = req.params;
        const result = await modeloVehiculo.obtenerVehiculoFinca(id)
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(result); // <--
    },
    

     // Crear un nuevo registro Vehiculo
     async createVehiculo(req, res) {

        // Añadir capa de validación
        
        const { vehplaca, vehmarca, vehdescripcion, vehlona, vehcaseta, vehpuerta, fincaid } = req.body;

        try {
            await modeloVehiculo.createVehiculo({
                vehplaca: vehplaca,
                vehmarca: vehmarca,
                vehdescripcion: vehdescripcion,
                vehlona: vehlona,
                vehcaseta: vehcaseta,
                vehpuerta: vehpuerta,
                fincaid:fincaid,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Registro fallido" });
        }

        return res.status(201).send({ message: "Registro exitoso" });
    },

    async updateVehiculo(req, res) {
        const { id } = req.params;
        const {vehplaca, vehmarca, vehdescripcion, vehlona, vehcaseta, vehpuerta, fincaid} = req.body;

        const rowCount = await modeloVehiculo.updateVehiculo(id, {
            vehplaca: vehplaca,
            vehmarca: vehmarca,
            vehdescripcion: vehdescripcion,
            vehlona: vehlona,
            vehcaseta: vehcaseta,
            vehpuerta: vehpuerta,
            fincaid:fincaid,
        });
        
        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });

    },

    async deleteVehiculo(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await modeloVehiculo.deleteVehiculo(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "Eliminado exitosamente", tipo: "error" });
            
        } catch (err) {
            console.log(err);
            return res.json({ message: "Error al tratar de eliminar el Vehiculo", tipo: "error" });
        }
    },


}
