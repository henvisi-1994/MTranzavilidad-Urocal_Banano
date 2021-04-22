<template>
  <div>
    <v-dialog
      v-model="dialogNuevoCompra"
      scrollable
      :fullscreen="$vuetify.breakpoint.xs ? true : false"
      max-width="800px"
      transition="dialog-transition"
      persistent
    >
      <v-card tile>
        <!-- Barra de titulo -->
        <v-card-title class="primary--text">
          <h5>NUEVA COMPRA</h5>
          <v-spacer></v-spacer>
          <v-btn icon @click="cerrarDialogNuevoCompra()">
            <v-icon class="primary--text">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-0">
          <v-container class="pb-0">
            <!-- Formulario para registrar CompraCabecera -->
            <FormCompraCabecera ref="componentFormCompraCabecera"></FormCompraCabecera>
          </v-container>

          <v-card-title class="py-0 text-center" style="border-bottom: 1px solid #10949e">
            <!-- style="background: #78cdd1" -->
            <v-spacer></v-spacer>
            <h5 class="ml-9 mt-5 primary--text">DETALLE</h5>
            <v-spacer></v-spacer>
            <v-btn icon @click="abrirDialogNuevoDetalleCompra()">
              <v-icon class="primary--text">mdi-plus-circle</v-icon>
            </v-btn>
          </v-card-title>
          <!-- <v-container :class="$vuetify.breakpoint.xs ? 'py-0' : 'py-0'"> -->
          <v-container class="px-0">
            <!-- Tabla del DetalleCompra -->
            <DatatableDetalleCompra
              ref="componentDatatableDetalleCompra"
            ></DatatableDetalleCompra>
          </v-container>

          <v-container class="py-0">
            <!-- Formulario para registrar CompraCabecera -->
            <FormCompraPie ref="componentFormCompraPie"></FormCompraPie>
          </v-container>
        </v-card-text>

        <v-card-actions class="justify-center pb-3">
          <!-- Botón para agregar nuevo Compra -->
          <v-btn
            :block="$vuetify.breakpoint.xs ? true : false"
            width="300px" large elevation="0"
            color="primary"
            :disabled="validarRegistro()"
            @click="registrar()"
            >Registrar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <DialogNuevoDetalleCompra
      ref="componentDialogNuevoDetalleCompra"
    ></DialogNuevoDetalleCompra>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormCompraCabecera from "@/components/FormCompraCabecera";
import FormCompraPie from "@/components/FormCompraPie";
import DatatableDetalleCompra from "@/components/DatatableDetalleCompra";
import DialogNuevoDetalleCompra from "@/components/DialogNuevoDetalleCompra";

import servicioCompra from "../services/ServicioCompra";
import servicioDetalleCompra from "../services/ServicioDetalleCompra";

export default {
  name: "DialogNuevoCompra",

  components: {
    FormCompraCabecera,
    FormCompraPie,
    DatatableDetalleCompra,
    DialogNuevoDetalleCompra,
  },

  data() {
    return {};
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoCompra
    dialogNuevoCompra: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoCompra"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoCompra", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogNuevoDetalleCompra
    dialogNuevoDetalleCompra: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoDetalleCompra"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoDetalleCompra", v);
      },
    },

    // Obtiene y modifica la variable listaCompra
    listaCompra: {
      get() {
        return this.$store.getters["moduloCompra/listaCompra"];
      },
      set(v) {
        return this.$store.commit("moduloCompra/asignarListaCompra", v);
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

    // Obtiene es estado de la variable formCompraValidoCabecera, formCompraValidoPie y el modelo compra
    ...mapState("moduloCompra", [
      "formCompraValidoCabecera",
      "formCompraValidoPie",
      "compra",
    ]),

    // Obtiene la listaDetalleCompra
    ...mapState("moduloDetalleCompra", ["listaDetalleCompra"]),
  },

  methods: {
    // Registra dependiendo el tab donde se encuentre
    async registrar() {
      try {
        let respuestaServicioCompra = await servicioCompra.crearCompra(this.compra);

        this.listaDetalleCompra.forEach(async (detalleCompra) => {
          detalleCompra.compraid = respuestaServicioCompra.data.compraid;
          await servicioDetalleCompra.crearDetalleCompra(detalleCompra);
          
        });

        this.$toast.success(respuestaServicioCompra.data.message);
        this.obtenerTodosCompra();
        this.vaciarDetalleCompra();
        this.asignarFermentacion = [];
        this.vaciarCompra();
        this.cerrarDialogNuevoCompra();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    // Cierra el DialogNuevoCompra
    cerrarDialogNuevoCompra() {
      this.dialogNuevoCompra = false;
    },

    // Obtiene metodo vaciarDetalleCompra
    ...mapMutations("moduloDetalleCompra", [
      "vaciarDetalleCompra",
      "vaciarListaDetalleCompra",
      "asignarFermentacion",
    ]),

    // Obtiene metodo vaciarCompra y vaciarListaDetalleCompra
    ...mapMutations("moduloCompra", ["vaciarCompra"]),

    // Abre el DialogNuevoDetalleCompra
    abrirDialogNuevoDetalleCompra() {
      this.dialogNuevoDetalleCompra = true;
      this.vaciarDetalleCompra();
    },

    validarRegistro() {
      return this.formCompraValidoCabecera &&
        this.formCompraValidoPie &&
        this.compra.guiaremisionid != null &&
        this.compra.guiaremisionid != "" &&
        this.listaDetalleCompra.length != 0
        ? false
        : true;
    },

    // Llena la listaCompra con datos del servidor backend
    async obtenerTodosCompra() {
      let resultado = await servicioCompra.obtenerTodosCompra();
      this.listaCompra = resultado.data;
    },
  },

  watch: {
    // Cada vez que se abre el dialog, se resetean las validaciones del formulario y se vacia el detalle
    dialogNuevoCompra() {
      if (this.dialogNuevoCompra) {
        setTimeout(() => {
          this.$refs.componentFormCompraCabecera.$refs.formCompra.resetValidation();
          this.$refs.componentFormCompraPie.$refs.formCompra.resetValidation();

          this.bloquearCamposFormCompra = false;
        }, 100);
      }
    },
  },
};
</script>
