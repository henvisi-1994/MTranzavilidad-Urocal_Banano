export default class Almacenamiento {
    constructor(almacenamientoid, almcontrato, almfechaacopio, almfechaingresobodega, almnumerobultos, almpesobulto, almpesototalingreso,
        almsaldo, almobservaciones, tratamientoid, centroacopioid) {
        this.almacenamientoid = almacenamientoid;
        this.almcontrato = almcontrato;
        this.almfechaacopio = almfechaacopio;
        this.almfechaingresobodega = almfechaingresobodega;
        this.almnumerobultos = almnumerobultos;
        this.almpesobulto = almpesobulto;
        this.almpesototalingreso = almpesototalingreso;
        this.almsaldo = almsaldo;
        this.almobservaciones = almobservaciones;
        this.tratamientoid = tratamientoid;
        this.centroacopioid = centroacopioid;
    }
}