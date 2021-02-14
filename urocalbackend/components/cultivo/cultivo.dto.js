// DATA TRANSFER OBJECT

// Seccion de Unicos
const unicoCultivo = (recurso) => ({
    cultivoid : recurso.cultivoid, 
    lotecultivadoid : recurso.lotecultivadoid,
    productoid : recurso.productoid, 
});

const multipleCultivo = (recurso) => recurso.map((recurso) => unicoCultivo(recurso));  

module.exports = {
    multipleCultivo
};