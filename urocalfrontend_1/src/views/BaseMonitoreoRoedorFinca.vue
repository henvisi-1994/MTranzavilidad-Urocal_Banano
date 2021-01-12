<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo DialogNuevoMonitoreoRoedorFinca -->
    <DialogNuevoMonitoreoRoedorFinca
      ref="DialogNuevoMonitoreoRoedorFinca"
    ></DialogNuevoMonitoreoRoedorFinca>

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
        <!-- Tabla que muestra los MonitoreoRoedorFinca -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaMonitoreoRoedor"
          sort-by="fincaid"
          :items="listaMonitoreoRoedor"
          :search="buscarMonitoreoRoedor"
          class="elevation-1"
          dense
        >
          <template v-slot:top>
            <!-- Tabs que muestra la informacion detallada de MonitoreoRoedorFinca -->
            <DialogMostrarMonitoreoRoedorFinca
              ref="DialogMostrarMonitoreoRoedorFinca"
            ></DialogMostrarMonitoreoRoedorFinca>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirMostrarMonitoreoRoedorFinca()">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo MonitoreoRoedorFinca -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          color="primary"
          @click="cargarDialogNuevoMonitoreoRoedorFinca()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";

import DialogNuevoMonitoreoRoedorFinca from "../components/DialogNuevoMonitoreoRoedorFinca";
import DialogMostrarMonitoreoRoedorFinca from "../components/DialogMostrarMonitoreoRoedorFinca";

export default {
  name: "BaseMonitoreoRoedorFinca",

  components: {
    DialogNuevoMonitoreoRoedorFinca,
    DialogMostrarMonitoreoRoedorFinca,
  },

  data() {
    return {
      buscarMonitoreoRoedor: "", // Guarda el texto de búsqueda
      cabeceraTablaMonitoreoRoedor: [
        // Detalla las cabeceras de la tabla
        {
          text: "Finca",
          value: "fincaid",
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
          fincaid: 1,
          monfechatrampeo: "2021-01-02",
          montipotrampa: "Ratonera madera grande",
          monnumerotrampas: 2,
          monceboutilizado: "Rat-in Cebo Raticida 50gr",
          monroedoresmuertos: 20,
          monaccionestomadas: "Limpieza",
        },
        {
          fincaid: 2,
          monfechatrampeo: "2021-01-01",
          montipotrampa: "Ratonera ecológica",
          monnumerotrampas: 5,
          monceboutilizado: "Raticida Criborat Bdf Cebo 150gr",
          monroedoresmuertos: 11,
          monaccionestomadas: "Limpieza",
        },
        {
          fincaid: 1,
          monfechatrampeo: "2021-01-03",
          montipotrampa: "Ratonera dos agujeros pequeña",
          monnumerotrampas: 3,
          monceboutilizado: "Veneno Ratas Criborat Br.005 Cebo Barra 150 Gr.",
          monroedoresmuertos: 14,
          monaccionestomadas: "Limpieza",
        },
        {
          fincaid: 3,
          monfechatrampeo: "2021-01-04",
          montipotrampa: "Ratonera madera grande",
          monnumerotrampas: 1,
          monceboutilizado: "Semilla Cebada 4.5 Kg Forrajera Pastos Alimento Consum",
          monroedoresmuertos: 10,
          monaccionestomadas: "Limpieza",
        },
        {
          fincaid: 2,
          monfechatrampeo: "2021-01-05",
          montipotrampa: "Ratonera dos agujeros grande",
          monnumerotrampas: 6,
          monceboutilizado: "Veneno Ratas Criborat Br.005 Cebo Barra 150 Gr.",
          monroedoresmuertos: 32,
          monaccionestomadas: "Limpieza",
        },
        {
          fincaid: 1,
          monfechatrampeo: "2021-01-04",
          montipotrampa: "Ratonera dos agujeros pequeña",
          monnumerotrampas: 2,
          monceboutilizado: "Raticida Criborat Bdf Cebo 150gr",
          monroedoresmuertos: 20,
          monaccionestomadas: "Limpieza",
        },
        {
          fincaid: 2,
          monfechatrampeo: "2021-01-03",
          montipotrampa: "Ratonera madera grande",
          monnumerotrampas: 1,
          monceboutilizado: "Rat-in Cebo Raticida 50gr",
          monroedoresmuertos: 4,
          monaccionestomadas: "Limpieza",
        },
        {
          fincaid: 3,
          monfechatrampeo: "2021-01-02",
          montipotrampa: "Ratonera ecológica",
          monnumerotrampas: 4,
          monceboutilizado: "Semilla Cebada 4.5 Kg Forrajera Pastos Alimento Consum",
          monroedoresmuertos: 55,
          monaccionestomadas: "Limpieza",
        },
        {
          fincaid: 1,
          monfechatrampeo: "2021-01-01",
          montipotrampa: "Ratonera dos agujeros grande",
          monnumerotrampas: 1,
          monceboutilizado: "Veneno Ratas Criborat Br.005 Cebo Barra 150 Gr.",
          monroedoresmuertos: 7,
          monaccionestomadas: "Limpieza",
        },
        {
          fincaid: 4,
          monfechatrampeo: "2021-01-04",
          montipotrampa: "Ratonera dos agujeros pequeña",
          monnumerotrampas: 2,
          monceboutilizado: "Raticida Criborat Bdf Cebo 150gr",
          monroedoresmuertos: 1,
          monaccionestomadas: "Limpieza",
        },
      ],
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoMonitoreoRoedorFinca
    dialogNuevoMonitoreoRoedorFinca: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoMonitoreoRoedorFinca"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogNuevoMonitoreoRoedorFinca",
          v
        );
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarMonitoreoRoedorFinca
    dialogMostrarMonitoreoRoedorFinca: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarMonitoreoRoedorFinca"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogMostrarMonitoreoRoedorFinca",
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

    // Vacia el modelo MonitoreoRoedorFinca
    ...mapMutations("moduloMonitoreoRoedorFinca", ["vaciarMonitoreoRoedorFinca"]),

    // Carga el DialogNuevoMonitoreoRoedorFinca
    cargarDialogNuevoMonitoreoRoedorFinca() {
      this.dialogNuevoMonitoreoRoedorFinca = !this.dialogNuevoMonitoreoRoedorFinca; // Abre el dialogNuevoMonitoreoRoedorFinca
      this.$refs.DialogNuevoMonitoreoRoedorFinca.$refs.componentFormMonitoreoRoedorFinca.$refs.formMonitoreoRoedorFinca.resetValidation(); // Reinicia las validaciones de formMonitoreoRoedorFinca
      this.vaciarMonitoreoRoedorFinca(); // Vacia el modelo MonitoreoRoedorFinca
    },

    abrirMostrarMonitoreoRoedorFinca() {
      this.dialogMostrarMonitoreoRoedorFinca = !this.dialogMostrarMonitoreoRoedorFinca;
      this.$refs.DialogMostrarMonitoreoRoedorFinca.$refs.componentFormMonitoreoRoedorFinca.$refs.formMonitoreoRoedorFinca.resetValidation(); // Reinicia las validaciones de formMonitoreoRoedorFinca
      this.vaciarMonitoreoRoedorFinca(); // Vacia el modelo MonitoreoRoedorFinca
    },
  },

  created() {
    this.$store.commit("colocarLayout", "LayoutProductor");
  },
};
</script>
