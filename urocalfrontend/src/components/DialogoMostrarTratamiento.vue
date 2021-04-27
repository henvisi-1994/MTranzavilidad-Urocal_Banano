<template>
  <v-dialog
    v-model="dialogoMostrarTratamiento"
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
          <v-icon class="white--text" @click="editarTratamiento = !editarTratamiento">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text" @click="eliminarRegistro()">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogMostrarTratamiento()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Tratamiento -->
      <v-card-text style="padding: 0px">
        <v-container>
          <FormTratamiento ref="componentFormTratamiento"></FormTratamiento>
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

import FormTratamiento from "@/components/FormTratamiento";
import ServicioTratamiento from '../services/ServicioTratamiento';

export default {
  name: "DialogMostrarTratamiento",

  components: {
    FormTratamiento,
  },

  computed: {
    ...mapState("moduloTratamiento", [, "modeloTratamientoStore", "editarTratamiento"]),
    
    // Obtiene y modifica el estado de la variable dialogoMostrarTratamiento
    dialogoMostrarTratamiento: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoMostrarTratamiento"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogoMostrarTratamiento", v);
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

    editarTratamiento: {
      get() {
        return this.$store.getters["moduloTratamiento/editarTratamiento"];
      },
      set(v) {
        return this.$store.commit("moduloTratamiento/establecerEditarTratamiento", v);
      },
    },

    listaTratamientoStore:{
      get(){
        return this.$store.getters["moduloTratamiento/listaTratamientoStore"];
      },
      set(v){
        return this.$store.commit("moduloTratamiento/asignarListaTratamientoStore", v);
      }
    }
  },

  methods: {
    async actualizarRegistro () {
      const respuesta = await ServicioTratamiento.actualizarTratamiento(this.modeloTratamientoStore);
      if (respuesta.status == 200) {
        this.$toast.success(respuesta.data.message);
        this.cerrarDialogMostrarTratamiento();
        this.cargarListaTratamiento();
        this.vaciarModeloTratamientoStore();
      }
    },

    async cargarListaTratamiento () {
      let listaTratamientos = [];
      let respuesta = await ServicioTratamiento.obtenerTodosTratamiento();
      let riegos = await respuesta.data;
      this.$store.commit("moduloTratamiento/vaciarLista", null);
      riegos.forEach((f) => {
        listaTratamientos.push(f);
      });
      this.listaTratamientoStore = listaTratamientos;
    },

    async eliminarRegistro() {
      const respuesta = await ServicioTratamiento.eliminarTratamiento(this.modeloTratamientoStore.tratamientoid);
      if (respuesta.status == 200) {
        this.$toast.warning(respuesta.data.message);
        this.cerrarDialogMostrarTratamiento();
        this.cargarListaTratamiento();
      } 
    },
    // Cierra el dialogo
    cerrarDialogMostrarTratamiento() {
      this.dialogoMostrarTratamiento = !this.dialogoMostrarTratamiento;
      this.vaciarModeloTratamientoStore();
    },
    
    ...mapMutations("moduloTratamiento", ["vaciarModeloTratamientoStore"]),
  },
};
</script>
