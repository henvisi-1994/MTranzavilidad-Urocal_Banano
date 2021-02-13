<template>
  <v-dialog
    v-model="dialogNuevoCiudad"
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
          Registrar nueva Ciudad
        </h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="primary--text" @click="cerrarDialogCiudad()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar Ciudad -->
          <FormCiudad ref="componentFormCiudad"></FormCiudad>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Ciudad -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          @click="guardarCiudad()"
          >Registrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormCiudad from "@/components/FormCiudad";
import ServicioCiudad from '../services/ServicioCiudad';  // Interactuar con el Backend

export default {
  name: "DialogNuevoCiudad",

  components: {
    FormCiudad
  },

  data() {
    return {
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoCiudad
    dialogNuevoCiudad: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoCiudad"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoCiudad", v);
      },
    },

    modeloCiudadStore: {
      get() {
        return this.$store.getters["moduloCiudad/ciudad"];
      },
      set(v) {
        return this.$store.commit("moduloCiudad/nuevoCiudad", v);
      },
    },

    listaCiudadStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloCiudad/listaCiudadStore"]));
      },
      set(v) {
        return this.$store.commit("moduloCiudad/establecerListaCiudadStore", v);
      },
    },

    // Obtiene es estado de la variable formCiudad y el modelo Ciudad
    ...mapState("moduloCiudad", ["formCiudadValido", "ciudad"]),
  },

  methods: {
    // #  MANIPULACIÓN DE DATOS  #
    async guardarCiudad() { 
      try {
          let respuesta = await ServicioCiudad.agregarCiudad(this.modeloCiudadStore);
          this.$toast.success(respuesta.data.message);
          this.cerrarDialogCiudad();
          this.cargarListaCiudad();
      } catch (error) {
          this.$toast.error(error.response.data.message);
      }
    },

    async cargarListaCiudad () { 
      let listaCiudad = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioCiudad.obtenerTodosCiudades();  // Obtener respuesta de backend
      let datosCiudad = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosCiudad.forEach((ciudad) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaCiudad.push(ciudad);
      });
      this.listaCiudadStore = listaCiudad;
    },

    ...mapMutations("moduloCiudad", ["establecerListaCiudadStore"]), 
    // Vacia el modelo Ciudad
    ...mapMutations("moduloCiudad", ["vaciarCiudad"]),

    cerrarDialogCiudad() {
      this.dialogNuevoCiudad = !this.dialogNuevoCiudad; // Cierra el dialogNuevoCiudad
      this.$refs.componentFormCiudad.$refs.formCiudad.resetValidation(); // Reinicia las validaciones del formCiudad
      this.vaciarCiudad(); // Vacia el modelo Ciudad
    },
  },
};
</script>
