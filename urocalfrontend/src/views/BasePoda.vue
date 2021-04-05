<template>
  <v-container fluid>
    <!-- Dialog para registrar nueva poda -->
    <DialogNuevoPoda ref="componentDialogNuevoPoda"></DialogNuevoPoda>

    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0" class="mt-5">
      <v-card-title class="py-2">
        <v-row no-gutters justify-md="space-between">
          <v-col cols="12" md="6">
            <div
              :class="[`text-h4`, `mb-4`]"
              class="transition-swing primary--text"
              v-text="nombre"
            ></div>
          </v-col>
          <v-col cols="12" md="6">
            <!-- Caja de búsqueda -->
            <v-text-field
              v-model="buscarPoda"
              append-icon="mdi-magnify"
              label="Buscar"
              class="custom"
              filled
              dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra lista de poda -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaPoda"
          sort-by="id_lote"
          :items="listaPodaStore"
          :search="buscarPoda"
          class="elevation-1"
        >
          <template v-slot:top>
            <!-- Dialog que muestra el formulario con toda la informacion de poda -->
            <DialogMostrarPoda
              ref="componentDialogMostrarPoda"
            ></DialogMostrarPoda>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirMostrarPoda(item)">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nueva poda -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          large
          color="primary"
          @click="cargarDialogNuevoPoda()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import DialogNuevoPoda from "@/components/DialogNuevoPoda";
import DialogMostrarPoda from "@/components/DialogMostrarPoda";
import ServicioPodas from "../services/ServicioPodas";
import ServicioFinca from "../services/ServicioFinca";
import servicioCultivo from "../services/ServicioCultivo";
import servicioLote from "../services/ServicioLote";

