import Poda from '@/models/ModeloPoda';

export default {
    namespaced: true,

    state: {
        poda: new Poda('', '', '', '', '', '', '', ''), // Modelo Poda
        formPodaValido: false, // Indica si el formulario de Poda es valido
    },

    mutations: {
        // Coloca un nuevo Poda
        nuevoPoda(state, nuevoPoda) {
            state.poda = nuevoPoda
        },

        // Vacia el modelo Poda
        vaciarPoda(state) {
            state.poda = new Poda('', '', '', '', '', '', '', '')
        },

        // Cambia  el estado del Formulario Poda
        cambiarEstadoValidoFormPoda(state, nuevoEstado) {
            state.formPodaValido = nuevoEstado
        },
    },

    getters: {
        formPodaValido: (state) => state.formPodaValido, // Devuelve la variable formPodaValido
    },
}