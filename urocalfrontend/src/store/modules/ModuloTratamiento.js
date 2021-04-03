import Tratamiento from '@/models/ModeloTratamiento';

export default {
    namespaced: true,

    state: {
        listaTratamientoStore: [],
        listaLoteStore: [],
        listaCultivoStore: [],
        modeloTratamientoStore: new Tratamiento('', '', '', '',0, 0, 0, 0, []), // Modelo Tratamiento
        formTratamientoValido: false, // Indica si el formulario de Tratamiento es valido
        editarTratamiento: false
    },

    mutations: {
        // Coloca un nuevo Tratamiento
        establecerModeloTratamientoStore(state, nuevoTratamiento) {
            state.modeloTratamientoStore = nuevoTratamiento
        },

        establecerEditarTratamiento(state, newState) {
            state.editarTratamiento = newState;
        },

        // Vacia el modelo Tratamiento
        vaciarModeloTratamientoStore(state) {
            state.modeloTratamientoStore = new Tratamiento('', '', '', '',0, 0, 0, 0, [])
        },

        // Cambia  el estado del Formulario Tratamiento
        cambiarEstadoValidoFormTratamiento(state, nuevoEstado) {
            state.formTratamientoValido = nuevoEstado
        },

        asignarListaTratamientoStore(state, nuevaListaTratamientoControl) {
            state.listaTratamientoStore = nuevaListaTratamientoControl;
        },
        asignarListaCultivoStore(state, nuevaListaCultivoStore) {
            state.listaCultivoStore = nuevaListaCultivoStore;
        },
        asignarListaLoteStore(state, nuevaListaLoteStore) {
            state.listaLoteStore = nuevaListaLoteStore;
        },
        updateListaTratamientoStore(state, newState) {
            state.listaTratamientoStore.push(newState)
        },
        vaciarLista(state, newState) {
            state.listaTratamientoStore.length = 0;
        },
    },

    getters: {
        formTratamientoValido: (state) => state.formTratamientoValido, // Devuelve la variable formTratamientoValido
        modeloTratamientoStore: (state) => state.modeloTratamientoStore,
        editarTratamiento: (state) => state.editarTratamiento,
        listaTratamientoStore:(state)=> state.listaTratamientoStore,
        listaLoteStore: (state)=> state.listaLoteStore,
        listaCultivoStore: (state)=> state.listaCultivoStore,
    },
}