<template>
  <v-dialog
    v-model="dialogoMostrarFactExport"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="primary white--text">
        <h5>Registrar Factura de Exportacion</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogNuevoFactExport()">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar FactExport -->
          <FormFactExport ref="componentFormFactExport"></FormFactExport>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo FactExport -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          color="primary"
          @click="agregarFactExport()"
          >Registrar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

 import FormFactExport from "@/components/FormFactExport";
// import SerivicioFactExports from '../services/SerivicioFactExports';

export default {
  name: "DialogoMostrarFactExport",

  components: {
     FormFactExport,
  },

  computed: {
    
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

    // modeloFactExportStore: {
    //   get() {
    //     return this.$store.getters["moduloFactExport/modeloFactExportStore"];
    //   },
    //   set(v) {
    //     return this.$store.commit("moduloFactExport/establecerModeloFactExportStore", v);
    //   },
    // },

    // Obtiene es estado de la variable formFactExportValido y el modelo FactExport
    ...mapState("moduloFactExport", ["formFactExportValido", "modeloFactExportStore"]),
  },

  methods: {
    async agregarFactExport() {
    //   let respuesta = await SerivicioFactExports.agregarFactExport(this.modeloFactExportStore);
    //   if (respuesta.status == 201) {
    //     this.cerrarDialogNuevoFactExport();
    //     this.cargarListaFactExport();
    //     this.vaciarModeloFactExportStore();
    //   }
    },

    async cargarListaFactExport () {
    //   let listaFactExports = [];
    //   let respuesta = await SerivicioFactExports.obtenerTodosFactExports();
    //   let riegos = await respuesta.data;
    //   riegos.forEach((f) => {
    //     listaFactExports.push(f);
    //   });
    //   this.listaFactExportStore = listaFactExports;
    },

    cerrarDialogNuevoFactExport() {
      this.dialogoMostrarFactExport = !this.dialogoMostrarFactExport; // Cierra el dialogNuevoFactExport
    //   this.$refs.componentFormFactExport.limpiarIds();
    //   this.vaciarModeloFactExportStore();
    },

    // ...mapMutations("moduloFactExport", ["vaciarModeloFactExportStore"]),
  },
};
</script>
