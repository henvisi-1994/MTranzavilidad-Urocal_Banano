<template>
  <v-container fluid>
    <!-- Dialog para registrar nueva FactExport -->
    <DialogoNuevoFactExport
      ref="DialogoNuevoFactExport"
    ></DialogoNuevoFactExport>

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
            <!-- Caja de búsqueda -->
            <v-text-field
              v-model="buscarFactExport"
              append-icon="mdi-magnify"
              label="Buscar"
              class="custom"
              filled
              dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra las FactExports -->
        <v-data-table
          :headers="cabeceraTablaFactExport"
          :items="listaFactExport"
          :search="buscarFactExport"
          sort-by="tratamientoid"
          :height="tablaResponsiva()"
          class="elevation-1"
        >
          <template v-slot:top>
            <DialogoMostrarFactExport
              ref="DialogoMostrarFactExport"
            ></DialogoMostrarFactExport>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirTabsMostrarFactExport(item)">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nueva siembra -->
        <v-btn
          large
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px"
          elevation="0"
          color="primary"
          @click="cargarDialogoNuevoFactExport()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import DialogoNuevoFactExport from "../components/DialogoNuevoFactExport";
import DialogoMostrarFactExport from "../components/DialogoMostrarFactExport";
// import ServicioFactExport from "../services/ServicioFactExport";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseFactExport",

  components: {
    DialogoNuevoFactExport,
    DialogoMostrarFactExport,
  },

  data() {
    return {
      listaFactExport: [],
      nombre: "Gestión de Factura de Exportación",
      buscarFactExport: "", // Guarda el texto de búsqueda
      cabeceraTablaFactExport: [
        // Detalla los cabezales de la tabla
        {
          text: "Número",
          value: "facnumero",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Comprador",
          value: "compradorid",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Vendeddor",
          value: "vendedorid",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha",
          value: "facfecha",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Puerto de Embarque",
          value: "facpuertoembarque",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Subtotal sin Iva",
          value: "facsubtotalsiniva",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Subtotal  Exento",
          value: "facsubtotalivaexcento",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Subtotal  sin Impuestos",
          value: "facsubtotalsinimpuestos",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Descuentos",
          value: "factotaldesc",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
                {
          text: "Total",
          value: "facvalortotal",
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
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogoNuevaFactExport
    dialogoNuevoFactExport: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoNuevoFactExport"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogoNuevoFactExport",
          v
        );
      },
    },

    // Obtiene y modifica el estado de la variable dialogoMostrarFactExport
    dialogoMostrarFactExport: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoMostrarFactExport"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit(
          "gestionDialogos/toggleDialogoMostrarFactExport",
          v
        );
      },
    },

    // // Obtiene el modelo Control Maleza
    // modeloFactExportStore: {
    //   get() {
    //     return this.$store.getters["moduloFactExport/modeloFactExportStore"];
    //   },
    //   set(v) {
    //     return this.$store.commit(
    //       "moduloFactExport/establecerModeloFactExportStore",
    //       v
    //     );
    //   },
    // },
    // editarFactExport: {
    //   get() {
    //     return this.$store.getters["moduloFactExport/editarFactExport"];
    //   },
    //   set(v) {
    //     return this.$store.commit(
    //       "moduloFactExport/establecerEditarFactExport",
    //       v
    //     );
    //   },
    // },
  },

  methods: {
    // Carga el DialogoNuevaFactExport
    cargarDialogoNuevoFactExport() {
      this.dialogoNuevoFactExport = !this.dialogoNuevoFactExport; // Abre el DialogStepperFormNewFactExport
      //this.vaciarModeloFactExportStore(); // Reinicia el modelo FactExport
    },

    // Carga el TabsMostrarFactExport
    async abrirTabsMostrarFactExport(item) {
      this.dialogoMostrarFactExport = true; // Abre el DialogMostrarRiego
      // this.vaciarModeloFactExportStore(); // Vacia el modelo riego
      // let resultado = await ServicioFactExport.obtenerDetalleFactExport(
      //   item.tratamientoid
      // );
      // this.modeloFactExportStore = {
      //   cultivo: item.cultivo,
      //   cultivoid: item.cultivoid,
      //   fincaid: item.fincaid,
      //   finnombrefinca: item.finnombrefinca,
      //   productor: item.productor,
      //   productorid: item.productorid,
      //   trafecha: item.trafecha,
      //   traobservacion: item.traobservacion,
      //   tratamientoid: item.tratamientoid,
      //   traubicacion: item.traubicacion,
      //   detalle: resultado.data,
      // };
      // this.$store.commit("moduloFactExport/establecerEditarFactExport", true);
      //his.editarFactExport = true;
    },

    // Llena la listaSemilla con datos del servidor backend
    async obtenerTodosFactExport() {
      // let resultado = await ServicioFactExport.obtenerTodosFactExport();
      // this.listaFactExport = resultado.data;
      //console.log(this.listaMalezaControl);
    },

    // Vacia el modelo siembra
    // ...mapMutations("moduloFactExport", [
    //   "vaciarModeloFactExportStore",
    //   "asignarListaFactExport",
    // ]),
  },

  mounted() {
    this.obtenerTodosFactExport();
  },

  created() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario.rol === "Administrador")
      this.$store.commit("colocarLayout", "LayoutAdministrador");
    if (usuario.rol === "Productor")
      this.$store.commit("colocarLayout", "LayoutProductor");
  },

  mixins: [autenticacionMixin, myMixin],
};
</script>
