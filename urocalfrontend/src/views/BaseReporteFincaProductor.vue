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
                placeholder="Seleccione un productor"
                class="style-chooser"
                label="propietario"
                :reduce="(listaPropietarioStore) => listaPropietarioStore.propietario"
                :options="listaPropietarioStore"
              >
                <template v-slot:no-options="{ search, searching }">
                  <template v-if="searching">
                    No hay resultados para <em>{{ search }}</em
                    >.
                  </template>
                  <em style="opacity: 0.5" v-else>Empiece a escribir un propietario</em>
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

export default {
  name: "BaseFinca",

  components: {
    vSelect,
  },

  mounted() {
    this.cargarListaFinca();
    this.cargarListaPropietario();
  },

  data() {
    return {
      propietarios: "",
      idproductor: 0,
      nombre: "Gestión de reportes de fincas",
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
      propietarios (val) { 
      this.BuscarPropietario();
      },
  },
    
  computed: {

    listaPropietarioStore: {
      get() {
        return this.$store.getters["moduloFinca/listaPropietarioStore"];
      },
      set(v) {
        return this.$store.commit("moduloFinca/establecerListaPropietarioStore", v);
      },
    },

    listaFincaStore: {
      get() {
        return JSON.parse(
          JSON.stringify(this.$store.getters["moduloReporteFinca/listaReporteFinca"])
        );
      },
      set(v) {
        return this.$store.commit("moduloReporteFinca/establecerListaFincaStore", v);
      },
    },

    listaReporteDatosProductor: {
      get() {
        return JSON.parse(
          JSON.stringify(this.$store.getters["moduloReporteDatosProductor/listaReporteDatosProductor"])
        );
      },
      set(v) {
        return this.$store.commit("moduloReporteDatosProductor/establecerListaProductorPersonaStore", v);
      },
    },

    listaReporteFinca: {
      get() {
        return JSON.parse(
          JSON.stringify(this.$store.getters["moduloReporteFinca/listaReporteFinca"])
        );
      },
      set(v) {
        return this.$store.commit("moduloReporteFinca/establecerListaFincaStore", v);
      },
    },

    listaReporteFincaProductor: {
      get() {
        return JSON.parse(
          JSON.stringify(this.$store.getters["moduloReporteFincasProductor/listaReporteFincasProductor"])
        );
      },
      set(v) {
        return this.$store.commit("moduloReporteFincasProductor/establecerListaFincasProductorStore", v);
      },
    },

    modeloFincaStore: {
      get() {
        return this.$store.getters["moduloFinca/finca"];
      },
      set(v) {
        return this.$store.commit("moduloFinca/nuevoFinca", v);
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
        // Datos Propietario
        doc.setFontSize(14).setTextColor(0).text(130, 48, 'Datos del productor'); // Texto productor
        // Datos Izquierda
        doc.setFontSize(10).setTextColor(0).text(14, 54, 'Nombres:');  // TEXTO Nombre
        doc.setFontSize(10).setTextColor(100).text(30, 56, '--------------------------------------------------------------');// Línea Nombres
        //doc.setTextColor(150).line(30, 55, 95, 55); // Línea horizontal Nombre
        doc.setFontSize(10).setTextColor(0).text(14, 61, 'Apellidos:');  // TEXTO apellidos
        doc.setFontSize(10).setTextColor(100).text(30, 63, '--------------------------------------------------------------');// Línea Apellidos
        //doc.setTextColor(150).line(30, 62, 95, 62); // Línea horizontal DATOS apellidos 
        doc.setFontSize(10).setTextColor(0).text(14, 68, 'Ciudad:');  // TEXTO Ciudad
        doc.setFontSize(10).setTextColor(100).text(30, 70, '--------------------------------------------------------------');// Línea Ciudad
        //doc.setTextColor(150).line(30, 69, 95, 69); // Línea horizontal Ciudad
        doc.setFontSize(10).setTextColor(0).text(14, 75, 'Dirección:');  // TEXTO Dirección
        doc.setFontSize(10).setTextColor(100).text(30, 77, '--------------------------------------------------------------');// Línea Dirección
        //doc.setTextColor(150).line(30, 76, 95, 76); // Línea horizontal DATOS Dirección
        doc.setFontSize(10).setTextColor(0).text(14, 82, 'Teléfono:');  // TEXTO Teléfono
        doc.setFontSize(10).setTextColor(100).text(30, 84, '--------------------------------------------------------------');// Línea Teléfono
        //doc.setTextColor(150).line(30, 83, 95, 83); // Línea horizontal DATOS Teléfono
        // Datos Derecha
        doc.setFontSize(10).setTextColor(0).text(196, 54, 'Género:');// TEXTO Género
        doc.setFontSize(10).setTextColor(100).text(210, 56, '--------------------------------------------------------------');// Línea Género
        //doc.setTextColor(150).line(210, 55, 282, 55); // Línea horizontal Género
        doc.setFontSize(10).setTextColor(0).text(196, 61, 'Edad:');// TEXTO Edad
        doc.setFontSize(10).setTextColor(100).text(210, 63, '--------------------------------------------------------------');// Línea Edad
        //doc.setTextColor(150).line(210, 62, 282, 62); // Línea horizontal Edad
        doc.setFontSize(10).setTextColor(0).text(196, 68, 'Idioma:');// TEXTO Idioma
        doc.setFontSize(10).setTextColor(100).text(210, 70, '--------------------------------------------------------------');// Línea Idioma
        //doc.setTextColor(150).line(210, 69, 282, 69); // Línea horizontal Idioma
        doc.setFontSize(10).setTextColor(0).text(196, 75, 'Email:');// TEXTO Email
        doc.setFontSize(10).setTextColor(100).text(210, 77, '--------------------------------------------------------------');// Línea Email
        //doc.setTextColor(150).line(210, 76, 282, 76); // Línea horizontal Email
        doc.setFontSize(10).setTextColor(0).text(196, 82, 'Celular:');// TEXTO Celular
        doc.setFontSize(10).setTextColor(100).text(210, 84, '--------------------------------------------------------------');// Línea Celular
        // doc.setTextColor(150).line(210, 83, 282, 83); // Línea horizontal Celular
        // Datos obtenidos de la BD
        this.listaReporteDatosProductor.forEach((res) => {
        // Datos Izquierda
        doc.setFontSize(10).setTextColor(100).text(33, 54, res.pernombres);  // TEXTO Nombre de la db
        doc.setFontSize(10).setTextColor(100).text(33, 61, res.perapellidos);  // TEXTO apellidos de la db
        doc.setFontSize(10).setTextColor(100).text(33, 68, res.ciudadnacimiento.ciudadnombre);  // TEXTO Ciudad de la db
        doc.setFontSize(10).setTextColor(100).text(33, 75, res.perdireccion);  // TEXTO Dirección de la db
        doc.setFontSize(10).setTextColor(100).text(33, 82, res.pertelefono);  // TEXTO Teléfono de la db
        // Datos Derecha
        doc.setFontSize(10).setTextColor(100).text(213, 54, res.pergenero);// TEXTO Género de la db
        doc.setFontSize(10).setTextColor(100).text(213, 61, res.edad + " años");// TEXTO Edad de la db
        doc.setFontSize(10).setTextColor(100).text(213, 68, res.productoridioma);// TEXTO Idioma de la db
        doc.setFontSize(10).setTextColor(100).text(213, 75, res.peremail);// TEXTO Email de la db
        doc.setFontSize(10).setTextColor(100).text(213, 82, res.perwhatsapp);// TEXTO Celular de la db
        });
        // Texto Finca
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
    async cargarListaFinca() {
      let listaFinca = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioReporteFincaProductor.obtenerTodosFincas(); // Obtener respuesta de backend
      let datosFinca = await respuesta.data; // Rescatar datos de la respuesta
      datosFinca.forEach((finca) => {
        // Guardar cada registro en la 'lista de datos'
        listaFinca.push(finca);
      });
      this.listaFincaStore = listaFinca;
    },

    // Obtiene la lista de todos los productores para agregar al combobox
    async cargarListaPropietario() {
      let listaPropietario = []; // Limpiar la 'lista de ciudades'
      let respuesta = await ServicioFinca.obtenerTodosPropietarios(); // Obtener respuesta de backend
      let datosPropietario = await respuesta.data; // Rescatar datos de la respuesta
      datosPropietario.forEach((propietario) => {
        // Guardar cada registro en la 'lista de datos'
        listaPropietario.push(propietario);
      });
      this.listaPropietarioStore = listaPropietario;
    },

    // Busca el ID del productor seleccionado en el combobox
    async BuscarPropietario() {
      this.listaPropietarioStore.forEach(element => {
        if(this.propietarios == element.propietario){
          this.idproductor = element.productorid;
          }
      });
      this.cargarProductor();
      this.cargarFincasProductor();
    },

    // Obtiene todos los datos personales de un productor en específico
    async cargarProductor() {
      let listaFinca = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioReporteFincaProductor.obtenerProductor(this.idproductor); // Obtener respuesta de backend
      let datosFinca = await respuesta.data; // Rescatar datos de la respuesta
      datosFinca.forEach((finca) => {
        // Guardar cada registro en la 'lista de datos'
        listaFinca.push(finca);
      });
      this.listaReporteDatosProductor = listaFinca;
    },

    // Obtiene todas las fincas de un productor en específico 
    async cargarFincasProductor() {
      this.totalfincas = "0";
      let listaFinca = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioReporteFincaProductor.obtenerFincasProductor(this.idproductor); // Obtener respuesta de backend
      let datosFinca = await respuesta.data; // Rescatar datos de la respuesta
      datosFinca.forEach((finca) => {
        // Guardar cada registro en la 'lista de datos'
        listaFinca.push(finca);
        this.totalfincas++;
      });
      this.listaReporteFincaProductor = listaFinca;
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
