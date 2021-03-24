<template>
  <v-container fluid>
    <!-- Dialog para registrar nueva Tratamiento -->
    <DialogoNuevoTratamiento
      ref="DialogoNuevoTratamiento"
    ></DialogoNuevoTratamiento>

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
              v-model="buscarTratamiento"
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
        <!-- Tabla que muestra las Tratamientos -->
        <v-data-table
          :headers="cabeceraTablaTratamiento"
          :items="listaTratamiento"
          :search="buscarTratamiento"
          sort-by="tratamientoid"
          :height="tablaResponsiva()"
          class="elevation-1"
        >
          <template v-slot:top>
            <DialogoMostrarTratamiento
              ref="DialogoMostrarTratamiento"
            ></DialogoMostrarTratamiento>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirTabsMostrarTratamiento(item)">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nueva siembra -->
        <v-btn
          large
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px"
          elevation="0"
          color="primary"
          @click="cargarDialogoNuevoTratamiento()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import DialogoNuevoTratamiento from "../components/DialogoNuevoTratamiento";
import DialogoMostrarTratamiento from "../components/DialogoMostrarTratamiento";
import ServicioTratamiento from "../services/ServicioTratamiento";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseTratamiento",

  components: {
    DialogoNuevoTratamiento,
    DialogoMostrarTratamiento,
  },

  data() {
    return {
      listaTratamiento: [],
      nombre: "Gestión de Fermentación y secado",
      buscarTratamiento: "", // Guarda el texto de búsqueda
      cabeceraTablaTratamiento: [
        // Detalla los cabezales de la tabla
        {
          text: "Ubicación",
          value: "traubicacion",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha de Tratamiento",
          value: "trafecha",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Cultivo",
          value: "cultivo",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Productor",
          value: "productor",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Finca",
          value: "finnombrefinca",
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
    // Obtiene y modifica el estado de la variable dialogoNuevaTratamiento
    dialogoNuevoTratamiento: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoNuevoTratamiento"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogoNuevoTratamiento",
          v
        );
      },
    },

    // Obtiene y modifica el estado de la variable dialogoMostrarTratamiento
    dialogoMostrarTratamiento: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoMostrarTratamiento"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit(
          "gestionDialogos/toggleDialogoMostrarTratamiento",
          v
        );
      },
    },

    // Obtiene el modelo Control Maleza
    modeloTratamientoStore: {
      get() {
        return this.$store.getters["moduloTratamiento/modeloTratamientoStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloTratamiento/establecerModeloTratamientoStore",
          v
        );
      },
    },
     editarTratamiento: {
      get() {
        return this.$store.getters["moduloTratamiento/editarTratamiento"];
      },
      set(v) {
        return this.$store.commit("moduloTratamiento/establecerEditarTratamiento", v);
      },
    },
  },

  methods: {
    // Carga el DialogoNuevaTratamiento
    cargarDialogoNuevoTratamiento() {
      this.dialogoNuevoTratamiento = !this.dialogoNuevoTratamiento; // Abre el DialogStepperFormNewTratamiento
      this.vaciarTratamiento(); // Reinicia el modelo Tratamiento
    },

    // Carga el TabsMostrarTratamiento
    async abrirTabsMostrarTratamiento(item) {
      this.dialogoMostrarTratamiento = true; // Abre el DialogMostrarRiego
      this.vaciarTratamiento(); // Vacia el modelo riego
      let resultado = await ServicioTratamiento.obtenerDetalleTratamiento(item.tratamientoid);
      this.modeloTratamientoStore = {
        cultivo: item.cultivo,
        cultivoid: item.cultivoid,
        fincaid: item.fincaid,
        finnombrefinca: item.finnombrefinca,
        productor: item.productor,
        productorid: item.productorid,
        trafecha: item.trafecha,
        traobservacion: item.traobservacion,
        tratamientoid: item.tratamientoid,
        traubicacion: item.traubicacion,
        detalle:resultado.data
      };
      this.$store.commit("moduloTratamiento/establecerEditarTratamiento", true);
      //his.editarTratamiento = true;
    },

    // Llena la listaSemilla con datos del servidor backend
    async obtenerTodosTratamiento() {
      let resultado = await ServicioTratamiento.obtenerTodosTratamiento();
      this.listaTratamiento = resultado.data;
      //console.log(this.listaMalezaControl);
    },

    // Vacia el modelo siembra
    ...mapMutations("moduloTratamiento", [
      "vaciarTratamiento",
      "asignarListaTratamiento",
    ]),
  },

  mounted() {
    this.obtenerTodosTratamiento();
  },

  created() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario.rol === "Administrador")
      this.$store.commit("colocarLayout", "LayoutAdministrador");
    if (usuario.rol === "Productor")
      this.$store.commit("colocarLayout", "LayoutProductor");
  },

  mixins: [autenticacionMixin, myMixin],
};
</script>
