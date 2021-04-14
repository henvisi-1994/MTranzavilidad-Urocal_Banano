
// Seccion de Unicos
const limpiezaVestado = (recurso) => ({
    limpiezavehiculoid:recurso.limpiezavehiculoid,
    limvehfecha:recurso.limvehfecha,
    limvehproductoutilizado:recurso.limvehproductoutilizado, 
    limvehescobillon:transformarBollean(recurso.limvehescobillon),
    limvehescoba:transformarBollean(recurso.limvehescoba),
    limvehagua:transformarBollean(recurso.limvehagua),
    limvehaspiradora:transformarBollean(recurso.limvehaspiradora),
    vehiculoid:recurso.vehiculoid,
    vehplaca:recurso.vehplaca,
    fincaid: recurso.fincaid,
    finnombrefinca: recurso.finnombrefinca,
});
const LimpiezaVe = (recurso) => recurso.map((recurso) => limpiezaVestado(recurso));  

module.exports = {
    LimpiezaVe
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