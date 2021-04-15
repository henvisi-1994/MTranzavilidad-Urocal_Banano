<template>
  <v-dialog
    v-model="dialogNuevoDetalleCompra"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    persistent
  >
    <v-card tile>
      <!-- Barra de titulo -->
      <v-card-title class="primary--text">
        <h5>NUEVO DETALLE COMPRA</h5>
        <v-spacer></v-spacer>
        <v-btn icon @click="cerrarDialogNuevoDetalleCompra()">
          <v-icon class="primary--text">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar DetalleCompra -->
          <FormDetalleCompra
            ref="componentFormDetalleCompra"
          ></FormDetalleCompra>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo DetalleCompra -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          color="primary"
          @click="registrar()"
          :disabled="validarRegistroDetalleCompra()"
          >Registrar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormDetalleCompra from "@/components/FormDetalleCompra";
import servicioCosecha from "../services/ServicioCosecha";

export default {
  name: "DialogNuevoDetalleCompra",

  components: {
    FormDetalleCompra,
  },

  data() {
    return {
      cantidadAC:0,
      valido: true,
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoDetalleCompra
    dialogNuevoDetalleCompra: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoDetalleCompra"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogNuevoDetalleCompra",
          v
        );
      },
    },

    // Obtiene y modifica la variable fermentacion
    fermentacion: {
      get() {
        return this.$store.getters["moduloDetalleCompra/fermentacion"];
      },
      set(v) {
        return this.$store.commit("moduloDetalleCompra/asignarFermentacion", v);
      },
    },

    // Obtiene la variable que indica si el formulario es valido
    formDetalleCompraValido: {
      get() {
        return this.$store.getters[
          "moduloDetalleCompra/formDetalleCompraValido"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloDetalleCompra/cambiarEstadoFormDetalleCompraValido",
          v
        );
      },
    },

    // Obtiene la variable bloquearCamposFormDetalleCompra
    bloquearCamposFormDetalleCompra: {
      get() {
        return this.$store.getters[
          "moduloDetalleCompra/bloquearCamposFormDetalleCompra"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloDetalleCompra/cambiarBloquearCamposFormDetalleCompra",
          v
        );
      },
    },

    // Obtiene es estado de la variable formDetalleCompraValido y el modelo DetalleCompra
    ...mapState("moduloDetalleCompra", [
      "formDetalleCompraValido",
      "detCompra",
      "listaDetalleCompra",
    ]),
  },

  methods: {
    // Vacia el modelo DetalleCompra
    ...mapMutations("moduloDetalleCompra", [
      "vaciarDetalleCompra",
      "agregarListaDetalleCompra",
    ]),

    // Registra nuevo DetalleCompra
    registrar() {
      this.detCompra.detarticulo = `Cacao _______ ${this.detCompra.detestado}`;
      this.agregarListaDetalleCompra(this.detCompra);
      let posicionAuxiliar = this.listaDetalleCompra.length - 1;
      this.listaDetalleCompra[posicionAuxiliar].idAuxiliar = posicionAuxiliar;
      this.cerrarDialogNuevoDetalleCompra();
    },
    async cantidadActual() {
      try {
        if (
          typeof this.detCompra.detallecompraid !== "undefined" ||
          this.detCompra.detallecompraid !== ""
        ) {
          let respuestaServicioCosecha = await servicioCosecha.obtenerCosechasSinDetalleCompra();
          this.listaCosechaSinDetalle = respuestaServicioCosecha.data.filter(
            (cosecha) => cosecha.cosechaid == this.detCompra.detallecompraid
          );
          let cantActCosecha = parseInt(
            this.listaCosechaSinDetalle[0].coscantidad
          );
          this.cantidadAC = cantActCosecha;
        } else {
          this.cantidadAC = 0;
        }
      } catch(error) {
        this.cantidadAC = 0;
      }
    },

    // Cierra el DialogNuevoDetalleCompra
    cerrarDialogNuevoDetalleCompra() {
      this.dialogNuevoDetalleCompra = false;
    },
    validarRegistroDetalleCompra() {
      this.cantidadActual();
      if(this.formDetalleCompraValido &&
        this.fermentacion.length !== 0 &&
        this.detCompra.detestado !== "" &&
        this.detCompra.detestado !== null &&
        this.detCompra.detunidad !== "" &&
        this.detCompra.detunidad !== null &&
        this.detCompra.detcantidadunidades <  this.cantidadAC){
          return false;
        } else {
          return true;
        }
    },
  },

  watch: {
    // Cada vez que se abre el dialog, se resetean las validaciones del formulario
    dialogNuevoDetalleCompra() {
      if (this.dialogNuevoDetalleCompra) {
        setTimeout(() => {
          this.$refs.componentFormDetalleCompra.$refs.formDetalleCompra.resetValidation();
          this.fermentacion = [];
          this.bloquearCamposFormDetalleCompra = false;
        }, 100);
      }
    },
  },
};
</script>
