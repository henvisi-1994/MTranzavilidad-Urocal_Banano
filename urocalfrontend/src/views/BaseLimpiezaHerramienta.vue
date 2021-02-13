<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo LimpiezaHerramienta -->
    <DialogNuevoLimpiezaHerramienta
      ref="DialogNuevoLimpiezaHerramienta"
    ></DialogNuevoLimpiezaHerramienta>

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
              v-model="buscarLimpiezaHerramienta"
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
        <!-- Tabla que muestra los LimpiezaHerramienta -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaLimpiezaHerramienta"
          sort-by="cultivoid"
          :items="listaLimpiezaHerramientaStore"
          :search="buscarLimpiezaHerramienta"
          class="elevation-1"
        >
          <template v-slot:top>
            <!-- Tabs que muestra la informacion detallada de LimpiezaHerramienta -->
            <DialogMostrarLimpiezaHerramienta
              ref="DialogMostrarLimpiezaHerramienta"
            ></DialogMostrarLimpiezaHerramienta>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirMostrarLimpiezaHerramienta(item)">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo LimpiezaHerramienta -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px"
          large elevation="0"
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
import ServicioLimpiezaHerramienta from "../services/ServicioLimpiezaHerramienta";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseLimpiezaHerramienta",

  components: {
    DialogNuevoLimpiezaHerramienta,
    DialogMostrarLimpiezaHerramienta,
  },

  mounted() {
    this.cargarListaLimpiezaHerramienta();
    this.cargarListaCultivos();
  },

  data() {
    return {
      nombre: "Limpieza de Herramientas",
      buscarLimpiezaHerramienta: "", // Guarda el texto de búsqueda
      cabeceraTablaLimpiezaHerramienta: [
        // Detalla las cabeceras de la tabla
        {
          text: "Cultivo",
          value: "cultivoproducto.pronombre",
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
          text: "Operario",
          value: "limoperario",
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

    listaLimpiezaHerramientaStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloLimpiezaHerramienta/listaLimpiezaHerramientaStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloLimpiezaHerramienta/establecerListaLimpiezaHerramientaStore",
          v
        );
      },
    },

    listaCultivoStore: {
      get() {
        return this.$store.getters["moduloLimpiezaHerramienta/listaCultivoStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloLimpiezaHerramienta/establecerListaCultivoStore",
          v
        );
      },
    },

    modeloLimpiezaHerramientaStore: {
      get() {
        return this.$store.getters["moduloLimpiezaHerramienta/limpiezaHerramienta"];
      },
      set(v) {
        return this.$store.commit(
          "moduloLimpiezaHerramienta/nuevoLimpiezaHerramienta",
          v
        );
      },
    },
  },

  methods: {
    // #  MANIPULACIÓN DE DATOS  #
    async cargarListaLimpiezaHerramienta() {
      let listaLimpiezaHerramienta = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioLimpiezaHerramienta.obtenerTodosLimpiezaHerramienta(); // Obtener respuesta de backend
      let datosLimpiezaHerramienta = await respuesta.data; // Rescatar datos de la respuesta
      datosLimpiezaHerramienta.forEach((LimpiezaHerramienta) => {
        // Guardar cada registro en la 'lista de datos'
        listaLimpiezaHerramienta.push(LimpiezaHerramienta);
      });
      this.listaLimpiezaHerramientaStore = listaLimpiezaHerramienta;
    },

    async cargarListaCultivos() {
      let listaCultivo = []; // Limpiar la 'lista de ciudades'
      let respuesta = await ServicioLimpiezaHerramienta.obtenerTodosCultivos(); // Obtener respuesta de backend
      let datosCultivo = await respuesta.data; // Rescatar datos de la respuesta
      datosCultivo.forEach((Cultivo) => {
        // Guardar cada registro en la 'lista de datos'
        listaCultivo.push(Cultivo);
      });
      this.listaCultivoStore = listaCultivo;
    },

    ...mapMutations("moduloLimpiezaHerramienta", ["establecerListaCultivoStore"]),
    // Vacia el modelo LimpiezaHerramienta
    ...mapMutations("moduloLimpiezaHerramienta", ["vaciarLimpiezaHerramienta"]),

    // Carga el DialogNuevoLimpiezaHerramienta
    cargarDialogNuevoLimpiezaHerramienta() {
      this.dialogNuevoLimpiezaHerramienta = !this.dialogNuevoLimpiezaHerramienta; // Abre el DialogNuevoLimpiezaHerramienta
      this.$refs.DialogNuevoLimpiezaHerramienta.$refs.componentFormLimpiezaHerramienta.$refs.formLimpiezaHerramienta.resetValidation(); // Reinicia las validaciones de formLimpiezaHerramienta
      this.vaciarLimpiezaHerramienta(); // Vacia el modelo LimpiezaHerramienta
    },

    abrirMostrarLimpiezaHerramienta(item) {
      this.dialogMostrarLimpiezaHerramienta = !this.dialogMostrarLimpiezaHerramienta;
      this.vaciarLimpiezaHerramienta(); // Vacia el modelo LimpiezaHerramienta
      const indiceEditar = this.listaLimpiezaHerramientaStore.indexOf(item);
      this.modeloLimpiezaHerramientaStore = item;
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
