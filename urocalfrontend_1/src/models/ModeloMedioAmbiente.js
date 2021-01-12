export default class MedioAmbiente {
    constructor(medioambienteid, medtemperaturapromedio, medaltitud, medtopografia,
        medhumedadrelativa, medpluviosidad, medotros, medtomamuestra, lotecultivadoid) {
        this.medioambienteid = medioambienteid;
        this.medtemperaturapromedio = medtemperaturapromedio;
        this.medaltitud = medaltitud;
        this.medtopografia = medtopografia;
        this.medhumedadrelativa = medhumedadrelativa;
        this.medpluviosidad = medpluviosidad;
        this.medotros = medotros;
        this.medtomamuestra = medtomamuestra;
        this.lotecultivadoid = lotecultivadoid;
    }
}