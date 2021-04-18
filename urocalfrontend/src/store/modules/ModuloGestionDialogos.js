export default {
    namespaced: true,

    state: {
        // Mensaje de confirmacion
        dialogConfirmacion: false,                          // Indica si se abre o cierra el dialogConfirmacion
        // Password
        dialogSolicitudCambioPass: false,                   // Indica si se abre o cierra el dialogSolicitudCambioPass
        dialogCambioPassword: false,                        // Indica si se abre o cierra el dialogCambioPassword
        // Lote
        dialogStepperLoteNuevo: false,                      // Indica si se abre o cierra el dialogStepperLoteNuevo
        dialogTabsMostrarLote: false,                       // Indica si se abre o cierra el dialogTabMostrarLote
        // Usuario
        dialogNuevoUsuarioPersona: false,                   // Indica si se abre o cierra el dialogNuevoUsuarioPersona
        dialogEditarUsuarioPersona: false,                  // Indica si se abre o cierra el dialogEditarUsuarioPersona
        // Operario
        dialogNuevoOperarioPersona: false,                  // Indica si se abre o cierra el dialogNuevoOperarioPersona 
        dialogEditarOperarioPersona: false,                 // Indica si se abre o cierra el dialogEditarOperarioPersona 
        // Productor
        dialogNuevoProductorPersona: false,                 // Indica si se abre o cierra el dialogNuevoProductorPersona     
        dialogEditarProductorPersona: false,                // Indica si se abre o cierra el dialogEditarProductorPersona     
        // Maleza
        dialogoNuevaMaleza: false,                          // Indica si se abre o cierra el dialogoNuevaMaleza

        dialogEditarUsuarioPersona: false,                  // Indica si se abre o cierra el dialogEditarUsuarioPersona

        dialogNuevoConductorPersona: false,                 // Indica si se abre o cierra el dialogEditarUsuarioPersona
        dialogEditarConductorPersona: false,                // Indica si se abre o cierra el dialogEditarUsuarioPersona
        dialogEditarProductorPersona: false,                // Indica si se abre o cierra el dialogEditarProductorPersona     
        dialogEditarLimpiezaVehiculo: false,                // Indica si se abre o cierra el dialogEditarLimpiezaVehiculo
        dialogEditarVehiculo: false,                        // Indica si se abre o cierra el dialogEditarVehiculo

        dialogoMostrarMalezaControl: false,                 // Indica si se abre o cierra el dialogoMostrarMalezaControl
        // Siembra
        dialogoNuevaSiembra: false,                         // Indica si se abre o cierra el dialogoNuevaSiembra
        dialogoMostrarSiembra: false,                       // Indica si se abre o cierra el dialogoMostrarSiembra
        // LimpiezaHerramienta
        dialogNuevoLimpiezaHerramienta: false,              // Indica si se abre o cierra el dialogoNuevoLimpiezaHerramienta
        dialogMostrarLimpiezaHerramienta: false,            // Indica si se abre o cierra el dialogoMostrarLimpiezaHerramienta
        // MonitoreoRoedorCentroAcopio
        dialogNuevoMonitoreoRoedorCentroAcopio: false,      // Indica si se abre o cierra el dialogNuevoMonitoreoRoedorCentroAcopio
        dialogMostrarMonitoreoRoedorCentroAcopio: false,    // Indica si se abre o cierra el dialogMostrarMonitoreoRoedorCentroAcopio
        // MonitoreoRoedorFinca
        dialogNuevoMonitoreoRoedorFinca: false,             // Indica si se abre o cierra el dialogNuevoMonitoreoRoedorFinca
        dialogMostrarMonitoreoRoedorFinca: false,           // Indica si se abre o cierra el dialogMostrarMonitoreoRoedorFinca
        // LimpiezaVehiculo
        dialogNuevoLimpiezaVehiculo: false,                 // Indica si se abre o cierra el dialogNuevoLimpiezaVehiculo     
        dialogEditarLimpiezaVehiculo: false,                // Indica si se abre o cierra el dialogEditarLimpiezaVehiculo
        // Vehiculo
        dialogNuevoVehiculo: false,                         // Indica si se abre o cierra el dialogNuevoVehiculo
        dialogEditarVehiculo: false,                        // Indica si se abre o cierra el dialogEditarVehiculo
        // Poda
        dialogNuevoPoda: false,                             // Indica si se abre o cierra el dialogNuevoPoda
        dialogMostrarPoda: false,                           // Indica si se abre o cierra el dialogMostrarPoda
        // Fertilizante
        dialogNuevoFertilizante: false,                     // Indica si se abre o cierra el dialogNuevoFertilizante
        dialogMostrarFertilizante: false,                   // Indica si se abre o cierra el dialogMostrarFertilizante        
        // Fitosanitario
        dialogNuevoFitosanitario: false,                    // Indica si se abre o cierra el dialogNuevoFitosanitario
        dialogMostrarFitosanitario: false,                  // Indica si se abre o cierra el dialogMostrarFitosanitario
        // Riego
        dialogNuevoRiego: false,                            // Indica si se abre o cierra el dialogNuevoRiego
        dialogMostrarRiego: false,                          // Indica si se abre o cierra el dialogMostrarRiego
        // CentroAcopio
        dialogNuevoCentroacopio: false,                     // Indica si se abre o cierra el dialogNuevoCentroacopio
        dialogEditarCentroacopio: false,                   // Indica si se abre o cierra el dialogEditarCentroacopio
        dialogMostrarCentroacopio: false,                   // Indica si se abre o cierra el dialogMostrarCentroacopio
        // ResponsableCentroAcopio
        dialogNuevoRespacopio: false,                       // Indica si se abre o cierra el dialogNuevoRespacopio
        dialogEditarRespacopio: false,                     // Indica si se abre o cierra el dialogMostrarRespacopio
        dialogMostrarRespacopio: false,                     // Indica si se abre o cierra el dialogMostrarRespacopio
        // Egreso Insumo
        dialogNuevoEgresoInsumo: false,                     // Indica si se abre o cierra el dialogNuevoEgresoInsumo
        dialogEditarEgresoInsumo: false,                    // Indica si se abre o cierra el dialogEditarIngresoInsumo
        dialogMostrarEgresoInsumo: false,                   // Indica si se abre o cierra el dialogMostrarEgresoInsumo
        // IngresoInsumo
        dialogNuevoIngresoInsumo: false,                    // Indica si se abre o cierra el dialogNuevoIngresoInsumo
        dialogMostrarIngresoInsumo: false,                  // Indica si se abre o cierra el dialogMostrarIngresoInsumo
        dialogEditarIngresoInsumo: false,                   // Indica si se abre o cierra el dialogEditarIngresoInsumo
        // Cosecha
        dialogTabMostrarCosecha: false,                     // Indica si se abre o cierra el dialogTabMostrarCosecha
        dialogStepperCosechaNuevo: false,                   // Indica si se abre o cierra el dialogStepperCosechaNuevo 
        // Almacenamiento
        dialogNuevoAlmacenamiento: false,                   // Indica si se abre o cierra el dialogNuevoAlmacenamiento
        dialogMostrarAlmacenamiento: false,                 // Indica si se abre o cierra el dialogMostrarAlmacenamiento 
        // RevisionHumedad
        dialogNuevoRevisionHumedad: false,                  // Indica si se abre o cierra el dialogNuevoRevisionHumedad
        // Compra
        dialogNuevoCompra: false,                           // Indica si se abre o cierra el dialogNuevoCompra
        dialogMostrarCompra: false,                         // Indica si se abre o cierra el dialogMostrarCompra 
        // DetalleCompra
        dialogNuevoDetalleCompra: false,                    // Indica si se abre o cierra el dialogNuevoDetalleCompra
        dialogMostrarDetalleCompra: false,                  // Indica si se abre o cierra el dialogMostrarDetalleCompra
        // Finca
        dialogNuevoFinca: false,                            // Indica si se abre o cierra el dialogNuevoFinca
        dialogMostrarFinca: false,                          // Indica si se abre o cierra el dialogMostrarFinca
        // Asociacion
        dialogNuevoAsociacion: false,                       // Indica si se abre o cierra el dialogNuevoAsociacion
        dialogMostrarAsociacion: false,                     // Indica si se abre o cierra el dialogMostrarAsociacion
        // Pais
        dialogNuevoPais: false,                             // Indica si se abre o cierra el dialogNuevoPais
        dialogMostrarPais: false,                           // Indica si se abre o cierra el dialogMostrarPais
        // Provincia
        dialogNuevoProvincia: false,                        // Indica si se abre o cierra el dialogNuevoProvincia
        dialogMostrarProvincia: false,                      // Indica si se abre o cierra el dialogMostrarProvincia
        // Ciudad
        dialogNuevoCiudad: false,                           // Indica si se abre o cierra el dialogNuevoCiudad
        dialogMostrarCiudad: false,                         // Indica si se abre o cierra el dialogMostrarCiudad
        // Sitio
        dialogNuevoSitio: false,                            // Indica si se abre o cierra el dialogNuevoSitio
        dialogMostrarSitio: false,                          // Indica si se abre o cierra el dialogMostrarSitio
        // LimpiezaCentroAcopio
        dialogoNuevaLimpiezaCentroAcopio: false,            // Indica si se abre o cierra el dialogNuevaLimpiezaCentroAcopio
        dialogoMostrarLimpiezaCentroAcopio: false,          // Indica si se abre o cierra el dialogoMostrarLimpiezaCentroAcopio
        // Despacho
        dialogoNuevoDespacho: false,                        // Indica si se abre o cierra el dialogoNuevoDespacho
        dialogoMostrarDespacho: false,                      // Indica si se abre o cierra el dialogoNuevoDespacho
        // Inspector
        dialogNuevoInspectorPersona: false,
        dialogEditarInspectorPersona: false,
        dialogStepperCosechaNuevo: false,
        dialogMostrarRegistroEnvio: false,                  // Indica si se abre o cierra el dialogMostrarRegistroEnvio
        dialogNuevoRegistroEnvio: false,                  // Indica si se abre o cierra el dialogNuevoRegistroEnvio
        // Exportador
        dialogNuevoExportadorPersona: false,
        dialogEditarExportadorPersona: false,
        //Guia Remision
        dialogNuevoGuiaRemision: false,
        dialogMostrarGuiaRemision: false,
        //Tratamiento
        dialogNuevoTratamiento: false,
        dialogMostrarTratamiento: false,
        // factura de exportación
        dialogoNuevoFactExport: false,
        dialogMostrarFactExport: false,
        //Empresa
        dialogoNuevaEmpresa: false,
        dialogoMostrarEmpresa: false,
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

        /* ConductorPersona */
        toggleDialogNuevoConductorPersona(state, newState) {
            state.dialogNuevoConductorPersona = newState;
        },

        toggleDialogEditarConductorPersona(state, newState) {
            state.dialogEditarConductorPersona = newState;
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

        /* Egreso Insumo */
        toggleDialogNuevoEgresoInsumo(state, newState) {
            state.dialogNuevoEgresoInsumo = newState;
        },

        toggleDialogEditarEgresoInsumo(state, newState) {
            state.dialogEditarEgresoInsumo = newState;
        },
        toggleDialogMostrarEgresoInsumo(state, newState) {
            state.dialogMostrarEgresoInsumo = newState;
        },


        /* Ingreso Insumo*/
        toggleDialogNuevoIngresoInsumo(state, newState) {
            state.dialogNuevoIngresoInsumo = newState; 
        },

        toggleDialogMostrarIngresoInsumo(state, newState) {
            state.dialogMostrarIngresoInsumo = newState;
        },

        toggleDialogEditarIngresoInsumo(state, newState) {
            state.dialogEditarIngresoInsumo = newState;
        },


        /* Cosecha */
        toggleDialogStepperCosechaNuevo(state, newState) {
            state.dialogStepperCosechaNuevo = newState;
        },

        toggleDialogTabMostrarCosecha(state, newState) {
            state.dialogTabMostrarCosecha = newState;
        },

        /* Responsable de acopio */
        toggleDialogRespacopioNuevo(state, newState) {
            state.dialogNuevoRespacopio = newState;
        },
        toggleDialogEditarRespacopio(state, newState) {
            state.dialogEditarRespacopio = newState;
        },
        toggleDialogMostrarRespacopio(state, newState) {
            state.dialogMostrarRespacopio = newState;
        },

        /* Centro de acopio */
        toggleDialogNuevoCentroacopio(state, newState) {
            state.dialogNuevoCentroacopio = newState;
        },
        toggleDialogEditarCentroacopio(state, newState) {
            state.dialogEditarCentroacopio = newState;
        },

        toggleDialogMostrarCentroacopio(state, newState) {
            state.dialogMostrarCentroacopio = newState;
        },

        /* Finca */
        toggleDialogNuevoFinca(state, newState) {
            state.dialogNuevoFinca = newState;
        },

        toggleDialogMostrarFinca(state, newState) {
            state.dialogMostrarFinca = newState;
        },

        /* Asociación */
        toggleDialogNuevoAsociacion(state, newState) {
            state.dialogNuevoAsociacion = newState;
        },

        toggleDialogMostrarAsociacion(state, newState) {
            state.dialogMostrarAsociacion = newState;
        },

        /* País */
        toggleDialogNuevoPais(state, newState) {
            state.dialogNuevoPais = newState;
        },

        toggleDialogMostrarPais(state, newState) {
            state.dialogMostrarPais = newState;
        },

        /* Provincia */
        toggleDialogNuevoProvincia(state, newState) {
            state.dialogNuevoProvincia = newState;
        },

        toggleDialogMostrarProvincia(state, newState) {
            state.dialogMostrarProvincia = newState;
        },

        /* Ciudad */
        toggleDialogNuevoCiudad(state, newState) {
            state.dialogNuevoCiudad = newState;
        },

        toggleDialogMostrarCiudad(state, newState) {
            state.dialogMostrarCiudad = newState;
        },

        /* Sitio */
        toggleDialogNuevoSitio(state, newState) {
            state.dialogNuevoSitio = newState;
        },

        toggleDialogMostrarSitio(state, newState) {
            state.dialogMostrarSitio = newState;
        },

        /* Almacenamiento */
        toggleDialogNuevoAlmacenamiento(state, newState) {
            state.dialogNuevoAlmacenamiento = newState;
        },

        toggleDialogMostrarAlmacenamiento(state, newState) {
            state.dialogMostrarAlmacenamiento = newState;
        },

        /* Confirmacion */
        toggleDialogConfirmacion(state, newState) {
            state.dialogConfirmacion = newState;
        },

        /* RevisionHumedad */
        toggleDialogNuevoRevisionHumedad(state, newState) {
            state.dialogNuevoRevisionHumedad = newState;
        },

        /* Compra */
        toggleDialogNuevoCompra(state, newState) {
            state.dialogNuevoCompra = newState;
        },

        toggleDialogMostrarCompra(state, newState) {
            state.dialogMostrarCompra = newState;
        },

        /* DetalleCompra */
        toggleDialogNuevoDetalleCompra(state, newState) {
            state.dialogNuevoDetalleCompra = newState;
        },

        toggleDialogMostrarDetalleCompra(state, newState) {
            state.dialogMostrarDetalleCompra = newState;
        },

        /* Limpieza Centro Acopio */
        toggleDialogoNuevaLimpiezaCentroAcopio(state, newState) {
            state.dialogoNuevaLimpiezaCentroAcopio = newState;
        },

        toggleDialogoMostrarLimpiezaCentroAcopio(state, newState) {
            state.dialogoMostrarLimpiezaCentroAcopio = newState;
        },

        /* Despacho */
        toggleDialogoNuevoDespacho(state, newState) {
            state.dialogoNuevoDespacho = newState;
        },

        toggleDialogoMostrarDespacho(state, newState) {
            state.dialogoMostrarDespacho = newState;
        },

        /* InspectorPersona */
        toggleDialogNuevoInspectorPersona(state, newState) {
            state.dialogNuevoInspectorPersona = newState;
        },

        toggleDialogEditarInspectorPersona(state, newState) {
            state.dialogEditarInspectorPersona = newState;
        },
        /* Registro Envio */
        toggleDialogMostrarRegistroEnvio(state, newState) {
            state.dialogMostrarRegistroEnvio = newState;
        },
        toggleDialogNuevoRegistroEnvio(state, newState) {
            state.dialogNuevoRegistroEnvio = newState;
        },

        /* ExportadorPersona */
        toggleDialogNuevoExportadorPersona(state, newState) {
            state.dialogNuevoExportadorPersona = newState;
        },
        toggleDialogEditarExportadorPersona(state, newState) {
            state.dialogEditarExportadorPersona = newState;
        },

        // Guia Remision
        toggleDialogNuevoGuiaRemision(state, newState) {
            state.dialogNuevoGuiaRemision = newState;
        },
        toggleDialogMostrarGuiaRemision(state, newState) {
            state.dialogMostrarGuiaRemision = newState;
        },
        // Tratamiento
        toggleDialogoNuevoTratamiento(state, newState) {
            state.dialogNuevoTratamiento = newState;
        },
        toggleDialogoMostrarTratamiento(state, newState) {
            state.dialogMostrarTratamiento = newState;
        },
        // Factura de exportacion
        toggleDialogoNuevoFactExport(state, newState) {
            state.dialogoNuevoFactExport = newState;
        },
        toggleDialogoMostrarFactExport(state, newState) {
            state.dialogMostrarFactExport = newState;
        },
         //Empresa
         toggleDialogoNuevaEmpresa(state, newState) {
            state.dialogoNuevaEmpresa = newState;
        },
        toggleDialogoMostrarEmpresa(state, newState) {
            state.dialogoMostrarEmpresa = newState;
        },
    },

    getters: {
        // Password
        dialogSolicitudCambioPass: (state) => state.dialogSolicitudCambioPass,                                  // Devuelve la variable dialogSolicitudCambioPass
        dialogCambioPassword: (state) => state.dialogCambioPassword,                                            // Devuelve la variable dialogCambioPassword
        // Lote
        dialogStepperLoteNuevo: (state) => state.dialogStepperLoteNuevo,                                        // Devuelve la variable dialogStepperLoteNuevo
        dialogTabsMostrarLote: (state) => state.dialogTabsMostrarLote,                                          // Devuelve la variable dialogTabsMostrarLote
        // Usuario
        dialogNuevoUsuarioPersona: (state) => state.dialogNuevoUsuarioPersona,                                  // Devuelve la variable dialogNuevoUsuarioPersona
        dialogEditarUsuarioPersona: (state) => state.dialogEditarUsuarioPersona,                                // Devuelve la variable dialogEditarUsuarioPersona
        // Operario
        dialogNuevoOperarioPersona: (state) => state.dialogNuevoOperarioPersona,                                // Devuelve la variable dialogNuevoOperarioPersona
        dialogEditarOperarioPersona: (state) => state.dialogEditarOperarioPersona,                              // Devuelve la variable dialogEditarOperarioPersona
        // Productor
        dialogNuevoProductorPersona: (state) => state.dialogNuevoProductorPersona,                              // Devuelve la variable dialogNuevoProductorPersona
        dialogEditarProductorPersona: (state) => state.dialogEditarProductorPersona,                            // Devuelve la variable dialogEditarProductorPersona
        // Maleza
        dialogoNuevaMaleza: (state) => state.dialogoNuevaMaleza,                                                // Devuelve la variable dialogoNuevaMaleza
        dialogoMostrarMalezaControl: (state) => state.dialogoMostrarMalezaControl,                              // Devuelve la variable dialogoMostrarMalezaControl
        // Siembra
        dialogoNuevaSiembra: (state) => state.dialogoNuevaSiembra,                                              // Devuelve la variable dialogoNuevaSiembra
        dialogoMostrarSiembra: (state) => state.dialogoMostrarSiembra,                                          // Devuelve la variable dialogoMostrarSiembra
        // LimpiezaHerramienta
        dialogNuevoLimpiezaHerramienta: (state) => state.dialogNuevoLimpiezaHerramienta,                        // Devuelve la variable dialogoNuevoLimpiezaHerramienta
        dialogMostrarLimpiezaHerramienta: (state) => state.dialogMostrarLimpiezaHerramienta,                    // Devuelve la variable dialogoMostrarLimpiezaHerramienta
        // MonitoreoRoedorCentroAcopio
        dialogNuevoMonitoreoRoedorCentroAcopio: (state) => state.dialogNuevoMonitoreoRoedorCentroAcopio,        // Devuelve la variable dialogNuevoMonitoreoRoedorCentroAcopio
        dialogMostrarMonitoreoRoedorCentroAcopio: (state) => state.dialogMostrarMonitoreoRoedorCentroAcopio,    // Devuelve la variable dialogMostrarMonitoreoRoedorCentroAcopio
        // MonitoreoRoedorFinca
        dialogNuevoMonitoreoRoedorFinca: (state) => state.dialogNuevoMonitoreoRoedorFinca,                      // Devuelve la variable dialogNuevoMonitoreoRoedorFinca
        dialogMostrarMonitoreoRoedorFinca: (state) => state.dialogMostrarMonitoreoRoedorFinca,                  // Devuelve la variable dialogMostrarMonitoreoRoedorFinca
        // LimpiezaVehiculo
        dialogNuevoLimpiezaVehiculo: (state) => state.dialogNuevoLimpiezaVehiculo,                              // Devuelve la variable dialogNuevoLimpiezaVehiculo
        dialogEditarLimpiezaVehiculo: (state) => state.dialogEditarLimpiezaVehiculo,                            // Devuelve la variable dialogEditarLimpiezaVehiculo
        // Vehiculo
        dialogNuevoVehiculo: (state) => state.dialogNuevoVehiculo,                                              // Devuelve la variable dialogNuevoVehiculo
        dialogEditarVehiculo: (state) => state.dialogEditarVehiculo,                                            // Devuelve la variable dialogEditarVehiculo
        // Poda
        dialogNuevoPoda: (state) => state.dialogNuevoPoda,                                                      // Devuelve la variable dialogNuevoPoda
        dialogMostrarPoda: (state) => state.dialogMostrarPoda,                                                  // Devuelve la variable dialogMostrarPoda
        // CentroAcopio
        dialogNuevoCentroacopio: (state) => state.dialogNuevoCentroacopio,
        dialogEditarCentroacopio: (state) => state.dialogEditarCentroacopio,                                      // Devuelve la variable dialogNuevoCentroacopio
        dialogMostrarCentroacopio: (state) => state.dialogMostrarCentroacopio,                                  // Devuelve la variable dialogMostrarCentroacopio
        // Fertilizante
        dialogNuevoFertilizante: (state) => state.dialogNuevoFertilizante,                                      // Devuelve la variable dialogNuevoFertilizante
        dialogMostrarFertilizante: (state) => state.dialogMostrarFertilizante,                                  // Devuelve la variable dialogMostrarFertilizante
        // Fitosanitario
        dialogNuevoFitosanitario: (state) => state.dialogNuevoFitosanitario,                                    // Devuelve la variable dialogNuevoFitosanitario
        dialogMostrarFitosanitario: (state) => state.dialogMostrarFitosanitario,                                // Devuelve la variable dialogMostrarFitosanitario
        // Riego
        dialogNuevoRiego: (state) => state.dialogNuevoRiego,                                                    // Devuelve la variable dialogNuevoRiego
        dialogMostrarRiego: (state) => state.dialogMostrarRiego,                                                // Devuelve la variable dialogMostrarRiego
        // ResponsableCentroAcopio
        dialogNuevoRespacopio: (state) => state.dialogNuevoRespacopio,
        dialogEditarRespacopio: (state) => state.dialogNuevoRespacopio,                                        // Devuelve la variable dialogNuevoRespacopio
        dialogMostrarRespacopio: (state) => state.dialogMostrarRespacopio,                                      // Devuelve la variable dialogMostrarRespacopio                                             // Devuelve la variable dialogMostrarRiego
        // EgresoInsumo
        dialogNuevoEgresoInsumo: (state) => state.dialogNuevoEgresoInsumo,                                      // Devuelve la variable dialogNuevoEgresoInsumo
        dialogEditarEgresoInsumo: (state) => state.dialogEditarEgresoInsumo,                                  // Devuelve la variable dialogMostrarEgresoInsumo
        dialogMostrarEgresoInsumo: (state) => state.dialogMostrarEgresoInsumo,                                  // Devuelve la variable dialogMostrarEgresoInsumo
        // IngresoInsumo
        dialogNuevoIngresoInsumo: (state) => state.dialogNuevoIngresoInsumo,                                    // Devuelve la variable dialogNuevoIngresoInsumo
        dialogoNuevaSiembra: (state) => state.dialogoNuevaSiembra,                                              // Devuelve la variable dialogoNuevaSiembra
        dialogoNuevaMaleza: (state) => state.dialogoNuevaMaleza, 
        dialogEditarIngresoInsumo: (state) => state.dialogEditarIngresoInsumo,                                                // Devuelve la variable dialogoNuevaMaleza

        dialogEditarUsuarioPersona: (state) => state.dialogEditarUsuarioPersona,                                // Devuelve la variable dialogEditarUsuarioPersona
        dialogNuevoConductorPersona: (state) => state.dialogNuevoConductorPersona,                              // Devuelve la variable dialogEditarUsuarioPersona
        dialogEditarConductorPersona: (state) => state.dialogEditarConductorPersona,                            // Devuelve la variable dialogEditarUsuarioPersona
        dialogEditarProductorPersona: (state) => state.dialogEditarProductorPersona,                            // Devuelve la variable dialogEditarProductorPersona
        dialogEditarLimpiezaVehiculo: (state) => state.dialogEditarLimpiezaVehiculo,                            // Devuelve la variable dialogEditarLimpiezaVehiculo
        dialogEditarVehiculo: (state) => state.dialogEditarVehiculo,                                            // Devuelve la variable dialogEditarVehiculo

        dialogoMostrarMalezaControl: (state) => state.dialogoMostrarMalezaControl,                              // Devuelve la variable dialogoMostrarMalezaControl
        dialogoMostrarSiembra: (state) => state.dialogoMostrarSiembra,                                          // Devuelve la variable dialogoMostrarSiembra
        dialogMostrarLimpiezaHerramienta: (state) => state.dialogMostrarLimpiezaHerramienta,                    // Devuelve la variable dialogoMostrarLimpiezaHerramienta
        dialogMostrarMonitoreoRoedorCentroAcopio: (state) => state.dialogMostrarMonitoreoRoedorCentroAcopio,    // Devuelve la variable dialogMostrarMonitoreoRoedorCentroAcopio
        dialogMostrarMonitoreoRoedorFinca: (state) => state.dialogMostrarMonitoreoRoedorFinca,                  // Devuelve la variable dialogMostrarMonitoreoRoedorFinca
        dialogMostrarPoda: (state) => state.dialogMostrarPoda,
        dialogMostrarCentroacopio: (state) => state.dialogMostrarCentroacopio,                                                  // Devuelve la variable dialogMostrarCentroacopio
        dialogMostrarFertilizante: (state) => state.dialogMostrarFertilizante,                                  // Devuelve la variable dialogMostrarFertilizante
        dialogMostrarFitosanitario: (state) => state.dialogMostrarFitosanitario,                                // Devuelve la variable dialogMostrarFitosanitario
        dialogMostrarRiego: (state) => state.dialogMostrarRiego,
        dialogMostrarRespacopio: (state) => state.dialogMostrarRespacopio,                                                // Devuelve la variable dialogMostrarRespacopio                                             // Devuelve la variable dialogMostrarRiego
        dialogMostrarEgresoInsumo: (state) => state.dialogMostrarEgresoInsumo,                                  // Devuelve la variable dialogMostrarEgresoInsumo
        dialogMostrarIngresoInsumo: (state) => state.dialogMostrarIngresoInsumo,                                // Devuelve la variable dialogMostrarIngresoInsumo
        // Cosecha
        dialogTabMostrarCosecha: (state) => state.dialogTabMostrarCosecha,                                      // Devuelve la variable dialogTabMostrarCosecha
        dialogStepperCosechaNuevo: (state) => state.dialogStepperCosechaNuevo,                                  // Devuelve la variable dialogStepperCosechaNuevo
        // Finca
        dialogNuevoFinca: (state) => state.dialogNuevoFinca,                                                    // Devuelve la variable dialogoNuevoFinca
        dialogMostrarFinca: (state) => state.dialogMostrarFinca,                                                // Devuelve la variable dialogoMostrarFinca
        // Asociacion
        dialogNuevoAsociacion: (state) => state.dialogNuevoAsociacion,                                          // Devuelve la variable dialogoNuevoAsociación
        dialogMostrarAsociacion: (state) => state.dialogMostrarAsociacion,                                      // Devuelve la variable dialogoMostrarAsociación
        // Pais
        dialogNuevoPais: (state) => state.dialogNuevoPais,                                                      // Devuelve la variable dialogoNuevoPaís
        dialogMostrarPais: (state) => state.dialogMostrarPais,                                                  // Devuelve la variable dialogoMostrarPaís
        // Provincia
        dialogNuevoProvincia: (state) => state.dialogNuevoProvincia,                                            // Devuelve la variable dialogoNuevoProvincia
        dialogMostrarProvincia: (state) => state.dialogMostrarProvincia,                                        // Devuelve la variable dialogoMostrarProvincia
        // Ciudad
        dialogNuevoCiudad: (state) => state.dialogNuevoCiudad,                                                  // Devuelve la variable dialogoNuevoCiudad
        dialogMostrarCiudad: (state) => state.dialogMostrarCiudad,                                              // Devuelve la variable dialogoMostrarCiudad
        // Sitio
        dialogNuevoSitio: (state) => state.dialogNuevoSitio,                                                    // Devuelve la variable dialogoNuevoSitio
        dialogMostrarSitio: (state) => state.dialogMostrarSitio,                                                // Devuelve la variable dialogoMostrarSitio
        // Almacenamiento
        dialogNuevoAlmacenamiento: (state) => state.dialogNuevoAlmacenamiento,                                  // Devuelve la variable dialogNuevoAlmacenamiento
        dialogMostrarAlmacenamiento: (state) => state.dialogMostrarAlmacenamiento,                              // Devuelve la variable dialogMostrarAlmacenamiento
        // Confirmacion
        dialogConfirmacion: (state) => state.dialogConfirmacion,                                                // Devuelve la variable dialogConfirmacion
        // RevisionHumedad
        dialogNuevoRevisionHumedad: (state) => state.dialogNuevoRevisionHumedad,                                // Devuelve la variable dialogNuevoRevisionHumedad
        // Compra
        dialogNuevoCompra: (state) => state.dialogNuevoCompra,                                                  // Devuelve la variable dialogNuevoCompra
        dialogMostrarCompra: (state) => state.dialogMostrarCompra,                                              // Devuelve la variable dialogMostrarCompra
        // DetalleCompra
        dialogNuevoDetalleCompra: (state) => state.dialogNuevoDetalleCompra,                                    // Devuelve la variable dialogNuevoDetalleCompra
        dialogMostrarDetalleCompra: (state) => state.dialogMostrarDetalleCompra,                                // Devuelve la variable dialogMostrarDetalleCompra
        // LimpiezaCentroAcopio
        dialogoNuevaLimpiezaCentroAcopio: (state) => state.dialogoNuevaLimpiezaCentroAcopio,                    // Devuelve la variable dialogoNuevaLimpiezaCentroAcopio
        dialogoMostrarLimpiezaCentroAcopio: (state) => state.dialogoMostrarLimpiezaCentroAcopio,                // Devuelve la variable dialogoMostrarLimpiezaCentroAcopio
        // Despacho
        dialogoNuevoDespacho: (state) => state.dialogoNuevoDespacho,                                            // Devuelve la variable dialogoNuevaLimpiezaCentroAcopio
        dialogoMostrarDespacho: (state) => state.dialogoMostrarDespacho,                                        // Devuelve la variable dialogoMostrarDespacho
        // Inspector
        dialogNuevoInspectorPersona: (state) => state.dialogNuevoInspectorPersona,                              // Devuelve la variable dialogEditarUsuarioPersona
        dialogEditarInspectorPersona: (state) => state.dialogEditarInspectorPersona,

        dialogMostrarRegistroEnvio: (state) => state.dialogMostrarRegistroEnvio,                                  // Devuelve la variable dialogMostrarRegistroEnvio
        dialogNuevoRegistroEnvio: (state) => state.dialogNuevoRegistroEnvio,                                      // Devuelve la variable dialogNuevoRegistroEnvio
        // Exportador
        dialogNuevoExportadorPersona: (state) => state.dialogNuevoExportadorPersona,
        dialogEditarExportadorPersona: (state) => state.dialogEditarExportadorPersona,
        // Guia Remision
        dialogNuevoGuiaRemision: (state) => state.dialogNuevoGuiaRemision,
        dialogMostrarGuiaRemision: (state) => state.dialogMostrarGuiaRemision,
        // Tratamiento
        dialogoNuevoTratamiento: (state) => state.dialogNuevoTratamiento,
        dialogoMostrarTratamiento: (state) => state.dialogMostrarTratamiento,
        //Factura de exportacion
        dialogoNuevoFactExport: (state) => state.dialogoNuevoFactExport,
        dialogoMostrarFactExport: (state) => state.dialogMostrarFactExport,
        //Empresa
        dialogoNuevaEmpresa: (state) => state.dialogoNuevaEmpresa,
        dialogoMostrarEmpresa: (state) => state.dialogoMostrarEmpresa,
    },
}