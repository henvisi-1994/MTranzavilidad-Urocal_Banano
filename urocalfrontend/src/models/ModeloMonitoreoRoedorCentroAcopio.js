export default class MonitoreoRoedorCentroAcopio {
    constructor(monitoreoroedorid, monfechatrampeo, montipotrampa, monnumerotrampas, monceboutilizado, monroedoresmuertos, monaccionestomadas, monoperario, moninspector, monitoreoroedor) {
        this.monitoreoroedorid = monitoreoroedorid;
        this.monfechatrampeo = monfechatrampeo;
        this.montipotrampa = montipotrampa;
        this.monnumerotrampas = monnumerotrampas;
        this.monceboutilizado = monceboutilizado;
        this.monroedoresmuertos = monroedoresmuertos;
        this.monaccionestomadas = monaccionestomadas;
        this.monoperario = monoperario;
        this.moninspector = moninspector;
        this.monitoreoroedor = {
            centroacopioid: monitoreoroedor.centroacopioid,
            centroacopionombre: monitoreoroedor.centroacopionombre
        }
    }
}