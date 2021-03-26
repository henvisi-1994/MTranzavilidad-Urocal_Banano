<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo riego -->
    <DialogNuevoRiego ref="componentDialogNuevoRiego"></DialogNuevoRiego>

    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0" class="mt-5">
      <v-card-title class="py-2">
        <v-row no-gutters justify-md="space-between">
          <v-col cols="12" md="6">
            <div :class="[`text-h4`, `mb-4`]" class="transition-swing primary--text" v-text="nombre"></div>            
          </v-col>
          <v-col cols="12" md="6">
            <!-- Caja de búsqueda -->
            <v-text-field
              v-model="buscarRiego"
              append-icon="mdi-magnify"
              label="Buscar" class="custom" filled dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra lista de Riego -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaRiego"
          sort-by="id_lote"
          :items="listaRiegoStore"
          :search="buscarRiego"
          class="elevation-1">
          <template v-slot:top>
            <!-- Dialog que muestra el formulario con toda la informacion de Riego -->
            <DialogMostrarRiego ref="componentDialogMostrarRiego"></DialogMostrarRiego>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirMostrarRiego(item)"> mdi-eye </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo Riego -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px" large
          color="primary"
          @click="cargarDialogNuevoRiego()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import DialogNuevoRiego from "@/components/DialogNuevoRiego";
import DialogMostrarRiego from "@/components/DialogMostrarRiego";
import SerivicioRiegos from '../services/SerivicioRiegos';
import ServicioFinca from "../services/ServicioFinca";

export default {
  name: "BaseRiego",

  components: {
    DialogNuevoRiego,
    DialogMostrarRiego,
  },

  data() {
    return {
      nombre: "Gestión de Riego",
      buscarRiego: "", // Guarda el texto de búsqueda
      cabeceraTablaRiego: [
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
          value: "cultivoid",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Superficie",
          value: "riesuperficie",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Módulos",
          value: "riemodulos",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Semana",
          value: "riesemana",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Año",
          value: "rieanio",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Horas regadas",
          value: "riehorasregadas",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Porcentaje de eficiencia",
          value: "rieporcentajeeficiencia",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Volumen de agua utilizado",
          value: "rievolumenutilizado",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Operador",
          value: "rieoperario",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Sistema de riego",
          value: "riesistemariego",
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
    ...mapState('moduloRiego', ['editarRiego']),

    listaRiegoStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloRiego/listaRiegoStore"]));
      },
      set(v) {
        return this.$store.commit("moduloRiego/establecerListaRiegoStore", v);
      },
    },
    listaFincaStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloFinca/listaFincaStore"]));
      },
      set(v) {
        return this.$store.commit("moduloFinca/establecerListaFincaStore", v);
      },
    },
    // Obtiene y modifica el estado de la variable dialogNuevoRiego
    dialogNuevoRiego: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoRiego"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoRiego", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarRiego
    dialogMostrarRiego: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarRiego"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarRiego", v);
      },
    },

    modeloRiegoStore: {
      get() {
        return this.$store.getters["moduloRiego/modeloRiegoStore"];
      },
      set(v) {
        return this.$store.commit("moduloRiego/establecerModeloRiegoStore", v);
      },
    },

    editarRiego: {
      get() {
        return this.$store.getters["moduloRiego/editarRiego"];
      },
      set(v) {
        return this.$store.commit("moduloRiego/establecerEditarRiego", v);
      },
    },
  },

  methods: {
    ...mapMutations("moduloRiego", ["vaciarModeloRiegoStore"]),

    async cargarListaRiego () {
      let listaRiegos = [];
      let respuesta = await SerivicioRiegos.obtenerTodosRiegos();
      let riegos = await respuesta.data;
      riegos.forEach((f) => {
        listaRiegos.push(f);
      });
      this.listaRiegoStore = listaRiegos;
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

    abrirMostrarRiego(item) {
      this.dialogMostrarRiego = !this.dialogMostrarRiego; // Abre el DialogMostrarRiego
      this.$refs.componentDialogMostrarRiego.$refs.componentFormRiego.$refs.formRiego.resetValidation(); // Reinicia las validaciones de formRiego
      this.vaciarModeloRiegoStore(); // Vacia el modelo riego
      this.editarRiego = true;
      this.modeloRiegoStore = item;
    },

    cargarDialogNuevoRiego() {
      this.dialogNuevoRiego = !this.dialogNuevoRiego; // Abre el DialogNuevoRiego
      this.$refs.componentDialogNuevoRiego.$refs.componentFormRiego.$refs.formRiego.resetValidation();
      this.$refs.componentDialogNuevoRiego.$refs.componentFormRiego.limpiarIds();
      this.editarRiego = false;
      this.vaciarModeloRiegoStore();
    },
  },

  created() {
    this.cargarListaRiego();
    this.cargarListaFinca();
    this.$store.commit("colocarLayout", "LayoutProductor");
  },
};
</script>
