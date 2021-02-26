// DATA TRANSFER OBJECT

/* const unicoCiudad = (recurso) => ({
    ciudadid: recurso.ciudadid,
    ciudadnombre: recurso.ciudadnombre
});

// Seccion de Multiples
const multipleCiudad = (recurso) => recurso.map((recurso) => unicoCiudad(recurso)); */

// Seccion de Unicos
const unicoSitio = (recurso) => ({
    sitioid: recurso.sitioid,
    sitionombre: recurso.sitionombre,
    sitiociudad: {
        ciudadid: recurso.ciudadid,
        ciudadnombre: recurso.ciudadnombre
    },
});

const multipleSitio = (recurso) => recurso.map((recurso) => unicoSitio(recurso));  

module.exports = {
    multipleSitio
};