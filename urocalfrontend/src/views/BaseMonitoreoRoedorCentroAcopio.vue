<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo DialogNuevoMonitoreoRoedorCentroAcopio -->
    <DialogNuevoMonitoreoRoedorCentroAcopio
      ref="DialogNuevoMonitoreoRoedorCentroAcopio"
    ></DialogNuevoMonitoreoRoedorCentroAcopio>

    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0">
      <v-card-title class="py-0">
        <v-row no-gutters>
          <v-col cols="12" md="4">
            <!-- Caja de búsqueda -->
            <v-text-field
              v-model="buscarMonitoreoRoedor"
              append-icon="mdi-magnify"
              label="Buscar"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra los MonitoreoRoedorCentroAcopio -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaMonitoreoRoedor"
          sort-by="monitoreoroedorid"
          :items="listaMonitoreoRoedor"
          :search="buscarMonitoreoRoedor"
          class="elevation-1"
          dense
        >
          <template v-slot:top>
            <!-- Tabs que muestra la informacion detallada de MonitoreoRoedorCentroAcopio -->
            <DialogMostrarMonitoreoRoedorCentroAcopio
              ref="DialogMostrarMonitoreoRoedorCentroAcopio"
            ></DialogMostrarMonitoreoRoedorCentroAcopio>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirMostrarMonitoreoRoedorCentroAcopio()">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo LimpiezaHerramienta -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          color="primary"
          @click="cargarDialogNuevoMonitoreoRoedorCentroAcopio()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";

import DialogNuevoMonitoreoRoedorCentroAcopio from "../components/DialogNuevoMonitoreoRoedorCentroAcopio";
import DialogMostrarMonitoreoRoedorCentroAcopio from "../components/DialogMostrarMonitoreoRoedorCentroAcopio";

