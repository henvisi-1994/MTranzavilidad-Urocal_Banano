<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo Vehiculo -->
    <DialogNuevoVehiculo ref="DialogNuevoVehiculo"></DialogNuevoVehiculo>

    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0">
      <v-card-title class="py-0">
        <v-row no-gutters>
          <v-col cols="12" md="4">
            <v-text-field v-model="buscarVehiculo" append-icon="mdi-magnify" label="Buscar" ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-data-table :height="tablaResponsiva()" :headers="cabeceraTablaVehiculos" sort-by="id_lote" :items="listaVehiculos" :search="buscarVehiculo" class="elevation-1" dense>
          <template v-slot:top>
            <DialogEditarVehiculo ref="DialogEditarVehiculo" ></DialogEditarVehiculo>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="cargarDialogEditarVehiculo()">mdi-eye</v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn large :block="$vuetify.breakpoint.xs ? true : false" width="200px" color="primary" @click="cargarDialogNuevoVehiculo()" >Nuevo Vehiculo</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

import DialogNuevoVehiculo from "../components/DialogNuevoVehiculo";
import DialogEditarVehiculo from "../components/DialogEditarVehiculo";

export default {
  name: "BaseVehiculo",

  components: {
    DialogNuevoVehiculo,
    DialogEditarVehiculo,
  },

  data() {
    return {//vehiculoid, vehplaca, vehmarca, vehdescripcion, vehlona, vehcaseta, vehpuerta, fincaid
      buscarVehiculo: "",        // Guarda el texto de búsqueda
      cabeceraTablaVehiculos: [  // Detalla las cabeceras de la tabla (Los campos más relevantes)
        {text: "Fecha",value: "limvehfecha", align: "center", sortable: false, class: "grey lighten-3",},
        {text: "Producto utilizado",value: "limvehproductoutilizado", sortable: false, align: "center", class: "grey lighten-3",},
        {text: "Escobillon",value: "limvehescobillon", sortable: false, align: "center", class: "grey lighten-3",},
        {text: "Escoba",value: "limvehscoba", sortable: false, align: "center", class: "grey lighten-3",},
        {text: "Agua",value: "limvehagua", sortable: false, align: "center", class: "grey lighten-3",},
        {text: "Aspiradora",value: "limvehaspiradora", sortable: false, align: "center", class: "grey lighten-3",},
        {text: "VehiculoID",value: "vehiculoid", sortable: false, align: "center", class: "grey lighten-3",},
                {text: "Detalles",value: "actions", sortable: false, align: "center", class: "grey lighten-3",},
      ],
      listaVehiculos: [          // Almacena una lista de Lotes, la misma se muestra en tabla
        {limpiezavehiculoid: '0704411223', limvehfecha: 'Keys' , limvehproductoutilizado: 'Alicia', limvehescobillon: 'Av. Kays', limvehscoba: '08975421', limvehagua: '0897654321', limvehaspiradora: 'alicia@gmail.com', vehiculoid: 'Femenino'},
        

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
    tablaResponsiva() {
      // Ajusta el tamaño de la tabla para pantallas pequeñas (No modificar)
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

  created() {
    this.$store.commit("colocarLayout", "LayoutProductor");
  },
};
</script>
