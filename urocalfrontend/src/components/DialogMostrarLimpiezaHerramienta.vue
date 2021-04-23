<template>
  <v-dialog
    v-model="dialogMostrarLimpiezaHerramienta"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
    persistent
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="white primary--text">
        <h5>Actualizar/eliminar</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="primary--text" @click="cambiarEstadoEditar()"
            >mdi-pencil</v-icon
          >
        </v-btn>
        <v-btn icon>
          <v-icon class="primary--text" @click="eliminarRegistro()"
            >mdi-trash-can</v-icon
          >
        </v-btn>
        <v-btn icon>
          <v-icon
            class="primary--text"
            @click="cerrarDialogMostrarLimpiezaHerramienta()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario LimpiezaHerramienta -->
      <v-card-text style="padding: 0px">
        <v-container>
          <FormLimpiezaHerramienta
            ref="componentFormLimpiezaHerramienta"
          ></FormLimpiezaHerramienta>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          :disabled="editarLimpiezaHerramienta"
          width="300px"
          large
          elevation="0"
          color="primary"
          @click="actualizarRegistro()"
          >Guardar Cambios</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormLimpiezaHerramienta from "@/components/FormLimpiezaHerramienta";
import ServicioLimpiezaHerramienta from "../services/ServicioLimpiezaHerramienta";

export default {
  name: "MostrarLimpiezaHerramienta",

  components: {
    FormLimpiezaHerramienta,
  },

  computed: {
    ...mapState("moduloLimpiezaHerramienta", [
      ,
      "modeloLimpiezaHerramientaStore",
    ]),
    dialogMostrarLimpiezaHerramienta: {
      get() {
        return this.$store.getters[
          "gestionDialogos/dialogMostrarLimpiezaHerramienta"
        ];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit(
          "gestionDialogos/toggleDialogMostrarLimpiezaHerramienta",
          v
        );
      },
    },

    modeloLimpiezaHerramientaStore: {
      get() {
        return this.$store.getters[
          "moduloLimpiezaHerramienta/limpiezaHerramienta"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloLimpiezaHerramienta/nuevoLimpiezaHerramienta",
          v
        );
      },
    },

    editarLimpiezaHerramienta: {
      get() {
        return this.$store.getters[
          "moduloLimpiezaHerramienta/editarLimpiezaHerramienta"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloLimpiezaHerramienta/establecerEditarimpiezaHerramienta",
          v
        );
      },
    },
        listaLimpiezaHerramientaStore: {
      get() {
        return this.$store.getters[
          "moduloLimpiezaHerramienta/listaLimpiezaHerramientaStore"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloLimpiezaHerramienta/establecerListaLimpiezaHerramientaStore",
          v
        );
      },
    },
  },

  methods: {
    // UPDATE: Actualiza un registro
    async actualizarRegistro() {
      try {
        let respuesta = await ServicioLimpiezaHerramienta.actualizarLimpiezaHerramienta(
          this.modeloLimpiezaHerramientaStore.limpiezaherramientaid,
          this.modeloLimpiezaHerramientaStore
        );
        this.$toast.success(respuesta.data.message);
        this.cargarListaLimpiezaHerramienta();
        this.cerrarDialogMostrarLimpiezaHerramienta();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    // #  MANIPULACIÓN DE DATOS  #
    async cargarListaLimpiezaHerramienta() {
      let listaLimpiezaHerramienta = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioLimpiezaHerramienta.obtenerTodosLimpiezaHerramienta(); // Obtener respuesta de backend
      let datosLimpiezaHerramienta = await respuesta.data; // Rescatar datos de la respuesta
      datosLimpiezaHerramienta.forEach((LimpiezaHerramienta) => {
        // Guardar cada registro en la 'lista de datos'
        listaLimpiezaHerramienta.push(LimpiezaHerramienta);
      });
      this.listaLimpiezaHerramientaStore = listaLimpiezaHerramienta;
    },

    async eliminarRegistro() {
      try {
        let respuesta = await ServicioLimpiezaHerramienta.eliminarLimpiezaHerramienta(
          this.modeloLimpiezaHerramientaStore.limpiezaherramientaid
        );
        this.$toast.error(respuesta.data.message);

        this.cargarListaLimpiezaHerramienta();


        this.cerrarDialogMostrarLimpiezaHerramienta();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    // Vacia el modelo LimpiezaHerramienta
    ...mapMutations("moduloLimpiezaHerramienta", ["vaciarLimpiezaHerramienta"]),

    cerrarDialogMostrarLimpiezaHerramienta() {
      this.dialogMostrarLimpiezaHerramienta = !this
        .dialogMostrarLimpiezaHerramienta; // Cierra el dialogMostrarLimpiezaHerramienta
      this.vaciarLimpiezaHerramienta(); // Vacia el modelo LimpiezaHerramienta
      this.cargarListaLimpiezaHerramienta();
    },

    cambiarEstadoEditar() {
      this.$store.commit(
        "moduloLimpiezaHerramienta/establecerEditarimpiezaHerramienta",
        false
      );

    },

    // FORMATO: Modifica el formato de la fecha a dd/mm/aaaa
    formatDate(fecha) {
      if (!fecha) return null;

      const [year, month, day] = fecha.split("-");
      return `${day}/${month}/${year}`;
    },
  },
};
</script>
