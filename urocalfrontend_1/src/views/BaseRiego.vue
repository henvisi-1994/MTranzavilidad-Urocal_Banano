<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo riego -->
    <DialogNuevoRiego ref="componentDialogNuevoRiego"></DialogNuevoRiego>

    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0">
      <v-card-title class="py-0">
        <v-row no-gutters>
          <v-col cols="12" md="4">
            <!-- Caja de búsqueda -->
            <v-text-field
              v-model="buscarRiego"
              append-icon="mdi-magnify"
              label="Buscar"
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
          :items="listaRiego"
          :search="buscarRiego"
          class="elevation-1"
          dense
        >
          <template v-slot:top>
            <!-- Dialog que muestra el formulario con toda la informacion de Riego -->
            <DialogMostrarRiego ref="componentDialogMostrarRiego"></DialogMostrarRiego>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirMostrarRiego()"> mdi-eye </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo Riego -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          color="primary"
          @click="cargarDialogNuevoRiego()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

import DialogNuevoRiego from "@/components/DialogNuevoRiego";
import DialogMostrarRiego from "@/components/DialogMostrarRiego";

export default {
  name: "BaseRiego",

  components: {
    DialogNuevoRiego,
    DialogMostrarRiego,
  },

  data() {
    return {
      buscarRiego: "", // Guarda el texto de búsqueda
      cabeceraTablaRiego: [
        // Detalla las cabeceras de la tabla
        {
          text: "Código de finca",
          value: "codigo_finca",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Lote",
          value: "lote",
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
          text: "Detalles",
          value: "actions",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
      ],
      listaRiego: [{ codigo_finca: 1, id_farm: 1 }], // Almacena una lista de Riego, la misma se muestra en tabla
    };
  },

  computed: {
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

    // Carga el DialogMostrarRiego
    abrirMostrarRiego() {
      this.dialogMostrarRiego = !this.dialogMostrarRiego; // Abre el DialogMostrarRiego
      this.$refs.componentDialogMostrarRiego.$refs.componentFormRiego.$refs.formRiego.resetValidation(); // Reinicia las validaciones de formRiego
      this.vaciarRiego(); // Vacia el modelo riego
    },

    // Vacia el modelo Riego
    ...mapMutations("moduloRiego", ["vaciarRiego"]),

    // Carga el DialogNuevoRiego
    cargarDialogNuevoRiego() {
      this.dialogNuevoRiego = !this.dialogNuevoRiego; // Abre el DialogNuevoRiego
      this.$refs.componentDialogNuevoRiego.$refs.componentFormRiego.$refs.formRiego.resetValidation(); // Reinicia las validaciones de formRiego
      this.vaciarRiego(); // Vacia el modelo Riego
    },
  },

  created() {
    this.$store.commit("colocarLayout", "LayoutProductor");
  },
};
</script>
