<template>
  <v-dialog
    v-model="dialogNuevoRiego"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="primary white--text">
        <h5>Registrar riego</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogNuevoRiego()">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar Riego -->
          <FormRiego ref="componentFormRiego"></FormRiego>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Riego -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          color="primary"
          @click="agregarRiego()"
          >Registrar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormRiego from "@/components/FormRiego";
import SerivicioRiegos from '../services/SerivicioRiegos';

export default {
  name: "DialogNuevoRiego",

  components: {
    FormRiego,
  },

  data() {
    return {};
  },
  mounted(){

  },

  computed: {
    listaRiegoStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloRiego/listaRiegoStore"]));
      },
      set(v) {
        return this.$store.commit("moduloRiego/establecerListaRiegoStore", v);
      },
    },
    // Obtiene y modifica el estado de la variable dialogNuevoRiego
    dialogNuevoRiego: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoRiego"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoRiego", v);
      },
    },

    modeloRiegoStore: {
      get() {
        return this.$store.getters["moduloRiego/modeloRiegoStore"];
      },
      set(v) {
        return this.$store.commit("moduloPoda/establecerModeloRiegoStore", v);
      },
    },

    listaRiegosStore: {
      get() {
        return this.$store.getters["moduloPoda/listaRiegoStore"];
      },
      set(v) {
        return this.$store.commit("moduloPoda/establecerListaRiegoStore", v);
      },
    },
  

    // Obtiene es estado de la variable formRiegoValido y el modelo Riego
    ...mapState("moduloRiego", ["formRiegoValido"]),
  },

  methods: {
    async agregarRiego() {
      try{
      let respuesta = await SerivicioRiegos.agregarRiego(this.modeloRiegoStore);
      this.$toast.success(respuesta.data.message);
        this.cerrarDialogNuevoRiego();
        this.cargarListaRiego();
        this.vaciarModeloRiegoStore();
      }catch(error){
        this.$toast.error(error.response.data.message);
      }
      
    },

    async cargarListaRiego () {
      let listaRiegos = [];
      let respuesta = await SerivicioRiegos.obtenerTodosRiegos();
      let riegos = await respuesta.data;
      riegos.forEach((f) => {
        listaRiegos.push(f);
      });
      this.listaRiegoStore = listaRiegos;
    },

    cerrarDialogNuevoRiego() {
      this.dialogNuevoRiego = !this.dialogNuevoRiego; // Cierra el dialogNuevoRiego
      //this.$refs.componentFormRiego.limpiarIds();
      this.vaciarModeloRiegoStore();
    },

    ...mapMutations("moduloRiego", ["vaciarModeloRiegoStore"]),
  },
};
</script>
