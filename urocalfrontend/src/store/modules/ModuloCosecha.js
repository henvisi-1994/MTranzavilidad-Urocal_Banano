import Cosecha from '../../models/ModeloCosecha';

export default {
    namespaced: true,

    state: {
        cosecha: new Cosecha('', '', '', '', '', '','',null,''), // Modelo cosecha
        formCosechaValido: false, // Indica si el formulario de cosecha es valido
        listaCosechaStore: [],
        listaLoteStore: [],
        listaCultivoStore: [],        
        bloquearCamposFormCosecha: false, // Determina si se bloquean los campos del formulario
    },

    actions: {

    },

    mutations: {
        // Coloca un nueva cosecha
        setCosecha(state, nuevoCosecha) {
            state.cosecha = nuevoCosecha
        },

        // Vacia el modelo cosecha
        vaciarCosecha(state) {
            state.cosecha = new Cosecha('', '', '', '', '', '','',null,'')
        },

        cambiarEstadoFormCosechaValido(state, nuevoEstado) {
            state.formCosechaValido = nuevoEstado
        },
        
         // listaCosecha
        eliminarCosechaLista(state, cosechaID) {
            let indice = state.listaCosechaStore.indexOf(cosechaID); // Obtiene la posicion del elemento
            state.listaCosechaStore.splice(indice, 1); // Elimina el elemento
        },

        asignarListaCosecha(state, newState) {
            state.listaCosechaStore = newState
        },
<<<<<<< HEAD
        
=======

        asignarListaLote(state, newState) {
            state.listaLoteStore = newState
        },

        asignarListaCultivo(state, newState) {
            state.listaCultivoStore = newState
        },

        // Cambia el estado de la variable bloquearCamposFormCosecha
        cambiarBloquearCamposFormCosecha(state, nuevoEstadoCosecha) {
            state.bloquearCamposFormCosecha = nuevoEstadoCosecha
        },
>>>>>>> 2643a7dc1000ce2fdc138352346406de69b60d77
    },

    getters: {
        //cosecha: (state) => state.cosecha,
        formCosechaValido: (state) => state.formCosechaValido, // Devuelve la variable formcosechaValido
        cosecha: (state) => state.cosecha,        
        bloquearCamposFormCosecha: (state) => state.bloquearCamposFormCosecha, 
        listaCosechaStore: (state) => state.listaCosechaStore,
        listaCultivoStore: (state) => state.listaCultivoStore,
        listaLoteStore: (state) => state.listaLoteStore,
    },
}