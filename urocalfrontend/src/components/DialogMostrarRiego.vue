<template>
  <v-dialog
    v-model="dialogMostrarRiego"
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
        <v-btn icon >
          <v-icon class="white--text" @click="editarRiego = !editarRiego">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text" @click="eliminarRegistro()"
          >mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogMostrarRiego()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Riego -->
      <v-card-text style="padding: 0px">
        <v-container>
          <FormRiego ref="componentFormRiego"></FormRiego>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn 
          color="primary" 
          large 
          :block="$vuetify.breakpoint.xs ? true : false" @click="actualizarRegistro()"
          width="250px">
          Guardar cambios
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormRiego from "@/components/FormRiego";
import SerivicioRiegos from '../services/SerivicioRiegos';

export default {
  name: "DialogMostrarRiego",

  components: {
    FormRiego,
  },

  data() {
    return {};
  },
  mounted(){

  },

  computed: {
    ...mapState("moduloRiego", [, "modeloRiegoStore"]),
    
    dialogMostrarRiego: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarRiego"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarRiego", v);
      },
    },

    modeloRiegoStore: {
      get() {
        return this.$store.getters["moduloRiego/modeloRiegoStore"];
      },
      set(v) {
        return this.$store.commit("moduloRiego/establecerModeloRiegoStore", v);
      },
    },

    listaRiegoStore: {
      get() {
        return this.$store.getters["moduloRiego/listaRiegoStore"];
      },
      set(v) {
        return this.$store.commit("moduloRiego/establecerListaRiegoStore", v);
      },
    },

    editarRiego: {
      get() {
        return this.$store.getters["moduloRiego/editarRiego"];
      },
      set(v) {
        return this.$store.commit("moduloRiego/establecerEditarRiego", v);
      },
    },

    listaTipoStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloRiego/listaTipoStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloRiego/establecerlistaTipoStore",
          v
        );
      },
    },

  },

  methods: {
    async actualizarRegistro () {
      try{
      const respuesta = await SerivicioRiegos.actualizarRiego(
            this.modeloRiegoStore.riegoid,
             this.modeloRiegoStore);
        this.$toast.success(respuesta.data.message);
        this.cargarListaRiego();
        this.cerrarDialogMostrarRiego();
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

    async eliminarRegistro() {
      try{
      const respuesta = await SerivicioRiegos.eliminarRiego(
          this.modeloRiegoStore.riegoid);
      
        this.cargarListaRiego();
        this.cerrarDialogMostrarRiego();
      }catch(error){
        this.$toast.error(error.response.data.message);
      } 
    },
    // Cierra el dialogo
    cerrarDialogMostrarRiego() {
      this.dialogMostrarRiego = !this.dialogMostrarRiego;
      this.vaciarModeloRiegoStore();
      this.cargarListaRiego();
    },

    cambiarEstadoEditar() {
      this.$store.commit("moduloRiego/establecerEditarRiego", false);
    },
    
    ...mapMutations("moduloRiego", ["vaciarModeloRiegoStore"]),
  },
};
</script>
