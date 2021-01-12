<template>
  <v-form ref="formSuelo" v-model="formSueloValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            label="Clase"
            v-model="suelo.sueclase"
            :rules="[reglas.campoVacio(suelo.medtopografia)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Color"
            v-model="suelo.suecolor"
            :rules="[reglas.campoVacio(suelo.suecolor)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            label="Textura"
            v-model="suelo.suetextura"
            :rules="[reglas.campoVacio(suelo.suetextura)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Ph"
            v-model="suelo.sueph"
            :rules="[reglas.campoVacio(suelo.sueph)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            label="Tipo de análisis"
            v-model="suelo.suetipoanalisis"
            :rules="[reglas.campoVacio(suelo.suetipoanalisis)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Resultados"
            v-model="suelo.sueresultados"
            :rules="[reglas.campoVacio(suelo.sueresultados)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-menu
            v-model="menuMostrarCalendario"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="suelo.suetomamuestra"
                label="Fecha toma muestra"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="suelo.suetomamuestra"
              @input="menuMostrarCalendario = false"
              :show-current="fechaActual"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="5"> </v-col>
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
    ...mapState("moduloSuelo", ["suelo"]),

    // Obtiene la variable que indica si el formulario es valido
    formSueloValido: {
      get() {
        return this.$store.getters["moduloSuelo/formSueloValido"];
      },
      set(v) {
        return this.$store.commit("moduloSuelo/cambiarEstadoFormSueloValido", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>
