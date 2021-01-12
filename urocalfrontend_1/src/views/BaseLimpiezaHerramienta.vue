<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo LimpiezaHerramienta -->
    <DialogNuevoLimpiezaHerramienta
      ref="DialogNuevoLimpiezaHerramienta"
    ></DialogNuevoLimpiezaHerramienta>

    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0">
      <v-card-title class="py-0">
        <v-row no-gutters>
          <v-col cols="12" md="4">
            <!-- Caja de búsqueda -->
            <v-text-field
              v-model="buscarLimpiezaHerramienta"
              append-icon="mdi-magnify"
              label="Buscar"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra los LimpiezaHerramienta -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaLimpiezaHerramienta"
          sort-by="cultivoid"
          :items="listaLimpiezaHerramienta"
          :search="buscarLimpiezaHerramienta"
          class="elevation-1"
          dense
        >
          <template v-slot:top>
            <!-- Tabs que muestra la informacion detallada de LimpiezaHerramienta -->
            <DialogMostrarLimpiezaHerramienta
              ref="DialogMostrarLimpiezaHerramienta"
            ></DialogMostrarLimpiezaHerramienta>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirMostrarLimpiezaHerramienta()">
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
          @click="cargarDialogNuevoLimpiezaHerramienta()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";

import DialogNuevoLimpiezaHerramienta from "../components/DialogNuevoLimpiezaHerramienta";
import DialogMostrarLimpiezaHerramienta from "../components/DialogMostrarLimpiezaHerramienta";

