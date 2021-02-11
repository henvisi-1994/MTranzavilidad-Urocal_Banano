export default {
    namespaced: true,

    state: {
        dialogSolicitudCambioPass: false,                   // Indica si se abre o cierra el dialogSolicitudCambioPass
        dialogCambioPassword: false,                        // Indica si se abre o cierra el dialogCambioPassword
        dialogStepperLoteNuevo: false,                      // Indica si se abre o cierra el dialogStepperLoteNuevo
        dialogTabsMostrarLote: false,                       // Indica si se abre o cierra el dialogTabMostrarLote
        dialogNuevoUsuarioPersona: false,                   // Indica si se abre o cierra el dialogNuevoUsuarioPersona
        dialogEditarUsuarioPersona: false,                  // Indica si se abre o cierra el dialogEditarUsuarioPersona
        dialogNuevoOperarioPersona: false,                  // Indica si se abre o cierra el dialogNuevoOperarioPersona 
        dialogEditarOperarioPersona: false,                 // Indica si se abre o cierra el dialogEditarOperarioPersona 
        dialogNuevoProductorPersona: false,                 // Indica si se abre o cierra el dialogNuevoProductorPersona     
        dialogEditarProductorPersona: false,                // Indica si se abre o cierra el dialogEditarProductorPersona     
        dialogoNuevaMaleza: false,                          // Indica si se abre o cierra el dialogoNuevaMaleza
        dialogoMostrarMalezaControl: false,                 // Indica si se abre o cierra el dialogoMostrarMalezaControl
        dialogoNuevaSiembra: false,                         // Indica si se abre o cierra el dialogoNuevaSiembra
        dialogoMostrarSiembra: false,                       // Indica si se abre o cierra el dialogoMostrarSiembra
        dialogNuevoLimpiezaHerramienta: false,              // Indica si se abre o cierra el dialogoNuevoLimpiezaHerramienta
        dialogMostrarLimpiezaHerramienta: false,            // Indica si se abre o cierra el dialogoMostrarLimpiezaHerramienta
        dialogNuevoMonitoreoRoedorCentroAcopio: false,      // Indica si se abre o cierra el dialogNuevoMonitoreoRoedorCentroAcopio
        dialogMostrarMonitoreoRoedorCentroAcopio: false,    // Indica si se abre o cierra el dialogMostrarMonitoreoRoedorCentroAcopio
        dialogNuevoMonitoreoRoedorFinca: false,             // Indica si se abre o cierra el dialogNuevoMonitoreoRoedorFinca
        dialogMostrarMonitoreoRoedorFinca: false,           // Indica si se abre o cierra el dialogMostrarMonitoreoRoedorFinca
        dialogNuevoLimpiezaVehiculo: false,                 // Indica si se abre o cierra el dialogNuevoLimpiezaVehiculo     
        dialogEditarLimpiezaVehiculo: false,                // Indica si se abre o cierra el dialogEditarLimpiezaVehiculo
        dialogNuevoVehiculo: false,                         // Indica si se abre o cierra el dialogNuevoVehiculo
        dialogEditarVehiculo: false,                        // Indica si se abre o cierra el dialogEditarVehiculo
        dialogNuevoReporteEmbarque: false,                        // Indica si se abre o cierra el dialogEditarVehiculo
        dialogEditarReporteEmbarque: false,                        // Indica si se abre o cierra el dialogEditarVehiculo
        dialogNuevoPoda: false,                             // Indica si se abre o cierra el dialogNuevoPoda
        dialogMostrarPoda: false,                           // Indica si se abre o cierra el dialogMostrarPoda
        dialogNuevoFertilizante: false,                     // Indica si se abre o cierra el dialogNuevoFertilizante
        dialogMostrarFertilizante: false,                   // Indica si se abre o cierra el dialogMostrarFertilizante        
        dialogNuevoFitosanitario: false,                    // Indica si se abre o cierra el dialogNuevoFitosanitario
        dialogMostrarFitosanitario: false,                  // Indica si se abre o cierra el dialogMostrarFitosanitario
        dialogNuevoRiego: false,                            // Indica si se abre o cierra el dialogNuevoRiego
        dialogMostrarRiego: false,                          // Indica si se abre o cierra el dialogMostrarRiego
    },

    mutations: {
        // Cambia el estado de la variable dialogSolicitudCambioPass
        toggleDialogSolicitudCambioPass(state, newState) {
            state.dialogSolicitudCambioPass = newState;
        },

        // Cambia el estado de la variable dialogCambioPassword
        toggleDialogCambioPassword(state, newState) {
            state.dialogCambioPassword = newState;
        },

        /* Lote */
        toggleDialogStepperLoteNuevo(state, newState) {
            state.dialogStepperLoteNuevo = newState;
        },

        toggleDialogTabsMostrarLote(state, newState) {
            state.dialogTabsMostrarLote = newState;
        },

        /* UsuarioPersona */
        toggleDialogNuevoUsuarioPersona(state, newState) {
            state.dialogNuevoUsuarioPersona = newState;
        },

        toggleDialogEditarUsuarioPersona(state, newState) {
            state.dialogEditarUsuarioPersona = newState;
        },

        /* OperarioPersona */
        toggleDialogNuevoOperarioPersona(state, newState) {
            state.dialogNuevoOperarioPersona = newState;
        },

        toggleDialogEditarOperarioPersona(state, newState) {
            state.dialogEditarOperarioPersona = newState;
        },

        /* ProductorPersona */
        toggleDialogNuevoProductorPersona(state, newState) {
            state.dialogNuevoProductorPersona = newState;
        },

        toggleDialogEditarProductorPersona(state, newState) {
            state.dialogEditarProductorPersona = newState;
        },

        /* Maleza */
        toggleDialogoNuevaMaleza(state, newState) {
            state.dialogoNuevaMaleza = newState;
        },

        toggleDialogoMostrarMalezaControl(state, newState) {
            state.dialogoMostrarMalezaControl = newState;
        },

        /* Siembra */
        toggleDialogoNuevaSiembra(state, newState) {
            state.dialogoNuevaSiembra = newState;
        },

        toggleDialogoMostrarSiembra(state, newState) {
            state.dialogoMostrarSiembra = newState;
        },

        /* LimpiezaHerramienta */
        toggleDialogNuevoLimpiezaHerramienta(state, newState) {
            state.dialogNuevoLimpiezaHerramienta = newState;
        },

        toggleDialogMostrarLimpiezaHerramienta(state, newState) {
            state.dialogMostrarLimpiezaHerramienta = newState;
        },

        /* MonitoreoRoedorCentroAcopio */
        toggleDialogNuevoMonitoreoRoedorCentroAcopio(state, newState) {
            state.dialogNuevoMonitoreoRoedorCentroAcopio = newState;
        },

        toggleDialogMostrarMonitoreoRoedorCentroAcopio(state, newState) {
            state.dialogMostrarMonitoreoRoedorCentroAcopio = newState;
        },

        /* MonitoreoRoedorFinca */
        toggleDialogNuevoMonitoreoRoedorFinca(state, newState) {
            state.dialogNuevoMonitoreoRoedorFinca = newState;
        },

        toggleDialogMostrarMonitoreoRoedorFinca(state, newState) {
            state.dialogMostrarMonitoreoRoedorFinca = newState;
        },

        /* LimpiezaVehiculo */
        toggleDialogNuevoLimpiezaVehiculo(state, newState) {
            state.dialogNuevoLimpiezaVehiculo = newState;
        },

        toggleDialogEditarLimpiezaVehiculo(state, newState) {
            state.dialogEditarLimpiezaVehiculo = newState;
        },

        /* LimpiezaVehiculo */
        toggleDialogNuevoLimpiezaVehiculo(state, newState) {
            state.dialogNuevoLimpiezaVehiculo = newState;
        },

        toggleDialogEditarLimpiezaVehiculo(state, newState) {
            state.dialogEditarLimpiezaVehiculo = newState;
        },

        /* Vehiculo */
        toggleDialogNuevoVehiculo(state, newState) {
            state.dialogNuevoVehiculo = newState;
        },

        toggleDialogEditarVehiculo(state, newState) {
            state.dialogEditarVehiculo = newState;
        },

        /*  REPORTE EMBARQUE*/
        toggleDialogNuevoReporteEmbarque(state, newState) {
            state.dialogNuevoReporteEmbarque = newState;
        },

        toggleDialogEditarReporteEmbarque(state, newState) {
            state.dialogEditarReporteEmbarque = newState;
        },
        /* Poda */
        toggleDialogNuevoPoda(state, newState) {
            state.dialogNuevoPoda = newState;
        },

        toggleDialogMostrarPoda(state, newState) {
            state.dialogMostrarPoda = newState;
        },

        /* Fertilizante */
        toggleDialogNuevoFertilizante(state, newState) {
            state.dialogNuevoFertilizante = newState;
        },

        toggleDialogMostrarFertilizante(state, newState) {
            state.dialogMostrarFertilizante = newState;
        },

        /* Fitosanitario */
        toggleDialogNuevoFitosanitario(state, newState) {
            state.dialogNuevoFitosanitario = newState;
        },

        toggleDialogMostrarFitosanitario(state, newState) {
            state.dialogMostrarFitosanitario = newState;
        },

        /* Riego */
        toggleDialogNuevoRiego(state, newState) {
            state.dialogNuevoRiego = newState;
        },

        toggleDialogMostrarRiego(state, newState) {
            state.dialogMostrarRiego = newState;
        },
    },

    getters: {
        dialogSolicitudCambioPass: (state) => state.dialogSolicitudCambioPass,                                  // Devuelve la variable dialogSolicitudCambioPass
        dialogCambioPassword: (state) => state.dialogCambioPassword,                                            // Devuelve la variable dialogCambioPassword
        dialogStepperLoteNuevo: (state) => state.dialogStepperLoteNuevo,                                        // Devuelve la variable dialogStepperLoteNuevo
        dialogTabsMostrarLote: (state) => state.dialogTabsMostrarLote,                                          // Devuelve la variable dialogTabsMostrarLote
        dialogNuevoUsuarioPersona: (state) => state.dialogNuevoUsuarioPersona,                                  // Devuelve la variable dialogNuevoUsuarioPersona
        dialogEditarUsuarioPersona: (state) => state.dialogEditarUsuarioPersona,                                // Devuelve la variable dialogEditarUsuarioPersona
        dialogNuevoOperarioPersona: (state) => state.dialogNuevoOperarioPersona,                                // Devuelve la variable dialogNuevoOperarioPersona
        dialogEditarOperarioPersona: (state) => state.dialogEditarOperarioPersona,                              // Devuelve la variable dialogEditarOperarioPersona
        dialogNuevoProductorPersona: (state) => state.dialogNuevoProductorPersona,                              // Devuelve la variable dialogNuevoProductorPersona
        dialogEditarProductorPersona: (state) => state.dialogEditarProductorPersona,                            // Devuelve la variable dialogEditarProductorPersona
        dialogoNuevaMaleza: (state) => state.dialogoNuevaMaleza,                                                // Devuelve la variable dialogoNuevaMaleza
        dialogoMostrarMalezaControl: (state) => state.dialogoMostrarMalezaControl,                              // Devuelve la variable dialogoMostrarMalezaControl
        dialogoNuevaSiembra: (state) => state.dialogoNuevaSiembra,                                              // Devuelve la variable dialogoNuevaSiembra
        dialogoMostrarSiembra: (state) => state.dialogoMostrarSiembra,                                          // Devuelve la variable dialogoMostrarSiembra
        dialogNuevoLimpiezaHerramienta: (state) => state.dialogNuevoLimpiezaHerramienta,                        // Devuelve la variable dialogoNuevoLimpiezaHerramienta
        dialogMostrarLimpiezaHerramienta: (state) => state.dialogMostrarLimpiezaHerramienta,                    // Devuelve la variable dialogoMostrarLimpiezaHerramienta
        dialogNuevoMonitoreoRoedorCentroAcopio: (state) => state.dialogNuevoMonitoreoRoedorCentroAcopio,        // Devuelve la variable dialogNuevoMonitoreoRoedorCentroAcopio
        dialogMostrarMonitoreoRoedorCentroAcopio: (state) => state.dialogMostrarMonitoreoRoedorCentroAcopio,    // Devuelve la variable dialogMostrarMonitoreoRoedorCentroAcopio
        dialogNuevoMonitoreoRoedorFinca: (state) => state.dialogNuevoMonitoreoRoedorFinca,                      // Devuelve la variable dialogNuevoMonitoreoRoedorFinca
        dialogMostrarMonitoreoRoedorFinca: (state) => state.dialogMostrarMonitoreoRoedorFinca,                  // Devuelve la variable dialogMostrarMonitoreoRoedorFinca
        dialogNuevoLimpiezaVehiculo: (state) => state.dialogNuevoLimpiezaVehiculo,                              // Devuelve la variable dialogNuevoLimpiezaVehiculo
        dialogEditarLimpiezaVehiculo: (state) => state.dialogEditarLimpiezaVehiculo,                            // Devuelve la variable dialogEditarLimpiezaVehiculo
        dialogNuevoVehiculo: (state) => state.dialogNuevoVehiculo,                                              // Devuelve la variable dialogNuevoVehiculo
        dialogEditarVehiculo: (state) => state.dialogEditarVehiculo,                                            // Devuelve la variable dialogEditarVehiculo
        dialogNuevoReporteEmbarque: (state) => state.dialogNuevoReporteEmbarque,                                              // Devuelve la variable dialogNuevoVehiculo
        dialogEditarReporteEmbarque: (state) => state.dialogEditarReporteEmbarque,                                            // Devuelve la variable dialogEditarVehiculo
        dialogNuevoPoda: (state) => state.dialogNuevoPoda,                                                      // Devuelve la variable dialogNuevoPoda
        dialogMostrarPoda: (state) => state.dialogMostrarPoda,                                                  // Devuelve la variable dialogMostrarPoda
        dialogNuevoFertilizante: (state) => state.dialogNuevoFertilizante,                                      // Devuelve la variable dialogNuevoFertilizante
        dialogMostrarFertilizante: (state) => state.dialogMostrarFertilizante,                                  // Devuelve la variable dialogMostrarFertilizante
        dialogNuevoFitosanitario: (state) => state.dialogNuevoFitosanitario,                                    // Devuelve la variable dialogNuevoFitosanitario
        dialogMostrarFitosanitario: (state) => state.dialogMostrarFitosanitario,                                // Devuelve la variable dialogMostrarFitosanitario
        dialogNuevoRiego: (state) => state.dialogNuevoRiego,                                                    // Devuelve la variable dialogNuevoRiego
        dialogMostrarRiego: (state) => state.dialogMostrarRiego,                                                // Devuelve la variable dialogMostrarRiego
    },
}