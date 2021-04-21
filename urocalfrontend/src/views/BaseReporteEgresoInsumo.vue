<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo usuario -->
    <DialogNuevoEgresoInsumo
      ref="DialogNuevoEgresoInsumo"
    ></DialogNuevoEgresoInsumo>

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
        </v-row>
      </v-card-title>

      <v-card-text>
        <div>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date1"
                    label="Fecha desde"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date1"
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date2"
                    label="Fecha hasta"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date2"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
      <v-card-actions class="justify-left">
        <v-btn
          large
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          class="cyan"
          @click="createPDF()"
          >GENERAR REPORTE</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from "vuex"; // Trabajar con la tienda de Vue (Store)
import DialogNuevoEgresoInsumo from "../components/DialogNuevoEgresoInsumo"; // Dialogo para agregar usuario
import DialogEditarEgresoInsumo from "../components/DialogEditarEgresoInsumo"; // Dialogo para editar usuario
import ServicioEgresoInsumo from "../services/ServicioEgresoInsumo"; // Interactuar con el Backend
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion
import jsPDF from "jspdf";

export default {
  name: "BaseEgresoInsumo",

  components: {
    DialogNuevoEgresoInsumo,
    DialogEditarEgresoInsumo,
  },

  mounted() {
    this.cargarListaEgresoInsumo();
    this.cargarListaInsumo();
    this.cargarListaFinca();
  },

  data() {
    return {
      nombre: "Reportes de Egreso Insumo",
      date1: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      buscarEgresoInsumo: "", // Guarda el texto de búsqueda
      cabeceraTablaEgresoInsumo: [
        // Detalla las cabeceras de la tabla
        {
          text: "Cod. Egreso",
          value: "egresoinsumosid",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Insumo",
          value: "ingresoinsumosid",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Finca",
          value: "fincaid",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha de egreso",
          value: "egrinsfechaegreso",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Control de Egreso",
          value: "egrinsparacontrolar",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Dosis",
          value: "egrinsdosis",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Cantidad entregada",
          value: "egrinscantidadentregada",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Encargado",
          value: "egrinsencargado",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Detalles",
          value: "actions",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
      ],
      // listaEgresoInsumo: [], // Almacena una lista de EgresoInsumo con llave foranea ingresoinsumoid, la misma se muestra en tabla
      listaEgresoInsumo: [
        {
          egresoinsumosid: "1001",
          ingresoinsumosid: "Abono organico",
          fincaid: "0001",
          egrinsfechaegreso: "2020-02-01",
          egrinsparacontrolar: "305",
          egrinsdosis: "3",
          egrinscantidadentregada: "10",
          egrinsencargado: "Milton",
          actions: "Ninguno",
        },
        {
          egresoinsumosid: "1002",
          ingresoinsumosid: "Fertilizante",
          fincaid: "002",
          egrinsfechaegreso: "2021-02-01",
          egrinsparacontrolar: "306",
          egrinsdosis: "8",
          egrinscantidadentregada: "22",
          egrinsencargado: "Bryan",
          actions: "Ninguno",
        },
      ],
    };
  },

  computed: {
    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    listaEgresoInsumoStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloEgresoInsumo/listaEgresoInsumoStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloEgresoInsumo/establecerListaEgresoInsumoStore",
          v
        );
      },
    },

    listaInsumoStore: {
      get() {
        return this.$store.getters["moduloEgresoInsumo/listaInsumoStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloEgresoInsumo/establecerListaInsumoStore",
          v
        );
      },
    },
    listaFincaStore: {
      get() {
        return this.$store.getters["moduloEgresoInsumo/listaFincaStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloEgresoInsumo/establecerListaFincaStore",
          v
        );
      },
    },
    // ##############
    // #  DIALOGOS  #
    // ##############
    dialogNuevoEgresoInsumo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoEgresoInsumo"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogNuevoEgresoInsumo",
          v
        );
      },
    },

    dialogEditarEgresoInsumo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogEditarEgresoInsumo"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogEditarEgresoInsumo",
          v
        );
      },
    },

    // #############
    // #  MODELOS  #
    // #############
    modeloEgresoInsumoStore: {
      get() {
        return this.$store.getters[
          "moduloEgresoInsumo/modeloEgresoInsumoStore"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloEgresoInsumo/establecerModeloEgresoInsumoStore",
          v
        );
      },
    },
  },

  methods: {
    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    async cargarListaEgresoInsumo() {
      this.listaEgresoInsumo = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioEgresoInsumo.obtenerTodosEgresoInsumo(); // Obtener respuesta de backend
      let datosEgresoInsumo = await respuesta.data; // Rescatar datos de la respuesta
      datosEgresoInsumo.forEach((egresoinsumo) => {
        // Guardar cada registro en la 'lista de datos'
        this.listaEgresoInsumo.push(egresoinsumo);
      });
      this.listaEgresoInsumoStore = listaEgresoInsumo;
      //console.log(this.listaEgresoInsumoStore);
    },

    async cargarListaInsumo() {
      let listaInsumo = [];
      console.log("datainsumo> buscando"); // Rescatar datos de la respuesta

      let respuesta = await ServicioEgresoInsumo.obtenerTodosInsumo(); // Obtener respuesta de backend
      console.log("datainsumo> ", respuesta); // Rescatar datos de la respuesta

      let datosInsumo = await respuesta.data;
      datosInsumo.forEach((Insumo) => {
        // Guardar cada registro en la 'lista de datos'
        listaInsumo.push(Insumo);
      });
      this.listaInsumoStore = listaInsumo;
      //console.log(this.listaInsumoStore);
    },
    async cargarListaFinca() {
      let listaFinca = [];
      console.log("datafinca> buscando"); // Rescatar datos de la respuesta
      let respuesta = await ServicioEgresoInsumo.obtenerTodosFinca(); // Obtener respuesta de backend
      console.log("datafinca> ", respuesta); // Rescatar datos de la respuesta
      let datosFinca = await respuesta.data;
      datosFinca.forEach((Finca) => {
        // Guardar cada registro en la 'lista de datos'
        listaFinca.push(Finca);
      });
      this.listaFincaStore = listaFinca;
      //console.log(this.listaInsumoStore);
    },

    // ##############
    // #  DIALOGOS  #
    // ##############
    cargarDialogNuevoEgresoInsumo() {
      this.dialogNuevoEgresoInsumo = !this.dialogNuevoEgresoInsumo;
      this.vaciarModeloEgresoInsumo();
    },

    cargarDialogEditarEgresoInsumo(item) {
      this.dialogEditarEgresoInsumo = !this.dialogEditarEgresoInsumo;
      this.vaciarModeloEgresoInsumo();
      const indiceEditar = this.listaEgresoInsumoStore.indexOf(item);
      this.modeloEgresoInsumoStore = item;
    },
    createPDF() {
      let pdfName = "test";
      var doc = new jsPDF("p", "pt", "A4");
      var img = require("../assets/urocal.png");
      var hoy = new Date();
      var dd = hoy.getDate();
      var mm = hoy.getMonth() + 1;
      var yyyy = hoy.getFullYear();
      var hh = hoy.getHours();
      var hm = hoy.getMinutes();
      var date = dd + "-" + mm + "-" + yyyy + " " + hh + ":" + hm;

      doc.addImage(img, "PNG", 40, 60, 80, 80);
      doc.setFontSize(12);
      doc.text(
        "UNIÓN REGIONAL DE ORGANIZACIONES CAMPESINAS DEL LITORAL",
        150,
        80
      );
      doc.setFontSize(28);
      doc.setFont("italic");
      doc.text("UROCAL", 280, 110);

      doc.setFontSize(14);

      doc.text("Reporte Egreso Insumo", 40, 200);
      doc.setFontSize(12);

      doc.text("Registros generados " + date, 40, 215);
      doc.text("Fecha inicio: " + this.date1, 40, 230);
      doc.text("Fecha final: " + this.date2, 40, 245);
      doc.text("Encargado: Milton Garcia", 40, 260);
      //PARA DAR ESPACIO
      var datas = this.listaEgresoInsumo;
      var prebody = [];
      for (let index = 0; index < datas.length; index++) {
        prebody[index] = [
          datas[index].egresoinsumosid,
          datas[index].ingresoinsumosid,
          datas[index].fincaid,
          datas[index].egrinsfechaegreso,
          datas[index].egrinsparacontrolar,
          datas[index].egrinsdosis,
          datas[index].egrinscantidadentregada,
          datas[index].egrinsencargado,
          datas[index].actions,
        ];
      }
      for (let index = 0; index < 13; index++) {
        doc.autoTable({});
      }
      doc.autoTable({
        head: [
          [
            "Codigo egreso",
            "Insumo",
            "Finca",
            "Fecha de egreso",
            "Control de egreso",
            "Dosis",
            "Cantidad entregada",
            "Encargado",
            "Detalles",
          ],
        ],
        body: prebody,
      });

      doc.save("reporteegresoinsumo-" + date + ".pdf");
    },

    // ###################
    // #  TIENDA DE VUE  #
    // ###################
    //...mapMutations("moduloEgresoInsumo", ["vaciarModeloEgresoInsumo"]),          // Vacia el modelo EgresoInsumo
    ...mapMutations("moduloEgresoInsumo", ["establecerListaInsumoStore"]),
    ...mapMutations("moduloEgresoInsumo", ["establecerListaFincaStore"]),
    ...mapMutations("moduloEgresoInsumo", ["vaciarModeloEgresoInsumo"]), // Vacia el modelo modeloEgresoInsumoStore
  },

  mixins: [autenticacionMixin, myMixin],

  created() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario.rol === "Administrador")
      this.$store.commit("colocarLayout", "LayoutAdministrador");
    if (usuario.rol === "Responsable Centro Acopio")
      this.$store.commit("colocarLayout", "LayoutCentroAcopio");
  },
};
</script>
