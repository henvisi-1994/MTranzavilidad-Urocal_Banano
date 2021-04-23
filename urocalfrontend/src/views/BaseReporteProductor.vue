<template>
  <v-container fluid>

    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0" class="mt-5">
      <v-card-title class="py-2">
        <v-row no-gutters justify-md="space-between">
          <v-col cols="12" md="6">
            <div
              :class="[`text-h4`, `mb-4`]"
              class="transition-swing primary--text"
              v-text="nombre"
            ></div>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              class="custom"
              filled
              v-model="buscarProductorPersona"
              append-icon="mdi-magnify"
              label="Buscar"
              dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-data-table
          :headers="cabeceraTablaUsuarios"
          :items="listaProductorPersonaStore"
          :search="buscarProductorPersona"
          sort-by="id_lote"
          :height="tablaResponsiva()"
          class="elevation-1"
        >
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          large
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px"
          color="primary"
          @click="download()"
          >Generar PDF</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>

import { mapMutations } from "vuex"; // Trabajar con la tienda de Vue (Store)
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import ServicioReporteProductor from "../services/ServicioReporteProductor"; // Interactuar con el Backend
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


export default {
  name: "BaseReporteProductor",

  components: {
    vSelect,
  },

  mounted() {
  this.cargarListaProductorPersona();
  },

  created() {
    this.$store.commit("colocarLayout", "LayoutAdministrador");
  },

  data() {
    return {
      min: 10,
      max: 120,
      range: [20, 25],
      nombre: "Productores",
      idproductor: 0,
      totalproductores: "0",
      buscarProductorPersona: "", // Guarda el texto de búsqueda
      cabeceraTablaUsuarios: [
        // Cabeceras de la tabla (Los campos más relevantes)
        { text: "Cedula", value: "percedula", align: "center", class: "grey lighten-3" },
        { text: "Apellidos", value: "perapellidos", align: "center", sortable: false, class: "grey lighten-3", },
        { text: "Nombres", value: "pernombres", sortable: false, align: "center", class: "grey lighten-3", },
        { text: "Dirección", value: "perdireccion", sortable: false, align: "center", class: "grey lighten-3", },
        { text: "Teléfono", value: "pertelefono", sortable: false, align: "center", class: "grey lighten-3", },
        //{ text: "Whatsapp", value: "perwhatsapp", sortable: false, align: "center", class: "grey lighten-3", },
        { text: "Genero", value: "pergenero", align: "center", class: "grey lighten-3", },
        //{ text: "F. Nacimiento", value: "perfechanacimiento", sortable: false, align: "center", class: "grey lighten-3", },
        { text: "Edad", value: "edad", align: "center", class: "grey lighten-3", },
        //{ text: "Idioma", value: "productoridioma", align: "center", class: "grey lighten-3", },
        { text: "Ciudad", value: "ciudadnombre", align: "center", class: "grey lighten-3", },
        //{ text: "Email", value: "peremail", sortable: false, align: "center", class: "grey lighten-3", },
      ],
    };
  },

  computed: {
    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    listaProductorPersonaStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloReporteProductor/listaProductorPersonaStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloReporteProductor/establecerListaProductorPersonaStore",
          v
        );
      },
    },

    // #############
    // #  MODELOS  #
    // #############
    modeloProductorPersonaStore: {
      get() {
        return this.$store.getters["moduloReporteProductor/modeloProductorPersonaStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloReporteProductor/establecerModeloProductorPersonaStore",
          v
        );
      },
    },
  },

  methods: {
    // Programación PDF
    async download() {
      const doc = new jsPDF('L','mm','A4');
      //Cabezera 
      doc.setFontSize(14).setTextColor(50).text(100, 15, 'UNIÓN REGIONAL DE ORGANIZACIONES'); 
      doc.setFontSize(14).setTextColor(50).text(117, 20, 'CAMPESINAS DEL LITORAL'); 
      doc.setFontSize(35).setTextColor(50).text(125, 33, 'UROCAL');
      doc.setFontSize(14).setTextColor(0).text(88, 40, 'REPORTES DE PRODUCTORES DE UROCAL'); 
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
   
      // Texto Finca
      doc.setFontSize(14).setTextColor(0).text(130, 54, 'Lista de Productores'); //
      // Tabla de lista de fincas
      var vm = this
      var columns = [
      {title: "Cedula", dataKey: "percedula"},
      {title: "Apellidos", dataKey: "perapellidos"},
      {title: "Nombre", dataKey: "pernombres"},
      {title: "Dirección", dataKey: "perdireccion"},
      {title: "Teléfono", dataKey: "pertelefono"},
      {title: "Whatsapp", dataKey: "perwhatsapp"},
      {title: "Genero", dataKey: "pergenero"},
      {title: "Fecha Nacimiento", dataKey: "perfechanacimiento"},
      {title: "Edad", dataKey: "edad"},
      {title: "Idioma", dataKey: "productoridioma"},
      {title: "Ciudad", dataKey: "ciudadnombre"},
      {title: "Email", dataKey: "peremail"},
      ];
      // Llenado del cuerpo con datos de la BD
      autoTable(doc, {
        columns,
        body: this.listaProductorPersonaStore,
        theme: 'plain',
        startY: 61,         
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
      doc.setFontSize(10).setTextColor(0).text(14, finalY + 10, 'Total de Productores:');  // TEXTO Total fincas:
      doc.setFontSize(10).setTextColor(100).text(50, finalY + 10, this.totalproductores + " " + "productores");// TEXTO Celular de la db
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

    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    async cargarListaProductorPersona() {
      this.totalproductores = "0";
      let listaProductorPersona = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioReporteProductor.obtenerTodosProductorPersona(); // Obtener respuesta de backend
      let datosUsuario = await respuesta.data; // Rescatar datos de la respuesta
      datosUsuario.forEach((dd) => {
        // Guardar cada registro en la 'lista de datos'
        listaProductorPersona.push(dd);
        this.totalproductores++;
      });
      this.listaProductorPersonaStore = listaProductorPersona;
    },
  },

  mixins: [autenticacionMixin, myMixin],
};
</script>