export default {
  name: "BasePoda",

  components: {
    DialogNuevoPoda,
    DialogMostrarPoda,
  },

<<<<<<< HEAD
=======
  mounted() {
    this.cargarListaPoda();
    // this.cargarListaCultivos();
  },
>>>>>>> 8f2d20847df712c65189b6986e90c5e632f0850c

  data() {
    return {
      nombre: "Gestión de Poda",
      buscarPoda: "", // Guarda el texto de búsqueda
      cabeceraTablaPoda: [
        // Detalla las cabeceras de la tabla
        {
          text: "Código de finca",
          value: "fincodigo",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Lote",
          value: "lotnumero",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Cultivo",
          value: "cultivo",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha de poda",
          value: "podfecha",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Tipo de poda",
          value: "podtipo",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Hectáreas",
          value: "podhectareas",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Cantidad de plantas",
          value: "podcantidadplantas",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Herramienta",
          value: "podherramienta",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Detalles",
          value: "actions",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
      ],
    };
  },

  computed: {
    // ...mapState('moduloPoda', ['editarPoda']),

    listaPodaStore: {
      get() {
        return JSON.parse(
          JSON.stringify(this.$store.getters["moduloPoda/listaPodasStore"])
        );
      },
      set(v) {
        return this.$store.commit("moduloPoda/establecerListaPodasStore", v);
      },
    },
    listaFincaStore: {
      get() {
        return JSON.parse(
          JSON.stringify(this.$store.getters["moduloFinca/listaFincaStore"])
        );
      },
      set(v) {
        return this.$store.commit("moduloFinca/establecerListaFincaStore", v);
      },
    },
    listaCultivoStore: {
      get() {
        return JSON.parse(
          JSON.stringify(this.$store.getters["moduloPoda/listaCultivoStore"])
        );
      },
      set(v) {
        return this.$store.commit("moduloPoda/establecerListaCultivoStore", v);
      },
    },
    listaloteStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloPoda/listaloteStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloPoda/establecerlistaloteStore",
          v
        );
      },
    },
    listaTipoStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloPoda/listaTipoStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloPoda/establecerlistaTipoStore",
          v
        );
      },
    },

    // Obtiene y modifica el estado de la variable dialogNuevoPoda
    dialogNuevoPoda: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoPoda"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoPoda", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarPoda
    dialogMostrarPoda: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarPoda"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarPoda", v);
      },
    },

    modeloPodaStore: {
      get() {
        return this.$store.getters["moduloPoda/modeloPodaStore"];
      },
      set(v) {
        return this.$store.commit("moduloPoda/establecerModeloPodaStore", v);
      },
    },

    editarPoda: {
      get() {
        return this.$store.getters["moduloPoda/editarPoda"];
      },
      set(v) {
        return this.$store.commit("moduloPoda/establecerEditarPoda", v);
      },
    },
  },

  methods: {
    async cargarListaPoda() {
      let listaPodas = [];
      let respuesta = await ServicioPodas.obtenerTodosPodas();
      let podas = await respuesta.data;
      podas.forEach((f) => {
        listaPodas.push(f);
      });
      this.listaPodaStore = listaPodas;
    },
    async cargarListaFinca() {
      let listaFinca = [];
      let respuesta = await ServicioFinca.obtenerTodosFincas();
      let datosFinca = await respuesta.data;
      datosFinca.forEach((finca) => {
        listaFinca.push(finca);
      });
      this.listaFincaStore = listaFinca;
    },

    tablaResponsiva() {
      // Ajusta el tamaño de la tabla para pantallas pequeñas
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          if (
            this.$vuetify.breakpoint.height >= 500 &&
            this.$vuetify.breakpoint.height <= 550
          ) {
            return "41vh";
          }
          if (
            this.$vuetify.breakpoint.height >= 551 &&
            this.$vuetify.breakpoint.height <= 599
          ) {
            return "44vh";
          }
          if (
            this.$vuetify.breakpoint.height >= 600 &&
            this.$vuetify.breakpoint.height <= 650
          ) {
            return "51vh";
          }
          if (
            this.$vuetify.breakpoint.height >= 651 &&
            this.$vuetify.breakpoint.height <= 699
          ) {
            return "53vh";
          }
          if (
            this.$vuetify.breakpoint.height >= 700 &&
            this.$vuetify.breakpoint.height <= 799
          ) {
            return "57vh";
          }
          if (this.$vuetify.breakpoint.height >= 800) {
            return "61vh";
          }
        default:
          return "auto";
      }
    },

    // Carga el DialogMostrarPoda
    abrirMostrarPoda(item) {
      this.dialogMostrarPoda = !this.dialogMostrarPoda; // Abre el DialogNuevoPoda
      // this.$refs.componentDialogMostrarPoda.$refs.componentFormPoda.$refs.formPoda.resetValidation();
      this.vaciarModeloPodaStore(); // Vacia el modelo poda
      this.editarPoda = true;

      // this.$store.commit(
      //   "moduloPoda/establecerEditarPoda",
      //   true
      // );
      this.modeloPodaStore = item;

      this.obtenerTodosListaCultivo();
      this.obtenerTodosLoteCultivadoDeFinca();
    },

    // Vacia el modelo
    ...mapMutations("moduloPoda", ["vaciarModeloPodaStore"]),
    async obtenerTodosListaCultivo() {
      let resultado = await servicioCultivo.obtenerCultivoDetalles(
        this.modeloPodaStore.lotecultivadoid
      );
      this.listaCultivoStore = resultado.data;
    },
    async obtenerTodosLoteCultivadoDeFinca() {
      let resultado = await servicioLote.obtenerTodosLoteCultivadoDeFinca(
        this.modeloPodaStore.fincaid
      );
      this.listaloteStore = resultado.data;
    },

    // Carga el DialogNuevoPoda
    cargarDialogNuevoPoda() {
      this.dialogNuevoPoda = !this.dialogNuevoPoda;
      this.$refs.componentDialogMostrarPoda.$refs.componentFormPoda.$refs.formPoda.resetValidation();
      // this.$refs.componentDialogNuevoPoda.$refs.componentFormPoda.limpiarIds();
      this.editarPoda = false;

      this.vaciarModeloPodaStore();
    },
  },

  created() {
    this.cargarListaPoda();
<<<<<<< HEAD
=======
    // this.cargarListaFinca();
>>>>>>> 8f2d20847df712c65189b6986e90c5e632f0850c
    this.$store.commit("colocarLayout", "LayoutProductor");
    
  },
};
</script>
