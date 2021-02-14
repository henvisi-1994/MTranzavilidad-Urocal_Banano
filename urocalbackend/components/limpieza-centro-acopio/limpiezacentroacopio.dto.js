// DATA TRANSFER OBJECT

// Seccion de Unicos
const unicoLimpiezaCentroAcopio = (recurso) => ({
    limpiezacentroacopioid : recurso.limpiezacentroacopioid, 
    limcenfecha : recurso.limcenfecha, 
    limcenareas : recurso.limcenareas, 
    limcenmateriales : recurso.limcenmateriales, 
    limcenproductos : recurso.limcenproductos, 
    limcenmotivo : recurso.limcenmotivo,
    centroacopiolista: {
        centroacopioid: recurso.centroacopioid,
        centroacopionombre: recurso.centroacopionombre
    },
    /*centroacopiolista: {
        centroacopioid: recurso.centroacopioid,
        centroacopionombre: recurso.centroacopionombre + recurso.centroacopioid
    },*/
});

const multipleLimpiezaCentroAcopio = (recurso) => recurso.map((recurso) => unicoLimpiezaCentroAcopio(recurso));  

module.exports = {
    multipleLimpiezaCentroAcopio
};