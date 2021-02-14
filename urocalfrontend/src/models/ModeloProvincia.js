export default class Provincia {
    constructor(provinciaid, provincianombre, provinciapais) {
        this.provinciaid = provinciaid;
        this.provincianombre = provincianombre;
        this.provinciapais = {
            paisid: provinciapais.paisid,
            paisnombre: provinciapais.paisnombre  
        } 
    }
}