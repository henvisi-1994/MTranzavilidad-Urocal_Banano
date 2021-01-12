<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo Productor -->
    <DialogNuevoProductorPersona ref="DialogNuevoProductorPersona"></DialogNuevoProductorPersona>

    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0">
      <v-card-title class="py-0">
        <v-row no-gutters>
          <v-col cols="12" md="4">
            <v-text-field v-model="buscarProductor" append-icon="mdi-magnify" label="Buscar" ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-data-table :height="tablaResponsiva()" :headers="cabeceraTablaProductors" sort-by="id_lote" :items="listaProductors" :search="buscarProductor" class="elevation-1" dense>
          <template v-slot:top>
            <DialogEditarProductorPersona ref="DialogEditarProductorPersona" ></DialogEditarProductorPersona>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="cargarDialogEditarProductorPersona()">mdi-eye</v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn large :block="$vuetify.breakpoint.xs ? true : false" width="200px" color="primary" @click="cargarDialogNuevoProductorPersona()" >Nuevo Productor</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

import DialogNuevoProductorPersona from "../components/DialogNuevoProductorPersona";
import DialogEditarProductorPersona from "../components/DialogEditarProductorPersona";

export default {
  name: "BaseProductorPersona",

  components: {
    DialogNuevoProductorPersona,
    DialogEditarProductorPersona,
  },

  data() {
    return {
      buscarProductor: "",        // Guarda el texto de búsqueda
      cabeceraTablaProductors: [  // Detalla las cabeceras de la tabla (Los campos más relevantes)
        {text: "Cedula",value: "percedula", align: "center", class: "grey lighten-3", },
        {text: "Apellidos",value: "perapellidos", align: "center", sortable: false, class: "grey lighten-3",},
        {text: "Nombres",value: "pernombres", sortable: false, align: "center", class: "grey lighten-3",},
        {text: "Dirección",value: "perdireccion", sortable: false, align: "center", class: "grey lighten-3",},
        {text: "Teléfono",value: "pertelefono", sortable: false, align: "center", class: "grey lighten-3",},
        {text: "Whatsapp",value: "perwhatsapp", sortable: false, align: "center", class: "grey lighten-3",},
        {text: "Email",value: "peremail", sortable: false, align: "center", class: "grey lighten-3",},
        {text: "Detalles",value: "actions", sortable: false, align: "center", class: "grey lighten-3",},
      ],
      listaProductors: [          // Almacena una lista de Lotes, la misma se muestra en tabla
        { percedula: '0704411223', perapellidos: 'Keys' , pernombres: 'Alicia', perdireccion: 'Av. Kays', pertelefono: '08975421', perwhatsapp: '0897654321', peremail: 'alicia@gmail.com', pergenero: 'Femenino', perfechanacimiento: '20/04/1993', ciudadnacimiento: 'Machala'},
        { percedula: '0704411224', perapellidos: 'Smith' , pernombres: 'Beth', perdireccion: 'Av. Kays', pertelefono: '08975421', perwhatsapp: '0897654321', peremail: 'alicia@gmail.com', pergenero: 'Femenino', perfechanacimiento: '20/04/1993', ciudadnacimiento: 'Machala'},
        { percedula: '0704411225', perapellidos: 'Bouvier' , pernombres: 'Marge', perdireccion: 'Av. Kays', pertelefono: '08975421', perwhatsapp: '0897654321', peremail: 'alicia@gmail.com', pergenero: 'Femenino', perfechanacimiento: '20/04/1993', ciudadnacimiento: 'Machala'},
        { percedula: '0704411223', perapellidos: 'Simpson' , pernombres: 'Homero', perdireccion: 'Av. Kays', pertelefono: '08975421', perwhatsapp: '0897654321', peremail: 'alicia@gmail.com', pergenero: 'Femenino', perfechanacimiento: '20/04/1993', ciudadnacimiento: 'Machala'}
      ], 
    };
  },

  computed: {
    /* Obtiene y establece el estado de la variable dialogNuevoProductorPersona
    que muestra u oculta el dialogo*/
    dialogNuevoProductorPersona: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoProductorPersona"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoProductorPersona", v);
      },
    },

    /* Obtiene y modifica el estado de la variable dialogTabMostrarLote
    que muestra u oculta el dialogo*/
    dialogEditarProductorPersona: {
      get() {
        return this.$store.getters["gestionDialogos/dialogEditarProductorPersona"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogEditarProductorPersona", v);
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

    // Vacia el modelo ProductorPersona
    ...mapMutations("moduloProductorPersona", ["vaciarProductorPersona"]),

    // Dialogo Nuevo Productor
    cargarDialogNuevoProductorPersona() {
      this.dialogNuevoProductorPersona = !this.dialogNuevoProductorPersona; // Abre el DialogNuevoProductor
      this.vaciarProductorPersona(); 
    },

    // Dialogo Editar Productor
    cargarDialogEditarProductorPersona() {
      this.dialogEditarProductorPersona = !this.dialogEditarProductorPersona;
      this.vaciarProductorPersona(); 
    },
  },

  created() {
    this.$store.commit("colocarLayout", "LayoutProductor");
  },
};
</script>
