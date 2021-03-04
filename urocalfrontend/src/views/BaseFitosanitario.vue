<template>
  <v-container fluid>
    <!-- Dialog para registrar nueva fitosanitario -->
    <DialogNuevoFitosanitario
      ref="componentDialogNuevoFitosanitario"
    ></DialogNuevoFitosanitario>

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
              v-model="buscarFitosanitario"
              append-icon="mdi-magnify"
              label="Buscar" class="custom" filled dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra lista de fitosanitario -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaFitosanitario"
          sort-by="id_lote"
          :items="listaFitosanitariosStore"
          :search="buscarFitosanitario"
          class="elevation-1">
          <template v-slot:top>
            <!-- Dialog que muestra el formulario con toda la informacion de fitosanitario -->
            <DialogMostrarFitosanitario
              ref="componentDialogMostrarFitosanitario"
            ></DialogMostrarFitosanitario>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirMostrarFitosanitario(item)">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nueva fitosanitario -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px" large
          color="primary"
          @click="cargarDialogNuevoFitosanitario()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

import DialogNuevoFitosanitario from "@/components/DialogNuevoFitosanitario";
import DialogMostrarFitosanitario from "@/components/DialogMostrarFitosanitario";
import ServicioFitosanitarios from '../services/ServicioFitosanitarios';

export default {
  name: "BaseFitosanitario",

  components: {
    DialogNuevoFitosanitario,
    DialogMostrarFitosanitario,
  },

  mounted() {
    this.cargarListaFitosanitario();
  },

  data() {
    return {
      nombre: "Gestión de Fitosanitario",
      buscarFitosanitario: "", // Guarda el texto de búsqueda
      cabeceraTablaFitosanitario: [
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
          text: "Ciclo",
          value: "fitciclo",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha",
          value: "fitfecha",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Nombre Comercial",
          value: "fitnombrecomercial",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Ingrediente Activo",
          value: "fitingredienteactivo",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Autorización Técnica",
          value: "fitautorizaciontecnica",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Nombre común",
          value: "fitnombrecomun",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Dósis",
          value: "fitdosis",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },

        {
          text: "Cantidad Total",
          value: "fitcantidadtotal",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Área Aplicada",
          value: "fitareaplicada",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Equipo de Aplicación",
          value: "fitequipoaplicacion",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Método de Aplicación",
          value: "fitmetodo",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Plazo de seguridad",
          value: "fitplazoseguridad",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Operario",
          value: "fitoperario",
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
    listaFitosanitariosStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloFitosanitario/listaFitosanitariosStore"]));
      },
      set(v) {
        return this.$store.commit("moduloFitosanitario/establecerListaFitosanitariosStore", v);
      },
    },
    // Obtiene y modifica el estado de la variable dialogNuevoFitosanitario
    dialogNuevoFitosanitario: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoFitosanitario"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoFitosanitario", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarFitosanitario
    dialogMostrarFitosanitario: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarFitosanitario"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarFitosanitario", v);
      },
    },

    modeloFitosanitarioStore: {
      get() {
        return this.$store.getters["moduloFitosanitario/modeloFitosanitarioStore"];
      },
      set(v) {
        return this.$store.commit("moduloFitosanitario/establecerModeloFitosanitariosStore", v);
      },
    },
  },

  methods: {
    async cargarListaFitosanitario () {
      let listaFitosanitarios = [];
      let respuesta = await ServicioFitosanitarios.obtenerTodosFitosanitarios();
      let fitosanitarios = await respuesta.data;
      fitosanitarios.forEach((f) => {
        listaFitosanitarios.push(f);
      });
      this.listaFitosanitariosStore = listaFitosanitarios;
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

    // Carga el DialogMostrarFitosanitario
    abrirMostrarFitosanitario(item) {
      this.dialogMostrarFitosanitario = !this.dialogMostrarFitosanitario;
      this.$refs.componentDialogMostrarFitosanitario.$refs.componentFormFitosanitario.$refs.formFitosanitario.resetValidation();
      this.vaciarModeloFitosanitarioStore();
      this.modeloFitosanitarioStore = item;
    },

    // Vacia el modelo Fitosanitario
    ...mapMutations("moduloFitosanitario", ["vaciarModeloFitosanitarioStore"]),

    // Carga el DialogNuevoFitosanitario
    cargarDialogNuevoFitosanitario() {
      this.dialogNuevoFitosanitario = !this.dialogNuevoFitosanitario;
      this.$refs.componentDialogNuevoFitosanitario.$refs.componentFormFitosanitario.$refs.formFitosanitario.resetValidation();
      this.vaciarModeloFitosanitarioStore();
    },
  },

  created() {
    this.$store.commit("colocarLayout", "LayoutProductor");
  },
};
</script>
