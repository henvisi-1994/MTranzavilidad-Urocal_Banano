<template>
  <v-dialog
    v-model="dialogNuevoRespacopio"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="primary white--text">
        <h5>Registrar Responsable de acopio</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogNuevoRespacopio()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar Respacopio -->
          <FormRespacopio ref="componentFormRespacopio"></FormRespacopio>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Respacopio -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          color="primary"
          @click="registrar()"
          >Registrar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormRespacopio from "@/components/FormRespacopio";
import ServicioResCentroAcopio from "../services/ServicioResCentroAcopio";

export default {
  name: "DialogNuevoRespacopio",

  components: {
    FormRespacopio
  },

  data() {
    return {
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoRespacopio
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

    dialogNuevoRespacopio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoRespacopio"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogRespacopioNuevo", v);
      },
    },

    // Obtiene es estado de la variable formRespacopioValido y el modelo Respacopio
    ...mapState("moduloRespacopio", ["formRespacopioValido", "respacopio"]),
  },

  methods: {
    // Vacia el modelo Respacopio
    ...mapMutations("moduloRespacopio", ["vaciarRespacopio"]),

    // Registra dependiendo el tab donde se encuentre
    async registrar() {
      //console.log(this.limpiezaHerramienta);
      try {
        let respuesta = await ServicioResCentroAcopio.agregarResCentroAcopio(this.respacopio);
        if (respuesta.status == 201) {
          this.cerrarDialogNuevoRespacopio();
          this.cargarlistaRespacopio();
          this.vaciarRespacopio();
          this.$toast.success(respuesta.data.message);
        }else{
          this.$toast.error(respuesta.data.message);
        }
      } catch (error) {
        console.log(error);
        this.$toast.error("Llene todos los campos");
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

    cerrarDialogNuevoRespacopio() {
      this.dialogNuevoRespacopio = !this.dialogNuevoRespacopio; // Cierra el dialogNuevoRespacopio
    },
  },
};
</script>
