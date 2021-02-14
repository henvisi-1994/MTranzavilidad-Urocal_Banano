<template>
  <v-container fluid>
    <!-- Dialog para registrar nueva poda -->
    <DialogNuevoRegistroEnvio
      ref="componentDialogNuevoRegistroEnvio"
    ></DialogNuevoRegistroEnvio>

    <v-card elevation="0" class="mt-5">
      <v-card-title class="py-2">
        <v-row no-gutters justify-md="space-between">
          <v-col cols="12" md="6">
            <div :class="[`text-h4`, `mb-4`]" class="transition-swing primary--text" v-text="nombre"></div>            
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="buscarRegistroEnvio"
              append-icon="mdi-magnify"
              label="Buscar" class="custom" dense filled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra lista de registros -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaRegistroEnvio"
          sort-by="id_lote"
          :items="listaRegistroEnvios"
          :search="buscarRegistroEnvio"
          class="elevation-1"
        >
          <template v-slot:top>
            <!-- Dialog que muestra el formulario con toda la informacion del registro -->
            <DialogMostrarRegistroEnvio
              ref="componentDialogMostrarRegistroEnvio"
            ></DialogMostrarRegistroEnvio>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirRegistroEnvio()"> mdi-eye </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo registro de envio -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          @click="cargarDialogNuevoRegistroEnvio()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import DialogMostrarRegistroEnvio from "@/components/DialogMostrarRegistroEnvio";
import DialogNuevoRegistroEnvio from "@/components/DialogNuevoRegistroEnvio";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseRegistroEnvio",

  components: {
    DialogMostrarRegistroEnvio,
    DialogNuevoRegistroEnvio,
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoRegistroEnvio
    dialogNuevoRegistroEnvio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoRegistroEnvio"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoRegistroEnvio", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarRegistroEnvio
    dialogMostrarRegistroEnvio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarRegistroEnvio"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarRegistroEnvio", v);
      },
    },
  },

  data() {
    return {
      nombre: "Registro de envíos",
      buscarRegistroEnvio: "",
      cabeceraTablaRegistroEnvio: [
        // Detalla las cabeceras de la tabla
        {
          text: "Fecha",
          value: "fecha",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Tipo",
          value: "tipo",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Lote",
          value: "lote",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Destino",
          value: "destino",
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
      listaRegistroEnvios: [{ tipo: "tipo 1" }],
    };
  },
  methods: {
    abrirRegistroEnvio() {
      this.dialogMostrarRegistroEnvio = !this.dialogMostrarRegistroEnvio; // Abre el dialogMostrarRegistroEnvio
    },

    cargarDialogNuevoRegistroEnvio() {
      this.dialogNuevoRegistroEnvio = !this.dialogNuevoRegistroEnvio; // Abre el dialogNuevoRegistroEnvio
    },
  },

  mixins: [autenticacionMixin, myMixin],

  created() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario.rol === "Administrador")
      this.$store.commit("colocarLayout", "LayoutAdministrador");
    if (usuario.rol === "Exportador")
      this.$store.commit("colocarLayout", "LayoutExportador");
  },
};
</script>
