<template>
  <v-form ref="formularioDespacho" v-model="formDespachoValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-menu
            v-model="menuDateShow"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px" >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="Fecha de salida"
                v-model="despacho.desfechasalida" class="custom px-2" filled dense
                :rules="[reglas.campoVacio(despacho.desfechasalida)]"
                readonly
                v-bind="attrs"
                v-on="on"
                :disabled="bloquearCamposFormDespacho"
              ></v-text-field>
            </template>
            <v-date-picker v-model="despacho.desfechasalida" @input="menuDateShow = false" :min="currentDate"
                :show-current="currentDate" locale="es-419" ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Número de Despacho"
            type="Number"
            v-model="despacho.desnumero"
            class="custom px-2"
            filled
            dense
            :rules="[
              reglas.campoVacio(despacho.desnumero),
              reglas.soloNumerosPositivos(despacho.desnumero),
              //reglas.soloDiezDigitos(despacho.desnumero),
            ]"
            error-count="3"
            :disabled="bloquearCamposFormDespacho"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            label="Destino"
            v-model="despacho.desdestino"
            class="custom px-2"
            filled
            dense
            :rules="[reglas.campoVacio(despacho.desdestino)]"
            :disabled="bloquearCamposFormDespacho"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Motivo"
            v-model="despacho.desmotivo"
            class="custom px-2"
            filled
            dense
            :rules="[reglas.campoVacio(despacho.desmotivo)]"
            :disabled="bloquearCamposFormDespacho"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-checkbox      
          :disabled="bloquearCamposFormDespacho" 
          v-model="despacho.desorganico" 
          label="Orgánico"
          class="px-2" 
          filled ></v-checkbox>
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox 
          :disabled="bloquearCamposFormDespacho"
          v-model="despacho.desspp" 
          label="Simbolo de Pequeno Productor"
          class="px-2" 
          filled ></v-checkbox>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import servicioDespacho from "../services/ServicioDespacho";

export default {
  name: "FormularioDespacho",

  components: {
    vSelect,
  },

  data() {
    return {
      menuDateShow: "", // Variable de referencia para el menú de fecha toma muestra
      currentDate: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  computed: {

    // Obtiene el modelo despacho
    despacho: {
      get() {
        return this.$store.getters["moduloDespacho/despacho"];
      },
      set(v) {
        return this.$store.commit("moduloDespacho/agregarDespacho", v);
      },
    },


    // Obtiene la variable que indica si el formulario es valido
    formDespachoValido: {
      get() {
        return this.$store.getters["moduloDespacho/formDespachoValido"];
      },
      set(v) {
        return this.$store.commit("moduloDespacho/cambiarEstadoFormDespachoValido",v);
      },
    },


    // Obtiene la variable bloquearCamposFormDespacho
    bloquearCamposFormDespacho: {
      get() {
        return this.$store.getters["moduloDespacho/bloquearCamposFormDespacho"];
      },
      set(v) {
        return this.$store.commit("moduloDespacho/cambiarBloquearCamposFormDespacho", v);
      },
    },


    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),


    // Obtiene el modelo Despacho
    //...mapState("moduloDespacho", ["despacho"]),
  },

  methods: { },
};
</script>