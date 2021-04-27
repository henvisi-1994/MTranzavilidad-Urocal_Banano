<template>
  <v-container fluid class="pa-3 justify-center" fill-height>
        <v-row>
          <v-col class="d-flex py-3" cols='12'>
            <div :class="[`text-h4`, `mb-4`]" class="transition-swing primary--text" v-text="'Reporte de ventas'"></div>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="12" md=5 class="py-0">
            <v-select
              :disabled="reporte"
              :items="exportadores"
              label="Exportador"
              v-model="exportadorSeleccionado"
              item-value="empresaid"
              item-text="emprazonsocial"
            ></v-select>
          </v-col>
          <v-col cols="12" md=5 class="py-0">
            <v-select
              disabled
              :items="lotes"
              label="Lote"
              v-model="loteSeleccionado"
            ></v-select>
          </v-col>
          <v-col cols=12 md=10 class="py-0">
            <v-select
              :disabled="reporte"
              :items="opcionesFecha"
              v-model="opcionFecha"
              item-value="id"
              item-text="tipo"
              label="Selecciona filtro de fecha"
            ></v-select>
          </v-col>
          <v-col cols=12 md=10 v-if="opcionFecha == 1" class="py-0">
            <v-menu
                :disabled="reporte"
                v-model="menuMes"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="mesSeleccionado"
                    label="Escoga un mes"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="mesSeleccionado"
                  @input="menuMes = false"
                  :show-current="fechaActual"
                  type="month"
                  locale="es-419"
                ></v-date-picker>
              </v-menu>
          </v-col>
          <v-col cols=12 md=10 v-if="opcionFecha == 2" class="py-0">
            <v-select
              :disabled="reporte"
              :items="years"
              label="Seleccione un año"
              v-model="anioSeleccionado"
            ></v-select>
          </v-col>
          <v-col cols="12" md=10 v-if="opcionFecha === 3" class="py-0">
            <v-menu
              :disabled="reporte"
              v-model="menuFechaDesde"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="fechaDesde"
                  label="Desde"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="fechaDesde"
                @input="menuFechaDesde = false"
                :show-current="fechaActual"
                locale="es-419"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" md=10 v-if="opcionFecha === 3" class="py-0">
            <v-menu
              :disabled="reporte"
              v-model="menuFechaHasta"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="fechaHasta"
                  label="Hasta"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="fechaHasta"
                @input="menuFechaHasta = false"
                :show-current="fechaActual"
                locale="es-419"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols=12 md=5 v-if="!reporte">
            <v-btn :disabled="reporte" color="primary ml-auto" @click="generateReport" block>
              <v-icon class="pr-2">mdi-file-document</v-icon>
              Generar Reporte
            </v-btn>
          </v-col>
          <v-col cols=12 md=5 v-if="reporte">
            <v-btn color="success ml-auto" @click="descargarReporte" block>
              <v-icon class="pr-2">mdi-download</v-icon>
              Descargar Reporte
            </v-btn>
          </v-col>
          <v-col cols=12 md=5 v-if="reporte">
            <v-btn color="info ml-auto" @click="nuevoReporte" block>
              <v-icon class="pr-2">mdi-text-box-plus</v-icon>
              Nuevo Reporte
            </v-btn>
          </v-col>
        </v-row>
  </v-container>
</template>

<script>

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import servicioReporteVentas from "../services/ServicioReporteVentas";

