export default class Finca {
    constructor(fincaid, fincodigo, finnombrefinca, finsuperficietotal, finsuperficiecultivada, fincoordenadax, fincoordenaday, finproductosprohibidos, 
                finprimerainspeccion, finultimainspeccion, finnoconformidades, fincertificacioneu, fincertificacionnop, fincertificacionjas, finobservacion, asociacionfinca, sitiofinca, fincapropietario) {
        this.fincaid = fincaid;
        this.fincodigo = fincodigo;
        this.finnombrefinca = finnombrefinca;
        this.finsuperficietotal = finsuperficietotal;
        this.finsuperficiecultivada = finsuperficiecultivada;
        this.fincoordenadax = fincoordenadax;
        this.fincoordenaday = fincoordenaday;
        this.finproductosprohibidos = finproductosprohibidos;
        this.finprimerainspeccion = finprimerainspeccion;
        this.finultimainspeccion = finultimainspeccion;
        this.finnoconformidades = finnoconformidades;
        this.fincertificacioneu = fincertificacioneu;
        this.fincertificacionnop = fincertificacionnop;
        this.fincertificacionjas = fincertificacionjas;
        this.finobservacion = finobservacion;
        this.asociacionfinca = {
            asociacionid: asociacionfinca.asociacionid,
            asonombre: asociacionfinca.asonombre
        },
        this.fincapropietario = {
            propietarioid: fincapropietario.propietarioid,
            propietario: fincapropietario.propietario,
            
        },
        this.sitiofinca = {
            sitioid: sitiofinca.sitioid,
            sitionombre: sitiofinca.sitionombre
        }
    }
}