export default {
  name: "BaseLimpiezaHerramienta",

  components: {
    DialogNuevoLimpiezaHerramienta,
    DialogMostrarLimpiezaHerramienta,
  },

  data() {
    return {
      buscarLimpiezaHerramienta: "", // Guarda el texto de búsqueda
      cabeceraTablaLimpiezaHerramienta: [
        // Detalla las cabeceras de la tabla
        {
          text: "Cultivo",
          value: "cultivoid",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha de limpieza",
          value: "limfecha",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Producto utilizado",
          value: "limproducto",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Equipos",
          value: "limequipos",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Maquinaria",
          value: "limmaquinaria",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Herramientas",
          value: "limherramientas",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Cajones",
          value: "limcajones",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Tendales",
          value: "limtendales",
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
      listaLimpiezaHerramienta: [
        // Almacena una lista de LimpiezaHerramienta, la misma se muestra en tabla
        {
          cultivoid: 1,
          limfecha: "2021-01-01",
          limproducto: "Desinfectante Amonio Cuaternario 0.5% – Clean Armor – 500ml",
          limequipos: "pinzas",
          limmaquinaria: "tractor",
          limherramientas: "azada",
          limcajones: "cajon-c2",
          limtendales: "tendal-t1",
        },
        {
          cultivoid: 2,
          limfecha: "2021-01-02",
          limproducto: "Cloro Líquido. Hipoclorito de sodio 5% – Cloro Protect – 500ml",
          limequipos: "termómetros",
          limmaquinaria: "sembradora",
          limherramientas: "plantador",
          limcajones: "cajon-c3",
          limtendales: "tendal-t3",
        },
        {
          cultivoid: 1,
          limfecha: "2021-01-03",
          limproducto:
            "HIDROLIMPIADORA Kärcher K 5 Premium Full Control Limpiadora de alta presión – 2100W – 145bar – 1.324.600.0",
          limequipos: "jeringas",
          limmaquinaria: "arados",
          limherramientas: "horca",
          limcajones: "cajon-c2",
          limtendales: "tendal-t4",
        },
        {
          cultivoid: 3,
          limfecha: "2021-01-04",
          limproducto: "Desinfectante Amonio Cuaternario 0.5% – Clean Armor – 500ml",
          limequipos: "pipetas",
          limmaquinaria: "hilerador",
          limherramientas: "pala",
          limcajones: "cajon-c1",
          limtendales: "tendal-t3",
        },
        {
          cultivoid: 2,
          limfecha: "2021-01-05",
          limproducto:
            "HIDROLIMPIADORA Kärcher K 5 Premium Full Control Limpiadora de alta presión – 2100W – 145bar – 1.324.600.0",
          limequipos: "pinzas",
          limmaquinaria: "cultivador",
          limherramientas: "horca",
          limcajones: "cajon-c4",
          limtendales: "tendal-t1",
        },
        {
          cultivoid: 4,
          limfecha: "2021-01-01",
          limproducto: "Cloro Líquido. Hipoclorito de sodio 5% – Cloro Protect – 500ml",
          limequipos: "termómetros",
          limmaquinaria: "arados",
          limherramientas: "rastrillo",
          limcajones: "cajon-c1",
          limtendales: "tendal-t3",
        },
        {
          cultivoid: 2,
          limfecha: "2021-01-02",
          limproducto:
            "HIDROLIMPIADORA Kärcher K 5 Premium Full Control Limpiadora de alta presión – 2100W – 145bar – 1.324.600.0",
          limequipos: "jeringas",
          limmaquinaria: "cultivador",
          limherramientas: "plantador",
          limcajones: "cajon-c5",
          limtendales: "tendal-t3",
        },
        {
          cultivoid: 2,
          limfecha: "2021-01-03",
          limproducto: "Desinfectante Amonio Cuaternario 0.5% – Clean Armor – 500ml",
          limequipos: "navajas",
          limmaquinaria: "sembradora",
          limherramientas: "rastillo",
          limcajones: "cajon-c2",
          limtendales: "tendal-t2",
        },
        {
          cultivoid: 4,
          limfecha: "2021-01-01",
          limproducto:
            "HIDROLIMPIADORA Kärcher K 5 Premium Full Control Limpiadora de alta presión – 2100W – 145bar – 1.324.600.0",
          limequipos: "pipetas",
          limmaquinaria: "tractor",
          limherramientas: "pala",
          limcajones: "cajon-c2",
          limtendales: "tendal-t0",
        },
        {
          cultivoid: 3,
          limfecha: "2021-01-02",
          limproducto: "Cloro Líquido. Hipoclorito de sodio 5% – Cloro Protect – 500ml",
          limequipos: "termómetros",
          limmaquinaria: "hilerador",
          limherramientas: "azada",
          limcajones: "cajon-c0",
          limtendales: "tendal-t3",
        },
      ],
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoLimpiezaHerramienta
    dialogNuevoLimpiezaHerramienta: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoLimpiezaHerramienta"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogNuevoLimpiezaHerramienta",
          v
        );
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarLimpiezaHerramienta
    dialogMostrarLimpiezaHerramienta: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarLimpiezaHerramienta"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogMostrarLimpiezaHerramienta",
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

    // Vacia el modelo LimpiezaHerramienta
    ...mapMutations("moduloLimpiezaHerramienta", ["vaciarLimpiezaHerramienta"]),

    // Carga el DialogNuevoLimpiezaHerramienta
    cargarDialogNuevoLimpiezaHerramienta() {
      this.dialogNuevoLimpiezaHerramienta = !this.dialogNuevoLimpiezaHerramienta; // Abre el DialogNuevoLimpiezaHerramienta
      this.$refs.DialogNuevoLimpiezaHerramienta.$refs.componentFormLimpiezaHerramienta.$refs.formLimpiezaHerramienta.resetValidation(); // Reinicia las validaciones de formLimpiezaHerramienta
      this.vaciarLimpiezaHerramienta(); // Vacia el modelo LimpiezaHerramienta
    },

    abrirMostrarLimpiezaHerramienta() {
      this.dialogMostrarLimpiezaHerramienta = !this.dialogMostrarLimpiezaHerramienta;
      this.$refs.DialogMostrarLimpiezaHerramienta.$refs.componentFormLimpiezaHerramienta.$refs.formLimpiezaHerramienta.resetValidation(); // Reinicia las validaciones de formLimpiezaHerramienta
      this.vaciarLimpiezaHerramienta(); // Vacia el modelo LimpiezaHerramienta
    },
  },

  created() {
    this.$store.commit("colocarLayout", "LayoutProductor");
  },
};
</script>
