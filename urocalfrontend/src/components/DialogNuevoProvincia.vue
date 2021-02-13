<template>
  <v-dialog
    v-model="dialogNuevoProvincia"
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
          Registrar nueva Provincia
        </h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="primary--text" @click="cerrarDialogProvincia()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar Provincia -->
          <FormProvincia ref="componentFormProvincia"></FormProvincia>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Provincia -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          @click="guardarProvincia()"
          >Registrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormProvincia from "@/components/FormProvincia";
import ServicioProvincia from '../services/ServicioProvincia';  // Interactuar con el Backend

export default {
  name: "DialogNuevoProvincia",

  components: {
    FormProvincia
  },

  data() {
    return {
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoProvincia
    dialogNuevoProvincia: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoProvincia"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoProvincia", v);
      },
    },

    modeloProvinciaStore: {
      get() {
        return this.$store.getters["moduloProvincia/provincia"];
      },
      set(v) {
        return this.$store.commit("moduloProvincia/nuevoProvincia", v);
      },
    },

    listaProvinciaStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloProvincia/listaProvinciaStore"]));
      },
      set(v) {
        return this.$store.commit("moduloProvincia/establecerListaProvinciaStore", v);
      },
    },

    // Obtiene es estado de la variable formProvincia y el modelo Provincia
    ...mapState("moduloProvincia", ["formProvinciaValido", "provincia"]),
  },

  methods: {

    // #  MANIPULACIÓN DE DATOS  #
    async guardarProvincia() { 
      try {
        let respuesta = await ServicioProvincia.agregarProvincia(this.modeloProvinciaStore);
        this.$toast.success(respuesta.data.message);
        this.cerrarDialogProvincia();
        this.cargarListaProvincia();
        } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    async cargarListaProvincia () { 
      let listaProvincia = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioProvincia.obtenerTodosProvincias();  // Obtener respuesta de backend
      let datosProvincia = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosProvincia.forEach((provincia) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaProvincia.push(provincia);
      });
      this.listaProvinciaStore = listaProvincia;
    },

    ...mapMutations("moduloProvincia", ["establecerListaProvinciaStore"]), 
    // Vacia el modelo Provincia
    ...mapMutations("moduloProvincia", ["vaciarProvincia"]),

    // Registra dependiendo el tab donde se encuentre

    cerrarDialogProvincia() {
      this.dialogNuevoProvincia = !this.dialogNuevoProvincia; // Cierra el dialogNuevoProvincia
      this.$refs.componentFormProvincia.$refs.formProvincia.resetValidation(); // Reinicia las validaciones del formProvincia
      this.vaciarProvincia(); // Vacia el modelo Provincia
    },
  },
};
</script>
