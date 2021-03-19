<template>
  <v-dialog
    v-model="dialogNuevoGuiaRemision"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0">
      <v-card-title class="white primary--text">
        <h5>Registrar Guia</h5>
        <v-spacer></v-spacer>
        <v-btn icon @click="cerrarDialogNuevoGuiaRemision()">
          <v-icon class="primary--text">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <FormGuiaRemision ref="componentFormGuiaRemision" />
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px"
          large
          elevation="0"
          color="primary"
          @click="agregarGuiaRemision()"
          >Registrar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import {mapMutations, mapState} from 'vuex';

import FormGuiaRemision from "@/components/FormGuiaRemision";
import ServicioGuiaRemision from '../services/ServicioGuiaRemision';

export default {
  name: "DialogNuevoGuiaRemision",

  components: {
    FormGuiaRemision
  },

  computed: {
    //...mapState("moduloGuiaRemision", ["modeloGuiaRemisionStore"]),
    ...mapState('moduloGuiaRemision', ["modeloGuiaRemisionStore",'listaGuiaRemisionStore']),

    dialogNuevoGuiaRemision: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoGuiaRemision"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoGuiaRemision", v);
      },
    },

    modeloGuiaRemisionStore: {
       get() {
        return this.$store.getters["moduloGuiaRemision/modeloGuiaRemisionStore"];
       },
      set(v) {
         return this.$store.commit("moduloGuiaRemision/establecerModeloGuiaRemisionStore", v);
       },
     },
  },

  methods: {
    ...mapMutations("moduloGuiaRemision", ["vaciarGuiaRemision"]),

    async agregarGuiaRemision(){
      let respuesta = await ServicioGuiaRemision.agregarGuiaRemision(this.modeloGuiaRemisionStore);
      if (respuesta.status == 201) {
        this.cerrarDialogNuevoGuiaRemision();
        this.cargarListaGuiaRemision();
         this.vaciarGuiaRemision();
      }
    },

    async cargarListaGuiaRemision () {
    listaGuiaRemision = [];
     guiasRemision.forEach((f) => {
        listaGuiaRemision.push(f);
      });
      this.listaGuiaRemisionStore = listaGuiaRemision; 
    },

    cerrarDialogNuevoGuiaRemision() {
      this.dialogNuevoGuiaRemision = !this.dialogNuevoGuiaRemision;
      this.vaciarGuiaRemision();
      this.$refs.componentFormGuiaRemision.$refs.formGuiaRemision.resetValidation();
      this.$refs.componentFormGuiaRemision.vaciarBien();
    },
  },
}
</script>

<style>

</style>