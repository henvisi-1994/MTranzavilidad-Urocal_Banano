<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo usuario -->
    <DialogNuevoIngresoInsumo
      ref="DialogNuevoIngresoInsumo"
    ></DialogNuevoIngresoInsumo>

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
import DialogNuevoIngresoInsumo from "../components/DialogNuevoIngresoInsumo"; // Dialogo para agregar usuario
import DialogEditarIngresoInsumo from "../components/DialogEditarIngresoInsumo"; // Dialogo para editar usuario
import ServicioIngresoInsumo from "../services/ServicioIngresoInsumo"; // Interactuar con el Backend
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion
import jsPDF from "jspdf";
export default {
  name: "BaseIngresoInsumo",

  components: {
    DialogNuevoIngresoInsumo,
    DialogEditarIngresoInsumo,
  },

  created() {
    this.$store.commit("colocarLayout", "LayoutCentroAcopio");
  },

  mounted() {
    this.cargarListaIngresoInsumo();
    //  this.cargarInsumoAcopios();
    this.cargarListaFinca();
  },

  data() {
    return {
      nombre: "Reportes de Ingreso Insumo",
      date1: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      buscarIngresoInsumo: "", // Guarda el texto de búsqueda
      cabeceraTablaIngresoInsumo: [
        // Detalla las cabeceras de la tabla
        {
          text: "Centro de Acopio",
          value: "centroacopioid",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha del ingreso",
          value: "inginsfechaingreso",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Producto utilizado",
          value: "inginsproducto",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Factura",
          value: "inginsfactura",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Proveedor",
          value: "inginsproveedor",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Cantidad de ingresos",
          value: "inginscantidadingreso",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Unidad",
          value: "inginsunidad",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Saldo",
          value: "inginssaldo",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Encargado",
          value: "inginsencargado",
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
      listaIngresoInsumoStoreSOLID: [
        {
          ingresoinsumoid: "2221",
          inginsfechaingreso: "2020-02-01",
          inginsproducto: "200",
          inginsfactura: "300",
          inginsproveedor: "305",
          inginscantidadingreso: "200.90",
          inginsunidad: "2",
          inginssaldo: "300",
          inginsencargado: "Juan Perez",
          centroacopioid: "Mark´s Scan",
        },
        {
          ingresoinsumoid: "555",
          inginsfechaingreso: "2020-04-01",
          inginsproducto: "200",
          inginsfactura: "300",
          inginsproveedor: "305",
          inginscantidadingreso: "200.90",
          inginsunidad: "2",
          inginssaldo: "300",
          inginsencargado: "Juan Perez",
          centroacopioid: "Mark´s Scan",
        },
      ],
      listaIngresoInsumo: [], // Almacena una lista de IngresoInsumo con llave foranea ingresoinsumoid, la misma se muestra en tabla
      listaCentroAcopios: [
        { centroacopioind: "1", centroacopionombre: "centro1" },
      ],
    };
  },

  computed: {
    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    listaIngresoInsumoStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloIngresoInsumo/listaIngresoInsumoStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloIngresoInsumo/establecerListaIngresoInsumoStore",
          v
        );
      },
    },

    listaCentroAcopiosx: {
      get() {
        return this.$store.getters["moduloIngresoInsumo/listaCentroAcopios"];
      },
      set(v) {
        return this.$store.commit(
          "moduloIngresoInsumo/establecerListaCentroAcopios",
          v
        );
      },
    },
    listaFincaStore: {
      get() {
        return this.$store.getters["moduloIngresoInsumo/listaFincaStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloIngresoInsumo/establecerListaFincaStore",
          v
        );
      },
    },
    // ##############
    // #  DIALOGOS  #
    // ##############
    dialogNuevoIngresoInsumo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoIngresoInsumo"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogNuevoIngresoInsumo",
          v
        );
      },
    },

    dialogEditarIngresoInsumo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogEditarIngresoInsumo"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogEditarIngresoInsumo",
          v
        );
      },
    },

    // #############
    // #  MODELOS  #
    // #############
    modeloIngresoInsumoStore: {
      get() {
        return this.$store.getters[
          "moduloIngresoInsumo/modeloIngresoInsumoStore"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloIngresoInsumo/establecerModeloIngresoInsumoStore",
          v
        );
      },
    },
  },

  methods: {
    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    async cargarListaIngresoInsumo() {
      this.listaIngresoInsumo = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioIngresoInsumo.obtenerTodosIngresoInsumo(); // Obtener respuesta de backend
      let datosIngresoInsumo = await respuesta.data; // Rescatar datos de la respuesta
      datosIngresoInsumo.forEach((ingresoinsumo) => {
        // Guardar cada registro en la 'lista de datos'
        this.listaIngresoInsumo.push(ingresoinsumo);
      });
      this.listaIngresoInsumoStore = this.listaIngresoInsumo;
      //console.log(this.listaIngresoInsumoStore);
    },
    async cargarInsumoAcopios() {
      let listaInsumo = [];
      console.log("datainsumo> buscando"); // Rescatar datos de la respuesta

      let respuesta = await ServicioIngresoInsumo.obtenerTodosAcopio(); // Obtener respuesta de backend
      console.log("datainsumo> ", respuesta); // Rescatar datos de la respuesta

      let datosInsumo = await respuesta.data;
      datosInsumo.forEach((Insumo) => {
        // Guardar cada registro en la 'lista de datos'
        listaInsumo.push(Insumo);
      });
      this.listaCentroAcopios = listaInsumo;
      //console.log(this.listaCentroAcopios);
    },
    async cargarListaFinca() {
      let listaFinca = [];
      console.log("datafinca> buscando"); // Rescatar datos de la respuesta
      let respuesta = await ServicioIngresoInsumo.obtenerTodosFinca(); // Obtener respuesta de backend
      console.log("datafinca> ", respuesta); // Rescatar datos de la respuesta
      let datosFinca = await respuesta.data;
      datosFinca.forEach((Finca) => {
        // Guardar cada registro en la 'lista de datos'
        listaFinca.push(Finca);
      });
      this.listaFincaStore = listaFinca;
      //console.log(this.listaCentroAcopios);
    },

    // ##############
    // #  DIALOGOS  #
    // ##############
    cargarDialogNuevoIngresoInsumo() {
      this.dialogNuevoIngresoInsumo = !this.dialogNuevoIngresoInsumo;
      this.vaciarModeloIngresoInsumo();
    },

    cargarDialogEditarIngresoInsumo(item) {
      this.dialogEditarIngresoInsumo = !this.dialogEditarIngresoInsumo;
      this.vaciarModeloIngresoInsumo();
      const indiceEditar = this.listaIngresoInsumoStore.indexOf(item);
      this.modeloIngresoInsumoStore = item;
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

      doc.text("Reporte Ingreso Insumo", 40, 200);
      doc.setFontSize(12);

      doc.text("Registros generados " + date, 40, 215);
      doc.text("Fecha inicio: " + this.date1, 40, 230);
      doc.text("Fecha final: " + this.date2, 40, 245);
      doc.text("Encargado: Milton Garcia", 40, 260);

      //PARA DAR parseo
var datas = this.listaIngresoInsumo;
      var prebody = [];
      for (let index = 0; index < datas.length; index++) {
        prebody[index] = [
          datas[index].ingresoinsumoid,
          datas[index].inginsfechaingreso,
          datas[index].inginsproducto,
          datas[index].inginsfactura,
          datas[index].inginsproveedor,
          datas[index].inginscantidadingreso,
          datas[index].inginsunidad,
          datas[index].inginssaldo,
          datas[index].inginsencargado,
          datas[index].centroacopioid,
        ];
      }

      for (let index = 0; index < 13; index++) {
        //PARA DAR ESPACIO
        doc.autoTable({});
      }

      doc.autoTable({
        head: [
          [
            "Centro de acopio",
            "Fecha del ingreso",
            "Producto utilizado",
            "Factura",
            "Proveedor",
            "Cantidad de ingresos",
            "Unidad",
            "Saldo",
          ],
        ],
        body: prebody
      });

      doc.save("reporteingresoinsumo-" + date + ".pdf");
    },

    // ###################
    // #  TIENDA DE VUE  #
    // ###################
    //...mapMutations("moduloIngresoInsumo", ["vaciarModeloIngresoInsumo"]),          // Vacia el modelo IngresoInsumo
    ...mapMutations("moduloIngresoInsumo", ["establecerListaCentroAcopios"]),
    ...mapMutations("moduloIngresoInsumo", ["establecerListaFincaStore"]),
    ...mapMutations("moduloIngresoInsumo", ["vaciarModeloIngresoInsumo"]), // Vacia el modelo modeloIngresoInsumoStore
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
