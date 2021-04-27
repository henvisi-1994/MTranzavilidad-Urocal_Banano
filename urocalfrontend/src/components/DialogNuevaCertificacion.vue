<template>
  <v-dialog
    v-model="dialogoNuevaCertificacion"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
    persistent
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="primary--text">
        <h5>
          Registrar nueva Certificacion
        </h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="primary--text" @click="cerrarDialogCertificacion()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar Certificacion -->
          <FormCertificacion ref="componentFormCertificacion"></FormCertificacion>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Certificacion -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          @click="guardarCertificacion()"
          >Registrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormCertificacion from "@/components/FormCertificacion";
import ServicioCertificaciones from '../services/ServicioCertificaciones';  // Interactuar con el Backend

export default {
  name: "DialogoNuevaCertificacion",

  components: {
    FormCertificacion
  },

  data() {
    return {
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoCertificacion
    // Obtiene y modifica el estado de la variable dialogNuevoCertificacion
    certificacion: {
      get() {
        return this.$store.getters["moduloCertificaciones/certificacion"];
      },
      set(v) {
        return this.$store.commit("moduloCertificaciones/nuevaCertificacion", v);
      },
    },
    dialogoNuevaCertificacion: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoNuevaCertificacion"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogoNuevaCertificacion", v);
      },
    },
    
     listaCertificacionStore: {
      get() {
        return this.$store.getters["moduloCertificaciones/listaCertificacionStore"];
      },
      set(v) {
        return this.$store.commit("moduloCertificaciones/establecerListaCertificacionStore", v);
      },
    },

    // Obtiene es estado de la variable formCertificacion y el modelo Certificacion
    ...mapState("moduloCertificacion", ["formCertificacionValido", "certificacion"]),
  },

  methods: {
    // #  MANIPULACIÓN DE DATOS  #
    async guardarCertificacion() { 
      try {
          let certificacion = this.$store.getters["moduloCertificaciones/certificacion"];
          let respuesta = await ServicioCertificaciones.agregarCertificacion(certificacion);
          this.$toast.success(respuesta.data.message);
          this.cerrarDialogCertificacion();
          this.cargarListaCertificacion();
      } catch (error) {
          this.$toast.error(error.response.data.message);
      }
    },

    async cargarListaCertificacion () { 
      let listaCertificacion = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioCertificaciones.obtenerTodosCertificaciones();  // Obtener respuesta de backend
      let datosCertificacion = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosCertificacion.forEach((certificacion) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaCertificacion.push(certificacion);
      });
      this.listaCertificacionStore = listaCertificacion;
    },

    ...mapMutations("moduloCertificacion", ["establecerListaCertificacionStore"]), 
    // Vacia el modelo Certificacion
    ...mapMutations("moduloCertificacion", ["vaciarCertificacion"]),

    cerrarDialogCertificacion() {
      this.dialogoNuevaCertificacion = !this.dialogoNuevaCertificacion; // Cierra el dialogNuevoCertificacion
      this.$refs.componentFormCertificacion.$refs.formCertificacion.resetValidation(); // Reinicia las validaciones del formCertificacion
      this.vaciarCertificacion(); // Vacia el modelo Certificacion
    },
  },
};
</script>
