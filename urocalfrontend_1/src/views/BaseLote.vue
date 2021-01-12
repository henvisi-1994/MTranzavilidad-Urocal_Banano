<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo lote -->
    <DialogStepperLoteNuevo ref="DialogStepperLoteNuevo"></DialogStepperLoteNuevo>

    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0">
      <v-card-title class="py-0">
        <v-row no-gutters>
          <v-col cols="12" md="4">
            <!-- Caja de búsqueda -->
            <v-text-field
              v-model="buscarLote"
              append-icon="mdi-magnify"
              label="Buscar"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra los Lotes -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaLotes"
          sort-by="id_farm"
          :items="listaLotes"
          :search="buscarLote"
          class="elevation-1"
          dense
        >
          <template v-slot:top>
            <!-- Tabs que muestra la informacion detallada del lote -->
            <DialogTabMostrarLote ref="DialogTabsMostrarLote"></DialogTabMostrarLote>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirTabsMostrarLote()"> mdi-eye </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo Lote -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          color="primary"
          @click="cargarDialogStepperLoteNuevo()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";

import DialogStepperLoteNuevo from "../components/DialogStepperLoteNuevo";
import DialogTabMostrarLote from "../components/DialogTabMostrarLote";

export default {
  name: "BaseLote",

  components: {
    DialogStepperLoteNuevo,
    DialogTabMostrarLote,
  },

  data() {
    return {
      buscarLote: "", // Guarda el texto de búsqueda
      cabeceraTablaLotes: [
        // Detalla las cabeceras de la tabla
        {
          text: "Código de finca",
          value: "id_farm",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Número de lotes",
          value: "num_lote",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Nombre",
          value: "nombre_lote",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Hectareas",
          value: "hect_lote",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Observaciones",
          value: "obs_lote",
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
      listaLotes: [
        { id_farm: 1, num_lote: 5, nombre_lote: "Lote 5", hect_lote: 10, obs_lote: "N/A" },
        { id_farm: 15, num_lote: 2, nombre_lote: "Lote 3", hect_lote: 4, obs_lote: "N/A" },
        { id_farm: 10, num_lote: 1, nombre_lote: "Lote 1", hect_lote: 3, obs_lote: "N/A" },
        { id_farm: 12, num_lote: 4, nombre_lote: "Lote 2", hect_lote: 8, obs_lote: "N/A" },
        { id_farm: 8, num_lote: 5, nombre_lote: "Lote 4", hect_lote: 6, obs_lote: "N/A" },
        { id_farm: 5, num_lote: 2, nombre_lote: "Lote 1", hect_lote: 4, obs_lote: "N/A" },
        { id_farm: 16, num_lote: 3, nombre_lote: "Lote 3", hect_lote: 8, obs_lote: "N/A" },
        { id_farm: 14, num_lote: 4, nombre_lote: "Lote 5", hect_lote: 3, obs_lote: "N/A" },
        { id_farm: 4, num_lote: 5, nombre_lote: "Lote 1", hect_lote: 4, obs_lote: "N/A" },
        { id_farm: 16, num_lote: 1, nombre_lote: "Lote 4", hect_lote: 6, obs_lote: "N/A" },
      ], // Almacena una lista de Lotes, la misma se muestra en tabla
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogStepperLoteNuevo
    dialogStepperLoteNuevo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogStepperLoteNuevo"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogStepperLoteNuevo", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogTabMostrarLote
    dialogTabsMostrarLote: {
      get() {
        return this.$store.getters["gestionDialogos/dialogTabsMostrarLote"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogTabsMostrarLote", v);
      },
    },
  },

  methods: {
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

    // Vacia el modelo lot
    ...mapMutations("moduloLote", ["vaciarLote"]),

    // Vacia el modelo environment
    ...mapMutations("moduloMedioAmbiente", ["vaciarMedioAmbiente"]),

    // Vacia la lista de IDs de productos
    ...mapMutations("moduloProducto", ["vaciarlistaIDsProductos"]),

    // Vacia el modelo soil
    ...mapMutations("moduloSuelo", ["vaciarSuelo"]),

    // Carga el DialogStepperLoteNuevo
    cargarDialogStepperLoteNuevo() {
      this.dialogStepperLoteNuevo = !this.dialogStepperLoteNuevo; // Abre el DialogStepperLoteNuevo
      this.$refs.DialogStepperLoteNuevo.$refs.componentFormLote.$refs.formLote.resetValidation(); // Reinicia las validaciones de formLote
      this.$refs.DialogStepperLoteNuevo.$refs.componentFormMedioAmbiente.$refs.formMedioAmbiente.resetValidation(); // Reinicia las validaciones de formMedioAmbiente
      this.$refs.DialogStepperLoteNuevo.$refs.componentFormSuelo.$refs.formSuelo.resetValidation(); // Reinicia las validaciones de formSuelo
      this.vaciarLote(); // Vacia el modelo Lote
      this.vaciarMedioAmbiente(); // Vacia el modelo MedioAmbiente
      this.vaciarlistaIDsProductos(); // Vacia la listaIDsProductos
      this.vaciarSuelo(); // Vacia el modelo Suelo
    },

    abrirTabsMostrarLote() {
      this.dialogTabsMostrarLote = !this.dialogTabsMostrarLote;
      this.$refs.DialogTabsMostrarLote.$refs.componentTab.callSlider();
      this.$refs.DialogTabsMostrarLote.$refs.componentFormLote.$refs.formLote.resetValidation(); // Reinicia las validaciones de formLote
      this.$refs.DialogTabsMostrarLote.$refs.componentFormMedioAmbiente.$refs.formMedioAmbiente.resetValidation(); // Reinicia las validaciones de formMedioAmbiente
      this.$refs.DialogTabsMostrarLote.$refs.componentFormSuelo.$refs.formSuelo.resetValidation(); // Reinicia las validaciones de formSuelo
      this.vaciarLote(); // Vacia el modelo Lote
      this.vaciarMedioAmbiente(); // Vacia el modelo MedioAmbiente
      this.vaciarlistaIDsProductos(); // Vacia la listaIDsProductos
      this.vaciarSuelo(); // Vacia el modelo Suelo
    },
  },

  created() {
    this.$store.commit("colocarLayout", "LayoutProductor");
  },
};
</script>
