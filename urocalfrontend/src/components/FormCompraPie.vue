<template>
  <v-form ref="formCompra" v-model="formCompraValidoPie">
    <v-row no-gutters class="mt-5">
      <v-col cols="6" md="6">
        <v-text-field
          type="Number"
          label="Subtotal"
          v-model="precioSubtotal"
          class="custom px-2"
          dense
          filled
          disabled
        ></v-text-field
      ></v-col>
      <v-col cols="6" md="6">
        <v-text-field
          type="Number"
          label="Descuento"
          v-model="compra.comdescuentos"
          :rules="[
            reglas.campoVacio(compra.comdescuentos),
            reglas.soloNumerosPositivos(compra.comdescuentos),
          ]"
          error-count="2"
          class="custom px-2"
          dense
          filled
          :disabled="bloquearCamposFormCompra"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="6" md="6">
        <v-text-field
          type="Number"
          label="Otros valores"
          v-model="compra.comotrosvalores"
          :rules="[
            reglas.campoVacio(compra.comotrosvalores),
            reglas.soloNumerosPositivos(compra.comdescuentos),
          ]"
          error-count="2"
          class="custom px-2"
          dense
          filled
          :disabled="bloquearCamposFormCompra"
        ></v-text-field>
      </v-col>
      <v-col cols="6" md="6">
        <v-text-field
          type="Number"
          label="Total"
          v-model="precioTotal"
          class="custom px-2"
          dense
          filled
          disabled
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-textarea
          label="Observaciones"
          rows="2"
          v-model="compra.comobservaciones"
          :rules="[reglas.campoVacio(compra.comobservaciones)]"
          class="custom px-2"
          dense
          filled
          no-resize
          :disabled="bloquearCamposFormCompra"
        ></v-textarea>
      </v-col>
      <v-col cols="12" md="6"> </v-col>
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
      listaFinca: [
        {
          fincaid: 1,
          fincanombre: "Finca 1",
        },
        {
          fincaid: 2,
          fincanombre: "Finca 2",
        },
        {
          fincaid: 3,
          fincanombre: "Finca 3",
        },
      ],
      listaLote: [
        {
          loteid: 1,
          lotenombre: "Lote 1",
        },
        {
          loteid: 2,
          lotenombre: "Lote 2",
        },
        {
          loteid: 3,
          lotenombre: "Lote 3",
        },
      ],
      listaCultivo: [
        {
          cultivoid: 1,
          cultivonombre: "Cultivo 1",
        },
        {
          cultivoid: 2,
          cultivonombre: "Cultivo 2",
        },
        {
          cultivoid: 3,
          cultivonombre: "Cultivo 3",
        },
      ],
      listaTipo: [
        {
          tipoid: 1,
          podatipo: "Tipo 1",
        },
        {
          tipoid: 2,
          podatipo: "Tipo 2",
        },
        {
          tipoid: 3,
          podatipo: "Tipo 3",
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
    formCompraValidoPie: {
      get() {
        return this.$store.getters["moduloCompra/formCompraValidoPie"];
      },
      set(v) {
        return this.$store.commit("moduloCompra/cambiarEstadoValidoFormCompraPie", v);
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

    precioSubtotal() {
      let subtotal = 0;
      let lista = this.$store.state.moduloDetalleCompra.listaDetalleCompra; // Obtiene la listaDetalleCompra
      lista.forEach((detalle) => {
        subtotal = subtotal + parseFloat(detalle.detpreciototal);
      });
      this.compra.comsubtotal = subtotal;
      return this.compra.comsubtotal;
    },

    precioTotal() {
      let total = 0;
      let descuento = this.compra.comdescuentos ? this.compra.comdescuentos : 0;
      let otrosValores = this.compra.comotrosvalores ? this.compra.comotrosvalores : 0;

      total = this.compra.comsubtotal - descuento + parseFloat(otrosValores);

      total = isNaN(total) ? 0 : total;

      this.compra.comtotal = total;

      return this.compra.comtotal;
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>
