// DATA TRANSFER OBJECT

/* const unicoCiudad = (recurso) => ({
    ciudadid: recurso.ciudadid,
    ciudadnombre: recurso.ciudadnombre
});

// Seccion de Multiples
const multipleCiudad = (recurso) => recurso.map((recurso) => unicoCiudad(recurso)); */

// Seccion de Unicos
const unicoFinca = (recurso) => ({
    fincaid: recurso.fincaid,
    fincodigo: recurso.fincodigo,
    finnombrefinca: recurso.finnombrefinca,
    finsuperficietotal: recurso.finsuperficietotal,
    finsuperficiecultivada: recurso.finsuperficiecultivada,
    fincoordenadax: recurso.fincoordenadax,
    fincoordenaday: recurso.fincoordenaday,
    finproductosprohibidos: recurso.finproductosprohibidos,
    finprimerainspeccion: recurso.finprimerainspeccion,
    finultimainspeccion: recurso.finultimainspeccion,
    finnoconformidades: recurso.finnoconformidades,
    fincertificacioneu: recurso.fincertificacioneu,
    fincertificacionnop: recurso.fincertificacionnop,
    fincertificacionjas: recurso.fincertificacionjas,
    finobservacion: recurso.finobservacion,
    asociacionfinca: {
        asociacionid: recurso.asociacionid,
        asonombre: recurso.asonombre
    },
    fincapropietario: {
        propietarioid: recurso.propietarioid,
        productorid: recurso.productorid,
        propietario: recurso.propietario
    },
    sitiofinca: {
        sitioid: recurso.sitioid,
        sitionombre: recurso.sitionombre
    },
});

const multipleFinca = (recurso) => recurso.map((recurso) => unicoFinca(recurso));  

module.exports = {
    multipleFinca
};