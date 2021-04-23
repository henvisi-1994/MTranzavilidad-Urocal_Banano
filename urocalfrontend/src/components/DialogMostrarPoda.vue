<template>
  <v-dialog
    v-model="dialogMostrarPoda"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="primary white--text">
        <h5>Actualizar/eliminar</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="white--text" @click="cambiarEstadoEditar()"
            >mdi-pencil</v-icon
          >
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text" @click="eliminarRegistro()"
            >mdi-trash-can</v-icon
          >
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogMostrarPoda()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Poda -->
      <v-card-text style="padding: 0px">
        <v-container>
          <FormPoda ref="componentFormPoda"></FormPoda>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <v-btn
          :disabled="editarPoda"
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px"
          large
          elevation="0"
          color="primary"
          @click="actualizarRegistro()"
          >Guardar Cambios</v-btn
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
  name: "DialogMostrarPoda",

  components: {
    FormPoda,
  },

  data() {
    return {};
  },
  mounted() {},

  computed: {
    ...mapState("moduloPoda", ["modeloPodaStore"]),

    // Obtiene y modifica el estado de la variable dialogMostrarPoda
    dialogMostrarPoda: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarPoda"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarPoda", v);
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
    listaPodasStore: {
      get() {
        return this.$store.getters["moduloPoda/listaPodasStore"];
      },
      set(v) {
        return this.$store.commit("moduloPoda/establecerListaPodasStore", v);
      },
    },

    editarPoda: {
      get() {
        return this.$store.getters["moduloPoda/editarPoda"];
      },
      set(v) {
        return this.$store.commit("moduloPoda/establecerEditarPoda", v);
      },
    },
    listaTipoStore: {
      get() {
        return JSON.parse(
          JSON.stringify(this.$store.getters["moduloPoda/listaTipoStore"])
        );
      },
      set(v) {
        return this.$store.commit("moduloPoda/establecerlistaTipoStore", v);
      },
    },
  },

  methods: {
    // Cierra el dialogo
    async actualizarRegistro() {
      try {
        const respuesta = await ServicioPodas.actualizarPoda(
          this.modeloPodaStore.podaid,
          this.modeloPodaStore
        );
        this.$toast.success(respuesta.data.message);
        this.cargarListaPoda();
        this.cerrarDialogMostrarPoda();
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
      this.listaPodasStore = listaPodas;
    },

    async eliminarRegistro() {
      try {
        const respuesta = await ServicioPodas.eliminarPoda(
          this.modeloPodaStore.podaid
        );
        this.$toast.error(respuesta.data.message);
        this.cargarListaPoda();
        this.cerrarDialogMostrarPoda();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },
    // Cierra el dialogo
    cerrarDialogMostrarPoda() {
      this.dialogMostrarPoda = !this.dialogMostrarPoda;
      // this.$refs.componentFormPoda.limpiarIds();
      this.vaciarModeloPodaStore();
      this.cargarListaPoda();
      // this.$store.commit("moduloPoda/establecerEditarPoda", true);
    },

    // ...mapMutations("moduloPoda", ["vaciarModeloPodaStore"]),

    cambiarEstadoEditar() {
      this.$store.commit("moduloPoda/establecerEditarPoda", false);
    },

    formatDate(fecha) {
      if (!fecha) return null;

      const [year, month, day] = fecha.split("-");
      return `${day}/${month}/${year}`;
    },

    cerrarDialogMostrarPoda() {
      this.dialogMostrarPoda = !this.dialogMostrarPoda; // Cierra el dialogMostrarLimpiezaHerramienta
    },
  },
};
</script>
