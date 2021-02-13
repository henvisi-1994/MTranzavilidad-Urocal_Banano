<template>
  <v-form ref="formRespacopio" v-model="formRespacopioValido">
    <v-container>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from "vuex";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "FormRespacopio",

  components: {
    vSelect,
  },

  data() {
    return {
    };
  },

  computed: {
    // Obtiene el modelo Respacopio
    ...mapState("moduloRespacopio", ["respacopio"]),

    // Obtiene la variable que indica si el formulario es valido
    formRespacopioValido: {
      get() {
        return this.$store.getters["moduloRespacopio/formRespacopioValido"];
      },
      set(v) {
        return this.$store.commit("moduloRespacopio/cambiarEstadoValidoFormRespacopio", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>
