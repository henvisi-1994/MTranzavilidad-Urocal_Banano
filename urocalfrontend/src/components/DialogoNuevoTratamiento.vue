<template>
  <v-dialog
    v-model="dialogoNuevoTratamiento"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="primary white--text">
        <h5>Registrar Fermentación y Secado</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogNuevoTratamiento()">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar Tratamiento -->
          <FormTratamiento ref="componentFormTratamiento"></FormTratamiento>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Tratamiento -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          color="primary"
          @click="agregarTratamiento()"
          >Registrar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormTratamiento from "@/components/FormTratamiento";
import ServicioTratamiento from '../services/ServicioTratamiento';

export default {
  name: "DialogNuevoTratamiento",

  components: {
    FormTratamiento,
  },

  computed: {

       // Obtiene y modifica el estado de la variable dialogoNuevaTratamiento
    dialogoNuevoTratamiento: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoNuevoTratamiento"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogoNuevoTratamiento", v);
      },
    },

    modeloTratamientoStore: {
      get() {
        return this.$store.getters["moduloTratamiento/modeloTratamientoStore"];
      },
      set(v) {
        return this.$store.commit("moduloTratamiento/establecerModeloTratamientoStore", v);
      },
    },

    // Obtiene es estado de la variable formTratamientoValido y el modelo Tratamiento
    ...mapState("moduloTratamiento", ["formTratamientoValido", "modeloTratamientoStore"]),
  },

  methods: {
    async agregarTratamiento() {
      let productor = JSON.parse(localStorage.getItem('productor'));
      this.modeloTratamientoStore.productorid = productor.productorid
     let respuesta = await ServicioTratamiento.agregarTratamiento(this.modeloTratamientoStore);
      if (respuesta.status == 201) {
        this.cerrarDialogNuevoTratamiento();
        this.cargarListaTratamiento();
        this.vaciarModeloTratamientoStore();
      }
    },

    async cargarListaTratamiento () {
      let listaTratamientos = [];
      let respuesta = await ServicioTratamiento.obtenerTodosTratamiento();
      let riegos = await respuesta.data;
      riegos.forEach((f) => {
        listaTratamientos.push(f);
      });
      this.listaTratamientoStore = listaTratamientos;
    },


    cerrarDialogNuevoTratamiento() {
      this.dialogoNuevoTratamiento = !this.dialogoNuevoTratamiento; // Cierra el dialogNuevoTratamiento
      this.vaciarModeloTratamientoStore();
    },

    ...mapMutations("moduloTratamiento", ["vaciarModeloTratamientoStore"]),
  },
};
</script>
