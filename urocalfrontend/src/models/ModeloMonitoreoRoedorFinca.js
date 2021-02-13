export default class MonitoreoRoedorFinca {
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
            fincaid: monitoreoroedor.fincaid,
            finnombrefinca: monitoreoroedor.finnombrefinca
        }
    }
}