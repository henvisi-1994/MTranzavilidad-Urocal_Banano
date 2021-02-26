<template>
  <v-form ref="formCompra" v-model="formCompraValidoCabecera">
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <v-select
          v-model="compra.guiaremisionid"
          placeholder="Seleccione un tratamiento"
          class="style-chooser custom px-2"
          label="guiserie"
          filled
          :reduce="(listaGuiaRemision) => listaGuiaRemision.guiaremisionid"
          :options="listaGuiaRemision"
          :disabled="bloquearCamposFormCompra"
        >
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              No hay resultados para <em>{{ search }}</em
              >.
            </template>
            <em style="opacity: 0.5" v-else>Empiece a escribir un tratamiento</em>
          </template>
        </v-select>
      </v-col>
      <v-col cols="6" md="4">
        <v-text-field
          label="Número"
          v-model="compra.comnumero"
          :rules="[reglas.campoVacio(compra.comnumero)]"
          class="custom px-2"
          dense
          filled
          :disabled="bloquearCamposFormCompra"
        ></v-text-field>
      </v-col>

      <v-col cols="6" md="4">
        <v-menu
          v-model="menuMostrarFechaEmision"
          transition="scale-transition"
          offset-y
          min-width="290px"
          max-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              label="Fecha de emisión"
              v-model="compra.comfechaemision"
              :rules="[reglas.campoVacio(compra.comfechaemision)]"
              readonly
              v-bind="attrs"
              v-on="on"
              class="custom px-2"
              dense
              filled
              hide-details="auto"
              :disabled="bloquearCamposFormCompra"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="compra.comfechaemision"
            @input="menuMostrarFechaEmision = false"
            :show-current="fechaActual"
            locale="es-419"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from "vuex";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "FormCompra",

  components: {
    vSelect,
  },

  data() {
    return {
      listaGuiaRemision: [
        {
          guiaremisionid: 1,
          guiserie: "UR-550",
        },
      ],
      menuMostrarFechaEmision: "", // Variable de referencia para el menuMostrarFechaEmision
      fechaActual: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  computed: {
    // Obtiene el modelo compra
    ...mapState("moduloCompra", ["compra"]),

    // Obtiene la variable que indica si el formulario es valido
    formCompraValidoCabecera: {
      get() {
        return this.$store.getters["moduloCompra/formCompraValidoCabecera"];
      },
      set(v) {
        return this.$store.commit(
          "moduloCompra/cambiarEstadoValidoFormCompraCabecera",
          v
        );
      },
    },

    // Obtiene la variable bloquearCamposFormCompra
    bloquearCamposFormCompra: {
      get() {
        return this.$store.getters["moduloCompra/bloquearCamposFormCompra"];
      },
      set(v) {
        return this.$store.commit("moduloCompra/cambiarBloquearCamposFormCompra", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>
