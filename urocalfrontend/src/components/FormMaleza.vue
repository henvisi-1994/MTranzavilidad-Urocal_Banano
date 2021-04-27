<template>
  <v-form ref="formularioMaleza" v-model="formMalezaValido">
    <v-container>
      <v-row
        no-gutters
        justify-md="space-around"
        :class="$vuetify.breakpoint.xs ? '' : 'mb-5'"
      >
        <v-col cols="12" md="5">
          <v-select
            :disabled="bloquearCamposFormMalezaControl"
            v-model="maleza.fincaid"
            placeholder="Finca"
            class="style-chooser"
            label="findescripcionfinca"
            @input="obtenerTodosLoteCultivadoDeFinca"
            :reduce="(listaFinca) => listaFinca.fincaid"
            :options="listaFinca"
            :rules="[reglas.campoVacio(fincaid)]"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir una finca</em>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" md="5">
          <v-select
            :disabled="bloquearCamposFormMalezaControl"
            v-model="maleza.lotecultivadoid"
            placeholder="Lote"
            class="style-chooser"
            label="lotnumero"
            @input="obtenerTodosListaCultivo"
            :reduce="(listaLoteStore) => listaLoteStore.lotecultivadoid"
            :options="listaLoteStore"
            :rules="[reglas.campoVacio(maleza.lotecultivadoid)]"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else-if="!fincaid"
                >Escoja una finca</em
              >
              <em style="opacity: 0.5" v-else>Empiece a escribir un lote</em>
            </template>
          </v-select>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-select
            :disabled="bloquearCamposFormMalezaControl"
            v-model="maleza.cultivoid"
            placeholder="Cultivo"
            class="style-chooser"
            label="detalles"
            :reduce="(listaCultivoStore) => listaCultivoStore.cultivoid"
            :options="listaCultivoStore"
            :rules="[reglas.campoVacio(maleza.cultivoid)]"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir un cultivo</em>
            </template>
          </v-select>
        </v-col>

        <v-col cols="12" md="5">
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
                class="custom px-2"
                filled
                dense
                :rules="[reglas.campoVacio(maleza.confecha)]"
                readonly
                v-bind="attrs"
                v-on="on"
                :disabled="bloquearCamposFormMalezaControl"
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
          <v-select
            v-model="maleza.conmetodo"
            placeholder="Seleccione método"
            class="style-chooser"
            label="detalles"
            :options="['Manual', 'Mecanica']"
            :rules="[reglas.campoVacio(maleza.conmetodo)]"
            :disabled="bloquearCamposFormMalezaControl"
          >
          </v-select>
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
import { mapState } from "vuex";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import servicioLote from "../services/ServicioLote";
import servicioFinca from "../services/ServicioFinca";
import servicioCultivo from "../services/ServicioCultivo";

export default {
  name: "FormularioMalezaControl",

  components: {
    vSelect,
  },
  mounted() {
    this.obtenerTodosFincas();
    // this.obtenerTodosListaCultivo();
    // this.obtenerTodosLoteCultivadoDeFinca();
  },
  data() {
    return {
      listaFinca: [],
      fincaid: "",
      loteid: "",
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
    listaLoteStore: {
      get() {
        return this.$store.getters["moduloMaleza/listaLoteStore"];
      },
      set(v) {
        return this.$store.commit("moduloMaleza/asignarListaLoteStore", v);
      },
    },
    listaCultivoStore: {
      get() {
        return this.$store.getters["moduloMaleza/listaCultivoStore"];
      },
      set(v) {
        return this.$store.commit("moduloMaleza/asignarListaCultivoStore", v);
      },
    },

    // Obtiene la variable que indica si el formulario es valido
    formMalezaValido: {
      get() {
        return this.$store.getters["moduloMaleza/formMalezaValido"];
      },
      set(v) {
        return this.$store.commit(
          "moduloMaleza/cambiarEstadoFormMalezaValido",
          v
        );
      },
    },

    // Obtiene la variable bloquearCamposFormMalezaControl
    bloquearCamposFormMalezaControl: {
      get() {
        return this.$store.getters[
          "moduloMaleza/bloquearCamposFormMalezaControl"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloMaleza/cambiarBloquearCamposFormMaleza",
          v
        );
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {
    async obtenerTodosListaCultivo() {
      let resultado = await servicioCultivo.obtenerCultivoDetalles(
        this.maleza.lotecultivadoid
      );
      this.listaCultivoStore = resultado.data;
    },
    async obtenerTodosFincas() {
      let resultado = await servicioFinca.obtenerTodosFincas();
      this.listaFinca = resultado.data;
    },
    async obtenerTodosLoteCultivadoDeFinca() {
      let resultado = await servicioLote.obtenerTodosLoteCultivadoDeFinca(
        this.maleza.fincaid
      );
      this.listaLoteStore = resultado.data;
    },

    /*  limpiarIds(){
      this.fincaid = '';
      this.loteid = '';
    }*/
  },
};
</script>
