import Tratamiento from '@/models/ModeloTratamiento';

export default {
    namespaced: true,

    state: {
        tratamiento: new Tratamiento('', '', '', '', '', '','','','',''), // Modelo lote
        formTratamientoValido: false, // Indica si el formulario de lote es valido
    },

    actions: {

    },

    mutations: {
        // Coloca un nuevo tratamiento
        setTratamiento(state, nuevoTratamiento) {
            state.tratamiento = nuevoTratamiento
        },

        // Vacia el modelo tratamiento
        vaciarTratamiento(state) {
            state.tratamiento = new Tratamiento('', '', '', '', '', '','','','','')
        },

        cambiarEstadoFormTratamientoValido(state, nuevoEstado) {
            state.formTratamientoValido = nuevoEstado
        },
    },

    getters: {
        formTratamientoValido: (state) => state.formTratamientoValido, // Devuelve la variable formLoteValido
    },
}