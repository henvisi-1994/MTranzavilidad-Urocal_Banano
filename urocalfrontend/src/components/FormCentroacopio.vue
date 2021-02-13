<template>
  <v-form ref="formCentroacopio" v-model="formCentroacopioValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Nombre del centro de acopio:"
            v-model="centroacopio.centroacopionombre"
            :rules="[reglas.campoVacio(centroacopio.centroacopionombre)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-select
            v-model="centroacopio.responsableacopioid"
            placeholder="Responsable de centro de acopio"
            class="style-chooser"
            label="responsableid"
            :reduce="(listaResponsableacopio) => listaResponsableacopio.responsableacopioid"
            :options="listaResponsableacopio"
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
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from "vuex";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "FormCentroacopio",

  components: {
    vSelect,
  },

  data() {
    return {
      listaResponsableacopio: [
        {
          responsableacopioid: 1,
        },
        {
          responsableacopioid: 2,
        },
        {
          responsableacopioid: 3,
        },
      
      ],
      menuMostrarCalendario: "", // Variable de referencia para el menú de fecha toma muestra
      fechaActual: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  computed: {
    // Obtiene el modelo centro de acopio
    ...mapState("moduloCentroacopio", ["centroacopio"]),

    // Obtiene la variable que indica si el formulario es valido
    formCentroacopioValido: {
      get() {
        return this.$store.getters["moduloCentroacopio/formCentroacopioValido"];
      },
      set(v) {
        return this.$store.commit("moduloCentroacopio/cambiarEstadoValidoFormCentroacopio", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>
