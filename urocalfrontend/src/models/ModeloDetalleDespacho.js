export default class DetalleDespacho {
    constructor(detalledespachoid, despachoid, almacenamientoid, detdesnumerobultos, detdespesounitario, detdespesototal) {
        this.detalledespachoid = detalledespachoid;
        this.despachoid = despachoid;
        this.almacenamientoid = almacenamientoid;
        this.detdesnumerobultos = detdesnumerobultos;
        this.detdespesounitario = detdespesounitario;
        this.detdespesototal = detdespesototal;
    }
}