import Fitosanitario from '@/models/ModeloFitosanitario';

export default {
    namespaced: true,

    state: {
        fitosanitario: new Fitosanitario('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''), // Modelo Fitosanitario
        formFitosanitarioValido: false, // Indica si el formulario de Fitosanitario es valido
    },

    mutations: {
        // Coloca un nuevo Fitosanitario
        nuevoFitosanitario(state, nuevoFitosanitario) {
            state.fitosanitario = nuevoFitosanitario
        },

        // Vacia el modelo Fitosanitario
        vaciarFitosanitario(state) {
            state.fitosanitario = new Fitosanitario('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '')
        },

        // Cambia  el estado del Formulario Fitosanitario
        cambiarEstadoValidoFormFitosanitario(state, nuevoEstado) {
            state.formFitosanitarioValido = nuevoEstado
        },
    },

    getters: {
        formFitosanitarioValido: (state) => state.formFitosanitarioValido, // Devuelve la variable formFitosanitarioValido
    },
}