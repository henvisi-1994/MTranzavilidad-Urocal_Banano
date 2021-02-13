<template>
  <v-dialog
    v-model="dialogNuevoSitio"
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
          Registrar nueva Sitio
        </h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="primary--text" @click="cerrarDialogSitio()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar Sitio -->
          <FormSitio ref="componentFormSitio"></FormSitio>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Sitio -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          @click="guardarSitio()"
          >Registrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormSitio from "@/components/FormSitio";
import ServicioSitio from '../services/ServicioSitio';  // Interactuar con el Backend

export default {
  name: "DialogNuevoSitio",

  components: {
    FormSitio
  },

  data() {
    return {
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoSitio
    dialogNuevoSitio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoSitio"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoSitio", v);
      },
    },

    modeloSitioStore: {
      get() {
        return this.$store.getters["moduloSitio/sitio"];
      },
      set(v) {
        return this.$store.commit("moduloSitio/nuevoSitio", v);
      },
    },

    listaSitioStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloSitio/listaSitioStore"]));
      },
      set(v) {
        return this.$store.commit("moduloSitio/establecerListaSitioStore", v);
      },
    },

    // Obtiene es estado de la variable formSitio y el modelo Sitio
    ...mapState("moduloSitio", ["formSitioValido", "sitio"]),
  },

  methods: {
    // #  MANIPULACIÓN DE DATOS  #
    async guardarSitio() { 
       try {
          let respuesta = await ServicioSitio.agregarSitio(this.modeloSitioStore);
          this.$toast.success(respuesta.data.message);
          this.cerrarDialogSitio();
          this.cargarListaSitio();
        } catch (error) {
          this.$toast.error(error.response.data.message);
      }
    },

    async cargarListaSitio () { 
      let listaSitio = [];                                              // Limpiar la 'lista de datos'

      let respuesta = await ServicioSitio.obtenerTodosSitios();  // Obtener respuesta de backend
      let datosUsuario = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosUsuario.forEach((modeloSitioStore) => {                       // Guardar cada registro en la 'lista de datos' 
        listaSitio.push(modeloSitioStore);
      });

      this.listaSitioStore = listaSitio;
    },

    ...mapMutations("moduloSitio", ["establecerListaSitioStore"]), 
    // Vacia el modelo Sitio
    ...mapMutations("moduloSitio", ["vaciarSitio"]),

    cerrarDialogSitio() {
      this.dialogNuevoSitio = !this.dialogNuevoSitio; // Cierra el dialogNuevoSitio
      this.$refs.componentFormSitio.$refs.formSitio.resetValidation(); // Reinicia las validaciones del formSitio
      this.vaciarSitio(); // Vacia el modelo Sitio
    },
  },
};
</script>
