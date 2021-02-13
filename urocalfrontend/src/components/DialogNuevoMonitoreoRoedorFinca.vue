<template>
  <v-dialog
    v-model="dialogNuevoMonitoreoRoedorFinca"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
    persistent
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="white primary--text">
        <h5>
          Registrar nuevo monitoreo roedor
        </h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="primary--text" @click="cerrarNuevoMonitoreoRoedorFinca()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar MonitoreoRoedorFinca -->
          <FormMonitoreoRoedorFinca ref="componentFormMonitoreoRoedorFinca"></FormMonitoreoRoedorFinca>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo MonitoreoRoedorFinca -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          @click="guardarMonitoreoRoedorFinca()"
          >Registrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormMonitoreoRoedorFinca from "@/components/FormMonitoreoRoedorFinca";
import ServicioMonitoreoRoedorFinca from '../services/ServicioMonitoreoRoedorFinca';

export default {
  name: "DialogNuevoMonitoreoRoedorFinca",

  components: {
    FormMonitoreoRoedorFinca
  },

  data() {
    return {
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable DialogNuevoMonitoreoRoedorFinca
    dialogNuevoMonitoreoRoedorFinca: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoMonitoreoRoedorFinca"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoMonitoreoRoedorFinca", v);
      },
    },

    listaMonitoreoRoedorFincaStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloMonitoreoRoedorFinca/listaMonitoreoRoedorFincaStore"]));
      },
      set(v) {
        return this.$store.commit("moduloMonitoreoRoedorFinca/establecerListaMonitoreoRoedorFincaStore", v);
      },
    },

    modeloMonitoreoRoedorFincaStore: {
      get() {
        return this.$store.getters["moduloMonitoreoRoedorFinca/monitoreoRoedorFinca"];
      },
      set(v) {
        return this.$store.commit("moduloMonitoreoRoedorFinca/nuevoMonitoreoRoedorFinca", v);
      },
    },
    // Obtiene es estado de la variable validFormMonitoreoRoedorFinca y el modelo MonitoreoRoedoFinca
    ...mapState("moduloMonitoreoRoedorFinca", ["formMonitoreoRoedorFincaValido", "monitoreoRoedorFinca"]),
  },

  methods: {

    // #  MANIPULACIÓN DE DATOS  #
    async guardarMonitoreoRoedorFinca() { 
      try {
          let respuesta = await ServicioMonitoreoRoedorFinca.agregarMonitoreoRoedorFinca(this.modeloMonitoreoRoedorFincaStore);
          this.$toast.success(respuesta.data.message);
          this.cargarListaMonitoreoRoedorFinca();
          this.cerrarNuevoMonitoreoRoedorFinca();
        } catch (error) {
          this.$toast.error(error.response.data.message);
      }
    },

    // #  MANIPULACIÓN DE DATOS  #
    async cargarListaMonitoreoRoedorFinca () { 
      let listaMonitoreoRoedorFinca = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioMonitoreoRoedorFinca.obtenerTodosMonitoreoRoedorFinca();  // Obtener respuesta de backend
      let datosMonitoreoRoedorFinca = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosMonitoreoRoedorFinca.forEach((MonitoreoRoedorFinca) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaMonitoreoRoedorFinca.push(MonitoreoRoedorFinca);
      });
      this.listaMonitoreoRoedorFincaStore = listaMonitoreoRoedorFinca;
    },

    ...mapMutations("moduloMonitoreoRoedorFinca", ["establecerListaMonitoreoRoedorFincaStore"]), 
    // Vacia el modelo MonitoreoRoedorFinca
    ...mapMutations("moduloMonitoreoRoedorFinca", ["vaciarMonitoreoRoedorFinca"]),

    cerrarNuevoMonitoreoRoedorFinca() {
      this.dialogNuevoMonitoreoRoedorFinca = !this.dialogNuevoMonitoreoRoedorFinca; // Cierra el dialogNuevoMonitoreoRoedorFinca
      this.$refs.componentFormMonitoreoRoedorFinca.$refs.formMonitoreoRoedorFinca.resetValidation(); // Reinicia las validaciones del formMonitoreoRoedorFinca
      this.vaciarMonitoreoRoedorFinca(); // Vacia el modelo MonitoreoRoedorFinca
    },
  },
};
</script>
