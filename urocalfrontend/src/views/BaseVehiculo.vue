<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo Vehiculo -->
    <DialogNuevoVehiculo ref="DialogNuevoVehiculo"></DialogNuevoVehiculo>

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
              v-model="buscarVehiculo"
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
          :headers="cabeceraTablaVehiculos"
          sort-by="id_lote"
          :items="listaVehiculos"
          :search="buscarVehiculo"
          class="elevation-1"
        >
          <template v-slot:top>
            <DialogEditarVehiculo ref="DialogEditarVehiculo"></DialogEditarVehiculo>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="cargarDialogEditarVehiculo()">mdi-eye</v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          large
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px"
          color="primary"
          @click="cargarDialogNuevoVehiculo()"
          >Nuevo Vehiculo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

import DialogNuevoVehiculo from "../components/DialogNuevoVehiculo";
import DialogEditarVehiculo from "../components/DialogEditarVehiculo";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseVehiculo",

  components: {
    DialogNuevoVehiculo,
    DialogEditarVehiculo,
  },

  data() {
    return {
      nombre: "Gestión de Vehículos",
      buscarVehiculo: "", // Guarda el texto de búsqueda
      cabeceraTablaVehiculos: [
        // Detalla las cabeceras de la tabla (Los campos más relevantes)
        {
          text: "Placa",
          value: "vehplaca",
          align: "center",
          sortable: false,
          class: "grey lighten-3",
        },
        {
          text: "Marca",
          value: "vehmarca",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Descripción",
          value: "vehdescripcion",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Lona",
          value: "vehlona",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Caseta",
          value: "vehcaseta",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Puerta",
          value: "vehpuerta",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Finca id",
          value: "fincaid",
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
      listaVehiculos: [
        // Almacena una lista de Lotes, la misma se muestra en tabla
        {
          vehiculoid: "01",
          vehplaca: "xxx123",
          vehmarca: "Toyota",
          vehdescripcion: "Ninguna",
          vehlona: "Si",
          vehcaseta: "Si",
          vehpuerta: "Si",
          fincaid: "01",
        },
        {
          vehiculoid: "02",
          vehplaca: "qwr123",
          vehmarca: "Volvo",
          vehdescripcion: "Ninguna",
          vehlona: "No",
          vehcaseta: "Si",
          vehpuerta: "Si",
          fincaid: "01",
        },
        {
          vehiculoid: "03",
          vehplaca: "rty123",
          vehmarca: "Mercedes Benz",
          vehdescripcion: "Ninguna",
          vehlona: "Si",
          vehcaseta: "Si",
          vehpuerta: "Si",
          fincaid: "02",
        },
        {
          vehiculoid: "04",
          vehplaca: "uio123",
          vehmarca: "Renault",
          vehdescripcion: "Ninguna",
          vehlona: "Si",
          vehcaseta: "Si",
          vehpuerta: "No",
          fincaid: "03",
        },
        {
          vehiculoid: "05",
          vehplaca: "asd123",
          vehmarca: "Isuzu",
          vehdescripcion: "Ninguna",
          vehlona: "Si",
          vehcaseta: "Si",
          vehpuerta: "Si",
          fincaid: "04",
        },
        {
          vehiculoid: "06",
          vehplaca: "fgh123",
          vehmarca: "Nissan",
          vehdescripcion: "Ninguna",
          vehlona: "No",
          vehcaseta: "Si",
          vehpuerta: "No",
          fincaid: "05",
        },
        {
          vehiculoid: "07",
          vehplaca: "jkl123",
          vehmarca: "Toyota",
          vehdescripcion: "Ninguna",
          vehlona: "Si",
          vehcaseta: "Si",
          vehpuerta: "Si",
          fincaid: "05",
        },
        {
          vehiculoid: "08",
          vehplaca: "zxc123",
          vehmarca: "Volvo",
          vehdescripcion: "Ninguna",
          vehlona: "Si",
          vehcaseta: "Si",
          vehpuerta: "Si",
          fincaid: "06",
        },
        {
          vehiculoid: "09",
          vehplaca: "vbn123",
          vehmarca: "Mercedes Benz",
          vehdescripcion: "Ninguna",
          vehlona: "No",
          vehcaseta: "Si",
          vehpuerta: "No",
          fincaid: "07",
        },
        {
          vehiculoid: "10",
          vehplaca: "bnm123",
          vehmarca: "Toyota",
          vehdescripcion: "Ninguna",
          vehlona: "No",
          vehcaseta: "No",
          vehpuerta: "No",
          fincaid: "07",
        },
      ],
    };
  },

  computed: {
    /* Obtiene y establece el estado de la variable dialogNuevoVehiculo
    que muestra u oculta el dialogo*/
    dialogNuevoVehiculo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoVehiculo"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoVehiculo", v);
      },
    },

    /* Obtiene y modifica el estado de la variable dialogTabMostrarLote
    que muestra u oculta el dialogo*/
    dialogEditarVehiculo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogEditarVehiculo"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogEditarVehiculo", v);
      },
    },
  },

  methods: {
    // Vacia el modelo Vehiculo
    ...mapMutations("moduloVehiculo", ["vaciarVehiculo"]),

    // Dialogo Nuevo Vehiculo
    cargarDialogNuevoVehiculo() {
      this.dialogNuevoVehiculo = !this.dialogNuevoVehiculo; // Abre el DialogNuevoVehiculo
      this.vaciarVehiculo();
    },

    // Dialogo Editar Vehiculo
    cargarDialogEditarVehiculo() {
      this.dialogEditarVehiculo = !this.dialogEditarVehiculo;
      this.vaciarVehiculo();
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
};
</script>