export default {
  name: "BaseMonitoreoRoedorCentroAcopio",

  components: {
    DialogNuevoMonitoreoRoedorCentroAcopio,
    DialogMostrarMonitoreoRoedorCentroAcopio,
  },

  data() {
    return {
      buscarMonitoreoRoedor: "", // Guarda el texto de búsqueda
      cabeceraTablaMonitoreoRoedor: [
        // Detalla las cabeceras de la tabla
        {
          text: "Centro de acopio",
          value: "monitoreoroedorid",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha de trampeo",
          value: "monfechatrampeo",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Tipo de trampa",
          value: "montipotrampa",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Numero de trampas",
          value: "monnumerotrampas",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Cebo Utilizado",
          value: "monceboutilizado",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Roedores muertos",
          value: "monroedoresmuertos",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Acciones tomadas",
          value: "monaccionestomadas",
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
      listaMonitoreoRoedor: [
        // Almacena una lista de MonitoreoRoedorCentroAcopio, la misma se muestra en tabla
        {
          centroacopioid: 2,
          monfechatrampeo: "2021-01-02",
          montipotrampa: "Set 2 ratoneras madera medianas",
          monnumerotrampas: 2,
          monceboutilizado: "Rat-in Cebo Raticida 50gr",
          monroedoresmuertos: 1,
          monaccionestomadas: "Limpieza",
        },
        {
          centroacopioid: 2,
          monfechatrampeo: "2021-01-02",
          montipotrampa: "Trampa de madera tradicional",
          monnumerotrampas: 5,
          monceboutilizado: "Raticida Criborat Bdf Cebo 150gr",
          monroedoresmuertos: 10,
          monaccionestomadas: "Limpieza",
        },
        {
          centroacopioid: 3,
          monfechatrampeo: "2021-01-01",
          montipotrampa: "Ratonera dos agujeros pequeña",
          monnumerotrampas: 3,
          monceboutilizado: "Veneno Ratas Criborat Br.005 Cebo Barra 150 Gr.",
          monroedoresmuertos: 4,
          monaccionestomadas: "Limpieza",
        },
        {
          centroacopioid: 1,
          monfechatrampeo: "2021-01-02",
          montipotrampa: "Set 2 ratoneras madera medianas",
          monnumerotrampas: 1,
          monceboutilizado: "Semilla Cebada 4.5 Kg Forrajera Pastos Alimento Consum",
          monroedoresmuertos: 0,
          monaccionestomadas: "Limpieza",
        },
        {
          centroacopioid: 2,
          monfechatrampeo: "2021-01-05",
          montipotrampa: "Trampa de madera tradicional",
          monnumerotrampas: 6,
          monceboutilizado: "Veneno Ratas Criborat Br.005 Cebo Barra 150 Gr.",
          monroedoresmuertos: 22,
          monaccionestomadas: "Limpieza",
        },
        {
          centroacopioid: 1,
          monfechatrampeo: "2021-01-04",
          montipotrampa: "Ratonera dos agujeros pequeña",
          monnumerotrampas: 2,
          monceboutilizado: "Raticida Criborat Bdf Cebo 150gr",
          monroedoresmuertos: 9,
          monaccionestomadas: "Limpieza",
        },
        {
          centroacopioid: 2,
          monfechatrampeo: "2021-01-03",
          montipotrampa: "Trampa de madera tradicional",
          monnumerotrampas: 1,
          monceboutilizado: "Rat-in Cebo Raticida 50gr",
          monroedoresmuertos: 4,
          monaccionestomadas: "Limpieza",
        },
        {
          centroacopioid: 3,
          monfechatrampeo: "2021-01-02",
          montipotrampa: "Ratonera ecológica",
          monnumerotrampas: 4,
          monceboutilizado: "Semilla Cebada 4.5 Kg Forrajera Pastos Alimento Consum",
          monroedoresmuertos: 8,
          monaccionestomadas: "Limpieza",
        },
        {
          centroacopioid: 1,
          monfechatrampeo: "2021-01-01",
          montipotrampa: "Set 2 ratoneras madera medianas",
          monnumerotrampas: 1,
          monceboutilizado: "Veneno Ratas Criborat Br.005 Cebo Barra 150 Gr.",
          monroedoresmuertos: 7,
          monaccionestomadas: "Limpieza",
        },
        {
          centroacopioid: 1,
          monfechatrampeo: "2021-01-04",
          montipotrampa: "Trampa de madera tradicional",
          monnumerotrampas: 2,
          monceboutilizado: "Raticida Criborat Bdf Cebo 150gr",
          monroedoresmuertos: 1,
          monaccionestomadas: "Limpieza",
        },
      ],
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoMonitoreoRoedorCentroAcopio
    dialogNuevoMonitoreoRoedorCentroAcopio: {
      get() {
        return this.$store.getters[
          "gestionDialogos/dialogNuevoMonitoreoRoedorCentroAcopio"
        ];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogNuevoMonitoreoRoedorCentroAcopio",
          v
        );
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarMonitoreoRoedorCentroAcopio
    dialogMostrarMonitoreoRoedorCentroAcopio: {
      get() {
        return this.$store.getters[
          "gestionDialogos/dialogMostrarMonitoreoRoedorCentroAcopio"
        ];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogMostrarMonitoreoRoedorCentroAcopio",
          v
        );
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

    // Vacia el modelo MonitoreoRoedorCentroAcopio
    ...mapMutations("moduloMonitoreoRoedorCentroAcopio", [
      "vaciarMonitoreoRoedorCentroAcopio",
    ]),

    // Carga el DialogNuevoMonitoreoRoedorCentroAcopio
    cargarDialogNuevoMonitoreoRoedorCentroAcopio() {
      this.dialogNuevoMonitoreoRoedorCentroAcopio = !this
        .dialogNuevoMonitoreoRoedorCentroAcopio; // Abre el dialogNuevoMonitoreoRoedorCentroAcopio
      this.$refs.DialogNuevoMonitoreoRoedorCentroAcopio.$refs.componentFormMonitoreoRoedorCentroAcopio.$refs.formMonitoreoRoedorCentroAcopio.resetValidation(); // Reinicia las validaciones de formMonitoreoRoedorCentroAcopio
      this.vaciarMonitoreoRoedorCentroAcopio(); // Vacia el modelo MonitoreoRoedorCentroAcopio
    },

    abrirMostrarMonitoreoRoedorCentroAcopio() {
      this.dialogMostrarMonitoreoRoedorCentroAcopio = !this
        .dialogMostrarMonitoreoRoedorCentroAcopio;
      this.$refs.DialogMostrarMonitoreoRoedorCentroAcopio.$refs.componentFormMonitoreoRoedorCentroAcopio.$refs.formMonitoreoRoedorCentroAcopio.resetValidation(); // Reinicia las validaciones de formMonitoreoRoedorCentroAcopio
      this.vaciarMonitoreoRoedorCentroAcopio(); // Vacia el modelo MonitoreoRoedorCentroAcopio
    },
  },

  created() {
    this.$store.commit("colocarLayout", "LayoutCentroAcopio");
  },
};
</script>
