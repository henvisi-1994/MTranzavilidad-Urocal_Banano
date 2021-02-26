export default class ModeloLimpiezaCentroAcopio {
    //constructor(limpiezacentroacopioid, limcenfecha, limcenareas, limcenmateriales, limcenproductos, limcenmotivo, centroacopioid) {
    constructor(limpiezacentroacopioid, limcenfecha, limcenareas, limcenmateriales, limcenproductos, limcenmotivo, centroacopiolista) {
        this.limpiezacentroacopioid = limpiezacentroacopioid;
        this.limcenfecha = limcenfecha;
        this.limcenareas = limcenareas;
        this.limcenmateriales = limcenmateriales;
        this.limcenproductos = limcenproductos;
        this.limcenmotivo = limcenmotivo;
        //this.centroacopioid = centroacopioid;
        this.centroacopiolista = {
            centroacopioid: centroacopiolista.centroacopioid,
            centroacopionombre: centroacopiolista.centroacopionombre  
        }
        /*this.centroacopiolista = {
            centroacopioid: centroacopiolista.centroacopioid,
            centroacopionombre: centroacopiolista.centroacopionombre + centroacopiolista.centroacopioid
        }*/ 
    }
}