<template>
  <v-container fluid>
    <!-- Dialog para registrar nueva Siembra -->
    <DialogoNuevaSiembra ref="DialogoNuevaSiembra"></DialogoNuevaSiembra>

    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0">
      <v-card-title class="py-0">
        <v-row no-gutters>
          <v-col cols="12" md="4">
            <!-- Caja de búsqueda -->
            <v-text-field
              v-model="buscarSiembra"
              append-icon="mdi-magnify"
              label="Buscar"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra las Siembras -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaSiembra"
          sort-by="id_siembra"
          :items="listaSiembra"
          :search="buscarSiembra"
          class="elevation-1"
          dense
        >
          <template v-slot:top>
            <DialogoMostrarSiembra
              ref="DialogoTabsMostrarSiembra"
            ></DialogoMostrarSiembra>
          </template>

          <template v-slot:item.actions="{ item }">
            <!--<v-icon color="primary" @click="dialogoMostrarSiembra = !dialogoMostrarSiembra">
              mdi-eye
            </v-icon>-->
            <v-icon color="primary" @click="abrirTabsMostrarSiembra()"> mdi-eye </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nueva siembra -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          color="primary"
          @click="cargarDialogoNuevaSiembra()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";
import DialogoNuevaSiembra from "../components/DialogoNuevaSiembra";
import DialogoMostrarSiembra from "../components/DialogoMostrarSiembra";

export default {
  name: "BaseSiembra",

  components: {
    DialogoNuevaSiembra,
    DialogoMostrarSiembra,
  },

  data() {
    return {
      buscarSiembra: "", // Guarda el texto de búsqueda
      cabeceraTablaSiembra: [
        // Detalla los cabezales de la tabla
        //{text: "ID", value: "id_siembra", align: "center", class: "grey lighten-3", },
        {
          text: "Fecha de compra",
          value: "feco_semilla",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Proveedor semilla",
          value: "pro_semilla",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha siembra",
          value: "fesiem_semilla",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Cantidad plantas",
          value: "canpla_semilla",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Hectareas",
          value: "hec_semilla",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Operario",
          value: "ope_semilla",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Cultivo",
          value: "id_cultivo",
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
      listaSiembra: [
        // Almacena una lista de Lotes, la misma se muestra en tabla
        //{id_siembra: 11, feco_semilla: "2019-10-05", pro_semilla: "Pizarro", fesiem_semilla: "2019-10-05", canpla_semilla: 20, hec_semilla: 1.0, ope_semilla: "Pizarro", id_cultivo: 5, },
        {
          feco_semilla: "2017-10-05",
          pro_semilla: "Villacrés",
          fesiem_semilla: "2017-10-05",
          canpla_semilla: 35,
          hec_semilla: 96,
          ope_semilla: "Zambrano",
          id_cultivo: "Siembra de cacao",
        },
        {
          feco_semilla: "2018-10-05",
          pro_semilla: "Pizarro",
          fesiem_semilla: "2018-10-05",
          canpla_semilla: 34,
          hec_semilla: 100,
          ope_semilla: "Morán",
          id_cultivo: "Siembra de cacao",
        },
        {
          feco_semilla: "2020-10-05",
          pro_semilla: "Samaniego",
          fesiem_semilla: "2020-10-05",
          canpla_semilla: 28,
          hec_semilla: 64,
          ope_semilla: "Villacrés",
          id_cultivo: "Siembra de cacao",
        },
        {
          feco_semilla: "2020-10-05",
          pro_semilla: "Chamba",
          fesiem_semilla: "2020-10-05",
          canpla_semilla: 47,
          hec_semilla: 87,
          ope_semilla: "Ojeda",
          id_cultivo: "Siembra de cacao",
        },
        {
          feco_semilla: "2019-10-05",
          pro_semilla: "Cango",
          fesiem_semilla: "2019-10-05",
          canpla_semilla: 42,
          hec_semilla: 45,
          ope_semilla: "Cabrera",
          id_cultivo: "Siembra de cacao",
        },
        {
          feco_semilla: "2017-10-05",
          pro_semilla: "Salto",
          fesiem_semilla: "2017-10-05",
          canpla_semilla: 33,
          hec_semilla: 62,
          ope_semilla: "Cango",
          id_cultivo: "Siembra de cacao",
        },
        {
          feco_semilla: "2016-10-05",
          pro_semilla: "Pizarro",
          fesiem_semilla: "2016-10-05",
          canpla_semilla: 47,
          hec_semilla: 77,
          ope_semilla: "Villacrés",
          id_cultivo: "Siembra de cacao",
        },
        {
          feco_semilla: "2018-10-05",
          pro_semilla: "Rodriguez",
          fesiem_semilla: "2018-10-05",
          canpla_semilla: 38,
          hec_semilla: 89,
          ope_semilla: "Calva",
          id_cultivo: "Siembra de cacao",
        },
        {
          feco_semilla: "2018-10-05",
          pro_semilla: "Pereira",
          fesiem_semilla: "2018-10-05",
          canpla_semilla: 36,
          hec_semilla: 65,
          ope_semilla: "Xiomara",
          id_cultivo: "Siembra de cacao",
        },
      ],
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogoNuevaSiembra
    dialogoNuevaSiembra: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoNuevaSiembra"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogoNuevaSiembra", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogoMostrarSiembra
    dialogoMostrarSiembra: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoMostrarSiembra"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogoMostrarSiembra", v);
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

    // Vacia el modelo siembra
    ...mapMutations("moduloSiembra", ["vaciarSiembra"]),

    // Carga el DialogoNuevaSiembra
    cargarDialogoNuevaSiembra() {
      this.dialogoNuevaSiembra = !this.dialogoNuevaSiembra; // Abre el DialogStepperFormNewSiembra
      this.$refs.DialogoNuevaSiembra.$refs.componenteFormularioSiembra.$refs.formSiembra.resetValidation(); // Reinicia las validaciones de formLot
      this.vaciarSiembra(); // Reinicia el modelo Siembra
    },

    abrirTabsMostrarSiembra() {
      this.dialogoMostrarSiembra = !this.dialogoMostrarSiembra;
      this.$refs.DialogoTabsMostrarSiembra.$refs.componenteFormularioSiembra.$refs.formSiembra.resetValidation(); // Reinicia las validaciones de formSiembra
      this.vaciarSiembra(); // Reinicia el modelo Siembra
    },
  },

  created() {
    this.$store.commit("colocarLayout", "LayoutProductor");
    this.initialize();
  },
};
</script>
