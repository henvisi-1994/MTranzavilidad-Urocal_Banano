<template>
  <v-form ref="formLote" v-model="formLoteValido">
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <v-select
            v-model="lote.fincaid"
            placeholder="Seleccione una finca"
            class="style-chooser"
            label="finnombrefinca"
            :reduce="(listaCultivos) => listaCultivos.fincaid"
            :options="listaCultivos"
            :disabled="bloquearCamposFormLote"
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
        <v-col cols="12" md="6">
          <v-text-field
            type="Number"
            label="Número de lote"
            v-model="lote.lotnumero"
            class="custom px-2"
            filled
            dense
            :rules="[
              reglas.campoVacio(lote.lotnumero),
              reglas.soloNumerosPositivos(lote.lotnumero),
            ]"
            error-count="2"
            :disabled="bloquearCamposFormLote"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12" md="6">
          <v-text-field
            type="number"
            label="Número de hectáreas"
            class="custom px-2"
            filled
            dense
            v-model="lote.lotnumerohectareas"
            :rules="[
              reglas.campoVacio(lote.lotnumerohectareas),
              reglas.soloNumerosPositivos(lote.lotnumerohectareas),
            ]"
            error-count="2"
            :disabled="bloquearCamposFormLote"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Estado"
            v-model="lote.lotestado"
            class="custom px-2"
            filled
            dense
            :rules="[reglas.campoVacio(lote.lotestado)]"
            :disabled="bloquearCamposFormLote"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12" md="6"
          ><v-textarea
            label="Observaciones"
            rows="2"
            v-model="lote.lotobservacion"
            class="custom px-2"
            filled
            dense
            :rules="[reglas.campoVacio(lote.lotobservacion)]"
            :disabled="bloquearCamposFormLote"
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="6"></v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import servicioFinca from "../services/ServicioFinca";

export default {
  name: "FormLote",

  components: {
    vSelect,
  },

  data() {
    return {
      // Almacena listaCultivos
      listaCultivos: [],
    };
  },

  computed: {
    // Obtiene el modelo lote
    lote: {
      get() {
        return this.$store.getters["moduloLote/lote"];
      },
      set(v) {
        return this.$store.commit("moduloLote/agregarLote", v);
      },
    },

    // Obtiene la variable que indica si el formulario es valido
    formLoteValido: {
      get() {
        return this.$store.getters["moduloLote/formLoteValido"];
      },
      set(v) {
        return this.$store.commit("moduloLote/cambiarEstadoFormLoteValido", v);
      },
    },

    // Obtiene la variable bloquearCamposFormLote
    bloquearCamposFormLote: {
      get() {
        return this.$store.getters["moduloLote/bloquearCamposFormLote"];
      },
      set(v) {
        return this.$store.commit("moduloLote/cambiarBloquearCamposFormLote", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {
    // Llena la listaCultivos con datos del servidor backend
    async obtenerTodosFinca() {
      let resultado = await servicioFinca.obtenerTodosFincas();
      this.listaCultivos = resultado.data;
    },
  },

  mounted() {
    // Llama al metodo obtenerTodosFinca
    this.obtenerTodosFinca();
  },
};
</script>
