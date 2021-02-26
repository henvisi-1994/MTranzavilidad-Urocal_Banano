export default class Asociacion {
    constructor(asociacionid, asonombre, asoabreviado, asoruc, asoobservacion, asonumerosocios, asonumerohombres, asonumeromujeres, asociacionresponsable) {
        this.asociacionid = asociacionid;
        this.asonombre = asonombre;
        this.asoabreviado = asoabreviado;
        this.asoruc = asoruc;
        this.asoobservacion = asoobservacion;
        this.asonumerosocios = asonumerosocios;
        this.asonumerohombres = asonumerohombres;
        this.asonumeromujeres = asonumeromujeres;
        this.asociacionresponsable  = {
             asoresponsableid: asociacionresponsable.asoresponsableid,
             responsable: asociacionresponsable.responsable
        }
    }
}