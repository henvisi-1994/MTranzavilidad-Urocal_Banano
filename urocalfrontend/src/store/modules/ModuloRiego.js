import Riego from '@/models/ModeloRiego';

export default {
    namespaced: true,

    state: {
        listaRiegoStore: [],
        listaCultivoStore: [],
        listaloteStore: [],
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

         // Vacia el modelo Riego
        vaciarModeloRiegoStore(state) {
            state.modeloRiegoStore = new Riego('', '', '', '', '', '', '', '', '')
        },

        // Cambia  el estado del Formulario Riego
        cambiarEstadoValidoFormRiego(state, nuevoEstado) {
            state.formRiegoValido = nuevoEstado
        },

        establecerEditarRiego(state, newState) {
            state.editarRiego = newState;
        },
        
        establecerlistaloteStore(state, newState) {
            state.listaloteStore = newState;
        },

        nuevoRiego(state,nuevoRiego){
            state.modeloRiegoStore=nuevoRiego
        },

        establecerListaCultivoStore(state, newState) {
            state.listaCultivoStore = newState;
        },

        establecerlistaTipoStore(state, newState) {
            state.listaTipoStore = newState;
        },

        limpiarListaCultivoStore(state) {
            state.listaCultivoStore = [];
        },
       

        
    },

    getters: {
        formRiegoValido: (state) => state.formRiegoValido, // Devuelve la variable formRiegoValido
        listaRiegoStore: (state) => state.listaRiegoStore,
        modeloRiegoStore: (state) => state.modeloRiegoStore,
        editarRiego: (state) => state.editarRiego,
        listaCultivoStore: (state) => state.listaCultivoStore,
        listaloteStore: (state) => state.listaloteStore,
        listaTipoStore:(state) => state.listaTipoStore,
    },
}