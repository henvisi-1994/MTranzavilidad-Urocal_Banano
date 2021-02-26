<template>
  <v-dialog
    v-model="dialogNuevoLimpiezaHerramienta"
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
          Registrar nuevo limpieza herramienta
        </h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="primary--text" @click="cerrarDialogLimpiezaHerramienta()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar LimpiezaHerramienta -->
          <FormLimpiezaHerramienta ref="componentFormLimpiezaHerramienta"></FormLimpiezaHerramienta>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo LimpiezaHerramienta -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          @click="guardarLimpiezaHerramienta()"
          >Registrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormLimpiezaHerramienta from "@/components/FormLimpiezaHerramienta";
import ServicioLimpiezaHerramienta from '../services/ServicioLimpiezaHerramienta';

export default {
  name: "DialogNuevoLimpiezaHerramienta",

  components: {
    FormLimpiezaHerramienta
  },

  data() {
    return {
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoLimpiezaHerramienta
    dialogNuevoLimpiezaHerramienta: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoLimpiezaHerramienta"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoLimpiezaHerramienta", v);
      },
    },
    
    modeloLimpiezaHerramientaStore: {
      get() {
        return this.$store.getters["moduloLimpiezaHerramienta/limpiezaHerramienta"];
      },
      set(v) {
        return this.$store.commit("moduloLimpiezaHerramienta/nuevoLimpiezaHerramienta", v);
      },
    },

    listaLimpiezaHerramientaStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloLimpiezaHerramienta/listaLimpiezaHerramientaStore"]));
      },
      set(v) {
        return this.$store.commit("moduloLimpiezaHerramienta/establecerListaLimpiezaHerramientaStore", v);
      },
    },
      
    // Obtiene es estado de la variable formLimpiezaHerramientaValido y el modelo LimpiezaHerramienta
    ...mapState("moduloLimpiezaHerramienta", ["formLimpiezaHerramientaValido", "limpiezaHerramienta"]),
  },

  methods: {

    // #  MANIPULACIÓN DE DATOS  #
    async guardarLimpiezaHerramienta() { 
      //console.log(this.modeloLimpiezaHerramientaStore)
      try {
        let respuesta = await ServicioLimpiezaHerramienta.agregarLimpiezaHerramienta(this.modeloLimpiezaHerramientaStore);  
        this.$toast.success(respuesta.data.message);
        this.cargarListaLimpiezaHerramienta();
        this.cerrarDialogLimpiezaHerramienta();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    // #  MANIPULACIÓN DE DATOS  #
    async cargarListaLimpiezaHerramienta () { 
      let listaLimpiezaHerramienta = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioLimpiezaHerramienta.obtenerTodosLimpiezaHerramienta();  // Obtener respuesta de backend
      let datosLimpiezaHerramienta = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosLimpiezaHerramienta.forEach((LimpiezaHerramienta) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaLimpiezaHerramienta.push(LimpiezaHerramienta);
      });
      this.listaLimpiezaHerramientaStore = listaLimpiezaHerramienta;
      console.log(this.listaLimpiezaHerramientaStore)
    },

    ...mapMutations("moduloLimpiezaHerramienta", ["establecerListaLimpiezaHerramientaStore"]), 
    // Vacia el modelo LimpiezaHerramienta
    ...mapMutations("moduloLimpiezaHerramienta", ["vaciarLimpiezaHerramienta"]),

    cerrarDialogLimpiezaHerramienta() {
      this.dialogNuevoLimpiezaHerramienta = !this.dialogNuevoLimpiezaHerramienta; // Cierra el dialogNuevoLimpiezaHerramienta
      this.$refs.componentFormLimpiezaHerramienta.$refs.formLimpiezaHerramienta.resetValidation(); // Reinicia las validaciones del formLimpiezaHerramienta
      this.vaciarLimpiezaHerramienta(); // Vacia el modelo LimpiezaHerramienta
    },
  },
};
</script>
