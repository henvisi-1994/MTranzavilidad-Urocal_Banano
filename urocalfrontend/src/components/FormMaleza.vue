<template>
  <v-form ref="formularioMaleza" v-model="formMalezaValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12">
          <v-select
            v-model="maleza.cultivoid"
            placeholder="Seleccione un Cultivo"
            class="style-chooser"
            label="detalles"
            :reduce="(listaCultivosDetalle) => listaCultivosDetalle.cultivoid"
            :options="listaCultivosDetalle"
            :disabled="bloquearCamposFormMalezaControl"
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
        
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-menu
            v-model="menuDateShow"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="Fecha del control"
                v-model="maleza.confecha" class="custom px-2" filled dense
                :rules="[reglas.campoVacio(maleza.confecha)]"
                readonly
                v-bind="attrs"
                v-on="on"
                :disabled="bloquearCamposFormMalezaControl"
              ></v-text-field>
            </template>
            <v-date-picker v-model="maleza.confecha" @input="menuDateShow = false" :show-current="currentDate" locale="es-419" ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Número de hectáreas"
            type="Number"
            v-model="maleza.conhectareas"
            class="custom px-2"
            filled
            dense
            :rules="[
              reglas.campoVacio(maleza.conhectareas),
              reglas.soloNumerosPositivos(maleza.conhectareas),
            ]"
            error-count="2"
            :disabled="bloquearCamposFormMalezaControl"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            label="Método utilizado"
            v-model="maleza.conmetodo"
            class="custom px-2"
            filled
            dense
            :rules="[reglas.campoVacio(maleza.conmetodo)]"
            :disabled="bloquearCamposFormMalezaControl"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Operario"
            v-model="maleza.conoperario"
            class="custom px-2"
            filled
            dense
            :rules="[reglas.campoVacio(maleza.conoperario)]"
            :disabled="bloquearCamposFormMalezaControl"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import servicioMalezaControl from "../services/ServicioMalezaControl";



export default {
  name: "FormularioMalezaControl",

  components: {
    vSelect,
  },

  data() {
    return {
      listaCultivosDetalle: [],
      menuDateShow: "", // Variable de referencia para el menú de fecha toma muestra
      currentDate: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  computed: {

    // Obtiene el modelo Control Maleza
    maleza: {
      get() {
        return this.$store.getters["moduloMaleza/maleza"];
      },
      set(v) {
        return this.$store.commit("moduloMaleza/agregarMaleza", v);
      },
    },


    // Obtiene la variable que indica si el formulario es valido
    formMalezaValido: {
      get() {
        return this.$store.getters["moduloMaleza/formMalezaValido"];
      },
      set(v) {
        return this.$store.commit("moduloMaleza/cambiarEstadoFormMalezaValido", v);
      },
    },


    // Obtiene la variable bloquearCamposFormMalezaControl
    bloquearCamposFormMalezaControl: {
      get() {
        return this.$store.getters["moduloMaleza/bloquearCamposFormMalezaControl"];
      },
      set(v) {
        return this.$store.commit("moduloMaleza/cambiarBloquearCamposFormMaleza", v);
      },
    },


    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),

  },

  methods: {


    async obtenerTodosListaCultivoDetalles() {
      let resultado = await servicioMalezaControl.obtenerTodosListaCultivoDetalles();
      this.listaCultivosDetalle = resultado.data;
    },
  },

  mounted() {
    this.obtenerTodosListaCultivoDetalles();
  },
};
</script>
