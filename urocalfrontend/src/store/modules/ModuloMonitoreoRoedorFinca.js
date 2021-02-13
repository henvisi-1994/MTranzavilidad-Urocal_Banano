import MonitoreoRoedorFinca from '@/models/ModeloMonitoreoRoedorFinca';

export default {
    namespaced: true,

    state: {
        listaMonitoreoRoedorFincaStore: [],
        listaFincaStore: [],
        monitoreoRoedorFinca: new MonitoreoRoedorFinca('', '', '', '', '', '', '', '', '', ''), // Modelo MonitoreoRoedorFinca
        formMonitoreoRoedorFincaValido: false, // Indica si el formulario de MonitoreoRoedorFinca es valido
    },

    mutations: {
        // Coloca un nuevo MonitoreoRoedorFinca
        nuevoMonitoreoRoedorFinca(state, nuevoMonitoreoRoedorFinca) {
            state.monitoreoRoedorFinca = nuevoMonitoreoRoedorFinca
        },

        // Vacia el modelo MonitoreoRoedorFinca
        vaciarMonitoreoRoedorFinca(state) {
            state.monitoreoRoedorFinca = new MonitoreoRoedorFinca('', '', '', '', '', '', '', '', '', '')
        },

        // Cambia  el estado del Formulario MonitoreoRoedorFinca
        cambiarEstadoValidoFormMonitoreoRoedorFinca(state, nuevoEstado) {
            state.formMonitoreoRoedorFincaValido = nuevoEstado
        },
        
        establecerListaFincaStore(state, newState) {
            state.listaFincaStore = newState;
        },

        limpiarListaFincaStore(state) {
            state.listaFincaStore = [];
        },

        establecerListaMonitoreoRoedorFincaStore(state, newState) {
            state.listaMonitoreoRoedorFincaStore = newState;
        },
    },

    getters: {
        formMonitoreoRoedorFincaValido: (state) => state.formMonitoreoRoedorFincaValido, // Devuelve la variable validarFormularioMonitoreoRoedorFincaValido
        monitoreoRoedorFinca: (state) => state.monitoreoRoedorFinca,
        listaMonitoreoRoedorFincaStore: (state) => state.listaMonitoreoRoedorFincaStore,
        listaFincaStore: (state) => state.listaFincaStore,
    },
}