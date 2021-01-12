import Maleza from '@/models/ModeloMaleza';

export default {
    namespaced: true,

    state: {
        maleza: new Maleza('', '', '', '', '', ''), // Modelo maleza
        formMalezaValido: false, // Indica si el formulario de maleza es valido
    },

    actions: {

    },

    mutations: {
        // Coloca un nuevo maleza
        setMaleza(state, nuevaMaleza) {
            state.maleza = nuevaMaleza
        },

        // Vacia el modelo maleza
        vaciarMaleza(state) {
            state.maleza = new Maleza('', '', '', '', '', '')
        },

        cambiarEstadoFormMalezaValido(state, nuevoEstado) {
            state.formMalezaValido = nuevoEstado
        },
    },

    getters: {
        formMalezaValido: (state) => state.formMalezaValido, // Devuelve la variable formMalezaValido
    },
}