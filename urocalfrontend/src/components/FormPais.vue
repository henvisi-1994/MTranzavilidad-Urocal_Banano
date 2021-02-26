<template>
  <v-form ref="formPais" v-model="formPaisValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="12">
          <v-text-field
            label="País" class="custom" filled dense
            v-model="modeloPaisStore.paisnombre"
            :rules="[reglas.campoVacio(modeloPaisStore.paisnombre)]"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from "vuex";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "FormPais",

  components: {
    vSelect,
  },

  data() {
    return {
    };
  },

  computed: {
    // Obtiene el modelo Pais
    ...mapState("moduloPais", ["pais"]),

    // Obtiene la variable que indica si el formulario es valido
    formPaisValido: {
      get() {
        return this.$store.getters["moduloPais/formPaisValido"];
      },
      set(v) {
        return this.$store.commit("moduloPais/cambiarEstadoValidoFormPais", v);
      },
    },

    modeloPaisStore: {
      get() {
        return this.$store.getters["moduloPais/pais"];
      },
      set(v) {
        return this.$store.commit("moduloPais/nuevoPais", v);
      },
    },

    // Obtiene el modelo Provincia
    ...mapState("moduloPais", ["pais"]),
    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>
