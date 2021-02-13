<template>
  <v-dialog
    v-model="dialogMostrarDetalleCompra"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
    :retain-focus="false"
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="primary white--text">
        <h5>Actualizar/eliminar</h5>
        <v-spacer></v-spacer>
        <v-btn icon @click="bloquearCamposFormDetalleCompra = false">
          <v-icon class="white--text">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogMostrarDetalleCompra()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario DetalleCompraa -->
      <v-card-text style="padding: 0px">
        <v-container class="pb-0">
          <FormDetalleCompra ref="componentFormDetalleCompra"></FormDetalleCompra>
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
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormDetalleCompra from "@/components/FormDetalleCompra";
import servicioDetalleCompra from "../services/ServicioDetalleCompra";
import servicioCompra from "../services/ServicioCompra";

export default {
  name: "MostrarDetalleCompra",

  components: {
    FormDetalleCompra,
  },

  data() {
    return {};
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogMostrarDetalleCompra
    dialogMostrarDetalleCompra: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarDetalleCompra"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarDetalleCompra", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarCompra
    dialogMostrarCompra: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarCompra"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogMostrarCompra", v);
      },
    },

    // Obtiene la variable bloquearCamposFormCompra
    estaActualizandoCompra: {
      get() {
        return this.$store.getters["moduloCompra/estaActualizandoCompra"];
      },
      set(v) {
        return this.$store.commit("moduloCompra/asignarEstaActualizandoCompra", v);
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

    // Obtiene la variable bloquearCamposFormDetalleCompra
    bloquearCamposFormDetalleCompra: {
      get() {
        return this.$store.getters["moduloDetalleCompra/bloquearCamposFormDetalleCompra"];
      },
      set(v) {
        return this.$store.commit(
          "moduloDetalleCompra/cambiarBloquearCamposFormDetalleCompra",
          v
        );
      },
    },

    ...mapState("moduloDetalleCompra", [
      "detCompra",
      "listaDetalleCompra",
      "formDetalleCompraValido",
      "fermentacion",
    ]),
    ...mapState("moduloCompra", ["compra"]),
  },

  methods: {
    ...mapMutations("moduloDetalleCompra", [
      "eliminarListaDetalleCompra",
      "eliminarListaDetalleCompraCache",
      "agregarListaDetalleCompra",
      "vaciarDetalleCompra",
      "asignarFermentacion",
      "asignarListaDetalleCompra",
    ]),

    // Cierra el dialogMostrarDetalleCompra
    cerrarDialogMostrarDetalleCompra() {
      this.dialogMostrarDetalleCompra = false;
      this.vaciarDetalleCompra();
      this.asignarFermentacion([]);
    },

    bloqueoBotonCambios() {
      return !this.bloquearCamposFormDetalleCompra &&
        this.formDetalleCompraValido &&
        this.fermentacion.length !== 0 &&
        this.detCompra.detestado !== "" &&
        this.detCompra.detestado !== null &&
        this.detCompra.detunidad !== "" &&
        this.detCompra.detunidad !== null
        ? false
        : true;
    },

    async guardarCambios() {
      // Si esta actualizando informacion
      if (this.estaActualizandoCompra) {
        // Si es una edicion en cache
        if (this.detCompra.hasOwnProperty("idAuxiliar")) {
          // Volver a pasar los id de los select a valores
          this.establecerValoresEstadoUnidad();
          this.detCompra.detarticulo = `Cacao _______ ${this.detCompra.detestado}`;

          // Actualiza la listaDetalleCompra
          this.eliminarListaDetalleCompraCache(this.detCompra.idAuxiliar);
          this.agregarListaDetalleCompra(this.detCompra);
          this.cerrarDialogMostrarDetalleCompra();
        } else {
          // Actualiza directamente desde la base de datos
          // Volver a pasar los id de los select a valores
          this.establecerValoresEstadoUnidad();
          this.detCompra.detarticulo = `Cacao _______ ${this.detCompra.detestado}`;

          // Actualiza la listaDetalleCompra
          this.eliminarListaDetalleCompra(this.detCompra.detallecompraid);
          this.agregarListaDetalleCompra(this.detCompra);

          try {
            await servicioDetalleCompra.actualizarDetalleCompra(this.detCompra);
            await servicioCompra.actualizarCompra(this.compra);

            this.$toast.success("Datos de compra actualizados");
            this.obtenerDetalleCompra(this.compra.compraid);
            this.obtenerTodosCompra();
            this.cerrarDialogMostrarDetalleCompra();
          } catch (error) {
            this.$toast.error(error.response.data.message);
          }
        }
      } else {
        // Esta registrando, solo edita en cache
        // Volver a pasar los id de los select a valores
        this.establecerValoresEstadoUnidad();
        this.detCompra.detarticulo = `Cacao _______ ${this.detCompra.detestado}`;

        // Actualiza la listaDetalleCompra
        this.eliminarListaDetalleCompraCache(this.detCompra.idAuxiliar);
        this.agregarListaDetalleCompra(this.detCompra);
        this.cerrarDialogMostrarDetalleCompra();
      }
    },

    establecerValoresEstadoUnidad() {
      switch (this.detCompra.detestado) {
        case "1":
          this.detCompra.detestado = "Seco";
          if (this.detCompra.detunidad === "1") this.detCompra.detunidad = "Libras";
          if (this.detCompra.detunidad === "2") this.detCompra.detunidad = "Quintales";
          break;

        case "2":
          this.detCompra.detestado = "En baba";
          if (this.detCompra.detunidad === "1") this.detCompra.detunidad = "Tachos";
          break;
      }
    },

    async obtenerDetalleCompra(compraid) {
      let respuestaServicioDetalleCompra = await servicioDetalleCompra.obtenerDetalleCompra(
        compraid
      );
      respuestaServicioDetalleCompra.data.forEach((detalle) => {
        detalle.detarticulo = `Cacao _______ ${detalle.detestado}`;
      });
      this.asignarListaDetalleCompra(respuestaServicioDetalleCompra.data);
    },

    // Llena la listaCompra con datos del servidor backend
    async obtenerTodosCompra() {
      let resultado = await servicioCompra.obtenerTodosCompra();
      this.listaCompra = resultado.data;
    },
  },

  watch: {
    // Cada vez que se abre el dialog, se resetean las validaciones del formulario
    dialogMostrarDetalleCompra() {
      if (this.dialogMostrarDetalleCompra) {
        setTimeout(() => {
          this.$refs.componentFormDetalleCompra.$refs.formDetalleCompra.resetValidation();
          this.bloquearCamposFormDetalleCompra = true;
        }, 100);
      }
    },
  },
};
</script>
