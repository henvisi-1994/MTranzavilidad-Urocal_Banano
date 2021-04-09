import LimpiezaHerramienta from '@/models/ModeloLimpiezaHerramienta';

export default {
    namespaced: true,

    state: {
        listaLimpiezaHerramientaStore: [],
        listaCultivoStore: [],
        listaloteStore: [],
        limpiezaHerramienta: new LimpiezaHerramienta('', '', '', '', '', '', '', '', '', '', '', '', ''), // Modelo LimpiezaHerramienta
        formLimpiezaHerramientaValido: false, // Indica si el formulario de LimpiezaHerramienta es valido
        editarLimpiezaHerramienta: false
    },

    mutations: {
        // Coloca un nuevo LimpiezaHerramienta
        nuevoLimpiezaHerramienta(state, nuevoLimpiezaHerramienta) {
            state.limpiezaHerramienta = nuevoLimpiezaHerramienta
        },

        // Vacia el modelo LimpiezaHerramienta
        vaciarLimpiezaHerramienta(state) {
            state.limpiezaHerramienta = new LimpiezaHerramienta('', '', '', '', '', '', '', '', '', '', '', '', '')
        },

        // Cambia  el estado del Formulario LimpiezaHerramienta
        cambiarEstadoValidoFormLimpiezaHerramienta(state, nuevoEstado) {
            state.formLimpiezaHerramientaValido = nuevoEstado
        },

        establecerListaCultivoStore(state, newState) {
            state.listaCultivoStore = newState;
        },
        establecerlistaloteStore(state, newState) {
            state.listaloteStore = newState;
        },

        limpiarListaCultivoStore(state) {
            state.listaCultivoStore = [];
        },

        establecerListaLimpiezaHerramientaStore(state, newState) {
            state.listaLimpiezaHerramientaStore = newState;
        },

        establecerEditarimpiezaHerramienta(state, newState) {
            state.editarLimpiezaHerramienta = newState;
        },
    },

    getters: {
        formLimpiezaHerramientaValido: (state) => state.formLimpiezaHerramientaValido, // Devuelve la variable validarFormularioLimpiezaHerramienta
        limpiezaHerramienta: (state) => state.limpiezaHerramienta,
        listaLimpiezaHerramientaStore: (state) => state.listaLimpiezaHerramientaStore,
        listaCultivoStore: (state) => state.listaCultivoStore,
        listaloteStore: (state) => state.listaloteStore,
        editarLimpiezaHerramienta: (state) => state.editarLimpiezaHerramienta,
    },
}