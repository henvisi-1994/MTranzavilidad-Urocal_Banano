<template>
  <v-dialog
    v-model="dialogoNuevaEmpresa"
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
        <h5>Registrar nueva Empresa</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="primary--text" @click="cerrarDialogEmpresa()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar País -->
          <FormEmpresa ref="componentFormEmpresa"></FormEmpresa>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo País -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px"
          large
          elevation="0"
          color="primary"
          @click="guardarEmpresa()"
          >Registrar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormEmpresa from "@/components/FormEmpresa";
import servicioEmpresa from "../services/ServicioEmpresa";

export default {
  name: "DialogNuevoEmpresa",

  components: {
    FormEmpresa,
  },

  data() {
    return {};
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoEmpresa
    dialogoNuevaEmpresa: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoNuevaEmpresa"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogoNuevaEmpresa",
          v
        );
      },
    },
    listaEmpresaStore: {
      get() {
        return this.$store.getters["moduloEmpresa/listaEmpresaStore"];
      },
      set(v) {
        return this.$store.commit("moduloEmpresa/establecerListaEmpresaStore", v);
      },
    },
 modeloEmpresaStore: {
      get() {
        return this.$store.getters["moduloEmpresa/modeloEmpresaStore"];
      },
      set(v) {
        return this.$store.commit("moduloEmpresa/establecerModeloEmpresaStore", v);
      },
    },

    // listaEmpresaStore: {
    //   get() {
    //     return JSON.parse(JSON.stringify(this.$store.getters["moduloEmpresa/listaEmpresaStore"]));
    //   },
    //   set(v) {
    //     return this.$store.commit("moduloEmpresa/establecerListaEmpresaStore", v);
    //   },
    // },

    // // Obtiene es estado de la variable formEmpresa y el modelo Empresa
    // ...mapState("moduloEmpresa", ["formEmpresaValido", "Empresa"]),
  },

  methods: {
    // #  MANIPULACIÓN DE DATOS  #
    async guardarEmpresa() {
        try {
            let respuesta = await servicioEmpresa.agregarEmpresa(this.modeloEmpresaStore);
            this.$toast.success(respuesta.data.message);
            this.cerrarDialogEmpresa();
            this.cargarListaEmpresa();
          } catch (error) {
            this.$toast.error(error.response.data.message);
        }
    },

    async cargarListaEmpresa() {
      let resultado = await servicioEmpresa.obtenerTodosEmpresa();
        this.listaEmpresaStore = resultado.data;
    },

    // ...mapMutations("moduloEmpresa", ["establecerListaEmpresaStore"]),
    // // Vacia el modelo Empresa
    ...mapMutations("moduloEmpresa", ["vaciarModeloEmpresa"]),

    cerrarDialogEmpresa() {
      this.dialogoNuevaEmpresa = !this.dialogoNuevaEmpresa; // Cierra el dialogNuevoEmpresa
      //   this.$refs.componentFormEmpresa.$refs.formEmpresa.resetValidation(); // Reinicia las validaciones del formEmpresa
      this.vaciarModeloEmpresa(); // Vacia el modelo Empresa
    },
  },
};
</script>
