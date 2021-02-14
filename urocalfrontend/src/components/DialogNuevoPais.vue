<template>
  <v-dialog
    v-model="dialogNuevoPais"
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
          Registrar nueva País
        </h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="primary--text" @click="cerrarDialogPais()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar País -->
          <FormPais ref="componentFormPais"></FormPais>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo País -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          @click="guardarPais()"
          >Registrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormPais from "@/components/FormPais";
import ServicioPais from '../services/ServicioPais';

export default {
  name: "DialogNuevoPais",

  components: {
    FormPais
  },

  data() {
    return {
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoPais
    dialogNuevoPais: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoPais"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoPais", v);
      },
    },

    modeloPaisStore: {
      get() {
        return this.$store.getters["moduloPais/pais"];
      },
      set(v) {
        return this.$store.commit("moduloPais/nuevoPais", v);
      },
    },

    listaPaisStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloPais/listaPaisStore"]));
      },
      set(v) {
        return this.$store.commit("moduloPais/establecerListaPaisStore", v);
      },
    },

    // Obtiene es estado de la variable formPais y el modelo Pais
    ...mapState("moduloPais", ["formPaisValido", "pais"]),
  },

  methods: {
    // #  MANIPULACIÓN DE DATOS  #
    async guardarPais() { 
      try {
          let respuesta = await ServicioPais.agregarPais(this.modeloPaisStore);
          this.$toast.success(respuesta.data.message);
          this.cerrarDialogPais();
          this.cargarListaPais();
        } catch (error) {
          this.$toast.error(error.response.data.message);
      }
    },

    async cargarListaPais () { 
      let listaPais = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioPais.obtenerTodosPaises();  // Obtener respuesta de backend
      let datosPais = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosPais.forEach((pais) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaPais.push(pais);
      });
      this.listaPaisStore = listaPais;
    },

    ...mapMutations("moduloPais", ["establecerListaPaisStore"]), 
    // Vacia el modelo Pais
    ...mapMutations("moduloPais", ["vaciarPais"]),

    cerrarDialogPais() {
      this.dialogNuevoPais = !this.dialogNuevoPais; // Cierra el dialogNuevoPais
      this.$refs.componentFormPais.$refs.formPais.resetValidation(); // Reinicia las validaciones del formPais
      this.vaciarPais(); // Vacia el modelo Paí
    },
  },
};
</script>
