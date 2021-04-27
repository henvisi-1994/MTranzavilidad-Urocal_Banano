<template>
  <v-dialog
    v-model="dialogoMostrarEmpresa"
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
          <v-icon class="white--text" @click="desbloquear()">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text" @click="eliminarRegistro()"
            >mdi-trash-can</v-icon
          >
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogMostrarEmpresa()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Empresa -->
      <v-card-text style="padding: 0px">
        <v-container>
          <FormEmpresa ref="componentFormEmpresa"></FormEmpresa>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          color="primary"
          large
          :block="$vuetify.breakpoint.xs ? true : false"
          @click="actualizarRegistro()"
          width="250px"
        >
          Guardar cambios
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormEmpresa from "@/components/FormEmpresa";
import servicioEmpresa from "../services/ServicioEmpresa";

export default {
  name: "DialogMostrarEmpresa",

  components: {
    FormEmpresa,
  },

  data() {
    return {};
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogMostrarEmpresa
    dialogoMostrarEmpresa: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoMostrarEmpresa"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit(
          "gestionDialogos/toggleDialogoMostrarEmpresa",
          v
        );
      },
    },

    listaEmpresaStore: {
      get() {
        return this.$store.getters["moduloEmpresa/listaEmpresaStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloEmpresa/establecerListaEmpresaStore",
          v
        );
      },
    },
    modeloEmpresaStore: {
      get() {
        return this.$store.getters["moduloEmpresa/modeloEmpresaStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloEmpresa/establecerModeloEmpresaStore",
          v
        );
      },
    },
    // Obtiene la variable bloquearCamposFormEmpresa
    bloquearEmpresa: {
      get() {
        return this.$store.getters["moduloEmpresa/bloquearEmpresa"];
      },
      set(v) {
        return this.$store.commit(
          "moduloEmpresa/cambiarBloquearCamposFormEmpresa",
          v
        );
      },
    },
    ...mapState("moduloEmpresa", ["formEmpresaValido"]),
  },

  methods: {
    async actualizarRegistro() {
      const respuesta = await servicioEmpresa.actualizarEmpresa(
        this.modeloEmpresaStore.empresaid,
        this.modeloEmpresaStore
      );
      if (respuesta.status == 200) {
        this.cerrarDialogMostrarEmpresa();
        this.cargarListaEmpresa();
        this.vaciarModeloEmpresaStore();
      }
    },

    async cargarListaEmpresa() {
      let resultado = await servicioEmpresa.obtenerTodosEmpresa();
      this.listaEmpresaStore = resultado.data;
    },

    async eliminarRegistro() {
      const respuesta = await servicioEmpresa.eliminarEmpresa(
        this.modeloEmpresaStore.empresaid
      );
      if (respuesta.status == 200) {
        this.cerrarDialogMostrarEmpresa();
        this.cargarListaEmpresa();
      }
    },

    cerrarDialogMostrarEmpresa() {
      this.dialogoMostrarEmpresa = !this.dialogoMostrarEmpresa;
    },
    desbloquear() {
      this.$store.commit("moduloEmpresa/cambiarEstadoBloquearEmpresa", false);
    },
    ...mapMutations("moduloEmpresa", ["vaciarModeloEmpresaStore"]),
  },
};
</script>
