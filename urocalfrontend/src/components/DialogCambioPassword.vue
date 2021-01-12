<template>
  <v-dialog
    v-model="dialogCambioPassword"
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card tile>
      <v-card-title>Cambiar contraseña</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Contraseña actual"></v-text-field>
            <v-text-field label="Contraseña nueva"></v-text-field>
            <v-text-field label="Repita contraseña"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn tile color="error" @click="dialogCambioPassword = !dialogCambioPassword"
          >Cancelar</v-btn
        >
        <v-btn tile color="primary">Enviar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
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
