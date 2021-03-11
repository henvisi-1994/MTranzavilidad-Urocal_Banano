<template>
  <v-dialog
    v-model="dialogNuevoFertilizante"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="primary white--text">
        <h5>Registrar fertilizante</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogNuevoFertilizante()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar Fertilizante -->
          <FormFertilizante ref="componentFormFertilizante"></FormFertilizante>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Fertilizante -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          color="primary"
          @click="agregarFertilizante()"
          >Registrar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormFertilizante from "@/components/FormFertilizante";

import ServicioFertilizantes from '../services/ServicioFertilizantes';

export default {
  name: "DialogNuevoFertilizante",

  components: {
    FormFertilizante,
  },

  data() {
    return {};
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoFertilizante
    dialogNuevoFertilizante: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoFertilizante"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoFertilizante", v);
      },
    },

    modeloFertilizanteStore: {
      get() {
        return this.$store.getters["moduloFertilizante/modeloFertilizanteStore"];
      },
      set(v) {
        return this.$store.commit("moduloFertilizante/establecerModeloFertilizanteStore", v);
      },
    },

    // Obtiene es estado de la variable formFertilizanteValido y el modelo fertilizante
    ...mapState("moduloFertilizante", ["formFertilizanteValido", "modeloFertilizanteStore"]),
  },

  methods: {
    async agregarFertilizante() {
      let respuesta = await ServicioFertilizantes.agregarFertilizante(this.modeloFertilizanteStore);
      if (respuesta.status == 201) {
        this.cerrarDialogNuevoFertilizante();
        this.cargarListaFertilizante();
        this.vaciarModeloFertilizanteStore();
      }
    },

     
    async cargarListaFertilizante () {
      let respuesta = await ServicioFertilizantes.obtenerTodosFertilizantes();
      let fertilizantes = await respuesta.data;
      this.$store.commit("moduloFertilizante/vaciarLista",null);
        fertilizantes.forEach((f) => {
          this.$store.commit("moduloFertilizante/updateListaFertilizacion",f);
        });
    },

    cerrarDialogNuevoFertilizante() {
      this.dialogNuevoFertilizante = !this.dialogNuevoFertilizante;
    },

    ...mapMutations("moduloFertilizante", ["vaciarModeloFertilizanteStore"]),
  },
};
</script>
