// DATA TRANSFER OBJECT

/* const unicoCiudad = (recurso) => ({
    ciudadid: recurso.ciudadid,
    ciudadnombre: recurso.ciudadnombre
});

// Seccion de Multiples
const multipleCiudad = (recurso) => recurso.map((recurso) => unicoCiudad(recurso)); */

// Seccion de Unicos
const unicoAsociacion = (recurso) => ({
    asociacionid: recurso.asociacionid,
    asonombre: recurso.asonombre,
    asoabreviado: recurso.asoabreviado,
    asoruc: recurso.asoruc,
    asoobservacion: recurso.asoobservacion,
    asonumerosocios: recurso.asonumerosocios,
    asonumerohombres: recurso.asonumerohombres,
    asonumeromujeres: recurso.asonumeromujeres,
    asociacionresponsable: {
        asoresponsableid: recurso.asoresponsableid,
        personaid: recurso.personaid,
        responsable: recurso.responsable
    },
});

const multipleAsociacion = (recurso) => recurso.map((recurso) => unicoAsociacion(recurso));  

module.exports = {
    multipleAsociacion
};