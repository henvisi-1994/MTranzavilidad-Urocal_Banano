import Riego from '@/models/ModeloRiego';

export default {
    namespaced: true,

    state: {
        riego: new Riego('', '', '', '', '', '', '', '', '', ''), // Modelo Riego
        formRiegoValido: false, // Indica si el formulario de Riego es valido
    },

    mutations: {
        // Coloca un nuevo Riego
        nuevoRiego(state, nuevoRiego) {
            state.riego = nuevoRiego
        },

        // Vacia el modelo Riego
        vaciarRiego(state) {
            state.riego = new Riego('', '', '', '', '', '', '', '', '', '')
        },

        // Cambia  el estado del Formulario Riego
        cambiarEstadoValidoFormRiego(state, nuevoEstado) {
            state.formRiegoValido = nuevoEstado
        },
    },

    getters: {
        formRiegoValido: (state) => state.formRiegoValido, // Devuelve la variable formRiegoValido
    },
}