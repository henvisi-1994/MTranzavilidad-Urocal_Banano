import Riego from '@/models/ModeloRiego';

export default {
    namespaced: true,

    state: {
        listaRiegoStore: [],
        modeloRiegoStore: new Riego('', '', '', '', '', '', '', '', ''), // Modelo Riego
        formRiegoValido: false, // Indica si el formulario de Riego es valido
        editarRiego: false
    },

    mutations: {
        // Coloca un nuevo Riego
        establecerModeloRiegoStore(state, nuevoRiego) {
            state.modeloRiegoStore = nuevoRiego
        },

        establecerListaRiegoStore(state, newState) {
            state.listaRiegoStore = newState;
        },

        establecerEditarRiego(state, newState) {
            state.editarRiego = newState;
        },

        // Vacia el modelo Riego
        vaciarModeloRiegoStore(state) {
            state.modeloRiegoStore = new Riego('', '', '', '', '', '', '', '', '')
        },

        // Cambia  el estado del Formulario Riego
        cambiarEstadoValidoFormRiego(state, nuevoEstado) {
            state.formRiegoValido = nuevoEstado
        },
    },

    getters: {
        formRiegoValido: (state) => state.formRiegoValido, // Devuelve la variable formRiegoValido
        listaRiegoStore: (state) => state.listaRiegoStore,
        modeloRiegoStore: (state) => state.modeloRiegoStore,
        editarRiego: (state) => state.editarRiego,
    },
}