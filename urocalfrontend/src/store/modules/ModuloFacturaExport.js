import FacturaExportacion from '@/models/ModeloFacturaExportacion';

export default {
    namespaced: true,

    state: {
        listaFacturaExportStore: [],
        factExportaStore: new FacturaExportacion(0, ' ', 0, 0, ' ', ' ', ' ', ' ', 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, ' ', 0, ' ', ' ', 0.0,0.0, ' ', ' ', 0, ' ', ' ', ' ',[]), 
        formFacturaExportValido: false, // Indica si el formulario de Finca es valido
    },

    mutations: {
        // Coloca un nuevo FacturaExport
        nuevaFacturaExport(state, nuevoFacturaExport) {
            state.factExportaStore = nuevoFacturaExport
        },

        // Vacia el modelo Finca
        vaciarFacturaExport(state) {
            state.factExportaStore = new FacturaExportacionFacturaExportacion(0, ' ', 0, 0, ' ', ' ', ' ', ' ', 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, ' ', 0, ' ', ' ', 0.0,0.0, ' ', ' ', 0, ' ', ' ', ' ',[])
        },

        // Cambia  el estado del Formulario FacturaExport
        cambiarEstadoValidoFormFacturaExport(state, nuevoEstado) {
            state.formFacturaExportValido = nuevoEstado
        },

        establecerListaFacturaExportStore(state, newState) {
            state.listaFacturaExportStore = newState;
        },
    },

    getters: {
        formFacturaExportValido: (state) => state.formFacturaExportValido, // Devuelve la variable validarFormularioFinca
        factExportaStore: (state) => state.factExportaStore,
        listaFacturaExportStore: (state) => state.listaFacturaExportStore,
    },
}