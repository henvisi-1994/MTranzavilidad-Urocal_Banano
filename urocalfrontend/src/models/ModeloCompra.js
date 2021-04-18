export default class Compra {
    constructor(compraid, comnumero, comfechaemision, comsubtotal, comdescuentos, comotrosvalores, comtotal,
        comobservaciones, guiaremisionid, asociacionid, comcod, comlugar, vehiculoid, productoid) {
        this.compraid = compraid;
        this.comnumero = comnumero;
        this.comfechaemision = comfechaemision;
        this.comsubtotal = comsubtotal;
        this.comdescuentos = comdescuentos;
        this.comotrosvalores = comotrosvalores;
        this.comtotal = comtotal;
        this.comobservaciones = comobservaciones;
        this.guiaremisionid = guiaremisionid;
        this.asociacionid = asociacionid;
        this.comcod = comcod;
        this.comlugar = comlugar;
        this.vehiculoid=vehiculoid;
        this.productoid=productoid;
    }
}