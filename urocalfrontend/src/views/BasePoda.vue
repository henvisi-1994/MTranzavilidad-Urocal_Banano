<template>
  <v-container fluid>
    <!-- Dialog para registrar nueva poda -->
    <DialogNuevoPoda ref="componentDialogNuevoPoda"></DialogNuevoPoda>

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
              v-model="buscarPoda"
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
        <!-- Tabla que muestra lista de poda -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaPoda"
          sort-by="id_lote"
          :items="listaPoda"
          :search="buscarPoda"
          class="elevation-1"
        >
          <template v-slot:top>
            <!-- Dialog que muestra el formulario con toda la informacion de poda -->
            <DialogMostrarPoda ref="componentDialogMostrarPoda"></DialogMostrarPoda>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirMostrarPoda()"> mdi-eye </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nueva poda -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" elevation="0"
          large
          color="primary"
          @click="cargarDialogNuevoPoda()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

import DialogNuevoPoda from "@/components/DialogNuevoPoda";
import DialogMostrarPoda from "@/components/DialogMostrarPoda";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BasePoda",

  components: {
    DialogNuevoPoda,
    DialogMostrarPoda,
  },

  data() {
    return {
      nombre: "Gestión de Poda",
      buscarPoda: "", // Guarda el texto de búsqueda
      cabeceraTablaPoda: [
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
          text: "Fecha de poda",
          value: "podfecha",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Tipo de poda",
          value: "podtipo",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Hectáreas",
          value: "podhectareas",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Cantidad de plantas",
          value: "podcantidadplantas",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Herramienta",
          value: "podherramienta",
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
      listaPoda: [{ codigo_finca: 1, id_farm: 1 }], // Almacena una lista de Lotes, la misma se muestra en tabla
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoPoda
    dialogNuevoPoda: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoPoda"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoPoda", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarPoda
    dialogMostrarPoda: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarPoda"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarPoda", v);
      },
    },
  },

  methods: {
    // Carga el DialogMostrarPoda
    abrirMostrarPoda() {
      this.dialogMostrarPoda = !this.dialogMostrarPoda; // Abre el DialogNuevoPoda
      this.$refs.componentDialogMostrarPoda.$refs.componentFormPoda.$refs.formPoda.resetValidation(); // Reinicia las validaciones de formPoda
      this.vaciarPoda(); // Vacia el modelo poda
    },

    // Vacia el modelo lot
    ...mapMutations("moduloPoda", ["vaciarPoda"]),

    // Carga el DialogNuevoPoda
    cargarDialogNuevoPoda() {
      this.dialogNuevoPoda = !this.dialogNuevoPoda; // Abre el DialogNuevoPoda
      this.$refs.componentDialogNuevoPoda.$refs.componentFormPoda.$refs.formPoda.resetValidation(); // Reinicia las validaciones de formPoda
      this.vaciarPoda(); // Vacia el modelo poda
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
