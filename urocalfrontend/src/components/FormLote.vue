<template>
  <v-form ref="formLote" v-model="formLoteValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-select
            v-model="lote.fincaid"
            placeholder="Seleccione una finca"
            class="style-chooser"
            label="finNombreFinca"
            :reduce="(listaCultivos) => listaCultivos.fincaId"
            :options="listaCultivos"
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
          <v-text-field
            label="Número de lote"
            v-model="lote.lotnumero"
            :rules="[
              reglas.campoVacio(lote.lotnumero),
              reglas.soloNumeros(lote.lotnumero),
              reglas.soloNumerosPositivos(lote.lotnumero),
            ]"
            error-count="3"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            type="number"
            label="Número de hectáreas"
            v-model="lote.lotnumerohectareas"
            :rules="[
              reglas.campoVacio(lote.lotnumerohectareas),
              reglas.soloNumerosPositivos(lote.lotnumerohectareas),
            ]"
            error-count="2"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Estado"
            v-model="lote.lotestado"
            :rules="[reglas.campoVacio(lote.lotestado)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5"
          ><v-textarea
            label="Observaciones"
            rows="2"
            v-model="lote.lotobservacion"
            :rules="[reglas.campoVacio(lote.lotobservacion)]"
          ></v-textarea>
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

export default {
  name: "FormLote",

  components: {
    vSelect,
  },

  data() {
    return {
      listaCultivos: [
        {
          fincaId: 1,
          finNombreFinca: "Finca 1",
        },
        {
          fincaId: 2,
          finNombreFinca: "Finca 2",
        },
        {
          fincaId: 3,
          finNombreFinca: "Finca 3",
        },
      ],
    };
  },

  computed: {
    // Obtiene el modelo lot
    ...mapState("moduloLote", ["lote"]),

    // Obtiene la variable que indica si el formulario es valido
    formLoteValido: {
      get() {
        return this.$store.getters["moduloLote/formLoteValido"];
      },
      set(v) {
        return this.$store.commit("moduloLote/cambiarEstadoFormLoteValido", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>
