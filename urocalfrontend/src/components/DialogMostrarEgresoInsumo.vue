<template>
  <v-dialog
    v-model="dialogMostrarEgresoInsumo"
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
          <v-icon class="white--text">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon
            class="white--text"
            @click="cerrarDialogMostrarEgresoInsumo()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Egreso Insumo -->
      <v-card-text style="padding: 0px">
        <v-container>
          <FormEditEgresoInsumo
            :datosEditar="resivirEditar"
            ref="componentFormEgresoInsumo"
          ></FormEditEgresoInsumo>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormEditEgresoInsumo from "@/components/FormEgresoInsumoEdit";

export default {
  name: "MostrarEgresoInsumo",
  props: ["resivirEditar"],

  components: {
    FormEditEgresoInsumo,
  },

  data() {
    return {
      datosListoEditar:this.resivirEditar,
      tab: "formEgresoInsumo",
    };
  },
  computed: {
    // Obtiene y modifica el estado de la variable dialogEgresoInsumo
    dialogMostrarEgresoInsumo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarEgresoInsumo"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarEgresoInsumo",v);
      },
    },
  },

  methods: {
    // Vacia el modelo EgresoInsumo
    ...mapMutations("moduloEgresoInsumo", ["vaciarEgresoInsumo"]),

    cerrarDialogMostrarEgresoInsumo() {
      this.dialogMostrarEgresoInsumo = !this.dialogMostrarEgresoInsumo; // Cierra el dialogMostrarEgresoInsumo
      this.$refs.componentFormEgresoInsumo.$refs.formEgresoInsumo.resetValidation(); // Reinicia las validaciones del formEgresoInsumo
      this.vaciarEgresoInsumo(); // Vacia el modelo EgresoInsumo
    },
  },
};
</script>