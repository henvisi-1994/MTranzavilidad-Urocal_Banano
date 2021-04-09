// Seccion de Unicos
const vehiculoEstado = (recurso) => ({

    vehiculoid:recurso.vehiculoid,
    vehplaca:recurso.vehplaca,
    vehmarca:recurso.vehmarca, 
    vehdescripcion:recurso.vehdescripcion,
    vehlona:transformarBollean(recurso.vehlona),
    vehcaseta:transformarBollean(recurso.vehcaseta),
    vehpuerta:recurso.vehpuerta,
    vehiculoid:recurso.vehiculoid,
    fincaid: recurso.fincaid,
    finnombrefinca: recurso.finnombrefinca,
});
const Vehiculos = (recurso) => recurso.map((recurso) => vehiculoEstado(recurso));  

module.exports = {
    Vehiculos
};

function transformarBollean(params) {
    let resultado="";
    if (params==true) {
        resultado="Si"
    } else if (params==false){
        resultado="No"   
    }
    return resultado;
};