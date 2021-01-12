<template>
  <v-form ref="formularioMaleza" v-model="formMalezaValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-select
            v-model="maleza.cultivoid"
            placeholder="Seleccione un Cultivo"
            class="style-chooser"
            label="proNombre"
            :reduce="(listaCultivos) => listaCultivos.cultivoid"
            :options="listaCultivos"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir un Cultivo</em>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Operario"
            v-model="maleza.conoperario"
            :rules="[reglas.campoVacio(maleza.conoperario)]"
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
                label="Fecha del control"
                v-model="maleza.confecha"
                :rules="[reglas.campoVacio(maleza.confecha)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="maleza.confecha"
              @input="menuDateShow = false"
              :show-current="currentDate"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Número de hectáreas"
            type="Number"
            v-model="maleza.conhectareas"
            :rules="[
              reglas.campoVacio(maleza.conhectareas),
              reglas.soloNumerosPositivos(maleza.conhectareas),
            ]"
            error-count="2"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            label="Método utilizado"
            v-model="maleza.conmetodo"
            :rules="[reglas.campoVacio(maleza.conmetodo)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5"></v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from "vuex";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import MalezaControl from "@/models/ModeloMaleza";

export default {
  name: "FormularioMalezaControl",

  components: {
    vSelect,
  },

  data() {
    return {
      listaCultivos: [
        {
          cultivoid: 1,
          proNombre: "Cultivo 1",
        },
        {
          cultivoid: 2,
          proNombre: "Cultivo 2",
        },
        {
          cultivoid: 3,
          proNombre: "Cultivo 3",
        },
      ],
      menuDateShow: "", // Variable de referencia para el menú de fecha toma muestra
      currentDate: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  computed: {
    // Obtiene el modelo maleza
    ...mapState("moduloMaleza", ["maleza"]),

    // Obtiene la variable que indica si el formulario es valido
    formMalezaValido: {
      get() {
        return this.$store.getters["moduloMaleza/formMalezaValido"];
      },
      set(v) {
        return this.$store.commit("moduloMaleza/cambiarEstadoFormMalezaValido", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>
