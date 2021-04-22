<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo almacenamiento -->
    <DialogNuevoAlmacenamiento
      ref="DialogNuevoAlmacenamiento"
    ></DialogNuevoAlmacenamiento>

    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0" :class="$vuetify.breakpoint.xs ? '' : 'mt-5'">
      <v-card-title class="py-2">
        <v-row no-gutters justify-md="space-between">
          <v-col cols="12" md="6" class="centrar-vertical">
            <div
              :class="
                $vuetify.breakpoint.xs
                  ? 'transition-swing primary--text text-h5  text-center'
                  : 'transition-swing primary--text text-h4'
              "
            >
              Gestión de almacenamiento
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <!-- Caja de búsqueda -->
            <v-text-field
              v-model="buscarAlmacenamiento"
              append-icon="mdi-magnify"
              label="Buscar"
              class="custom"
              dense
              filled
              hide-details="false"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra lista de almacenamiento -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaAlmacenamiento"
          sort-by="id_farm"
          :items="listaAlmacenamiento"
          :search="buscarAlmacenamiento"
          class="elevation-1"
        >
          <template v-slot:top>
            <!-- Tabs que muestra la informacion detallada de cada almacenamiento -->
            <DialogMostrarAlmacenamiento
              ref="DialogMostrarAlmacenamiento"
            ></DialogMostrarAlmacenamiento>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirMostrarAlmacenamiento(item)">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo almacenamiento -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px"
          large
          elevation="0"
          color="primary"
          @click="abrirDialogAlmacenamientoNuevo()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";

import DialogNuevoAlmacenamiento from "@/components/DialogNuevoAlmacenamiento";
import DialogMostrarAlmacenamiento from "@/components/DialogMostrarAlmacenamiento";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

import servicioAlmacenamiento from "../services/ServicioAlmacenamiento";
import servicioRevisionHumedad from "../services/ServicioRevisionHumedad";

export default {
  name: "BaseAlmacenamiento",

  components: {
    DialogNuevoAlmacenamiento,
    DialogMostrarAlmacenamiento,
  },

  data() {
    return {
      buscarAlmacenamiento: "", // Guarda el texto de búsqueda

      // Detalla las cabeceras de la tabla
      cabeceraTablaAlmacenamiento: [
        {
          text: "Centro de acopio",
          value: "centroacopionombre",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Contrato",
          value: "almcontrato",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha acopio",
          value: "almfechaacopio",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha ingreso bodega",
          value: "almfechaingresobodega",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Número de bultos",
          value: "almnumerobultos",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },        
        {
          text: "Peso total",
          value: "almpesototalingreso",
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
    // Obtiene y modifica el modelo almacenamiento
    almacenamiento: {
      get() {
        return this.$store.getters["moduloAlmacenamiento/almacenamiento"];
      },
      set(v) {
        return this.$store.commit("moduloAlmacenamiento/nuevoAlmacenamiento", v);
      },
    },
        // Obtiene y modifica el modelo almacenamiento
    humedad: {
      get() {
        return this.$store.getters["moduloRevisionHumedad/revisionHumedad"];
      },
      set(v) {
        return this.$store.commit("moduloRevisionHumedad/nuevoRevisionHumedad", v);
      },
    },
   // Obtiene la listaRevisionHumedad
    listaRevisionHumedad: {
      get() {
        return this.$store.getters["moduloRevisionHumedad/listaRevisionHumedad"];
      },
      set(v) {
        return this.$store.commit("moduloRevisionHumedad/asignarListaRevisionHumedad", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogNuevoAlmacenamiento
    dialogNuevoAlmacenamiento: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoAlmacenamiento"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoAlmacenamiento", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarAlmacenamiento
    dialogMostrarAlmacenamiento: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarAlmacenamiento"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogMostrarAlmacenamiento", v);
      },
    },
    dialogMostrarHumedad: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarAlmacenamiento"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogMostrarAlmacenamiento", v);
      },
    },

    // Obtiene y modifica la variable listaAlmacenamiento
    listaAlmacenamiento: {
      get() {
        return this.$store.getters["moduloAlmacenamiento/listaAlmacenamiento"];
      },
      set(v) {
        return this.$store.commit("moduloAlmacenamiento/asignarListaAlmacenamiento", v);
      },
    },
  },

  methods: {
    // Obtiene el metodo para vaciar el modeloRevisionHumedad
    ...mapMutations("moduloRevisionHumedad", ["vaciarRevisionHumedad"]),

    // Obtiene los metodos vaciarAlmacenamiento y agregarCosecha
    ...mapMutations("moduloAlmacenamiento", ["vaciarAlmacenamiento",'agregarCosecha']),

    // Carga el DialogStepperLoteNuevo
    abrirDialogAlmacenamientoNuevo() {
      this.dialogNuevoAlmacenamiento = true;
      this.vaciarAlmacenamiento();
      this.vaciarRevisionHumedad();
    },

    // Abre el dialogMostrarAlmacenamiento
    async abrirMostrarAlmacenamiento(item) {
      this.dialogMostrarAlmacenamiento = true;
      this.almacenamiento = item;
      let respuestaServicioAlmacenamiento = await servicioAlmacenamiento.obtenerMixPorAlmacenamiento(item.almacenamientoid);
      respuestaServicioAlmacenamiento.data.forEach(mix => {
        this.agregarCosecha(mix.cosechaid);
      });
      let respuestaServicioRevisionHumedad = await servicioRevisionHumedad.obtenerRevisionHumedadPorAlmacenamiento(item.almacenamientoid);
      this.listaRevisionHumedad = respuestaServicioRevisionHumedad.data;
    },

    // Llena la listaAlmacenamiento con datos del servidor backend
    async obtenerTodosAlmacenamiento() {
      let resultado = await servicioAlmacenamiento.obtenerTodosAlmacenamiento();
      resultado.data.forEach((almacenamiento) => {
        almacenamiento.almfechaacopio = this.formatDate(almacenamiento.almfechaacopio);
        almacenamiento.almfechaingresobodega = this.formatDate(
          almacenamiento.almfechaingresobodega
        );
      });
      this.listaAlmacenamiento = resultado.data;
    },
  },

  mixins: [autenticacionMixin, myMixin],

  created() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario.rol === "Administrador")
      this.$store.commit("colocarLayout", "LayoutAdministrador");
    if (usuario.rol === "Responsable Centro Acopio")
      this.$store.commit("colocarLayout", "LayoutCentroAcopio");
  },

  mounted() {
    this.obtenerTodosAlmacenamiento();
  },
};
</script>
