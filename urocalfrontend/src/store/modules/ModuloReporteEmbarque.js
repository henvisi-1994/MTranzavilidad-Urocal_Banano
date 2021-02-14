import ReporteEmbarque from '@/models/ModeloReporteEmbarque';

export default {
    namespaced: true,

    state: {
        reporte_embarque: new ReporteEmbarque('', '', '', '', '', '', '', '', '', '', ''), // Modelo lote
        formReporteEmbarqueValido: false, // Indica si el formulario de lote es valido
    },

    actions: {

    },

    mutations: {
        // Coloca un nuevo lot
        setReporte(state, nuevaPersona) {
            state.reporte_embarque = nuevaPersona
        },

        // Vacia el modelo Persona
        vaciarReporteEmbarque(state) {
            state.reporte_embarque = new ReporteEmbarque('', '', '', '', '', '', '', '', '', '', '')
        },

        cambiarEstadoFormReporteEmbarqueValido(state, nuevoEstado) {
            state.formReporteEmbarqueValido = nuevoEstado
        },
    },

    getters: {
        formReporteEmbarqueValido: (state) => state.formReporteEmbarqueValido, // Devuelve la variable formUsuarioValido
    },
}