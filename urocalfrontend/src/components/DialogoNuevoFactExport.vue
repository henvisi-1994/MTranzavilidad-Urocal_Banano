<template>
  <v-dialog
    v-model="dialogoNuevoFactExport"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="primary white--text">
        <h5>Nueva Factura de Exportacion</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogNuevoFactExport()"
            >mdi-close</v-icon
          >
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
import serivicioFactExport from '../services/ServicioFacturaExportacion';

export default {
  name: "DialogoNuevaFactExport",

  components: {
    FormFactExport,
  },

  computed: {
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
    factExportaStore: {
      get() {
        return this.$store.getters["moduloFacturaExport/factExportaStore"];
      },
      set(v) {
        return this.$store.commit("moduloFacturaExport/establecerModeloFacturaStore", v);
      },
    },
    listaFacturaExportStore: {
      get() {
        return this.$store.getters["moduloFacturaExport/listaFacturaExportStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloFacturaExport/asignarListaFacturaExportStore",
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

    // // Obtiene es estado de la variable formFactExportValido y el modelo FactExport
    ...mapState("moduloFacturaExport", ["formFacturaExportValido","factExportaStore"]),
  },

  methods: {
    async agregarFactExport() {
     let resultado = this.listaFacturaExportStore.find(factura => factura.faclote===this.factExportaStore.faclote);
      if(typeof resultado === 'undefined'){
      let respuesta = await serivicioFactExport.agregarFacturaExport(this.factExportaStore);
        if (respuesta.status == 201) {
          this.cerrarDialogNuevoFactExport();
          this.cargarListaFactExport();
          this.vaciarFacturaExport();
          this.$toast.success(respuesta.data.message);
        }
      } else{
        this.$toast.error('Porfavor ingrese un  lote diferente');
      }

    },

    async cargarListaFactExport() {
         let respuesta = await serivicioFactExport.obtenerTodosFacturaExport();
         let facturas = await respuesta.data;
         this.$store.commit("moduloFacturaExport/vaciarLista", null);
         this.listaFactExportStore = facturas;
    },

    cerrarDialogNuevoFactExport() {
      this.dialogoNuevoFactExport = !this.dialogoNuevoFactExport; // Cierra el dialogNuevoFactExport
      //   this.$refs.componentFormFactExport.limpiarIds();
      //   this.vaciarModeloFactExportStore();
      this.vaciarFacturaExport();
    },

     ...mapMutations("moduloFacturaExport", ["vaciarFacturaExport"]),
  },
};
</script>
