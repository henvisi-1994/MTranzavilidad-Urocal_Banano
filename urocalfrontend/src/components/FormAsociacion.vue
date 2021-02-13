<template>
  <v-form ref="formAsociacion" v-model="formAsociacionValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
                <v-col cols="12" md="6">
          <v-select
            v-model="responsable"
            placeholder="Seleccione un responsable"
            class="style-chooser"
            label="responsable"
            :reduce="(listaResponsableStore) => listaResponsableStore.personaid"
            :options="listaResponsableStore"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir un responsable</em>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Nombre abreviado"
            v-model="modeloAsociacionStore.asoabreviado"
            :rules="[reglas.campoVacio(modeloAsociacionStore.asoabreviado)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Ruc"
            type="Number"
            v-model="modeloAsociacionStore.asoruc"
            :rules="[reglas.campoVacio(modeloAsociacionStore.asoruc),
            reglas.soloNumerosPositivos(modeloAsociacionStore.asoruc)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Números de socios"
            type="Number"
            v-model="modeloAsociacionStore.asonumerosocios"
            :rules="[reglas.campoVacio(modeloAsociacionStore.asonumerosocios),
            reglas.soloNumerosPositivos(modeloAsociacionStore.asonumerosocios)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Número de hombres"
            type="Number"
            v-model="modeloAsociacionStore.asonumerohombres"
            :rules="[reglas.campoVacio(modeloAsociacionStore.asonumerohombres),
            reglas.soloNumerosPositivos(modeloAsociacionStore.asonumerohombres)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Número de mujeres"
            type="Number"
            v-model="modeloAsociacionStore.asonumeromujeres"
            :rules="[reglas.campoVacio(modeloAsociacionStore.asonumeromujeres),
            reglas.soloNumerosPositivos(modeloAsociacionStore.asonumeromujeres)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Asociación"
            v-model="modeloAsociacionStore.asonombre"
            :rules="[reglas.campoVacio(modeloAsociacionStore.asonombre)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6"
          ><v-textarea class="custom px-2" filled dense
            label="Observaciones"
            rows="2"
            v-model="modeloAsociacionStore.asoobservacion"
            :rules="[reglas.campoVacio(modeloAsociacionStore.asoobservacion)]"
          ></v-textarea>
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
  name: "FormAsociacion",

  components: {
    vSelect,
  },

  data() {
    return {
      responsable: null
    };
  },

  watch: {
    responsable (val) { //id
      this.modeloAsociacionStore.personaid = this.responsable;
    },
  },

  computed: {
    // Obtiene el modelo Asociacion
    ...mapState("moduloAsociacion", ["asociacion"]),

    // Obtiene la variable que indica si el formulario es valido
    formAsociacionValido: {
      get() {
        return this.$store.getters["moduloAsociacion/formAsociacionValido"];
      },
      set(v) {
        return this.$store.commit("moduloAsociacion/cambiarEstadoValidoFormAsociacion", v);
      },
    },

    listaResponsableStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloAsociacion/listaResponsableStore"]));
      },
      set(v) {
        return this.$store.commit("moduloAsociacion/establecerListaResponsableStore", v);
      },
    },

    modeloAsociacionStore: {
      get() {
        return this.$store.getters["moduloAsociacion/asociacion"];
      },
      set(v) {
        return this.$store.commit("moduloAsociacion/nuevoAsociacion", v);
      },
    },

    // Obtiene el modelo Ciudad
    ...mapState("moduloAsociacion", ["asociacion"]),
    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>
