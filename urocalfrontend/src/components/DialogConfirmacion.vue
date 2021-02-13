<template>
  <v-dialog v-model="dialogConfirmacion" persistent max-width="290">
    <v-card>
      <v-card-text class="pt-8"
        ><h3>{{ mensaje }}</h3></v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info" @click="respuestaDialogoConfirmacion(true)" text>Si</v-btn>
        <v-btn color="error" @click="respuestaDialogoConfirmacion(false)" text>No</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "DialogConfirmacion",

  props: {
    titulo: {
      type: String,
      required: true,
    },
    mensaje: {
      type: String,
      required: true,
    },
  },

  computed: {
    // Obtiene la variable que indica si se abre o cierra el DialogConfirmacion
    dialogConfirmacion: {
      get() {
        return this.$store.getters["gestionDialogos/dialogConfirmacion"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogConfirmacion", v);
      },
    },
  },

  methods: {
    respuestaDialogoConfirmacion(respuesta) {
      this.$emit("respuestaDialogoConfirmacion", respuesta);
    },
  },
};
</script>
