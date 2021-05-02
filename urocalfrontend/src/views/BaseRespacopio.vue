<template>
  <v-container fluid>
    <!-- Dialog para registrar nueva poda -->
    <DialogNuevoRespacopio
      ref="componentDialogNuevoRespacopio"
    ></DialogNuevoRespacopio>

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
              v-model="buscarRespacopio"
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
        <!-- Tabla que muestra lista de Respacopio -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaRespacopio"
          sort-by="id_respacopio"
          :items="listaRespacopioStore"
          :search="buscarRespacopio"
          class="elevation-1"
        >
          <template v-slot:top>
            <!-- Dialog que muestra el formulario con toda la informacion de Respacopio -->
            <DialogMostrarRespacopio
              ref="componentDialogMostrarRespacopio"
            ></DialogMostrarRespacopio>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirMostrarRespacopio(item)">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nueva Respacopio -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px"
          large
          color="primary"
          @click="cargarDialogNuevoRespacopio()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

import DialogNuevoRespacopio from "@/components/DialogNuevoRespacopio";
import DialogMostrarRespacopio from "@/components/DialogMostrarRespacopio";
import ServicioResCentroAcopio from "../services/ServicioResCentroAcopio";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseRespacopio",

  components: {
    DialogNuevoRespacopio,
    DialogMostrarRespacopio,
  },

  mounted() {
    this.cargarlistaRespacopio();
    this.cargarListaCiudad();
  },

  data() {
    return {
      nombre: "Responsable Centro Acopio",
      buscarRespacopio: "", // Guarda el texto de búsqueda
      cabeceraTablaRespacopio: [
        /*
        // Detalla las cabeceras de la tabla
        {
          text: "Código de Responsable de acopio",
          value: "codigo_respacopio",
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
        */
        {
          text: "Cedula",
          value: "percedula",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Apellidos",
          value: "perapellidos",
          align: "center",
          sortable: false,
          class: "grey lighten-3",
        },
        {
          text: "Nombres",
          value: "pernombres",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Dirección",
          value: "perdireccion",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Teléfono",
          value: "pertelefono",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Whatsapp",
          value: "perwhatsapp",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Email",
          value: "peremail",
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
      //listaRespacopio: [{ codigo_respacopio: 1 }], // Almacena una lista de Lotes, la misma se muestra en tabla
    };
  },

  computed: {
    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    listaRespacopioStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloRespacopio/listaRespacopioStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloRespacopio/establecerlistaRespacopioStore",
          v
        );
      },
    },

    listaCiudadStore: {
      get() {
        return this.$store.getters["moduloRespacopio/listaCiudadStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloRespacopio/establecerListaCiudadStore",
          v
        );
      },
    },

    // ##############
    // #  DIALOGOS  #
    // ##############

    // Obtiene y modifica el estado de la variable dialogNuevoPoda
    dialogNuevoRespacopio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoRespacopio"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogRespacopioNuevo",
          v
        );
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarRespacopio
    dialogMostrarRespacopio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarRespacopio"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit(
          "gestionDialogos/toggleDialogMostrarRespacopio",
          v
        );
      },

      // #############
      // #  MODELOS  #
      // #############
      respacopio: {
        get() {
          return this.$store.getters["moduloRespacopio/respacopio"];
        },
        set(v) {
          return this.$store.commit("moduloRespacopio/nuevoRespacopio", v);
        },
      },

      noEditar: {
        get() {
          return this.$store.getters["moduloRespacopio/noEditar"];
        },
        set(v) {
          return this.$store.commit("moduloRespacopio/cambiarEstadoNoEditar", v);
        },
      },
    },
  },

  methods: {
    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################

    async cargarlistaRespacopio() {
      let listaRespacopio = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioResCentroAcopio.obtenerTodosResCentroAcopio(); // Obtener respuesta de backend
      let datosUsuario = await respuesta.data; // Rescatar datos de la respuesta
      datosUsuario.forEach((dd) => {
        // Guardar cada registro en la 'lista de datos'
        listaRespacopio.push(dd);
      });
      this.listaRespacopioStore = listaRespacopio;
    },

    async cargarListaCiudad() {
      let listaCiudad = []; // Limpiar la 'lista de ciudades'
      let respuesta = await ServicioResCentroAcopio.obtenerTodosCiudad(); // Obtener respuesta de backend
      let datosCiudad = await respuesta.data; // Rescatar datos de la respuesta
      datosCiudad.forEach((ciudad) => {
        // Guardar cada registro en la 'lista de datos'
        listaCiudad.push(ciudad);
      });
      this.listaCiudadStore = listaCiudad;
    },

    // ##############
    // #  DIALOGOS  #
    // ##############

    // Carga el DialogMostrarRespacopio
    abrirMostrarRespacopio(item) {
      //console.log(item);
      this.dialogMostrarRespacopio = !this.dialogMostrarRespacopio; // Abre el DialogNuevoRespacopio
      //this.$refs.componentDialogMostrarRespacopio.$refs.componentFormRespacopio.$refs.formRespacopio.resetValidation(); // Reinicia las validaciones de formRespacopio
      this.vaciarRespacopio(); // Vacia el modelo Respacopio
      this.$store.commit("moduloRespacopio/nuevoRespacopio", item);
      this.$store.commit("moduloRespacopio/cambiarEstadoNoEditar", true);
      //console.log(this.respacopio);
    },

    // ###################
    // #  TIENDA DE VUE  #
    // ###################

    // Vacia el modelo Respacopio
    ...mapMutations("moduloRespacopio", ["establecerListaCiudadStore"]),
    ...mapMutations("moduloRespacopio", ["vaciarRespacopio"]),

    // Carga el DialogNuevoPoda
    cargarDialogNuevoRespacopio() {
      this.dialogNuevoRespacopio = !this.dialogNuevoRespacopio; // Abre el DialogNuevoPRespacopio
      this.$refs.componentDialogNuevoRespacopio.$refs.componentFormRespacopio.$refs.formRespacopio.resetValidation(); // Reinicia las validaciones de formPoda
      this.vaciarRespacopio(); // Vacia el modelo Respacopio
    },
  },

  mixins: [autenticacionMixin, myMixin],

  created() {
    this.$store.commit("colocarLayout", "LayoutAdministrador");
  },
};
</script>
