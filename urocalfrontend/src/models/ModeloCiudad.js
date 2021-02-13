export default class Ciudad {
    constructor(ciudadid, ciudadnombre, ciudadprovincia) {
        this.ciudadid = ciudadid;
        this.ciudadnombre = ciudadnombre;
        this.ciudadprovincia = {
            provinciaid: ciudadprovincia.provinciaid,
            provincianombre: ciudadprovincia.provincianombre  
        } 
    }
}