<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo Control de Maleza -->
    <DialogoNuevaMaleza ref="DialogoNuevaMaleza"></DialogoNuevaMaleza>

    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0">
      <v-card-title class="py-0">
        <v-row no-gutters>
          <v-col cols="12" md="4">
            <!-- Caja de búsqueda -->
            <v-text-field
              v-model="buscarMaleza"
              append-icon="mdi-magnify"
              label="Buscar"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra los Controles de Maleza -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaMaleza"
          sort-by="id_maleza"
          :items="listaMaleza"
          :search="buscarMaleza"
          class="elevation-1"
          dense
        >
          <template v-slot:top>
            <DialogoMostrarMalezaControl
              ref="DialogoTabsMostrarMalezaControl"
            ></DialogoMostrarMalezaControl>
          </template>

          <template v-slot:item.actions="{ item }">
            <!--<v-icon color="primary" @click="dialogoMostrarMalezaControl = !dialogoMostrarMalezaControl">
              mdi-eye
              </v-icon>-->
            <v-icon color="primary" @click="abrirTabsMostrarMalezaControl()">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo Control de Maleza -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          color="primary"
          @click="cargarDialogoNuevaMaleza()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";
import DialogoNuevaMaleza from "../components/DialogoNuevaMaleza";
import DialogoMostrarMalezaControl from "../components/DialogoMostrarMalezaControl";

export default {
  name: "BaseMaleza",

  components: {
    DialogoNuevaMaleza,
    DialogoMostrarMalezaControl,
  },

  data() {
    return {
      buscarMaleza: "", // Guarda el texto de búsqueda
      cabeceraTablaMaleza: [
        // Detalla los cabezales de la tabla
        //{text: "ID", value: "id_maleza", align: "center", class: "grey lighten-3", },
        {
          text: "Fecha",
          value: "fecha_maleza",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Hectareas",
          value: "hec_maleza",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Método",
          value: "met_maleza",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Operario",
          value: "ope_maleza",
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
      listaMaleza: [
        // Almacena una lista de Control de Maleza, la misma se muestra en tabla
        //{id_maleza: 11, fecha_maleza: "2019-10-05", hec_maleza: 24, met_maleza: "Metodo 1", ope_maleza: "Operario 1", id_cultivo: "Siembra de cacao", },
        {
          fecha_maleza: "2019-10-05",
          hec_maleza: 24,
          met_maleza: "Metodo 1",
          ope_maleza: "Operario 1",
          id_cultivo: "Siembra de cacao",
        },
        {
          fecha_maleza: "2018-10-05",
          hec_maleza: 7,
          met_maleza: "Metodo 2",
          ope_maleza: "Operario 2",
          id_cultivo: "Siembra de banano",
        },
        {
          fecha_maleza: "2017-10-05",
          hec_maleza: 42,
          met_maleza: "Metodo 3",
          ope_maleza: "Operario 3",
          id_cultivo: "Siembra de cacao",
        },
        {
          fecha_maleza: "2020-10-05",
          hec_maleza: 35,
          met_maleza: "Metodo 4",
          ope_maleza: "Operario 4",
          id_cultivo: "Siembra de banano",
        },
        {
          fecha_maleza: "2019-10-05",
          hec_maleza: 28,
          met_maleza: "Metodo 1",
          ope_maleza: "Operario 5",
          id_cultivo: "Siembra de cacao",
        },
        {
          fecha_maleza: "2019-10-05",
          hec_maleza: 16,
          met_maleza: "Metodo 2",
          ope_maleza: "Operario 6",
          id_cultivo: "Siembra de banano",
        },
        {
          fecha_maleza: "2020-10-05",
          hec_maleza: 64,
          met_maleza: "Metodo 3",
          ope_maleza: "Operario 7",
          id_cultivo: "Siembra de cacao",
        },
        {
          fecha_maleza: "2016-10-05",
          hec_maleza: 72,
          met_maleza: "Metodo 4",
          ope_maleza: "Operario 8",
          id_cultivo: "Siembra de banano",
        },
        {
          fecha_maleza: "2018-10-05",
          hec_maleza: 41,
          met_maleza: "Metodo 3",
          ope_maleza: "Operario 9",
          id_cultivo: "Siembra de cacao",
        },
      ],
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogoNuevaMaleza
    dialogoNuevaMaleza: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoNuevaMaleza"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogoNuevaMaleza", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogoMostrarMalezaControl
    dialogoMostrarMalezaControl: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoMostrarMalezaControl"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogoMostrarMalezaControl", v);
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
    ...mapMutations("moduloMaleza", ["vaciarMaleza"]),

    // Carga el DialogoNuevaMaleza
    cargarDialogoNuevaMaleza() {
      this.dialogoNuevaMaleza = !this.dialogoNuevaMaleza; // Abre el DialogoNuevaMaleza
      this.$refs.DialogoNuevaMaleza.$refs.componenteFormularioMaleza.$refs.formularioMaleza.resetValidation(); // Reinicia las validaciones de formularioMaleza
      this.vaciarMaleza(); // Reinicia el modelo Maleza
    },

    abrirTabsMostrarMalezaControl() {
      this.dialogoMostrarMalezaControl = !this.dialogoMostrarMalezaControl;
      this.$refs.DialogoTabsMostrarMalezaControl.$refs.componenteFormularioMaleza.$refs.formularioMaleza.resetValidation(); // Reinicia las validaciones de formMaleza
      this.vaciarMaleza(); // Vacia el modelo Maleza
    },
  },

  created() {
    this.$store.commit("colocarLayout", "LayoutProductor");
    this.initialize();
  },
};
</script>
