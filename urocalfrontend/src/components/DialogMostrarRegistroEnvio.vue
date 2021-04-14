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
        <v-btn icon>
          <v-icon class="primary--text" @click="eliminarRegistro()"
            >mdi-trash-can</v-icon
          >
        </v-btn>
        <v-btn icon>
          <v-icon
            class="primary--text"
            @click="cerrarDialogMostrarRegistroEnvio()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>
      <!--Inicio Formulario RegistroEnvio -->
      <!--
      <v-card-text style="padding: 0px">
        <v-container>
          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-text-field
                class="custom px-2"
                filled
                dense
                label="Fecha"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                class="custom px-2"
                filled
                dense
                label="Tipo"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-text-field
                class="custom px-2"
                filled
                dense
                label="Lote"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                class="custom px-2"
                filled
                dense
                label="Destino"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row no-gutters justify-md="space-around">
            <v-col cols="12">
              <v-card elevation="0">
                <v-card-title class="primary--text"> Detalle </v-card-title>
                <v-card-text>
                  <v-data-table
                    :headers="cabeceraTablaDetalle"
                    :items="listaDetalles"
                    class="elevation-1"
                  >
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      -->
      <!--Fin Formulario RegistroEnvio -->
      <!-- Formulario RegistroEnvio -->
      <v-card-text style="padding: 0px">
        <v-container>
          <FormRegistroEnvio
            ref="componentFormRegistroEnvio"
          ></FormRegistroEnvio>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <v-btn
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
      cabeceraTablaDetalle: [
        {
          text: "Código",
          value: "codigo",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha",
          value: "fecha",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Productor",
          value: "productor",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "QQ Entregados",
          value: "qqentregados",
          align: "center",
          class: "grey lighten-3",
        },
      ],
      listaDetalles: [],
    };
  },
  computed: {
    // ...mapState("moduloRegistroEnvio", ["modeloRegistroEnvioStore"]),

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
        const respuesta = await ServicioRegistroEnvio.eliminarRegistroEnvio(
          this.modeloRegistroEnvioStore.registroenvioid
        );
        this.$toast.error(respuesta.data.message);
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