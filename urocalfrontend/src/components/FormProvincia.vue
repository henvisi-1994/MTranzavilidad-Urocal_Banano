<template>
  <v-form ref="formProvincia" v-model="formProvinciaValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            label="Provincia" class="custom px-2" filled dense
            v-model="modeloProvinciaStore.provincianombre"
            :rules="[reglas.campoVacio(modeloProvinciaStore.provincianombre)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="pais"
            placeholder="Seleccione un país"
            class="style-chooser"
            label="paisnombre"
            :reduce="(listaPaisStore) => listaPaisStore.paisid"
            :options="listaPaisStore"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir un país</em>
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
  name: "FormProvincia",

  components: {
    vSelect,
  },

  data() {
    return {
      pais: null,
    };
  },

  watch: {
    pais (val) { //id
      this.modeloProvinciaStore.provinciapais.paisid = this.pais;
    },
  },

  computed: {

    // #  MANIPULACIÓN DE DATOS  #
    listaPaisStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloProvincia/listaPaisStore"]));
      },
      set(v) {
        return this.$store.commit("moduloProvincia/establecerListaPaisStore", v);
      },
    },

    // Obtiene la variable que indica si el formulario es valido
    formProvinciaValido: {
      get() {
        return this.$store.getters["moduloProvincia/formProvinciaValido"];
      },
      set(v) {
        return this.$store.commit("moduloProvincia/cambiarEstadoValidoFormProvincia", v);
      },
    },

    modeloProvinciaStore: {
      get() {
        return this.$store.getters["moduloProvincia/provincia"];
      },
      set(v) {
        return this.$store.commit("moduloProvincia/nuevoProvincia", v);
      },
    },
    
    // Obtiene el modelo Provincia
    ...mapState("moduloProvincia", ["provincia"]),
    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>
