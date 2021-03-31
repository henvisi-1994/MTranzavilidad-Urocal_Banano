<template>
  <v-form ref="formFactExporta">
    <v-container>
        Poner contenido aqui
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from "vuex";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "FormFactExporta",

  components: {
    vSelect,
  },

  data() {
    return {
      
    };
  },

  
  computed: {

   

    // // Obtiene la variable que indica si el formulario es valido
    // formFactExportaValido: {
    //   get() {
    //     return this.$store.getters["moduloFactExporta/formFactExportaValido"];
    //   },
    //   set(v) {
    //     return this.$store.commit("moduloFactExporta/cambiarEstadoValidoFormFactExporta", v);
    //   },
    // },

    // modeloFactExportaStore: {
    //   get() {
    //     return this.$store.getters["moduloFactExporta/finca"];
    //   },
    //   set(v) {
    //     return this.$store.commit("moduloFactExporta/nuevoFactExporta", v);
    //   },
    // },

    // Obtiene el modelo Ciudad
    // ...mapState("moduloFactExporta", ["finca"]),
    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {
    
  },
};
</script>
