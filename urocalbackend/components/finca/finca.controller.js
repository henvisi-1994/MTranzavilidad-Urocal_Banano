// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores

const fincaModel = require('./finca.model');
const fincaDto = require('./finca.dto');
const validation = require('../../utils/validations');

module.exports = {

    // Crear un nuevo registro finca
    async crearFinca(req, res) {

        // Añadir capa de validación

        const { fincodigo, finnombrefinca, finsuperficietotal, finsuperficiecultivada, fincoordenadax, fincoordenaday, finproductosprohibidos, finprimerainspeccion, finultimainspeccion, finnoconformidades, fincertificacioneu, fincertificacionnop, fincertificacionjas, finobservacion, asociacionfinca, productorid, sitiofinca } = req.body;
        if(validation.emptyField(fincodigo) || validation.emptyField(finnombrefinca) || validation.emptyField(finsuperficietotal) || validation.emptyField(finsuperficiecultivada) || validation.emptyField(fincoordenadax) || validation.emptyField(fincoordenaday) || validation.emptyField(finproductosprohibidos) || validation.emptyField(finprimerainspeccion) || 
        validation.emptyField(finultimainspeccion) || validation.emptyField(finnoconformidades) || validation.emptyField(fincertificacioneu) || validation.emptyField(fincertificacionnop) || validation.emptyField(fincertificacionjas) || validation.emptyField(finobservacion) || validation.emptyField(asociacionfinca.asociacionid) || validation.emptyField(productorid) || validation.emptyField(sitiofinca.sitioid)){
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        }else{
            try {
                let result =  await fincaModel.crearFinca({
                    fincodigo: fincodigo,
                    finnombrefinca: finnombrefinca,
                    finsuperficietotal: finsuperficietotal,
                    finsuperficiecultivada: finsuperficiecultivada,
                    fincoordenadax: fincoordenadax,
                    fincoordenaday: fincoordenaday,
                    finproductosprohibidos: finproductosprohibidos,
                    finprimerainspeccion: finprimerainspeccion,
                    finultimainspeccion: finultimainspeccion,
                    finnoconformidades: finnoconformidades,
                    fincertificacioneu: fincertificacioneu,
                    fincertificacionnop: fincertificacionnop,
                    fincertificacionjas: fincertificacionjas,
                    finobservacion: finobservacion,
                    asociacionid: asociacionfinca.asociacionid,
                    propietarioid: productorid,
                    sitioid: sitiofinca.sitioid})
                return res.status(201).send({ message: 'Finca registrada', fincaid: result.fincaid });
            } catch (error) {
                console.log(error)
                return res.status(500).send({ message: "Registro fallido" });
            }
        }
    },

    // Obtener todos los registros de finca
    async obtenerFincas(req, res) {
        const finca = await fincaModel.obtenerFincas()
        return res.status(200).send(fincaDto.multipleFinca(finca)); //<--
    },

    //  Obtener registro de finca por id
    async obtenerPropietario(req, res) {
        const propietario = await fincaModel.obtenerPropietario()
        return res.status(200).send((propietario)); //<--
    },

    // Actualiza informacion de un registro de finca
    async actualizarFinca(req, res) {
        const { id } = req.params;
        const { fincodigo, finnombrefinca, finsuperficietotal, finsuperficiecultivada, fincoordenadax, fincoordenaday, finproductosprohibidos, finprimerainspeccion, finultimainspeccion, finnoconformidades, fincertificacioneu, fincertificacionnop, fincertificacionjas, finobservacion, asociacionfinca, fincapropietario, sitiofinca } = req.body;
        if(validation.emptyField(fincodigo) || validation.emptyField(finnombrefinca) || validation.emptyField(finsuperficietotal) || validation.emptyField(finsuperficiecultivada) || validation.emptyField(fincoordenadax) || validation.emptyField(fincoordenaday) || validation.emptyField(finproductosprohibidos) || validation.emptyField(finprimerainspeccion) || 
            validation.emptyField(finultimainspeccion) || validation.emptyField(finnoconformidades) || validation.emptyField(fincertificacioneu) || validation.emptyField(fincertificacionnop) || validation.emptyField(fincertificacionjas) || validation.emptyField(finobservacion) || validation.emptyField(asociacionfinca.asociacionid) || validation.emptyField(fincapropietario.productorid) || validation.emptyField(sitiofinca.sitioid)){
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        }else{
            const rowCount = await fincaModel.actualizarFinca(id, {
                fincodigo: fincodigo,
                finnombrefinca: finnombrefinca,
                finsuperficietotal: finsuperficietotal,
                finsuperficiecultivada: finsuperficiecultivada,
                fincoordenadax: fincoordenadax,
                fincoordenaday: fincoordenaday,
                finproductosprohibidos: finproductosprohibidos,
                finprimerainspeccion: finprimerainspeccion,
                finultimainspeccion: finultimainspeccion,
                finnoconformidades: finnoconformidades,
                fincertificacioneu: fincertificacioneu,
                fincertificacionnop: fincertificacionnop,
                fincertificacionjas: fincertificacionjas,
                finobservacion: finobservacion,
                asociacionid: asociacionfinca.asociacionid,
                propietarioid: fincapropietario.productorid,
                sitioid: sitiofinca.sitioid})
            return rowCount == 1 ? res.status(200).send({ message: "Finca actualizado" }) : res.status(400).send({ message: "Error al actualizar finca" });
        }
    },

    // Elimina un registro de finca
    async eliminarFinca(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await fincaModel.eliminarFinca(id);
            if (rowCount == 1) {
                return res.status(200).send({ message: "Eliminado exitosamente" });
            } else {
                return res.status(400).send({ message: "Finca no registrado" });
            }              
        } catch (err) {
            if (err.code == '23503') {
                res.status(400).send({ message: "Finca a eliminar tiene relaciones con otros registros en la base de datos" });
            } else {
                return res.status(400).send({ message: "Error al eliminar finca" });
            }
        }
    }
}

