import Respacopio from '@/models/ModeloRespacopio';

export default {
    namespaced: true,

    state: {
        respacopio: new Respacopio(''), // Modelo Respacopio
        formRespacopioValido: false, // Indica si el formulario de Respacopio es valido
    },

    mutations: {
        // Coloca un nuevo Respacopio
        nuevoRespacopio(state, nuevoRespacopio) {
            state.respacopio = nuevoRespacopio
        },

        // Vacia el modelo Respacopio
        vaciarRespacopio(state) {
            state.respacopio = new Respacopio('')
        },

        // Cambia  el estado del Formulario Respacopio
        cambiarEstadoValidoFormRespacopio(state, nuevoEstado) {
            state.formRespacopioValido = nuevoEstado
        },
    },

    getters: {
        formRespacopioValido: (state) => state.formRespacopioValido, // Devuelve la variable formRespacopioValido
    },
}