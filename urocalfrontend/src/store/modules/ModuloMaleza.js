import Maleza from '../../models/ModeloMaleza';

export default {
    namespaced: true,

    state: {
        maleza: new Maleza('', '', '', '', '', ''), // Modelo maleza
        formMalezaValido: false, // Indica si el formulario de maleza es valido
        listaMalezaControl: [], // Lista de Controles de Maleza
        listaLoteStore: [],
        listaCultivoStore:[],
        bloquearCamposFormMalezaControl: false, // Determina si se bloquean los campos del formulario
    },

    actions: {

    },

    mutations: {
        // Coloca un nuevo maleza
        agregarMaleza(state, nuevaMaleza) {
            state.maleza = nuevaMaleza
        },

        // Vacia el modelo maleza
        vaciarMaleza(state) {
            state.maleza = new Maleza('', '', '', '', '', '')
        },

        // Cambia el estado de la variable formMalezaValido
        cambiarEstadoFormMalezaValido(state, nuevoEstado) {
            state.formMalezaValido = nuevoEstado
        },

        // listaMalezaControl
        eliminarMalezaLista(state, malezaID) {
            let indice = state.listaMalezaControl.indexOf(malezaID); // Obtiene la posicion del elemento
            state.listaMalezaControl.splice(indice, 1); // Elimina el elemento
        },

        asignarListaMaleza(state, nuevaListaMaleza) {
            state.listaMalezaControl = nuevaListaMaleza;
        },
        asignarListaLoteStore (state, nuevaListaLote) {
            state.listaLoteStore = nuevaListaLote;
        },
        asignarListaCultivoStore (state, nuevaListaCultivo) {
            state.listaCultivoStore = nuevaListaCultivo;
        },

        // Cambia el estado de la variable bloquearCamposFormMalezaControl
        cambiarBloquearCamposFormMaleza(state, nuevoEstado) {
            state.bloquearCamposFormMalezaControl = nuevoEstado
        },

    },

    getters: {
        formMalezaValido: (state) => state.formMalezaValido,                                      // Devuelve la variable formMalezaValido
        maleza: (state) => state.maleza,                                                          // Devuelve el modelo maleza
        listaLoteStore: (state) => state.listaLoteStore,
        listaCultivoStore:(state) => state.listaCultivoStore,
        bloquearCamposFormMalezaControl: (state) => state.bloquearCamposFormMalezaControl,        // Devuelve bloquearCamposFormMalezaControl
    },
}