<template>
  <v-container fluid>

    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0" class="mt-5">
      <v-card-title class="py-2">
        <v-row no-gutters justify-md="space-between">
          <v-col cols="12" md="6">
            <div :class="[`text-h4`, `mb-4`]" class="transition-swing primary--text" v-text="nombre"></div>            
          </v-col>
          <v-col cols="12" md="6">
              <v-select
                v-model="propietarios"
                placeholder="Seleccione un centro de acopio"
                class="style-chooser"
                label="propietario"
                :reduce="(listaCentroacopioStore) => listaCentroacopioStore.centroacopio"
                :options="listaCentroacopioStore"
              >
                <template v-slot:no-options="{ search, searching }">
                  <template v-if="searching">
                    No hay resultados para <em>{{ search }}</em
                    >.
                  </template>
                  <em style="opacity: 0.5" v-else>Empiece a escribir un centro de acopio</em>
                </template>
              </v-select>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra los Finca -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaFinca"
          sort-by="fincaid"
          :items="listaFincaStore"
          :search="propietarios"
          class="elevation-1">
          <template v-slot:top>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo Finca -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          @click="download()"
          >GENERAR PDF</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import ServicioReporteFincaProductor from "../services/ServicioReporteFincaProductor";
import ServicioFinca from "../services/ServicioFinca";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ServicioCentroAcopio from '../services/ServicioCentroAcopio';

