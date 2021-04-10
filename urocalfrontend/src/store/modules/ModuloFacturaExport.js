import FacturaExportacion from '@/models/ModeloFacturaExportacion';

export default {
    namespaced: true,

    state: {
        listaFacturaExportStore: [],
        factExportaStore: new FacturaExportacion(0, ' ', 0, 0, '', ' ', ' ', ' ', 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, ' ', 0, ' ', ' ', 0.0, 0.0, ' ', ' ', 0, ' ', ' ', ' ', []),
        formFacturaExportValido: false, // Indica si el formulario de Finca es valido
        bloquearFacturaExport: false,
    },

    mutations: {
        // Coloca un nuevo FacturaExport
        nuevaFacturaExport(state, nuevoFacturaExport) {
            state.factExportaStore = nuevoFacturaExport
        },

        // Vacia el modelo Finca
        vaciarFacturaExport(state) {
            state.factExportaStore = new FacturaExportacion(0, ' ', 0, 0, '', ' ', ' ', ' ', 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, ' ', 0, ' ', ' ', 0.0, 0.0, ' ', ' ', 0, ' ', ' ', ' ', [])
        },

        // Cambia  el estado del Formulario FacturaExport
        cambiarEstadoValidoFormFacturaExport(state, nuevoEstado) {
            state.formFacturaExportValido = nuevoEstado
        },
        // Cambia  el estado del Formulario FacturaExport
        cambiarEstadoBloquearFacturaExport(state, nuevoEstado) {
            state.bloquearFacturaExport = nuevoEstado
        },
        updateListaFacturaExportStore(state, newState) {
            state.listaFacturaExportStore.push(newState)
        },
        vaciarLista(state, newState) {
            state.listaFacturaExportStore.length = 0;
        },

        establecerListaFacturaExportStore(state, newState) {
            state.listaFacturaExportStore = newState;
        },
    },

    getters: {
        formFacturaExportValido: (state) => state.formFacturaExportValido, // Devuelve la variable validarFormularioFinca
        factExportaStore: (state) => state.factExportaStore,
        listaFacturaExportStore: (state) => state.listaFacturaExportStore,
        bloquearFacturaExport: (state) => state.bloquearFacturaExport,
    },
}