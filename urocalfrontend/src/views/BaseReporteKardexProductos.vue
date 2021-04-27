<template>
  <v-container fluid class="pa-3 justify-center" fill-height>
        <v-row>
          <v-col class="d-flex py-3" cols='12'>
            <div :class="[`text-h4`, `mb-4`]" class="transition-swing primary--text" v-text="'Kardex de Ingresos y Egresos de cacao'"></div>
          </v-col>
        </v-row>
        <v-row class="justify-center">
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
                    label="Escoja un mes"
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

import servicioReporteKardexProductos from "../services/ServicioReporteKardexProductos";

import logo from '@/assets/logo.js';
//logo.js contiene el logo en base64
export default {
  name: 'BaseReporteKardexProductos',
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
    },

    descargarReporte() {
      this.pdfGenerado.download()
    },

    async obtenerIngEgPorMes(){
      const resultado = await servicioReporteKardexProductos.reportePorMes(
        {
          month: parseInt(this.mesSeleccionado.slice(-2)),
          year: parseInt(this.mesSeleccionado.slice(0,4))
        })
      return resultado.data
    },

    async obtenerIngEgPorAnio(){
      const resultado = await servicioReporteKardexProductos.reportePorAnio(
        {
          year: this.anioSeleccionado
        })
      return resultado.data
    },

    async obtenerIngEgPorRango(){
      const resultado = await servicioReporteKardexProductos.reportePorRango(
        {
          desde: this.fechaDesde,
          hasta: this.fechaHasta
        })
      return resultado.data
    },

    generateReport(){
      const errorNoDatos = "No se han encontrado resultados"
      if(!this.opcionFecha) {
        this.$toast.error("Debe selecciona los datos necesarios");
        return;
      }
      if(this.opcionFecha == 1) {
        if(!this.mesSeleccionado) {
          this.$toast.error("Debe seleccionar un mes");
          return;
        };
        this.obtenerIngEgPorMes().then(ingeg => {
          if(!ingeg.length) {
            this.$toast.info(errorNoDatos);
            return;
          };
          this.generarContenidoReporte({ ingeg})
          this.reporte = true;
        })
      } else if (this.opcionFecha == 2) {
        if(!this.anioSeleccionado) {
          this.$toast.error("Debe seleccionar un año");
          return
        };
        this.obtenerIngEgPorAnio().then(ingeg => {
          if(!ingeg.length) {
            this.$toast.info(errorNoDatos);
            return;
          };
          this.generarContenidoReporte({ ingeg})
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
        this.obtenerIngEgPorRango().then(ingeg => {
          if(!ingeg.length) {
            this.$toast.info(errorNoDatos);
            return;
          };
          this.generarContenidoReporte({ ingeg})
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
          'Kardex de Cacao',
          {text: '\nFecha: ', bold: true},
          `${this.opcionFecha == 1 ? stringFechaMes : this.opcionFecha == 2 ? stringFechaAnio : stringFechaRango}`,
          
        ],
        margin: [0, 20]
      }

      const cabecera = [
        {text: 'Fecha de Ingreso'}, 
        {text: '# bultos'},
        {text: 'Peso T'},
        {text: 'Centro de acopio'},
        {text: 'Fecha de Salida'},
        {text: 'Destino'},
        {text: 'Tipo'},
        {text: 'SPP'},
        {text: '# bultos'},
        {text: 'Saldo'},
      ]

      const filas = respuesta.ingeg.map(ingeg => {
        const fechaing = new Date(ingeg.almfechaingresobodega).toISOString().substr(0, 10)
        return [fechaing, ingeg.almnumerobultos, ingeg.almpesototalingreso,ingeg.centroacopionombre, ingeg.desfechasalida, ingeg.desdestino, ingeg.organico, ingeg.spp, ingeg.detdesnumerobultos, ingeg.almsaldo]
      })

      const table = {
        widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto','auto', 'auto', 'auto', 'auto'],
        headerRows: 1,
        body: [
          [...cabecera], 
          ...filas,
          ['', '', '', '', '', '','', '', '', '']
        ]
      }

      const reportData = [
        reportInfo,
        {
          table,
          layout: 'headerLineOnly',
          margin: [0, 10]
        }
      ]

      this.generatePdf(reportData)
    },

    generatePdf(reportContent){
      pdfMake.vfs = pdfFonts.pdfMake.vfs;

      const docDefinition = {
        pageOrientation: 'landscape',
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