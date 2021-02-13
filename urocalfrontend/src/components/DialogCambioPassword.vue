<template>
  <v-dialog
    v-model="dialogCambioPassword"
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card tile>
      <v-card-title class="justify-center primary--text">
        <h5>Cambiar contraseña</h5>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon class="primary--text" @click="cerrarDialogo()">mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field class="custom" dense filled label="Contraseña actual"></v-text-field>
            <v-text-field class="custom" dense filled label="Contraseña nueva"></v-text-field>
            <v-text-field class="custom" dense filled label="Repita contraseña nueva"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn 
          color="primary" 
          large 
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px" @click="cerrarDialogo()">
          Actualizar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  methods: {
    cerrarDialogo () { 
      this.dialogCambioPassword = !this.dialogCambioPassword;
    },

  },
  name: "DialogCambioPassword",

  props: {},

  data() {
    return {};
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogCambioPassword
    dialogCambioPassword: {
      get() {
        return this.$store.getters["gestionDialogos/dialogCambioPassword"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogCambioPassword", v);
      },
    },
  },
};
</script>

<style>
  .custom.v-text-field>.v-input__control>.v-input__slot:before { 
    border-style: none; 
  } 
  
  .custom.v-text-field>.v-input__control>.v-input__slot:after { 
    border-style: none; 
  }
</style>