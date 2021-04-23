<template>
  <v-dialog
    v-model="dialogMostrarRegistroEnvio"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0">
      <v-card-title class="white primary--text">
        <h5>Actualizar/eliminar</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="primary--text" @click="cambiarEstadoEditar()"
            >mdi-pencil</v-icon
          >
        </v-btn>

        <v-dialog v-model="dialog" persistent max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon>
              <v-icon class="primary--text" v-bind="attrs" v-on="on"
                >mdi-trash-can</v-icon
              >
            </v-btn>
          </template>
          <v-card>
            <v-card-text
              >Se eliminara el registro con el detalle. ¿Quiere eliminar de
              todas formas?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">
                Cancelar
              </v-btn>
              <v-btn color="green darken-1" text @click="eliminarRegistro()">
                Eliminar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn icon>
          <v-icon
            class="primary--text"
            @click="cerrarDialogMostrarRegistroEnvio()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <FormRegistroEnvio
            ref="componentFormRegistroEnvio"
          ></FormRegistroEnvio>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <v-btn
          :disabled="editarRegistroEnvio"
          :block="$vuetify.breakpoint.xs ? true : false"
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

import FormRegistroEnvio from "@/components/FormRegistroEnvio";
import ServicioRegistroEnvio from "../services/ServicioRegistroEnvio";

export default {
  name: "DialogMostrarRegistroEnvio",
  components: {
    FormRegistroEnvio,
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    dialogMostrarRegistroEnvio: {
      get() {
        return this.$store.getters[
          "gestionDialogos/dialogMostrarRegistroEnvio"
        ];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit(
          "gestionDialogos/toggleDialogMostrarRegistroEnvio",
          v
        );
      },
    },
    modeloRegistroEnvioStore: {
      get() {
        return this.$store.getters[
          "moduloRegistroEnvio/modeloRegistroEnvioStore"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloRegistroEnvio/establecerModeloRegistroEnvioStore",
          v
        );
      },
    },
    listaRegistroEnvioStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloRegistroEnvio/listaRegistroEnvioStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloRegistroEnvio/establecerListaRegistroEnvioStore",
          v
        );
      },
    },
    listaDetalleEnvioStore: {
      get() {
        return this.$store.getters[
          "moduloRegistroEnvio/listaDetalleEnvioStore"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloRegistroEnvio/establecerListaDetalleEnvioStore",
          v
        );
      },
    },
    editarRegistroEnvio: {
      get() {
        return this.$store.getters["moduloRegistroEnvio/editarRegistroEnvio"];
      },
      set(v) {
        return this.$store.commit(
          "moduloRegistroEnvio/establecerEditarRegistroEnvio",
          v
        );
      },
    },
  },
  methods: {
    async actualizarRegistro() {
      try {
        this.modeloRegistroEnvioStore.regdetalle = this.listaDetalleEnvioStore;
        const respuesta = await ServicioRegistroEnvio.actualizarRegistroEnvio(
          this.modeloRegistroEnvioStore.registroenvioid,
          this.modeloRegistroEnvioStore
        );
        this.$toast.success(respuesta.data.message);
        this.cargarListaRegistroEnvio();
        this.cerrarDialogMostrarRegistroEnvio();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },
    async cargarListaRegistroEnvio() {
      let listaRegistroEnvio = [];
      let respuesta = await ServicioRegistroEnvio.obtenerTodosRegistroEnvio();
      let registrosEnvios = await respuesta.data;
      registrosEnvios.forEach((f) => {
        listaRegistroEnvio.push(f);
      });
      this.listaRegistroEnvioStore = listaRegistroEnvio;
    },
    async eliminarRegistro() {
      try {
        this.dialog = false;
        const respuesta = await ServicioRegistroEnvio.eliminarRegistroEnvio(
          this.modeloRegistroEnvioStore.registroenvioid
        );
        this.$toast.warning(respuesta.data.message);
        this.cargarListaRegistroEnvio();
        this.cerrarDialogMostrarRegistroEnvio();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },
    cambiarEstadoEditar() {
      this.$store.commit(
        "moduloRegistroEnvio/establecerEditarRegistroEnvio",
        false
      );
    },
    formatDate(fecha) {
      if (!fecha) return null;

      const [year, month, day] = fecha.split("-");
      return `${day}/${month}/${year}`;
    },
    ...mapMutations("moduloRegistroEnvio", ["vaciarModeloRegistroEnvioStore"]),

    // Cierra el dialogo
    cerrarDialogMostrarRegistroEnvio() {
      this.dialogMostrarRegistroEnvio = !this.dialogMostrarRegistroEnvio; // Cierra el dialogMostrarLimpiezaHerramienta
      this.vaciarModeloRegistroEnvioStore();
      this.cargarListaRegistroEnvio();
    },
  },
};
</script>
<style>
</style>