import logo from '@/assets/logo.js';
//logo.js contiene el logo en base64
export default {
  name: 'BaseReporteVentas',
  data() {
    return {
      reporte: false,
      pdfGenerado: undefined,
      menuFechaDesde: false,
      menuFechaHasta: false,
      menuMes: false,
      menuAnio: false,
      fechaDesde: '',
      fechaHasta: '',
      mesSeleccionado: '',
      anioSeleccionado: '',
      exportadorSeleccionado: '',
      loteSeleccionado: '',
      opcionFecha: 0,
      fechaActual: new Date().toISOString().substr(0, 10),
      opcionesFecha: [
        {
          id: 1,
          tipo: 'Mes'
        },
        {
          id: 2,
          tipo: 'Año'
        },
        {
          id: 3,
          tipo: 'Rango de fecha'
        },
      ],
      meses: {
        1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril', 5: 'Mayo', 6: 'Junio',
        7: 'Julio', 8: 'Agosto', 9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre', 
      },
      years: [],

      // Variables temporales
      exportadores: [{empresaid: 1, emprazonsocial: 'Exportador 1'}, {empresaid: 2, emprazonsocial: 'Exportador 2'}],
      lotes: ['Lote 1', 'Lote 2'],
    }
  },

  created() { 
    this.$store.commit("colocarLayout", "LayoutAdministrador");
    this.generateYears()
  },

  methods: {

    generateYears(){
      const actualYear = new Date().getFullYear();
      for (let index = actualYear; index > 1950 ; index--) {
        this.years.push(index);
      }
    },

    nuevoReporte(){
      this.reporte = false
      this.mesSeleccionado = ''
      this.fechaDesde = ''
      this.fechaHasta = ''
      this.opcionFecha = 0
      this.pdfGenerado = undefined
      this.exportadorSeleccionado = ''
      this.loteSeleccionado = ''
    },

    descargarReporte() {
      this.pdfGenerado.download()
    },

    async obtenerVentasPorMes(){
      const resultado = await servicioReporteVentas.reportePorMes(
        {
          month: parseInt(this.mesSeleccionado.slice(-2)),
          year: parseInt(this.mesSeleccionado.slice(0,4)),
          exportador: this.exportadorSeleccionado
        })
      return resultado.data
    },

    async obtenerVentasPorAnio(){
      const resultado = await servicioReporteVentas.reportePorAnio(
        {
          year: this.anioSeleccionado,
          exportador: this.exportadorSeleccionado
        })
      return resultado.data
    },

    async obtenerVentasPorRango(){
      const resultado = await servicioReporteVentas.reportePorRango(
        {
          desde: this.fechaDesde,
          hasta: this.fechaHasta,
          exportador: this.exportadorSeleccionado
        })
      return resultado.data
    },

    generateReport(){
      const errorNoVentas = "No se han encontrado resultados"
      if(!this.opcionFecha || !this.exportadorSeleccionado) {
        this.$toast.error("Debe selecciona los datos necesarios");
        return;
      }
      if(this.opcionFecha == 1) {
        if(!this.mesSeleccionado) {
          this.$toast.error("Debe seleccionar un mes");
          return;
        };
        this.obtenerVentasPorMes().then(ventas => {
          if(!ventas.length) {
            this.$toast.info(errorNoVentas);
            return;
          };
          this.generarContenidoReporte({ exportador: 'Exportador 1', ventas})
          this.reporte = true;
        })
      } else if (this.opcionFecha == 2) {
        if(!this.anioSeleccionado) {
          this.$toast.error("Debe seleccionar un año");
          return
        };
        this.obtenerVentasPorAnio().then(ventas => {
          if(!ventas.length) {
            this.$toast.info(errorNoVentas);
            return;
          };
          this.generarContenidoReporte({ exportador: 'Exportador 1', ventas})
          this.reporte = true;
        })
      } else if (this.opcionFecha == 3){
        if(!this.fechaDesde || !this.fechaHasta) {
          this.$toast.error("Debe seleccionar el rango de fechas");
          return;
        };
        if(this.fechaHasta < this.fechaDesde) {
          this.$toast.error("La fecha final debe ser mayor a la inicial");
          return;
        }
        this.obtenerVentasPorRango().then(ventas => {
          if(!ventas.length) {
            this.$toast.info(errorNoVentas);
            return;
          };
          this.generarContenidoReporte({ exportador: 'Exportador 1', ventas})
          this.reporte = true;
        })
      }
    },

    generarContenidoReporte(respuesta){
      const stringFechaMes = `${this.meses[parseInt(this.mesSeleccionado.slice(-2))]} del ${this.mesSeleccionado.slice(0,4)}`
      const stringFechaAnio = `Año ${this.anioSeleccionado}`
      const stringFechaRango = `De ${this.fechaDesde} al ${this.fechaHasta}`
      const reportInfo = {
        text: [
          {text: 'Reporte: ', bold: true},
          'Ventas de Cacao',
          {text: '\nFecha: ', bold: true},
          `${this.opcionFecha == 1 ? stringFechaMes : this.opcionFecha == 2 ? stringFechaAnio : stringFechaRango}`,
          {text: '\nExportador: ', bold: true},
          `${respuesta.exportador}`
        ],
        margin: [0, 20]
      }

      const cabecera = [
        {text: 'Fecha/Emision'}, 
        {text: '# Factura'}, 
        {text: 'Lote'},
        {text: 'Total', alignment: 'right'},
      ]

      const filas = respuesta.ventas.map(venta => {
        const fechaVenta = new Date(venta.facfecha).toISOString().substr(0, 10)
        return [fechaVenta, venta.facnumero, venta.faclote, {text: parseFloat(parseFloat(venta.facvalortotal).toFixed(2)), alignment: "right"}]
      })

      const facturaTotal = respuesta.ventas.reduce((acc, venta) => acc + parseFloat(parseFloat(venta.facvalortotal).toFixed(2)), 0)

      const table = {
        widths: ['*', '*', '*', '*'],
        headerRows: 1,
        body: [
          [...cabecera], 
          ...filas,
          ['', '', '', {text: facturaTotal, alignment: 'right', bold: true}]
        ]
      }

      const reportData = [
        reportInfo,
        {
          table,
          layout: 'headerLineOnly',
          margin: [0, 20]
        }
      ]

      this.generatePdf(reportData)
    },

    generatePdf(reportContent){
      pdfMake.vfs = pdfFonts.pdfMake.vfs;

      const docDefinition = {
        content: [
          {
            columns: [
              {
                width: 70,
                image: logo,
                margin: [0, 20]
              },
              {
                alignment: 'center',
                width: 'auto',
                text: [
                  {text: 'UNIÓN REGIONAL DE ORGANIZACIONES CAMPESINAS DEL LITORAL', fontSize: 12},
                  {text: '\nUROCAL', fontSize: 32, bold: true},
                  {text: '\nCARRETERO A ZHUMIRAL OFC. P.B. - AZUAY ESTABLECIMIENTO 003: TARQUI S/N E/.', fontSize: 10},
                  {text: '\nMATRIZ: CAMILO PONCE ENRÍQUEZ: BARRIO EL CISNE PRINCIPAL S/N', fontSize: 10},
                  {text: '\nEmail:  urocal@ec.pro.ec - MACHALA - EL ORO - ECUADOR', fontSize: 10},
                  {text: '\nBOLIVAR Y PICHINCHA - *TELEFAX:* 2961-672 / 075000202 - CEL: 0991853210', fontSize: 10},
                  {text: '\nCONTRIBUYENTE ESPECIAL MEDIANTE RESOLUCIÓN N° NAC-G-CORCEC09-00570 DEL 07/08/2009', fontSize: 10},
                ]
              }
            ]
          },
          reportContent,
        ],

        footer: (currentPage, pageCount) => {
          return {
            margin: [40, 0],
            columns: [
              `${currentPage.toString()} de ${pageCount}`,
              { text: [
                  { text: 'Fecha: ', bold: true },
                  `${new Date().toJSON().slice(0,10)}`,
                ], alignment: 'right' 
              }
            ],
          }
        },
      };

      this.pdfGenerado = pdfMake.createPdf(docDefinition)

      this.pdfGenerado.open()
    },
  }
}
</script>

<style>

</style>