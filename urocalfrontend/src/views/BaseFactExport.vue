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
          sort-by="facturaexportacionid"
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
import ServicioFacturaExportacion from "../services/ServicioFacturaExportacion";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseFactExport",

  components: {
    DialogoNuevoFactExport,
    DialogoMostrarFactExport,
  },
  mounted() {
    this.cargarListaFactExport();
  },

  data() {
    return {
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
    listaFactExport: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloFacturaExport/listaFacturaExportStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloFacturaExport/establecerListaFacturaExportStore",
          v
        );
      },
    },
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
    bloquearFacturaExport: {
      get() {
        return this.$store.getters["moduloFacturaExport/bloquearFacturaExport"];
      },
      set(v) {
        return this.$store.commit(
          "moduloFacturaExport/cambiarEstadoBloquearFacturaExport",
          v
        );
      },
    },

    // // Obtiene el modelo Control Maleza
    factExportaStore: {
      get() {
        return this.$store.getters["moduloFacturaExport/factExportaStore"];
      },
      set(v) {
        return this.$store.commit("moduloFacturaExport/establecerModeloFacturaExportStore", v);
      },
    },
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
    ...mapMutations("moduloFacturaExport", ["vaciarFacturaExport", "asignarListaFacturaExportStore"]),
    // Carga el DialogoNuevaFactExport
    cargarDialogoNuevoFactExport() {
      this.dialogoNuevoFactExport = !this.dialogoNuevoFactExport; // Abre el DialogStepperFormNewFactExport
      this.bloquearFacturaExport = false;
      this.vaciarFacturaExport; // Reinicia el modelo FactExport
    },

    // Carga el TabsMostrarFactExport
    async abrirTabsMostrarFactExport(item) {
      this.dialogoMostrarFactExport = true; // Abre el DialogMostrarRiego
      //this.bloquearFacturaExport = true;
      this.vaciarFacturaExport(); // Vacia el modelo riego
      let resultado = await ServicioFacturaExportacion.obtenerFacturaExport(
        item.facturaexportacionid
      );
      this.factExportaStore = {
        facnumero: item.facnumero,
        compradorid: item.compradorid,
        vendedorid: item.vendedorid,
        facfecha: item.facfecha,
        facpuertoembarque: item.facpuertoembarque,
        facpuertodestino: item.facpuertodestino,
        facvapor: item.facvapor,
        facsubtotal12: item.facsubtotal12,
        facsubtotal0: item.facsubtotal0,
        facsubtotalsiniva: item.facsubtotalsiniva,
        facsubtotalivaexcento: item.facsubtotalivaexcento,
        facsubtotalsinimpuestos: item.facsubtotalsinimpuestos,
        factotaldesc: item.factotaldesc,
        facice: item.facice,
        faciva12: item.faciva12,
        facirbpn: item.facirbpn,
        facvalortotal: item.facvalortotal,
        facformapago: item.facformapago,
        facplazo: item.facplazo,
        factiempo: item.factiempo,
        facdae: item.facdae,
        facpesoneto: item.facpesoneto,
        facpesobruto: item.facpesobruto,
        faclote: item.faclote,
        faccontenedor: item.faccontenedor,
        facsemana: item.facsemana,
        facfechazarpe: item.facfechazarpe,
        facmarca: item.facmarca,
        faccertificaciones: item.faccertificaciones,
        detalle:resultado.data
      };
      this.$store.commit("moduloFacturaExport/establecerEditarFacturaExport", true);
      this.cargarListaFactExport();
      //this.factExportaStore = resultado.data[0];
      // this.$store.commit("moduloFactExport/establecerEditarFactExport", true);
      //his.editarFactExport = true;
    },

    // Llena la listaSemilla con datos del servidor backend
    async obtenerTodosFactExport() {
      // let resultado = await ServicioFactExport.obtenerTodosFactExport();
      // this.listaFactExport = resultado.data;
      //console.log(this.listaMalezaControl);
    },
    async cargarListaFactExport() {
      let respuesta = await ServicioFacturaExportacion.obtenerTodosFacturaExport();
      let facturaexport = await respuesta.data;
      this.$store.commit("moduloFacturaExport/vaciarLista", null);
      facturaexport.forEach((f) => {
        this.$store.commit(
          "moduloFacturaExport/updateListaFacturaExportStore",
          f
        );
      });
    },
    tablaResponsiva() {
      // Ajusta el tamaño de la tabla para pantallas pequeñas
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          if (
            this.$vuetify.breakpoint.height >= 500 &&
            this.$vuetify.breakpoint.height <= 550
          ) {
            return "41vh";
          }
          if (
            this.$vuetify.breakpoint.height >= 551 &&
            this.$vuetify.breakpoint.height <= 599
          ) {
            return "44vh";
          }
          if (
            this.$vuetify.breakpoint.height >= 600 &&
            this.$vuetify.breakpoint.height <= 650
          ) {
            return "51vh";
          }
          if (
            this.$vuetify.breakpoint.height >= 651 &&
            this.$vuetify.breakpoint.height <= 699
          ) {
            return "53vh";
          }
          if (
            this.$vuetify.breakpoint.height >= 700 &&
            this.$vuetify.breakpoint.height <= 799
          ) {
            return "57vh";
          }
          if (this.$vuetify.breakpoint.height >= 800) {
            return "61vh";
          }
        default:
          return "auto";
      }
    },

  },

  mounted() {
    this.cargarListaFactExport();
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
