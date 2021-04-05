import Tratamiento from '@/models/ModeloTratamiento';

export default {
    namespaced: true,

    state: {
        listaTratamientoStore: [],
<<<<<<< HEAD
        modeloTratamientoStore: new Tratamiento('', '', '', '', 0, 0, 0, []), // Modelo Tratamiento
=======
        listaLoteStore: [],
        listaCultivoStore: [],
        listaFincaStore: [],
        modeloTratamientoStore: new Tratamiento('', '', '', '',0, 0, 0, 0, []), // Modelo Tratamiento
>>>>>>> 8f2d20847df712c65189b6986e90c5e632f0850c
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
<<<<<<< HEAD
            state.modeloTratamientoStore = new Tratamiento('', '', '', '', 0, 0, 0, [])
=======
            state.modeloTratamientoStore = new Tratamiento('', '', '', '',0, 0, 0, 0, [])
>>>>>>> 8f2d20847df712c65189b6986e90c5e632f0850c
        },

        // Cambia  el estado del Formulario Tratamiento
        cambiarEstadoValidoFormTratamiento(state, nuevoEstado) {
            state.formTratamientoValido = nuevoEstado
        },

        asignarListaTratamientoStore(state, nuevaListaTratamientoControl) {
            state.listaTratamientoStore = nuevaListaTratamientoControl;
        },
<<<<<<< HEAD
=======
        asignarListaCultivoStore(state, nuevaListaCultivoStore) {
            state.listaCultivoStore = nuevaListaCultivoStore;
        },
        asignarListaLoteStore(state, nuevaListaLoteStore) {
            state.listaLoteStore = nuevaListaLoteStore;
        },
        asignarListaFincaStore(state, nuevaListaFincaStore) {
            state.listaFincaStore = nuevaListaFincaStore;
        },
        updateListaTratamientoStore(state, newState) {
            state.listaTratamientoStore.push(newState)
        },
        vaciarLista(state, newState) {
            state.listaTratamientoStore.length = 0;
        },
>>>>>>> 8f2d20847df712c65189b6986e90c5e632f0850c
    },

    getters: {
        formTratamientoValido: (state) => state.formTratamientoValido, // Devuelve la variable formTratamientoValido
        modeloTratamientoStore: (state) => state.modeloTratamientoStore,
        editarTratamiento: (state) => state.editarTratamiento,
<<<<<<< HEAD
        listaTratamientoStore:(state)=> state.asignarListaTratamientoStore,
=======
        listaTratamientoStore:(state)=> state.listaTratamientoStore,
        listaLoteStore: (state)=> state.listaLoteStore,
        listaCultivoStore: (state)=> state.listaCultivoStore,
        listaFincaStore: (state)=> state.listaFincaStore,
>>>>>>> 8f2d20847df712c65189b6986e90c5e632f0850c
    },
}