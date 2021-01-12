export default {
    namespaced: true,

    state: {
        opcionesProductor: [
            {
                icono: 'mdi-folder',
                texto: 'Banano',
                opcionesNivel1: [
                    {
                        texto: 'Calidad semillas, siembra, resiembra',
                        ruta: '#',
                    },
                    {
                        texto: 'Aplicación de fertilizantes',
                        ruta: '#',
                    },
                    {
                        texto: 'Aplicación de fitosanitarios',
                        ruta: '#',
                    },
                    {
                        texto: 'Riego',
                        ruta: '#',
                    },
                    {
                        texto: 'Calendario de enfunde',
                        ruta: '#',
                    },
                    {
                        texto: 'Cosecha',
                        ruta: '#',
                    },
                    {
                        texto: 'Aplicación de productos postcosecha',
                        ruta: '#',
                    },
                    {
                        texto: 'Nómina de personal de campo y empaque',
                        ruta: '#',
                    },
                    {
                        texto: 'Guía de remisión',
                        ruta: '#',
                    },
                    {
                        texto: 'Registro de banano para la agroindustria',
                        ruta: '#',
                    },
                    {
                        texto: 'Actividades de limpieza y mantenimiento',
                        opcionesNivel2: [
                            {
                                texto: 'Potabilización del agua',
                                ruta: '#',
                            },
                            {
                                texto: 'Limpieza de empacadora',
                                ruta: '#',
                            },
                            {
                                texto: 'Limpieza de equipos de protección del personal',
                                ruta: '#',
                            },
                            {
                                texto: 'Limpieza de herramientas y equipos de cosecha y postcosecha',
                                ruta: '#',
                            },
                            {
                                texto: 'Mantenimiento de equipos de aplicación',
                                ruta: '#',
                            },
                            {
                                texto: 'Mantenimiento de maquinaria estacionaria agrícola',
                                ruta: '#',
                            },
                            {
                                texto: 'Calibración de balanzas',
                                ruta: '#',
                            },
                            {
                                texto: 'Calibración de aspersores manuales',
                                ruta: '#',
                            },
                            {
                                texto: 'Calibración de equipos de aplicación manuales',
                                ruta: '#',
                            },
                            {
                                texto: 'Materiales plásticos',
                                ruta: '#',
                            },
                            {
                                texto: 'Envases vacíos de fitosanitarios',
                                ruta: '#',
                            },
                        ]
                    },
                ]
            },
            {
                icono: 'mdi-folder',
                texto: 'Cacao',
                opcionesNivel1: [
                    {
                        texto: 'Siembra',
                        ruta: '/cacao/siembra',
                    },
                    {
                        texto: 'Limpieza de herramientas',
                        ruta: '/cacao/limpiezaherramienta',
                    },
                    {
                        texto: 'Poda',
                        ruta: '/cacao/poda',
                    },
                    {
                        texto: 'Aplicación de fertilizantes',
                        ruta: '/cacao/fertilizacion',
                    },
                    {
                        texto: 'Control de malezas',
                        ruta: '/cacao/maleza',
                    },
                    {
                        texto: 'Aplicación de fitosanitarios',
                        ruta: '/cacao/fitosanitario',
                    },
                    {
                        texto: 'Riego',
                        ruta: '/cacao/riego',
                    },
                    {
                        texto: 'Cosecha',
                        ruta: '#',
                    },
                    {
                        texto: 'Guía de remisión',
                        ruta: '#',
                    },
                ]
            },
            {
                icono: 'mdi-folder',
                texto: 'Finca',
                opcionesNivel1: [
                    {
                        texto: 'Lotes',
                        ruta: '/finca/lote',
                    },
                    {
                        texto: 'Monitoreo roedores',
                        ruta: '/finca/monitoreoroedor',
                    },
                    {
                        texto: 'Limpieza de vehículos',
                        ruta: '/finca/limpiezavehiculo',
                    },
                    {
                        texto: 'Elaboración de abonos orgánicos',
                        ruta: '#',
                    }
                ]
            },
        ],
        opcionesCentroAcopio: [
            {
                icono: 'mdi-folder',
                texto: 'Banano',
                opcionesNivel1: [
                    {
                        texto: 'Guía de remisión',
                        ruta: '#',
                    },
                    {
                        texto: 'Comprobante de compra',
                        ruta: '#',
                    },
                    {
                        texto: 'Hoja de Acopio/Evaluación de cajas',
                        ruta: '#',
                    },
                    {
                        texto: 'Almacenamiento',
                        ruta: '#',
                    },
                    {
                        texto: 'Despacho',
                        ruta: '#',
                    },
                    {
                        texto: 'Kardex',
                        ruta: '#',
                    }
                ]
            },
            {
                icono: 'mdi-folder',
                texto: 'Cacao',
                opcionesNivel1: [
                    {
                        texto: 'Guía de remisión',
                        ruta: '#',
                    },
                    {
                        texto: 'Comprobante de compra',
                        ruta: '#',
                    },
                    {
                        texto: 'Fermentación y secado',
                        ruta: '#',
                    },
                    {
                        texto: 'Almacenamiento',
                        ruta: '#',
                    },
                    {
                        texto: 'Despacho',
                        ruta: '#',
                    },
                    {
                        texto: 'Kardex',
                        ruta: '#',
                    }
                ]
            },
            {
                icono: 'mdi-folder',
                texto: 'Centro de acopio',
                opcionesNivel1: [
                    {
                        texto: 'Monitoreo de roedores',
                        ruta: '/centroacopio/monitoreoroedor',
                    },
                    {
                        texto: 'Limpieza de vehículos',
                        ruta: '#',
                    },
                    {
                        texto: 'Limpieza del centro de acopio',
                        ruta: '#',
                    },
                    {
                        texto: 'Ingreso y egreso de materiales e insumos',
                        ruta: '#',
                    }
                ]
            },
        ],
        opcionesExportador: [
            {
                icono: 'mdi-folder',
                texto: 'Banano',
                opcionesNivel1: [
                    {
                        texto: 'Registro de envío',
                        ruta: '#',
                    },
                    {
                        texto: 'Guía de remisión',
                        ruta: '#',
                    },
                    {
                        texto: 'Facturas de exportación',
                        ruta: '#',
                    }
                ]
            },
            {
                icono: 'mdi-folder',
                texto: 'Cacao',
                opcionesNivel1: [
                    {
                        texto: 'Registro de envío',
                        ruta: '#',
                    },
                    {
                        texto: 'Guía de remisión',
                        ruta: '#',
                    },
                    {
                        texto: 'Facturas de exportación',
                        ruta: '#',
                    }
                ]
            }
        ]
    },
}