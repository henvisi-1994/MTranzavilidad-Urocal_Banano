<template>
  <v-dialog
    v-model="dialogNuevoPoda"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="primary white--text">
        <h5>Registrar poda</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogNuevoPoda()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar Poda -->
          <FormPoda ref="componentFormPoda"></FormPoda>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Poda -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          color="primary"
          @click="agregarPoda()"
          >Registrar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormPoda from "@/components/FormPoda";

import ServicioPodas from "../services/ServicioPodas";

export default {
  name: "DialogNuevoPoda",

  components: {
    FormPoda,
  },

  data() {
    return {};
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoPoda
    dialogNuevoPoda: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoPoda"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoPoda", v);
      },
    },

    modeloPodaStore: {
      get() {
        return this.$store.getters["moduloPoda/modeloPodaStore"];
      },
      set(v) {
        return this.$store.commit("moduloPoda/establecerModeloPodaStore", v);
      },
    },

    // Obtiene es estado de la variable formPodaValido y el modelo poda
    ...mapState("moduloPoda", ["formPodaValido", "poda"]),
  },

  methods: {
    async agregarPoda() {
      try {
        let respuesta = await ServicioPodas.agregarPoda(this.modeloPodaStore);
          this.$toast.success(respuesta.data.message);
          this.cargarListaPoda();
          this.cerrarDialogNuevoPoda();
          // this.vaciarModeloPodaStore();
        
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    async cargarListaPoda() {
      let listaPodas = [];
      let respuesta = await ServicioPodas.obtenerTodosPodas();
      let podas = await respuesta.data;
      podas.forEach((f) => {
        listaPodas.push(f);
      });
      this.listaPodaStore = listaPodas;
    },

    cerrarDialogNuevoPoda() {
      this.dialogNuevoPoda = !this.dialogNuevoPoda; // Cierra el dialogNuevoPoda
      this.$refs.componentFormPoda.limpiarIds();
      this.vaciarModeloPodaStore();
    },

    ...mapMutations("moduloPoda", ["vaciarModeloPodaStore"]),
  },
};
</script>
