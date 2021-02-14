<template>
  <v-form ref="formCiudad" v-model="formCiudadValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Ciudad"
            v-model="modeloCiudadStore.ciudadnombre"
            :rules="[reglas.campoVacio(modeloCiudadStore.ciudadnombre)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="provincia"
            placeholder="Seleccione una provincia"
            class="style-chooser"
            label="provincianombre"
            :reduce="(listaProvinciaStore) => listaProvinciaStore.provinciaid"
            :options="listaProvinciaStore"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir una provincia</em>
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

export default {
  name: "FormCiudad",

  components: {
    vSelect,
  },

  data() {
    return {
      provincia: null
    };
  },

  watch: {
    provincia (val) { //id
      this.modeloCiudadStore.ciudadprovincia.provinciaid = this.provincia;
    },
  },

  computed: {

    // #  MANIPULACIÓN DE DATOS  #
    listaProvinciaStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloCiudad/listaProvinciaStore"]));
      },
      set(v) {
        return this.$store.commit("moduloCiudad/establecerListaProvinciaStore", v);
      },
    },

    // Obtiene la variable que indica si el formulario es valido
    formCiudadValido: {
      get() {
        return this.$store.getters["moduloCiudad/formCiudadValido"];
      },
      set(v) {
        return this.$store.commit("moduloCiudad/cambiarEstadoValidoFormCiudad", v);
      },
    },

    modeloCiudadStore: {
      get() {
        return this.$store.getters["moduloCiudad/ciudad"];
      },
      set(v) {
        return this.$store.commit("moduloCiudad/nuevoCiudad", v);
      },
    },

    // Obtiene el modelo Ciudad
    ...mapState("moduloCiudad", ["ciudad"]),
    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>
