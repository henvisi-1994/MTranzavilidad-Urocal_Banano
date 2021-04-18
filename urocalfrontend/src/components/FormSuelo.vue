<template>
  <v-form ref="formSuelo" v-model="formSueloValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            label="Clase"
            v-model="suelo.sueclase"
            class="custom px-2"
            filled
            dense
            :rules="[reglas.campoVacio(suelo.sueclase)]"
            :disabled="bloquearCamposFormSuelo"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Color"
            v-model="suelo.suecolor"
            class="custom px-2"
            filled
            dense
            :rules="[reglas.campoVacio(suelo.suecolor)]"
            :disabled="bloquearCamposFormSuelo"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            label="Textura"
            v-model="suelo.suetextura"
            class="custom px-2"
            filled
            dense
            :rules="[reglas.campoVacio(suelo.suetextura)]"
            :disabled="bloquearCamposFormSuelo"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Ph"
            v-model="suelo.sueph"
            class="custom px-2"
            filled
            dense
            :rules="[reglas.campoVacio(suelo.sueph)]"
            :disabled="bloquearCamposFormSuelo"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            label="Tipo de análisis"
            v-model="suelo.suetipoanalisis"
            class="custom px-2"
            filled
            dense
            :rules="[reglas.campoVacio(suelo.suetipoanalisis)]"
            :disabled="bloquearCamposFormSuelo"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Resultados"
            v-model="suelo.sueresultados"
            class="custom px-2"
            filled
            dense
            :rules="[reglas.campoVacio(suelo.sueresultados)]"
            :disabled="bloquearCamposFormSuelo"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-menu
            v-model="menuMostrarCalendario"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="Fecha toma muestra"
                v-model="suelo.suetomamuestras"
                class="custom px-2"
                filled
                dense
                :rules="[reglas.campoVacio(suelo.suetomamuestras)]"                
                readonly                
                v-bind="attrs"
                v-on="on"
                :disabled="bloquearCamposFormSuelo"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="suelo.suetomamuestras"
              @input="menuMostrarCalendario = false"
              :show-current="fechaActual"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6"> </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "FormSuelo",

  data() {
    return {
      menuMostrarCalendario: "", // Variable de referencia para el menú que muestra el calendario
      fechaActual: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  computed: {
    // Obtiene el modelo suelo
    suelo: {
      get() {
        return this.$store.getters["moduloSuelo/suelo"];
      },
      set(v) {
        return this.$store.commit("moduloSuelo/agregarSuelo", v);
      },
    },

    /*sueloo: {
      get() {
        return this.$store.getters["moduloMedioAmbiente/medAmbiente"];
      },
      set(v) {
        return this.$store.commit("moduloMedioAmbiente/agregarMedioAmbiente", v);
      },
    },*/

    // Obtiene la variable que indica si el formulario es valido
    formSueloValido: {
      get() {
        return this.$store.getters["moduloSuelo/formSueloValido"];
      },
      set(v) {
        return this.$store.commit("moduloSuelo/cambiarEstadoFormSueloValido", v);
      },
    },

    // Obtiene la variable bloquearCamposFormSuelo
    bloquearCamposFormSuelo: {
      get() {
        return this.$store.getters["moduloSuelo/bloquearCamposFormSuelo"];
      },
      set(v) {
        return this.$store.commit("moduloSuelo/cambiarBloquearCamposFormSuelo", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},

  mounted() {
    /*this.suelo = {
      sueclase: "Clase X",
      suecolor: "Color X",
      suetextura: "Textura X",
      sueph: "PH X",
      suetipoanalisis: "Analisis X",
      suetomamuestras: "2020-12-17",
      sueresultados: "Resultados X"
    };*/
  },
};
</script>
