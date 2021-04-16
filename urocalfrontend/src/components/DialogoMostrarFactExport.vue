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
        <h5>Actualizar / Eliminar Factura de Exportacion</h5>
        <v-spacer></v-spacer>
         <v-btn icon >
          <v-icon class="white--text" @click="bloquearFacturaExport = !bloquearFacturaExport">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text" @click="eliminarRegistro()">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogMostrarFacturaExport()">mdi-close</v-icon>
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
          @click="actualizarRegistro()"
          >Guardar Cambios</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

 import FormFactExport from "@/components/FormFactExport";
 import SerivicioFactExport from '../services/ServicioFacturaExportacion';

export default {
  name: "DialogoMostrarFactExport",

  components: {
     FormFactExport,
  },

  computed: {
    ...mapState("moduloFacturaExport", ["formFactExportValido", "factExportaStore","editarFacturaExport"]),
    
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

    factExportaStore: {
      get() {
        return this.$store.getters["moduloFacturaExport/factExportaStore"];
      },
      set(v) {
        return this.$store.commit("moduloFacturaExport/establecerModeloFacturaExportStore", v);
      },
    },
    editarFacturaExport: {
      get() {
        return this.$store.getters["moduloFacturaExport/editarFacturaExport"];
      },
      set(v) {
        return this.$store.commit("moduloFacturaExport/establecerEditarFacturaExport", v);
      },
    },

    listaFacturaExportStore:{
      get(){
        return this.$store.getters["moduloFacturaExport/listaFacturaExportStore"];
      },
      set(v){
        return this.$store.commit("moduloFacturaExport/asignarListaFacturaExportStore", v);
      }
    },
    bloquearFacturaExport: {
      get() {
        return this.$store.getters["moduloFacturaExport/bloquearFacturaExport"];
      },
      set(v) {
        return this.$store.commit("moduloFacturaExport/cambiarEstadoBloquearFacturaExport", v);
      },
    },
  },

  methods: {
    async actualizarRegistro(){
      let respuesta = SerivicioFactExport.actualizarFacturaExport(this.factExportaStore);
       if(respuesta.status == 200){
         this.cerrarDialogMostrarFacturaExport();
         this.cargarListaFactExport();
         this.vaciarFacturaExport();         
         //this.$toast.success(respuesta.data.message);
       }
      
    },
    cerrarDialogMostrarFacturaExport() {
      this.dialogoMostrarFactExport = !this.dialogoMostrarFactExport;
      this.vaciarFacturaExport();
    },
    async cargarListaFactExport () {
       let listaFactExports = [];
       let respuesta = await SerivicioFactExport.obtenerTodosFacturaExport();
       let riegos = await respuesta.data;
       this.$store.commit("moduloFacturaExport/vaciarLista", null);
       riegos.forEach((f) => {
         listaFactExports.push(f);
       });
       this.listaFactExportStore = listaFactExports;
    },
    async eliminarRegistro() {
      const respuesta = await SerivicioFactExport.eliminarFacturaExport(this.factExportaStore.facturaexportacionid);
      if (respuesta.status == 200) {
        this.cerrarDialogMostrarFacturaExport();
        this.cargarListaFactExport();
      } 
    },

    ...mapMutations("moduloFacturaExport", ["vaciarFacturaExport"]),
  },
};
</script>
