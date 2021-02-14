export default class Sitio {
    constructor(sitioid, sitionombre, sitiociudad) {
        this.sitioid = sitioid;
        this.sitionombre = sitionombre;
        this.sitiociudad = {
            ciudadid: sitiociudad.ciudadid,
            ciudadnombre: sitiociudad.ciudadnombre  
        } 
    }
}