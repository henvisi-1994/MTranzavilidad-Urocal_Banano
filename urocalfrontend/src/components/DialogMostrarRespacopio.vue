<template>
  <v-dialog
    v-model="dialogMostrarRespacopio"
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
          <v-icon :disabled="!noEditar" class="white--text" @click="cambiarEstadoEditar()">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon @click="eliminarRegistro()" class="white--text">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogMostrarRespacopio()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Respacopio -->
      <v-card-text style="padding: 0px">
        <v-container>
          <FormRespacopio ref="componentFormRespacopio"></FormRespacopio>
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

import FormRespacopio from "@/components/FormRespacopio";
import ServicioResCentroAcopio from "../services/ServicioResCentroAcopio";

export default {
  name: "DialogMostrarRespacopio",

  components: {
    FormRespacopio,
  },

  data() {
    return {};
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogMostrarRespacopio
    ...mapState("moduloRespacopio", ["respacopio"]),

    listaRespacopioStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloRespacopio/listaRespacopioStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloRespacopio/establecerlistaRespacopioStore",
          v
        );
      },
    },

    noEditar: {
      get() {
        return this.$store.getters["moduloRespacopio/noEditar"];
      },
      set(v) {
        return this.$store.commit("moduloRespacopio/cambiarEstadoNoEditar", v);
      },
    },


    dialogMostrarRespacopio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarRespacopio"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarRespacopio", v);
      },
    },
  },

  methods: {

    // Vacia el modelo Respacopio
    ...mapMutations("moduloRespacopio", ["vaciarRespacopio"]),

    // Cierra el dialogo
    cerrarDialogMostrarRespacopio() {
      this.dialogMostrarRespacopio = !this.dialogMostrarRespacopio; // Cierra el dialogMostrarRespacopio
      this.noEditar=false;
    },

    // DELETE: Elimina un registro
    async eliminarRegistro() {
      try {
        const respuesta = await ServicioResCentroAcopio.eliminarResCentroAcopio(this.respacopio.personaid);
        if (respuesta.status == 200) {
          this.cerrarDialogMostrarRespacopio();
          this.cargarlistaRespacopio();
        } 
        this.$toast.success(respuesta.data.message);
      } catch (error) {
        this.$toast.error("Error al eliminar");
        console.log(error);
      }
      
    },

    // UPDATE: Actualiza un registro
    async actualizarRegistro () { 
      try {
        const respuesta = await ServicioResCentroAcopio.actualizarResCentroAcopio(this.respacopio.personaid, this.respacopio);
        if (respuesta.status == 200) {
          this.cerrarDialogMostrarRespacopio();
          this.cargarlistaRespacopio();
          this.vaciarRespacopio(); 
          //this.cambiarEstadoEditar();
          this.$toast.success(respuesta.data.message);       
        }else{
          this.$toast.error(respuesta.data.message);
        }
      } catch (error) {
        this.$toast.error("Error al actualizar");
      }      
    },

    async cargarlistaRespacopio() {
      let listaRespacopio = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioResCentroAcopio.obtenerTodosResCentroAcopio(); // Obtener respuesta de backend
      let datosUsuario = await respuesta.data; // Rescatar datos de la respuesta
      datosUsuario.forEach((dd) => {
        // Guardar cada registro en la 'lista de datos'
        listaRespacopio.push(dd);
      });
      this.listaRespacopioStore = listaRespacopio;
    },

    cambiarEstadoEditar () { 
      this.noEditar = !this.noEditar;
    },
  },
};
</script>
