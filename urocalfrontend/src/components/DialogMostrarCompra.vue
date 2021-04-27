<template>
  <div>
    <v-dialog
      v-model="dialogMostrarCompra"
      scrollable
      :fullscreen="$vuetify.breakpoint.xs ? true : false"
      max-width="800px"
      transition="dialog-transition"
      persistent
    >
      <v-card tile>
        <!-- Barra de titulo -->
        <v-card-title class="primary--text">
          <h5>INFORMACIÓN COMPRA</h5>
          <v-spacer></v-spacer>
          <v-btn icon @click="bloquearCamposFormCompra = false">
            <v-icon class="primary--text">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteCompra()">
            <v-icon class="primary--text">mdi-trash-can</v-icon>
          </v-btn>
          <v-btn icon @click="cerrarDialogMostrarCompra()">
            <v-icon class="primary--text">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <!-- Formulario Compra -->
        <v-card-text style="padding: 0px">
          <v-container class="py-0">
            <!-- Formulario para registrar CompraCabecera -->
            <FormCompraCabecera
              ref="componentFormCompraCabecera"
            ></FormCompraCabecera>
          </v-container>

          <v-card-title
            class="py-0 text-center"
            style="border-bottom: 1px solid #10949e"
          >
            <v-spacer></v-spacer>
            <h5 class="ml-9 primary--text">DETALLE</h5>
            <v-spacer></v-spacer>
            <v-btn
              icon
              @click="abrirDialogNuevoDetalleCompra()"
              :disabled="bloqueBotonNuevoDetalleCompra()"
            >
              <v-icon class="primary--text">mdi-plus-circle</v-icon>
            </v-btn>
          </v-card-title>
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
          <!-- Botón para editar compra -->
          <v-btn
            :block="$vuetify.breakpoint.xs ? true : false"
            width="200px"
            color="primary"
            :disabled="bloqueoBotonCambios()"
            @click="guardarCambios()"
            >Guardar cambios</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import compraService from "./../services/ServicioCompra";
import FormCompraCabecera from "@/components/FormCompraCabecera";
import FormCompraPie from "@/components/FormCompraPie";
import DatatableDetalleCompra from "@/components/DatatableDetalleCompra";
import DialogNuevoDetalleCompra from "@/components/DialogNuevoDetalleCompra";
import servicioCompra from "../services/ServicioCompra";
import servicioDetalleCompra from "../services/ServicioDetalleCompra";

export default {
  name: "DialogMostrarCompra",

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
    ...mapState("moduloDetalleCompra", ["listaDetalleCompra"]),
    ...mapState("moduloCompra", ["compra"]),

    // Obtiene y modifica el estado de la variable dialogMostrarCompra
    dialogMostrarCompra: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarCompra"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogMostrarCompra",
          v
        );
      },
    },

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

    // Obtiene la variable bloquearCamposFormCompra
    bloquearCamposFormCompra: {
      get() {
        return this.$store.getters["moduloCompra/bloquearCamposFormCompra"];
      },
      set(v) {
        return this.$store.commit(
          "moduloCompra/cambiarBloquearCamposFormCompra",
          v
        );
      },
    },

    // Obtiene la variable bloquearCamposFormCompra
    estaActualizandoCompra: {
      get() {
        return this.$store.getters["moduloCompra/estaActualizandoCompra"];
      },
      set(v) {
        return this.$store.commit(
          "moduloCompra/asignarEstaActualizandoCompra",
          v
        );
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

    ...mapState("moduloCompra", [
      "formCompraValidoCabecera",
      "formCompraValidoPie",
    ]),
  },

  methods: {
    // Vacia el modelo DetalleCompra
    ...mapMutations("moduloDetalleCompra", ["vaciarDetalleCompra"]),

    // Vacia el modelo DetalleCompra
    ...mapMutations("moduloCompra", ["vaciarCompra"]),

    // Abre el DialogNuevoDetalleCompra
    abrirDialogNuevoDetalleCompra() {
      this.dialogNuevoDetalleCompra = true;
      this.vaciarDetalleCompra();
    },

    // Cierra el dialogMostrarCompra
    cerrarDialogMostrarCompra() {
      this.dialogMostrarCompra = false;
      this.estaActualizandoCompra = false;
      this.vaciarDetalleCompra();
      this.vaciarCompra();
    },

    // Desbloquea o bloquea el boton de guardar cambios segun el tab donde se encuentre
    bloqueoBotonCambios() {
      return !this.bloquearCamposFormCompra &&
        this.formCompraValidoCabecera &&
        this.formCompraValidoPie
        ? false
        : true;
    },

    bloqueBotonNuevoDetalleCompra() {
      return !this.bloquearCamposFormCompra ? false : true;
    },

    async guardarCambios() {
      try {
        let respuestaServicioCompra = await servicioCompra.actualizarCompra(
          this.compra
        );

        this.listaDetalleCompra.forEach(async (detalleCompra) => {
          if (detalleCompra.hasOwnProperty("idAuxiliar")) {
            detalleCompra.compraid = this.compra.compraid;
            await servicioDetalleCompra.crearDetalleCompra(detalleCompra);
          } else {
            await servicioDetalleCompra.actualizarDetalleCompra(detalleCompra);
          }
        });

        this.$toast.success(respuestaServicioCompra.data.message);
        this.obtenerTodosCompra();
        this.cerrarDialogMostrarCompra();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    // Llena la listaCompra con datos del servidor backend
    async obtenerTodosCompra() {
      let resultado = await servicioCompra.obtenerTodosCompra();
      this.listaCompra = resultado.data;
    },

    deleteCompra() {
      compraService.deleteCompra(this.compra.compraid).then((res) => {
        if (res.data) {
          this.obtenerTodosCompra();
          this.$toast.warning("Compra eliminada con éxito");
          this.cerrarDialogMostrarCompra();
        }
      });
    },
  },

  watch: {
    // Cada vez que se abre el dialog, se resetean las validaciones del formulario
    dialogMostrarCompra() {
      if (this.dialogMostrarCompra) {
        setTimeout(() => {
          this.$refs.componentFormCompraCabecera.$refs.formCompra.resetValidation();
          this.$refs.componentFormCompraPie.$refs.formCompra.resetValidation();

          this.bloquearCamposFormCompra = true;
          this.estaActualizandoCompra = true;
        }, 100);
      }
    },
  },
};
</script>
