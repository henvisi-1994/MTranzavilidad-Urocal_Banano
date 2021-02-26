<template>
  <v-form ref="formularioLimpiezaCA" v-model="formLimpiezaCAValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-select
            v-model="limpiezacentroacopio.centroacopioid"
            placeholder="Seleccione el Centro de Acopio"
            class="style-chooser"
            label="proNombre"
            :reduce="(listaCentroAcopio) => listaCentroAcopio.centroacopioid"
            :options="listaCentroAcopio"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir el Centro de Acopio</em>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Áreas"
            v-model="limpiezacentroacopio.limcenareas"
            :rules="[reglas.campoVacio(limpiezacentroacopio.limcenareas)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-menu
            v-model="menuDateShow"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="Fecha de la Limpieza"
                v-model="limpiezacentroacopio.limcenfecha"
                :rules="[reglas.campoVacio(limpiezacentroacopio.limcenfecha)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="limpiezacentroacopio.limcenfecha"
              @input="menuDateShow = false"
              :show-current="currentDate"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Materiales"
            v-model="limpiezacentroacopio.limcenmateriales"
            :rules="[reglas.campoVacio(limpiezacentroacopio.limcenmateriales)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            label="Productos"
            v-model="limpiezacentroacopio.limcenproductos"
            :rules="[reglas.campoVacio(limpiezacentroacopio.limcenproductos)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-textarea
            label="Motivo"
            rows="1"
            v-model="limpiezacentroacopio.limcenmotivo"
            :rules="[reglas.campoVacio(limpiezacentroacopio.limcenmotivo)]"
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
import LimpiezaCA from "@/models/ModeloLimpiezaCentroAcopio";

export default {
  name: "FormularioLimpiezaCA",

  components: {
    vSelect,
  },

  data() {
    return {
      listaCentroAcopio: [
        {
          centroacopioid: 1,
          proNombre: "El Carmen",
        },
        {
          centroacopioid: 2,
          proNombre: "San Juan",
        },
        {
          centroacopioid: 3,
          proNombre: "Don Brandon",
        },
      ],
      menuDateShow: "", // Variable de referencia para el menú de fecha toma muestra
      currentDate: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  computed: {
    // Obtiene el modelo limpiezacentroacopio
    ...mapState("moduloLimpiezaCentroAcopio", ["limpiezacentroacopio"]),

    // Obtiene la variable que indica si el formulario es valido
    formLimpiezaCAValido: {
      get() {
        return this.$store.getters["moduloLimpiezaCentroAcopio/formLimpiezaCAValido"];
      },
      set(v) {
        return this.$store.commit("moduloLimpiezaCentroAcopio/cambiarEstadoFormLimpiezaCentroAcopioValido", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>
