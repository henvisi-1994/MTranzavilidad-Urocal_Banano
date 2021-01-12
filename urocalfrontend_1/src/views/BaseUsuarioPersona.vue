<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo usuario -->
    <DialogNuevoUsuarioPersona ref="DialogNuevoUsuarioPersona"></DialogNuevoUsuarioPersona>

    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0">
      <v-card-title class="py-0">
        <v-row no-gutters>
          <v-col cols="12" md="4">
            <v-text-field v-model="buscarUsuario" append-icon="mdi-magnify" label="Buscar" ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-data-table :height="tablaResponsiva()" :headers="cabeceraTablaUsuarios" sort-by="id_lote" :items="listaUsuarios" :search="buscarUsuario" class="elevation-1" dense>
          <template v-slot:top>
            <DialogEditarUsuarioPersona ref="DialogEditarUsuarioPersona" ></DialogEditarUsuarioPersona>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="cargarDialogEditarUsuarioPersona()">mdi-eye</v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn large :block="$vuetify.breakpoint.xs ? true : false" width="200px" color="primary" @click="cargarDialogNuevoUsuarioPersona()" >Nuevo</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

import DialogNuevoUsuarioPersona from "../components/DialogNuevoUsuarioPersona";
import DialogEditarUsuarioPersona from "../components/DialogEditarUsuarioPersona";

export default {
  name: "BaseUsuarioPersona",

  components: {
    DialogNuevoUsuarioPersona,
    DialogEditarUsuarioPersona,
  },

  data() {
    return {
      buscarUsuario: "",        // Guarda el texto de búsqueda
      cabeceraTablaUsuarios: [  // Detalla las cabeceras de la tabla (Los campos más relevantes)
        {text: "Cedula",value: "percedula", align: "center", class: "grey lighten-3", },
        {text: "Apellidos",value: "perapellidos", align: "center", sortable: false, class: "grey lighten-3",},
        {text: "Nombres",value: "pernombres", sortable: false, align: "center", class: "grey lighten-3",},
        {text: "Dirección",value: "perdireccion", sortable: false, align: "center", class: "grey lighten-3",},
        {text: "Teléfono",value: "pertelefono", sortable: false, align: "center", class: "grey lighten-3",},
        {text: "Whatsapp",value: "perwhatsapp", sortable: false, align: "center", class: "grey lighten-3",},
        {text: "Email",value: "peremail", sortable: false, align: "center", class: "grey lighten-3",},
        {text: "Detalles",value: "actions", sortable: false, align: "center", class: "grey lighten-3",},
      ],
      listaUsuarios: [          // Almacena una lista de Lotes, la misma se muestra en tabla
        { percedula: '0704411223', perapellidos: 'Keys' , pernombres: 'Alicia', perdireccion: 'Av. Kays', pertelefono: '08975421', perwhatsapp: '0897654321', peremail: 'alicia@gmail.com', pergenero: 'Femenino', perfechanacimiento: '20/04/1993', ciudadnacimiento: 'Machala'},
        { percedula: '0704411224', perapellidos: 'Smith' , pernombres: 'Beth', perdireccion: 'Av. Kays', pertelefono: '08975421', perwhatsapp: '0897654321', peremail: 'alicia@gmail.com', pergenero: 'Femenino', perfechanacimiento: '20/04/1993', ciudadnacimiento: 'Machala'},
        { percedula: '0704411225', perapellidos: 'Bouvier' , pernombres: 'Marge', perdireccion: 'Av. Kays', pertelefono: '08975421', perwhatsapp: '0897654321', peremail: 'alicia@gmail.com', pergenero: 'Femenino', perfechanacimiento: '20/04/1993', ciudadnacimiento: 'Machala'},
        { percedula: '0704411223', perapellidos: 'Simpson' , pernombres: 'Homero', perdireccion: 'Av. Kays', pertelefono: '08975421', perwhatsapp: '0897654321', peremail: 'alicia@gmail.com', pergenero: 'Femenino', perfechanacimiento: '20/04/1993', ciudadnacimiento: 'Machala'}
      ], 
    };
  },

  computed: {
    /* Obtiene y establece el estado de la variable dialogNuevoUsuarioPersona
    que muestra u oculta el dialogo*/
    dialogNuevoUsuarioPersona: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoUsuarioPersona"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoUsuarioPersona", v);
      },
    },

    /* Obtiene y modifica el estado de la variable dialogTabMostrarLote
    que muestra u oculta el dialogo*/
    dialogEditarUsuarioPersona: {
      get() {
        return this.$store.getters["gestionDialogos/dialogEditarUsuarioPersona"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogEditarUsuarioPersona", v);
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

    // Vacia el modelo UsuarioPersona
    ...mapMutations("moduloUsuarioPersona", ["vaciarUsuarioPersona"]),

    // Dialogo Nuevo usuario
    cargarDialogNuevoUsuarioPersona() {
      this.dialogNuevoUsuarioPersona = !this.dialogNuevoUsuarioPersona; // Abre el DialogNuevoUsuario
      this.vaciarUsuarioPersona(); 
    },

    // Dialogo Editar usuario
    cargarDialogEditarUsuarioPersona() {
      this.dialogEditarUsuarioPersona = !this.dialogEditarUsuarioPersona;
      this.vaciarUsuarioPersona(); 
    },
  },

  created() {
    this.$store.commit("colocarLayout", "LayoutProductor");
  },
};
</script>
