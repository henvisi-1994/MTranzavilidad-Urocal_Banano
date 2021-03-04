<template>
  <v-dialog
    v-model="dialogNuevoFitosanitario"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="primary white--text">
        <h5>Registrar fitosanitario</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogNuevoFitosanitario()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar Fitosanitario -->
          <FormFitosanitario ref="componentFormFitosanitario"></FormFitosanitario>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Fitosanitario -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          color="primary"
          @click="agregarFitosanitario()"
          >Registrar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormFitosanitario from "@/components/FormFitosanitario";

import ServicioFitosanitarios from '../services/ServicioFitosanitarios';

export default {
  name: "DialogNuevoFitosanitario",

  components: {
    FormFitosanitario,
  },

  data() {
    return {};
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoFitosanitario
    dialogNuevoFitosanitario: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoFitosanitario"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoFitosanitario", v);
      },
    },

    modeloFitosanitarioStore: {
      get() {
        return this.$store.getters["moduloFitosanitario/modeloFitosanitarioStore"];
      },
      set(v) {
        return this.$store.commit("moduloFitosanitario/establecerModeloFitosanitariosStor", v);
      },
    },

    // Obtiene es estado de la variable formFitosanitarioValido y el modelo fitosanitario
    ...mapState("moduloFitosanitario", ["formFitosanitarioValido", "modeloFitosanitarioStore"]),
  },

  methods: {
    // Registra dependiendo el tab donde se encuentre
    async agregarFitosanitario() {
      let respuesta = await ServicioFitosanitarios.agregarFitosanitario(this.modeloFitosanitarioStore);
      if (respuesta.status == 201) {
        this.cerrarDialogNuevoFitosanitario();
        this.cargarListaFitosanitario();
        this.vaciarModeloFitosanitarioStore();
      }
    },

    async cargarListaFitosanitario () {
      let listaFitosanitarios = [];
      let respuesta = await ServicioFitosanitarios.obtenerTodosFitosanitarios();
      let fitosanitarios = await respuesta.data;
      fitosanitarios.forEach((f) => {
        listaFitosanitarios.push(f);
      });
      this.listaFitosanitariosStore = listaFitosanitarios;
    },

    cerrarDialogNuevoFitosanitario() {
      this.dialogNuevoFitosanitario = !this.dialogNuevoFitosanitario; // Cierra el dialogNuevoFitosanitario
    },

    ...mapMutations("moduloFitosanitario", ["vaciarModeloFitosanitarioStore"]),
  },
};
</script>
