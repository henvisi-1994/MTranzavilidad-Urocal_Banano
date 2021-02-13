<template>
  <v-container fluid>
    <!-- Dialog para registrar nueva Fertilizante -->
    <DialogNuevoFertilizante
      ref="componentDialogNuevoFertilizante"
    ></DialogNuevoFertilizante>

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
              v-model="buscarFertilizante"
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
        <!-- Tabla que muestra lista de fertilizante -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaFertilizante"
          sort-by="id_lote"
          :items="listaFertilizante"
          :search="buscarFertilizante"
          class="elevation-1"
          dense
        >
          <template v-slot:top>
            <!-- Dialog que muestra el formulario con toda la informacion de fertilizante -->
            <DialogMostrarFertilizante
              ref="componentDialogMostrarFertilizante"
            ></DialogMostrarFertilizante>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirMostrarFertilizante()"> mdi-eye </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nueva fertilizante -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          @click="cargarDialogNuevoFertilizante()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

import DialogNuevoFertilizante from "@/components/DialogNuevoFertilizante";
import DialogMostrarFertilizante from "@/components/DialogMostrarFertilizante";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseFertilizante",

  components: {
    DialogNuevoFertilizante,
    DialogMostrarFertilizante,
  },

  data() {
    return {
      nombre: "Gestión de Fertilización",
      buscarFertilizante: "", // Guarda el texto de búsqueda
      cabeceraTablaFertilizante: [
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
          value: "ferciclo",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha",
          value: "ferfecha",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Nombre Comercial",
          value: "fernombrecomercial",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Elementos",
          value: "ferelementos",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Concentración",
          value: "ferconcentracion",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Área Aplicada",
          value: "ferareaaplicada",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Cantidad Aplicada",
          value: "fercantidadaplicada",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Unidad de Medidad",
          value: "ferunidadmedida",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Equipo de Aplicación",
          value: "ferequipoaplicacion",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Método de Aplicación",
          value: "fermetodoaplicacion",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Operario",
          value: "feroperario",
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
      listaFertilizante: [{ codigo_finca: 1, id_farm: 1 }], // Almacena una lista de Lotes, la misma se muestra en tabla
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoFertilizante
    dialogNuevoFertilizante: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoFertilizante"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoFertilizante", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarFertilizante
    dialogMostrarFertilizante: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarFertilizante"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarFertilizante", v);
      },
    },
  },

  methods: {
    // Carga el DialogMostrarFertilizante
    abrirMostrarFertilizante() {
      this.dialogMostrarFertilizante = !this.dialogMostrarFertilizante; // Abre el DialogMostrarFertilizante
      this.$refs.componentDialogMostrarFertilizante.$refs.componentFormFertilizante.$refs.formFertilizante.resetValidation(); // Reinicia las validaciones de formFertilizante
      this.vaciarFertilizante(); // Vacia el modelo Fertilizante
    },

    // Vacia el modelo fertilizante
    ...mapMutations("moduloFertilizante", ["vaciarFertilizante"]),

    // Carga el DialogNuevoFertilizante
    cargarDialogNuevoFertilizante() {
      this.dialogNuevoFertilizante = !this.dialogNuevoFertilizante; // Abre el DialogNuevoFertilizante
      this.$refs.componentDialogNuevoFertilizante.$refs.componentFormFertilizante.$refs.formFertilizante.resetValidation(); // Reinicia las validaciones de formFertilizante
      this.vaciarFertilizante(); // Vacia el modelo fertilizante
    },
  },

  mixins: [autenticacionMixin, myMixin],

  created() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario.rol === "Administrador")
      this.$store.commit("colocarLayout", "LayoutAdministrador");
    if (usuario.rol === "Productor")
      this.$store.commit("colocarLayout", "LayoutProductor");
  },
};
</script>
