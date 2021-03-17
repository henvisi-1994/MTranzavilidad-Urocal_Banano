export default class Compra {
    constructor(compraid, comnumero, comfechaemision, comsubtotal, comdescuentos, comotrosvalores, comtotal,
        comobservaciones, guiaremisionid, productor, organizacion, cod, transporte, lugar) {
        this.compraid = compraid;
        this.comnumero = comnumero;
        this.comfechaemision = comfechaemision;
        this.comsubtotal = comsubtotal;
        this.comdescuentos = comdescuentos;
        this.comotrosvalores = comotrosvalores;
        this.comtotal = comtotal;
        this.comobservaciones = comobservaciones;
        this.guiaremisionid = guiaremisionid;
        this.productor = productor;
        this.organizacion = organizacion;
        this.cod = cod;
        this.transporte = transporte;
        this.lugar = lugar;
    }
}