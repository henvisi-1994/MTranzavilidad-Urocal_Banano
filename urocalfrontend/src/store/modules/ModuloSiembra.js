import Siembra from '../../models/ModeloSiembra';

export default {
    namespaced: true,

    state: {
        siembra: new Siembra('', '', '', '', '', '', '', '', 0, 0), // Modelo siembra
        formSiembraValido: false, // Indica si el formulario de siembra es valido
        listaSiembra: [], // Lista de Controles de Siembra
        bloquearCamposFormSiembra: false, // Determina si se bloquean los campos del formulario
    },

    actions: {

    },

    mutations: {
        // Coloca un nuevo siembra
        agregarSiembra(state, nuevaSiembra) {
            state.siembra = nuevaSiembra
        },

        // Vacia el modelo siembra
        vaciarSiembra(state) {
            state.siembra = new Siembra('', '', '', '', '', '', '', '', 0, 0)
        },

        cambiarEstadoFormSiembraValido(state, nuevoEstado) {
            state.formSiembraValido = nuevoEstado
        },

        // listaSiembra
        eliminarSiembraLista(state, siembraID) {
            let indice = state.listaSiembra.indexOf(siembraID); // Obtiene la posicion del elemento
            state.listaSiembra.splice(indice, 1); // Elimina el elemento
        },

        asignarListaSiembra(state, nuevaListaSiembra) {
            state.listaSiembra = nuevaListaSiembra;
        },

        // Cambia el estado de la variable bloquearCamposFormSiembra
        cambiarBloquearCamposFormSiembra(state, nuevoEstado) {
            state.bloquearCamposFormSiembra = nuevoEstado
        },
    },

    getters: {
        formSiembraValido: (state) => state.formSiembraValido,                        // Devuelve la variable formSiembraValido
        siembra: (state) => state.siembra,                                            // Devuelve el modelo siembra
        bloquearCamposFormSiembra: (state) => state.bloquearCamposFormSiembra,        // Devuelve bloquearCamposFormSiembra
    },
}