// DATA TRANSFER OBJECT

/* const unicoCiudad = (recurso) => ({
    ciudadid: recurso.ciudadid,
    ciudadnombre: recurso.ciudadnombre
});

// Seccion de Multiples
const multipleCiudad = (recurso) => recurso.map((recurso) => unicoCiudad(recurso)); */

// Seccion de Unicos
const unicoMonitoreoRoedor = (recurso) => ({
    monitoreoroedorid : recurso.monitoreoroedorid, 
    monfechatrampeo : recurso.monfechatrampeo, 
    montipotrampa : recurso.montipotrampa, 
    monnumerotrampas : recurso.monnumerotrampas, 
    monceboutilizado : recurso.monceboutilizado, 
    monroedoresmuertos : recurso.monroedoresmuertos, 
    monaccionestomadas : recurso.monaccionestomadas, 
    monoperario : recurso.monoperario, 
    moninspector : recurso.moninspector, 
    monitoreoroedor: {
        centroacopioid: recurso.centroacopioid,
        centroacopionombre: recurso.centroacopionombre,
        fincaid: recurso.fincaid,
        finnombrefinca: recurso.finnombrefinca,
    },
});

const multipleMonitoreoRoedor = (recurso) => recurso.map((recurso) => unicoMonitoreoRoedor(recurso));  

module.exports = {
    multipleMonitoreoRoedor
};