import Siembra from '@/models/ModeloSiembra';

export default {
    namespaced: true,

    state: {
        siembra: new Siembra('', '', '', '', '', '', '', ''), // Modelo siembra
        formSiembraValido: false, // Indica si el formulario de siembra es valido
    },

    actions: {

    },

    mutations: {
        // Coloca un nuevo siembra
        setSiembra(state, nuevaSiembra) {
            state.siembra = nuevaSiembra
        },

        // Vacia el modelo siembra
        vaciarSiembra(state) {
            state.siembra = new Siembra('', '', '', '', '', '', '', '')
        },

        cambiarEstadoFormSiembraValido(state, nuevoEstado) {
            state.formSiembraValido = nuevoEstado
        },
    },

    getters: {
        formSiembraValido: (state) => state.formSiembraValido, // Devuelve la variable formSiembraValido
    },
}