<template>
  <v-dialog
    v-model="dialogNuevoRegistroEnvio"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="white primary--text">
        <h5>Nuevo Registro de Envio</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon
            class="primary--text"
            @click="cerrarDialogNuevoRegistroEnvio()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar RegistroEnvio -->
          <FormRegistroEnvio
            ref="componentFormRegistroEnvio"
          ></FormRegistroEnvio>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          color="primary"
          @click="agregarRegistroEnvio()"
          >Registrar</v-btn
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
  name: "DialogNuevoRegistroEnvio",
  components: {
    FormRegistroEnvio,
  },

  data() {
    return {};
  },
  computed: {
    formRegistroEnvioValido: {
      get() {
        return this.$store.getters[
          "moduloRegistroEnvio/formRegistroEnvioValido"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloRegistroEnvio/cambiarEstadoValidoFormRegistroEnvio",
          v
        );
      },
    },
    // Obtiene y modifica el estado de la variable dialogNuevoRegistroEnvio
    dialogNuevoRegistroEnvio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoRegistroEnvio"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogNuevoRegistroEnvio",
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
    ...mapState("validacionForm", ["reglas"]),
  },
  methods: {
    ...mapMutations("moduloRegistroEnvio", ["vaciarModeloRegistroEnvioStore"]),

    // Filtra cuando se escribe un codigo en la busqueda
    filtroCodigos(item, queryText) {
      const texto = item.codigo.toLowerCase();
      const busqueda = queryText.toLowerCase();

      return texto.indexOf(busqueda) > -1;
    },

    async agregarRegistroEnvio() {
      try {
        this.modeloRegistroEnvioStore.regdetalle=this.listaDetalleEnvioStore;
        let respuesta = await ServicioRegistroEnvio.agregarRegistroEnvio(
          this.modeloRegistroEnvioStore
        );
        this.$toast.success(respuesta.data.message);
        this.cerrarDialogNuevoRegistroEnvio();
        this.cargarListaRegistroEnvio();
        this.vaciarModeloRegistroEnvioStore();
        this.listaDetalleEnvioStore=[];
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
    // Cierra el dialogo
    cerrarDialogNuevoRegistroEnvio() {
      this.dialogNuevoRegistroEnvio = !this.dialogNuevoRegistroEnvio; // Cierra el dialogNuevoRegistroEnvio
    },
  },
};
</script>