import Suelo from '@/models/ModeloSuelo';

export default {
    namespaced: true,

    state: {
        suelo: new Suelo('', '', '', '', '', '', '', '', ''), // Modelo Suelo
        formSueloValido: false, // Indica si el formulario de suelo es valido
    },

    actions: {

    },

    mutations: {
        // Coloca un nuevo suelo
        agregarSuelo(state, nuevoSuelo) {
            state.suelo = nuevoSuelo;
        },

        // Vacia el modelo suelo
        vaciarSuelo(state) {
            state.suelo = new Suelo('', '', '', '', '', '', '', '', '');
        },

        // Modifica el estado de la variable formSueloValido
        cambiarEstadoFormSueloValido(state, nuevoEstado) {
            state.formSueloValido = nuevoEstado;
        },
    },

    getters: {
        formSueloValido: (state) => state.formSueloValido, // Devuelve la variable formSueloValido
    },
}