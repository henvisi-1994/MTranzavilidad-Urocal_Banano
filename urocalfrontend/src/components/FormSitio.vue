<template>
  <v-form ref="formSitio" v-model="formSitioValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field class="custom px-2" filled dense
            label="Sitio"
            v-model="modeloSitioStore.sitionombre"
            :rules="[reglas.campoVacio(modeloSitioStore.sitionombre)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-select
            v-model="ciudad"
            placeholder="Seleccione una Ciudad"
            class="style-chooser"
            label="ciudadnombre"
            :reduce="(listaCiudadStore) => listaCiudadStore.ciudadid"
            :options="listaCiudadStore"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir una ciudad</em>
            </template>
          </v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from "vuex";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";


import ServicioSitio from '../services/ServicioSitio';  // Interactuar con el Backend


export default {
  name: "FormSitio",

  components: {
    vSelect,
  },

  data() {
    return {
      ciudad: null
    };
  },

  watch: {
    ciudad (val) { //id
      this.modeloSitioStore.sitiociudad.ciudadid = this.ciudad;
    },
  },

  computed: {
    // #  MANIPULACIÓN DE DATOS  #
    listaCiudadStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloSitio/listaCiudadStore"]));
      },
      set(v) {
        return this.$store.commit("moduloSitio/establecerListaCiudadStore", v);
      },
    },

    // Obtiene la variable que indica si el formulario es valido
    formSitioValido: {
      get() {
        return this.$store.getters["moduloSitio/formSitioValido"];
      },
      set(v) {
        return this.$store.commit("moduloSitio/cambiarEstadoValidoFormSitio", v);
      },
    },

    modeloSitioStore: {
      get() {
        return this.$store.getters["moduloSitio/sitio"];
      },
      set(v) {
        return this.$store.commit("moduloSitio/nuevoSitio", v);
      },
    },
    
    // Obtiene el modelo Sitio
    ...mapState("moduloSitio", ["sitio"]),

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {
      // #  MANIPULACIÓN DE DATOS  #

  },
};
</script>
