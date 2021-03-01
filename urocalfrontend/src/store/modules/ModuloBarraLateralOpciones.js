export default {
    namespaced: true,

    state: {
        opcionesProductor: [
            {
                icono: 'mdi-folder',
                texto: 'Banano',
                opcionesNivel1: [
                    { texto: 'Calidad semillas, siembra, resiembra', ruta: '#' },
                    { texto: 'Aplicación de fertilizantes', ruta: '#' },
                    { texto: 'Aplicación de fitosanitarios', ruta: '#' },
                    { texto: 'Riego', ruta: '#' },
                    { texto: 'Calendario de enfunde', ruta: '#' },
                    { texto: 'Cosecha', ruta: '#' },
                    { texto: 'Aplicación de productos postcosecha', ruta: '#' },
                    { texto: 'Nómina de personal de campo y empaque', ruta: '#' },
                    { texto: 'Registro de banano para la agroindustria', ruta: '#' },
                    {
                        texto: 'Actividades de limpieza y mantenimiento',
                        opcionesNivel2: [
                            { texto: 'Potabilización del agua', ruta: '/cacao/siembra' },
                            { texto: 'Limpieza de empacadora', ruta: '#' },
                            { texto: 'Limpieza de equipos de protección del personal', ruta: '#' },
                            { texto: 'Limpieza de herramientas y equipos de cosecha y postcosecha', ruta: '#' },
                            { texto: 'Mantenimiento de equipos de aplicación', ruta: '#' },
                            { texto: 'Mantenimiento de maquinaria estacionaria agrícola', ruta: '#' },
                            { texto: 'Calibración de balanzas', ruta: '#' },
                            { texto: 'Calibración de aspersores manuales', ruta: '#' },
                            { texto: 'Calibración de equipos de aplicación manuales', ruta: '#' },
                            { texto: 'Materiales plásticos', ruta: '#' },
                            { texto: 'Envases vacíos de fitosanitarios', ruta: '#' },
                        ]
                    },
                ]
            },
            {
                icono: 'mdi-folder',
                texto: 'Cacao',
                opcionesNivel1: [
                    { texto: 'Siembra', ruta: '/cacao/siembra' },
                    { texto: 'Limpieza de herramientas', ruta: '/cacao/limpiezaherramienta' },
                    { texto: 'Poda', ruta: '/cacao/poda' },
                    { texto: 'Aplicación de fertilizantes', ruta: '/cacao/fertilizacion' },
                    { texto: 'Control de malezas', ruta: '/cacao/maleza' },
                    { texto: 'Aplicación de fitosanitarios', ruta: '/cacao/fitosanitario' },
                    { texto: 'Riego', ruta: '/cacao/riego' },
                    { texto: 'Cosecha', ruta: '/cacao/cosecha' },
                    { texto: 'Guía de remisión', ruta: '/cacao/guiaremision' },
                    { texto: 'Fermentación y secado', ruta: '#' },
                ]
            },
            {
                icono: 'mdi-folder',
                texto: 'Finca',
                opcionesNivel1: [
                    { texto: 'Lotes', ruta: '/finca/lote' },
                    { texto: 'Monitoreo de roedores', ruta: '/finca/monitoreoroedor' },
                    { texto: 'Limpieza de vehículos', ruta: '/finca/limpiezavehiculo' },
                    { texto: 'Elaboración de abonos orgánicos', ruta: '#' }
                ]
            },
        ],

        opcionesCentroAcopio: [
            {
                icono: 'mdi-folder',
                texto: 'Banano',
                opcionesNivel1: [
                    { texto: 'Guía de remisión', ruta: '#' },
                    { texto: 'Comprobante de compra', ruta: '#' },
                    { texto: 'Hoja de Acopio/Evaluación de cajas', ruta: '#' },
                    { texto: 'Almacenamiento', ruta: '#' },
                    { texto: 'Despacho', ruta: '#' },
                    //{ texto: 'Kardex', ruta: '#' }
                ]
            },
            {
                icono: 'mdi-folder',
                texto: 'Cacao',
                opcionesNivel1: [
                    { texto: 'Guía de remisión', ruta: '/cacao/remision' },
                    { texto: 'Comprobante de compra', ruta: '/centroacopio/compra' },
                    { texto: 'Fermentación y secado', ruta: '#' },
                    { texto: 'Almacenamiento', ruta: '/centroacopio/almacenamiento' },
                    { texto: 'Despacho', ruta: '/centroacopio/despacho' },
                    //{ texto: 'Kardex', ruta: '#' }
                ]
            },            
        ],

        opcionesExportador: [
            {
                icono: 'mdi-folder',
                texto: 'Banano',
                opcionesNivel1: [
                    { texto: 'Registro de envío', ruta: '#' },
                    { texto: 'Guía de remisión', ruta: '#' },
                    { texto: 'Facturas de exportación', ruta: '#' }
                ]
            },
            {
                icono: 'mdi-folder',
                texto: 'Cacao',
                opcionesNivel1: [
                    { texto: 'Registro de envío', ruta: '/cacao/registroEnvio' },
                    { texto: 'Guía de remisión', ruta: '/cacao/remision' },
                    { texto: 'Facturas de exportación', ruta: '#' }
                ]
            }
        ],

        opcionesControlInterno: [
            {
                icono: 'mdi-folder',
                texto: 'Banano',
                opcionesNivel1: [
                    { texto: 'Calidad semillas, siembra, resiembra', ruta: '#' },
                    { texto: 'Aplicación de fertilizantes', ruta: '#' },
                    { texto: 'Aplicación de fitosanitarios', ruta: '#' },
                    { texto: 'Riego', ruta: '#' },
                    { texto: 'Calendario de enfunde', ruta: '#' },
                    { texto: 'Cosecha', ruta: '#' },
                    { texto: 'Aplicación de productos postcosecha', ruta: '#' },
                    { texto: 'Nómina de personal de campo y empaque', ruta: '#' },
                    { texto: 'Guía de remisión', ruta: '#' },
                    { texto: 'Registro de banano para la agroindustria', ruta: '#' },
                    {
                        texto: 'Actividades de limpieza y mantenimiento',
                        opcionesNivel2: [
                            //productor
                            { texto: 'Potabilización del agua', ruta: '#' },
                            { texto: 'Limpieza de empacadora', ruta: '#' },
                            { texto: 'Limpieza de equipos de protección del personal', ruta: '#' },
                            { texto: 'Limpieza de herramientas y equipos de cosecha y postcosecha', ruta: '#' },
                            { texto: 'Mantenimiento de equipos de aplicación', ruta: '#' },
                            { texto: 'Mantenimiento de maquinaria estacionaria agrícola', ruta: '#' },
                            { texto: 'Calibración de balanzas', ruta: '#' },
                            { texto: 'Calibración de aspersores manuales', ruta: '#' },
                            { texto: 'Calibración de equipos de aplicación manuales', ruta: '#' },
                            { texto: 'Materiales plásticos', ruta: '#' },
                            { texto: 'Envases vacíos de fitosanitarios', ruta: '#' },
                        ]
                    },
                    { texto: 'Comprobante de compra', ruta: '#' },
                    { texto: 'Hoja de Acopio/Evaluación de cajas', ruta: '#' },
                    { texto: 'Almacenamiento', ruta: '#' },
                    { texto: 'Despacho', ruta: '#' },
                    //{ texto: 'Kardex', ruta: '#' },
                    { texto: 'Registro de envío', ruta: '#' },
                    { texto: 'Facturas de exportación', ruta: '#' }
                ]
            },
            {
                icono: 'mdi-folder',
                texto: 'Cacao',
                opcionesNivel1: [
                    { texto: 'Siembra', ruta: '/cacao/siembra' },
                    { texto: 'Limpieza de herramientas', ruta: '/cacao/limpiezaherramienta' },
                    { texto: 'Poda', ruta: '/cacao/poda' },
                    { texto: 'Aplicación de fertilizantes', ruta: '/cacao/fertilizacion' },
                    { texto: 'Control de malezas', ruta: '/cacao/maleza' },
                    { texto: 'Aplicación de fitosanitarios', ruta: '/cacao/fitosanitario' },
                    { texto: 'Riego', ruta: '/cacao/riego' },
                    { texto: 'Cosecha', ruta: '/cacao/cosecha' },
                    { texto: 'Guía de remisión', ruta: '/cacao/remision' },
                    { texto: 'Comprobante de compra', ruta: '/centroacopio/compra' },
                    { texto: 'Fermentación y secado', ruta: '#' },
                    { texto: 'Almacenamiento', ruta: '/centroacopio/almacenamiento' },
                    { texto: 'Despacho', ruta: '/centroacopio/despacho' },
                    //{ texto: 'Kardex', ruta: '#' },
                    { texto: 'Registro de envío', ruta: '/cacao/registroEnvio' },
                    { texto: 'Facturas de exportación', ruta: '#' }
                ]
            },
            {
                icono: 'mdi-folder',
                texto: 'Finca',
                opcionesNivel1: [
                    { texto: 'Lotes', ruta: '/finca/lote' },
                    { texto: 'Monitoreo de roedores', ruta: '/finca/monitoreoroedor' },
                    { texto: 'Limpieza de vehículos', ruta: '/finca/limpiezavehiculo' },
                    { texto: 'Elaboración de abonos orgánicos', ruta: '#' }
                ]
            },
            {
                icono: 'mdi-folder',
                texto: 'Centro de acopio',
                opcionesNivel1: [
                    { texto: 'Monitoreo de roedores', ruta: '/centroacopio/monitoreoroedor' },
                    { texto: 'Vehiculos', ruta: '/centroacopio/vehiculo' },
                    { texto: 'Limpieza de vehículos', ruta: '/centroacopio/limpiezavehiculo' },
                    { texto: 'Limpieza del centro de acopio', ruta: '/centroacopio/limpiezacentroacopio' },
                    { texto: 'Egresos de insumos', ruta: '/centroacopio/insumosEgresos' },
                    { texto: 'Ingresos de insumos', ruta: '/centroacopio/insumosIngresos' },
                ]
            },            
        ], 

        opcionesAdministrador: [
            {
                icono: 'mdi-folder',
                texto: 'Banano',
                opcionesNivel1: [
                    { texto: 'Calidad semillas, siembra, resiembra', ruta: '#' },
                    { texto: 'Aplicación de fertilizantes', ruta: '#' },
                    { texto: 'Aplicación de fitosanitarios', ruta: '#' },
                    { texto: 'Riego', ruta: '#' },
                    { texto: 'Calendario de enfunde', ruta: '#' },
                    { texto: 'Cosecha', ruta: '#' },
                    { texto: 'Aplicación de productos postcosecha', ruta: '#' },
                    { texto: 'Nómina de personal de campo y empaque', ruta: '#' },
                    { texto: 'Guía de remisión', ruta: '#' },
                    { texto: 'Registro de banano para la agroindustria', ruta: '#' },
                    {
                        texto: 'Actividades de limpieza y mantenimiento',
                        opcionesNivel2: [
                            //productor
                            { texto: 'Potabilización del agua', ruta: '#' },
                            { texto: 'Limpieza de empacadora', ruta: '#' },
                            { texto: 'Limpieza de equipos de protección del personal', ruta: '#' },
                            { texto: 'Limpieza de herramientas y equipos de cosecha y postcosecha', ruta: '#' },
                            { texto: 'Mantenimiento de equipos de aplicación', ruta: '#' },
                            { texto: 'Mantenimiento de maquinaria estacionaria agrícola', ruta: '#' },
                            { texto: 'Calibración de balanzas', ruta: '#' },
                            { texto: 'Calibración de aspersores manuales', ruta: '#' },
                            { texto: 'Calibración de equipos de aplicación manuales', ruta: '#' },
                            { texto: 'Materiales plásticos', ruta: '#' },
                            { texto: 'Envases vacíos de fitosanitarios', ruta: '#' },
                        ]
                    },
                    { texto: 'Comprobante de compra', ruta: '#' },
                    { texto: 'Hoja de Acopio/Evaluación de cajas', ruta: '#' },
                    { texto: 'Almacenamiento', ruta: '#' },
                    { texto: 'Despacho', ruta: '#' },
                    //{ texto: 'Kardex', ruta: '#' },
                    { texto: 'Registro de envío', ruta: '#' },
                    { texto: 'Facturas de exportación', ruta: '#' }
                ]
            },
            {
                icono: 'mdi-folder',
                texto: 'Cacao',
                opcionesNivel1: [
                    { texto: 'Siembra', ruta: '/cacao/siembra' },
                    { texto: 'Limpieza de herramientas', ruta: '/cacao/limpiezaherramienta' },
                    { texto: 'Poda', ruta: '/cacao/poda' },
                    { texto: 'Aplicación de fertilizantes', ruta: '/cacao/fertilizacion' },
                    { texto: 'Control de malezas', ruta: '/cacao/maleza' },
                    { texto: 'Aplicación de fitosanitarios', ruta: '/cacao/fitosanitario' },
                    { texto: 'Riego', ruta: '/cacao/riego' },
                    { texto: 'Cosecha', ruta: '/cacao/cosecha' },
                    { texto: 'Guía de remisión', ruta: '/cacao/guiaremision' },
                    { texto: 'Comprobante de compra', ruta: '/centroacopio/compra' },
                    { texto: 'Fermentación y secado', ruta: '#' },
                    { texto: 'Almacenamiento', ruta: '/centroacopio/almacenamiento' },
                    { texto: 'Despacho', ruta: '/centroacopio/despacho' },
                    //{ texto: 'Kardex', ruta: '#' },
                    { texto: 'Registro de envío', ruta: '/cacao/registroEnvio' },
                    { texto: 'Facturas de exportación', ruta: '#' }
                ]
            },
            {
                icono: 'mdi-folder',
                texto: 'Finca',
                opcionesNivel1: [
                    { texto: 'Lotes', ruta: '/finca/lote' },
                    { texto: 'Monitoreo de roedores', ruta: '/finca/monitoreoroedor' },
                    { texto: 'Limpieza de vehículos', ruta: '/finca/limpiezavehiculo' },
                    { texto: 'Elaboración de abonos orgánicos', ruta: '#' }
                ]
            },
            {
                icono: 'mdi-folder',
                texto: 'Centro de acopio',
                opcionesNivel1: [
                    { texto: 'Monitoreo de roedores', ruta: '/centroacopio/monitoreoroedor' },
                    { texto: 'Vehiculos', ruta: '/centroacopio/vehiculo' },
                    { texto: 'Limpieza de vehículos', ruta: '/centroacopio/limpiezavehiculo' },
                    { texto: 'Limpieza del centro de acopio', ruta: '/centroacopio/limpiezacentroacopio' },
                    { texto: 'Egresos de insumos', ruta: '/centroacopio/insumosEgresos' },
                    { texto: 'Ingresos de insumos', ruta: '/centroacopio/insumosIngresos' },
                ]
            },
            {
                icono: 'mdi-folder',
                texto: 'Configuraciones',
                opcionesNivel1: [
                    { texto: 'Usuarios', ruta: '/configuracion/usuario' },
                    { texto: 'Conductores', ruta: '/configuracion/conductor' },
                    { texto: 'Inspectores', ruta: '/configuracion/inspector' },
                    { texto: 'Exportadores', ruta: '/configuracion/exportador' },
                    { texto: 'Operarios', ruta: '/configuracion/operario' },
                    { texto: 'Productores', ruta: '/configuracion/productor' },
                    { texto: 'Asociaciones', ruta: '/configuracion/asociacion', },
                    { texto: 'Fincas', ruta: '/configuracion/finca', },
                    { texto: 'Centros de acopio', ruta: '/configuracion/centroacopio', },
                    { texto: 'Responsables centro de acopio', ruta: '/configuracion/respcentroacopio' },
                    { texto: 'Países', ruta: '/configuracion/pais' },
                    { texto: 'Provincias', ruta: '/configuracion/provincia' },
                    { texto: 'Ciudades', ruta: '/configuracion/ciudad' },
                    { texto: 'Sitios', ruta: '/configuracion/sitio', },
                    { texto: 'Empresas', ruta: '#', },
                    { texto: 'Marcas', ruta: '#', },
                    { texto: 'Certificaciones', ruta: '#', }
                ]
            },
        ]
    },
}