<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo LimpiezaVehiculo -->
    <DialogNuevoLimpiezaVehiculo
      ref="DialogNuevoLimpiezaVehiculo"
    ></DialogNuevoLimpiezaVehiculo>

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
            <v-text-field
              v-model="buscarLimpiezaVehiculo"
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
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaLimpiezaVehiculos"
          sort-by="id_lote"
          :items="listaLimpiezaVehiculos"
          :search="buscarLimpiezaVehiculo"
          class="elevation-1"
        >
          <template v-slot:top>
            <DialogEditarLimpiezaVehiculo
              ref="DialogEditarLimpiezaVehiculo"
            ></DialogEditarLimpiezaVehiculo>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="cargarDialogEditarLimpiezaVehiculo()"
              >mdi-eye</v-icon
            >
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px"
          large elevation="0"
          color="primary"
          @click="cargarDialogNuevoLimpiezaVehiculo()"
          >Nuevo LimpiezaVehiculo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

import DialogNuevoLimpiezaVehiculo from "../components/DialogNuevoLimpiezaVehiculo";
import DialogEditarLimpiezaVehiculo from "../components/DialogEditarLimpiezaVehiculo";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseLimpiezaVehiculo",

  components: {
    DialogNuevoLimpiezaVehiculo,
    DialogEditarLimpiezaVehiculo,
  },

  data() {
    return {
      nombre: "Limpieza de Vehículo",
      buscarLimpiezaVehiculo: "", // Guarda el texto de búsqueda
      cabeceraTablaLimpiezaVehiculos: [
        // Detalla las cabeceras de la tabla (Los campos más relevantes)
        {
          text: "Fecha",
          value: "limvehfecha",
          align: "center",
          sortable: false,
          class: "grey lighten-3",
        },
        {
          text: "Producto utilizado",
          value: "limvehproductoutilizado",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Escobillon",
          value: "limvehescobillon",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Escoba",
          value: "limvehscoba",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Agua",
          value: "limvehagua",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Aspiradora",
          value: "limvehaspiradora",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "VehiculoID",
          value: "vehiculoid",
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
      listaLimpiezaVehiculos: [
        // Almacena una lista de Lotes, la misma se muestra en tabla
        {
          limpiezavehiculoid: "01",
          limvehfecha: "07/01/2020",
          limvehproductoutilizado: "Deja",
          limvehescobillon: "Si",
          limvehscoba: "Si",
          limvehagua: "No",
          limvehaspiradora: "Si",
          vehiculoid: "01",
        },
        {
          limpiezavehiculoid: "02",
          limvehfecha: "11/01/2020",
          limvehproductoutilizado: "Sonax",
          limvehescobillon: "No",
          limvehscoba: "No",
          limvehagua: "Si",
          limvehaspiradora: "No",
          vehiculoid: "01",
        },
        {
          limpiezavehiculoid: "03",
          limvehfecha: "20/01/2020",
          limvehproductoutilizado: "Rainx",
          limvehescobillon: "Si",
          limvehscoba: "Si",
          limvehagua: "No",
          limvehaspiradora: "Si",
          vehiculoid: "02",
        },
        {
          limpiezavehiculoid: "04",
          limvehfecha: "05/02/2020",
          limvehproductoutilizado: "Meguiar",
          limvehescobillon: "No",
          limvehscoba: "Si",
          limvehagua: "Si",
          limvehaspiradora: "No",
          vehiculoid: "02",
        },
        {
          limpiezavehiculoid: "05",
          limvehfecha: "07/02/2020",
          limvehproductoutilizado: "Maddox",
          limvehescobillon: "Si",
          limvehscoba: "Si",
          limvehagua: "Si",
          limvehaspiradora: "No",
          vehiculoid: "03",
        },
        {
          limpiezavehiculoid: "06",
          limvehfecha: "14/02/2020",
          limvehproductoutilizado: "Deja",
          limvehescobillon: "Si",
          limvehscoba: "No",
          limvehagua: "No",
          limvehaspiradora: "Si",
          vehiculoid: "03",
        },
        {
          limpiezavehiculoid: "07",
          limvehfecha: "25/02/2020",
          limvehproductoutilizado: "Deja",
          limvehescobillon: "Si",
          limvehscoba: "Si",
          limvehagua: "Si",
          limvehaspiradora: "No",
          vehiculoid: "04",
        },
        {
          limpiezavehiculoid: "08",
          limvehfecha: "06/03/2020",
          limvehproductoutilizado: "Turtle",
          limvehescobillon: "No",
          limvehscoba: "Si",
          limvehagua: "Si",
          limvehaspiradora: "No",
          vehiculoid: "05",
        },
        {
          limpiezavehiculoid: "09",
          limvehfecha: "14/03/2020",
          limvehproductoutilizado: "Sonax",
          limvehescobillon: "Si",
          limvehscoba: "No",
          limvehagua: "No",
          limvehaspiradora: "Si",
          vehiculoid: "06",
        },
        {
          limpiezavehiculoid: "10",
          limvehfecha: "28/03/2020",
          limvehproductoutilizado: "Deja",
          limvehescobillon: "Si",
          limvehscoba: "Si",
          limvehagua: "Si",
          limvehaspiradora: "Si",
          vehiculoid: "07",
        },
      ],
    };
  },

  computed: {
    /* Obtiene y establece el estado de la variable dialogNuevoLimpiezaVehiculo
    que muestra u oculta el dialogo*/
    dialogNuevoLimpiezaVehiculo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoLimpiezaVehiculo"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoLimpiezaVehiculo", v);
      },
    },

    /* Obtiene y modifica el estado de la variable dialogTabMostrarLote
    que muestra u oculta el dialogo*/
    dialogEditarLimpiezaVehiculo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogEditarLimpiezaVehiculo"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogEditarLimpiezaVehiculo",
          v
        );
      },
    },
  },

  methods: {
    // Vacia el modelo LimpiezaVehiculo
    ...mapMutations("moduloLimpiezaVehiculo", ["vaciarLimpiezaVehiculo"]),

    // Dialogo Nuevo LimpiezaVehiculo
    cargarDialogNuevoLimpiezaVehiculo() {
      this.dialogNuevoLimpiezaVehiculo = !this.dialogNuevoLimpiezaVehiculo; // Abre el DialogNuevoLimpiezaVehiculo
      this.vaciarLimpiezaVehiculo();
    },

    // Dialogo Editar LimpiezaVehiculo
    cargarDialogEditarLimpiezaVehiculo() {
      this.dialogEditarLimpiezaVehiculo = !this.dialogEditarLimpiezaVehiculo;
      this.vaciarLimpiezaVehiculo();
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
