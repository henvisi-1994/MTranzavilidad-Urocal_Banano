<template>
  <v-form ref="formCompra" v-model="formCompraValidoCabecera">
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <v-text-field
            label="Productor"
            v-model="compra.productor"
            :rules="[reglas.campoVacio(compra.productor)]"
            class="custom px-2"
            dense
            filled
            :disabled="bloquearCamposFormCompra"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
            label="Organización"
            v-model="compra.organizacion"
            :rules="[reglas.campoVacio(compra.organizacion)]"
            class="custom px-2"
            dense
            filled
            :disabled="bloquearCamposFormCompra"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
            label="Código"
            v-model="compra.cod"
            :rules="[reglas.campoVacio(compra.cod)]"
            class="custom px-2"
            dense
            filled
            :disabled="bloquearCamposFormCompra"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-combobox
            dense
            v-model="compra.transporte"
            :disabled="bloquearCamposFormCompra"
            filled
            :items="transportes"
            item-text="vehplaca"
            item-value="vehplaca"
            label="Vehículo"
        />
      </v-col>

      <v-col cols="12" md="8">
        <v-text-field
            label="Lugar"
            v-model="compra.lugar"
            :rules="[reglas.campoVacio(compra.lugar)]"
            class="custom px-2"
            dense
            filled
            :disabled="bloquearCamposFormCompra"
        ></v-text-field>
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
import cars from '../services/ServicioVehiculo';
export default {
  name: "FormCompra",

  components: {
    vSelect,
  },

  data() {
    return {
      transportes:[],
      menuMostrarFechaEmision: "", // Variable de referencia para el menuMostrarFechaEmision
      fechaActual: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },
  mounted() {
      this.getTrans();
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

  methods: {
    getTrans() {
      cars.obtenerTodosVehiculos().then(res => {
        this.transportes = res.data;
        console.log(this.transportes)
      })
    }
  },
};
</script>