export default {
  name: "BaseFinca",

  components: {
    vSelect,
  },

  mounted() {
    this.cargarListaFinca();
    this.cargarListaCentroacopio();
  },

  data() {
    return {
      propietarios: "",
      idproductor: 0,
      nombre: "Gestión de kardex de Ingresos y egresos de cacao",
      totalfincas: "0",
      cabeceraTablaFinca: [
        // Detalla las cabeceras de la tabla
        {
          text: "Nombre",
          value: "finnombrefinca",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Superficie total",
          value: "finsuperficietotal",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Superficie cultivada",
          value: "finsuperficiecultivada",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha primera inspección",
          value: "finprimerainspeccion",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha ultima inspección",
          value: "finultimainspeccion",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Observación",
          value: "finobservacion",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Asociación",
          value: "asonombre",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Propietario",
          value: "propietario",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Sitio",
          value: "sitionombre",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
      ],
    };
  },

  watch: {
      centrosacopio (val) { 
      this.Buscarcentroacopio();
      },
  },
    
  computed: {

    listaCentroacopioStore: {
      get() {
        return this.$store.getters["moduloFinca/listaCentroacopioStore"];
      },
      set(v) {
        return this.$store.commit("moduloFinca/establecerListaCentroacopioStore", v);
      },
    },
    listaReporteIngresosEgresos: {
      get() {
        return JSON.parse(
          JSON.stringify(this.$store.getters["moduloReporteIngresosEgresos/listaReporteIngresosEgresos"])
        );
      },
      set(v) {
        return this.$store.commit("moduloReporteIngresosEgresos/establecerListaIngresosEgresosStore", v);
      },
    },
  },

  methods: {
    // Programación PDF
    async download() {
        // Instancia de la librería y parametros (PDF en forma horizontal)
        const doc = new jsPDF('L','mm','A4');
        //Cabezera 
        doc.setFontSize(14).setTextColor(50).text(100, 15, 'UNIÓN REGIONAL DE ORGANIZACIONES'); 
        doc.setFontSize(14).setTextColor(50).text(117, 20, 'CAMPESINAS DEL LITORAL'); 
        doc.setFontSize(35).setTextColor(50).text(125, 33, 'UROCAL');
        doc.setFontSize(14).setTextColor(0).text(88, 40, 'REPORTES DE FINCAS UROCAL DE UN PRODUCTOR'); 
        // Imagen Logo
        function getDataUri(url){
            return new Promise(resolve => {
                var image = new Image();
                image.setAttribute('crossOrigin', 'anonymous'); 
                image.onload = function () {
                    var canvas = document.createElement('canvas');
                    canvas.width = this.naturalWidth;
                    canvas.height = this.naturalHeight; 
                    var ctx = canvas.getContext('2d');
                    ctx.fillStyle = '#fff';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    canvas.getContext('2d').drawImage(this, 0, 0);
                    resolve(canvas.toDataURL('image/jpeg'));
                };
                image.src = url;
            })
        }
        // Url del logo urocal
        var imgUrl = "https://media-exp1.licdn.com/dms/image/C560BAQGdznE__LA4qw/company-logo_200_200/0/1537817603191?e=2159024400&v=beta&t=1Vjf3hh8ZPJaY82aeAtaXVJbM9ayp9Xw90RTfpnpAeU";
        var logo = await getDataUri(imgUrl);
        doc.addImage(logo, 'PNG', 25, 6, 40, 40);
        // Texto IngresosEgresos
        doc.setFontSize(14).setTextColor(0).text(137, 95, 'Lista de fincas'); // Texto finca
        // Estructura de la tabla se utilizo la libreria autoTable
        // Datos de cabezera de la tabla
        var columns = [
        {title: "Nombre", dataKey: "finnombrefinca"},
        {title: "Superfcie total", dataKey: "finsuperficietotal"},
        {title: "Superfcie cultivada", dataKey: "finsuperficiecultivada"},
        {title: "Coordenada X", dataKey: "fincoordenadax"},
        {title: "Coordenada Y", dataKey: "fincoordenaday"},
        {title: "Fecha primera inspección", dataKey: "finprimerainspeccion"},
        {title: "Fecha ultima inspección", dataKey: "finultimainspeccion"},
        {title: "Asociación", dataKey: "asonombre"},
        {title: "Propietario", dataKey: "propietario"},
        {title: "Sitio", dataKey: "sitionombre"},
        {title: "Observación", dataKey: "finobservacion"},
        ];
        // Llenado del cuerpo con datos de la BD
        autoTable(doc, {
          columns,
          body: this.listaReporteFincaProductor,
          theme: 'plain',
          startY: 100,         
          styles: { 
            lineWidth: 0.01,
            lineColor: 0,
            fillStyle: 'DF',            
            halign: 'center',
            valign: 'middle',
            cellWidth: 'auto',
            overflow: 'linebreak'
          },
        });
        // Obtiene el tamaño de la tabla para luego agregar datos que se desee añadir
        let finalY = doc.previousAutoTable.finalY; // Obtiene el tamaño de la tabla.
        // Texto Total fincas y emitido por.
        doc.setFontSize(10).setTextColor(0).text(14, finalY + 10, 'Total de fincas:');  // TEXTO Total fincas:
        doc.setFontSize(10).setTextColor(100).text(40, finalY + 10, this.totalfincas + " " + "fincas");// TEXTO Celular de la db
        doc.setFontSize(10).setTextColor(50).text(196, finalY + 10, 'Emitido por:');// TEXTO Emitido
        doc.setFontSize(10).setTextColor(100).text(218, finalY + 10, JSON.parse(localStorage.getItem("usuario")).rol);// TEXTO Emitido
        // Agregar número de páginas, la fecha y hora actual en pie de la página
        const addFooters = doc => {
          const pageCount = doc.internal.getNumberOfPages()
          var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
          var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
          var hoy = new Date();
          var fecha = diasSemana[hoy.getDay()] + ', ' + hoy.getDate() + ' de ' + meses[(hoy.getMonth())] + ' del ' + hoy.getFullYear();
          var hora = hoy.getHours() + ':' + hoy.getMinutes();
          var fechaYHora = fecha + ', ' + hora;
          doc.setFont('helvetica', 'italic')
          doc.setFontSize(8)
          for (var i = 1; i <= pageCount; i++) {
            doc.setPage(i)
            doc.text('Página ' + String(i) + ' de ' + String(pageCount), doc.internal.pageSize.width / 2, 205, { // Número de páginas
              align: 'center'
            });
            doc.line(283, 201, 14, 201); // Línea horizontal pie de página
            doc.text(240, 205, fechaYHora);// TEXTO fecha y hora
          }
        }
        addFooters(doc);
        window.open(doc.output('bloburl')); // Visualizar PDF en otra ventana

    },

    // #  MANIPULACIÓN DE DATOS  #
    // Obtiene todas las fincas de todos los productores
    async cargarListaIngresoEgreso() {
      let listaIngresoEgreso = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioReporteIngresosEgresos.obtenerTodosIngresosEgresos(); // Obtener respuesta de backend
      let datosIngresosEgresos = await respuesta.data; // Rescatar datos de la respuesta
      datosIngresosEgresos.forEach((IngresosEgresos) => {
        // Guardar cada registro en la 'lista de datos'
        listaIngresosEgresos.push(IngresosEgresos);
      });
      this.listaIngresosEgresosStore = listaIngresosEgresos;
    },

    // Obtiene la lista de todos los productores para agregar al combobox
    async cargarListaCentroacopio() {
      let listaCentroacopio = []; // Limpiar la 'lista de ciudades'
      let respuesta = await ServicioCentroAcopio.obtenerTodosCentroAcopio(); // Obtener respuesta de backend
      let datosCentroacopio = await respuesta.data; // Rescatar datos de la respuesta
      datosCentroacopio.forEach((centroacopio) => {
        // Guardar cada registro en la 'lista de datos'
        listaCentroacopio.push(centroacopio);
      });
      this.llistaCentroacopioStore = listaCentroacopio;
    },

    // Busca el ID del productor seleccionado en el combobox
    async BuscarPropietario() {
      this.listaCentroacopioStore.forEach(element => {
        if(this.centroacopio == element.centroacopio){
          this.centroacopioid = element.centroacopioid;
          }
      });
      this.cargarCentroacopio();
    },


    // Obtiene todas las fincas de un productor en específico 
    async cargarIngresosEgresos() {
      let listaIngresosEgresos = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioReporteIngresosEgresos.obtenerIngresosEgresos(); // Obtener respuesta de backend
      let datosFinca = await respuesta.data; // Rescatar datos de la respuesta
      datosFinca.forEach((IngresosEgresos) => {
        // Guardar cada registro en la 'lista de datos'
        listaIngresosEgresos.push(finca);
      });
      this.listaReporteIngresosEgresos = listaIngresosEgresos;
    },

    // #  TIENDA DE VUE  #
    ...mapMutations("moduloFinca", ["establecerListaPropietarioStore"]),
    // Vacia el modelo Finca
    ...mapMutations("moduloFinca", ["vaciarFinca"]),
  },

  mixins: [autenticacionMixin, myMixin],

  created() {
    this.$store.commit("colocarLayout", "LayoutAdministrador");
  },
};
</script>
