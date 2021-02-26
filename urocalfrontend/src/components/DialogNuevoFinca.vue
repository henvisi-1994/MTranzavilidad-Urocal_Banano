<template>
  <v-dialog
    v-model="dialogNuevoFinca"
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
          Registrar nuevo finca
        </h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="primary--text" @click="cerrarDialogFinca()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar Finca -->
          <FormFinca ref="componentFormFinca"></FormFinca>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Finca -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          @click="guardarFinca()"
          >Registrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormFinca from "@/components/FormFinca";
import ServicioFinca from '../services/ServicioFinca';


export default {
  name: "DialogNuevoFinca",

  components: {
    FormFinca
  },

  data() {
    return {
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoFinca
    dialogNuevoFinca: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoFinca"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoFinca", v);
      },
    },

    modeloFincaStore: {
      get() {
        return this.$store.getters["moduloFinca/finca"];
      },
      set(v) {
        return this.$store.commit("moduloFinca/nuevoFinca", v);
      },
    },

    listaFincaStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloFinca/listaFincaStore"]));
      },
      set(v) {
        return this.$store.commit("moduloFinca/establecerListaFincaStore", v);
      },
    },

    // Obtiene es estado de la variable formFinca y el modelo Finca
    ...mapState("moduloFinca", ["formFincaValido", "finca"]),
  },

  methods: {

    // #  MANIPULACIÓN DE DATOS  #
    async guardarFinca() { 
      try {
          let respuesta = await ServicioFinca.agregarFinca(this.modeloFincaStore);
          this.$toast.success(respuesta.data.message);
          this.cargarListaFinca();
          this.cerrarDialogFinca();
      } catch (error) {
          this.$toast.error(error.response.data.message);
      }   
    },

    async cargarListaFinca () { 
      let listaFinca = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioFinca.obtenerTodosFincas();  // Obtener respuesta de backend
      let datosFinca = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosFinca.forEach((finca) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaFinca.push(finca);
      });
      this.listaFincaStore = listaFinca;
    },

    ...mapMutations("moduloFinca", ["establecerListaFincaStore"]), 
    // Vacia el modelo Finca
    ...mapMutations("moduloFinca", ["vaciarFinca"]),

    cerrarDialogFinca() {
      this.dialogNuevoFinca = !this.dialogNuevoFinca; // Cierra el dialogNuevoFinca
      this.$refs.componentFormFinca.$refs.formFinca.resetValidation(); // Reinicia las validaciones del formFinca
      this.vaciarFinca(); // Vacia el modelo Finca
    },
  },
};
</script>
