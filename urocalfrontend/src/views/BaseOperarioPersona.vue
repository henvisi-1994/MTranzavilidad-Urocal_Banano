<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo usuario -->
    <DialogNuevoOperarioPersona ref="DialogNuevoOperario"></DialogNuevoOperarioPersona>

    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0" class="mt-5">
      <v-card-title class="py-2">

        <v-row no-gutters justify-md="space-between">
          <v-col cols="12" md="6">
            <div :class="[`text-h4`, `mb-4`]" class="transition-swing primary--text" v-text="nombre"></div>            
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field class="custom" filled v-model="buscarOperarioPersona" append-icon="mdi-magnify" label="Buscar" dense></v-text-field>
          </v-col>          
        </v-row>

      </v-card-title>

      <v-card-text elevation="0">
        <v-data-table :headers="cabeceraTablaUsuarios" :items="listaOperarioPersonaStore" :search="buscarOperarioPersona" sort-by="id_lote" :height="tablaResponsiva()" class="elevation-1" >
          <template v-slot:top>
            <DialogEditarOperarioPersona ref="DialogEditarOperarioPersona" ></DialogEditarOperarioPersona>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="cargarDialogEditarOperarioPersona(item)">mdi-eye</v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn elevation="0" large :block="$vuetify.breakpoint.xs ? true : false" width="300px" color="primary" @click="cargarDialogNuevoOperarioPersona()" >Nuevo</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>

import { mapMutations, mapState } from "vuex";                                          // Trabajar con la tienda de Vue (Store)
import DialogNuevoOperarioPersona from "../components/DialogNuevoOperarioPersona";    // Dialogo para agregar usuario
import DialogEditarOperarioPersona from "../components/DialogEditarOperarioPersona";  // Dialogo para editar usuario
import ServicioOperarioPersona from "../services/ServicioOperarioPersona";            // Interactuar con el Backend
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion


export default {
  name: "BaseOperarioPersona",

  components: {
    DialogNuevoOperarioPersona,
    DialogEditarOperarioPersona,
  },

  created() {
    this.$store.commit("colocarLayout", "LayoutAdministrador");
  },

  mounted() {
    this.cargarListaOperarioPersona();
    this.cargarListaCiudad();
  },

  data() {
    return {
      nombre: "Gestión de Operarios",
      buscarOperarioPersona: "",   // Guarda el texto de búsqueda
      cabeceraTablaUsuarios: [      // Cabeceras de la tabla (Los campos más relevantes)
        {text: "Cedula",value: "percedula", align: "center", class: "grey lighten-3", },
        {text: "Apellidos",value: "perapellidos", align: "center", sortable: false, class: "grey lighten-3",},
        {text: "Nombres",value: "pernombres", sortable: false, align: "center", class: "grey lighten-3",},
        {text: "Dirección",value: "perdireccion", sortable: false, align: "center", class: "grey lighten-3",},
        {text: "Teléfono",value: "pertelefono", sortable: false, align: "center", class: "grey lighten-3",},
        {text: "Whatsapp",value: "perwhatsapp", sortable: false, align: "center", class: "grey lighten-3",},
        {text: "Email",value: "peremail", sortable: false, align: "center", class: "grey lighten-3",},
        {text: "Detalles",value: "actions", sortable: false, align: "center", class: "grey lighten-3",},
      ],                  
    };
  },


  computed: {

    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    listaOperarioPersonaStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloOperarioPersona/listaOperarioPersonaStore"]));
      },
      set(v) {
        return this.$store.commit("moduloOperarioPersona/establecerListaOperarioPersonaStore", v);
      },
    },

    listaCiudadStore: {
      get() {
        return this.$store.getters["moduloOperarioPersona/listaCiudadStore"];
      },
      set(v) {
        return this.$store.commit("moduloOperarioPersona/establecerListaCiudadStore", v);
      },
    },

    // ##############
    // #  DIALOGOS  #
    // ##############
    dialogNuevoOperarioPersona: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoOperarioPersona"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoOperarioPersona", v);
      },
    },

    dialogEditarOperarioPersona: {
      get() {
        return this.$store.getters["gestionDialogos/dialogEditarOperarioPersona"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogEditarOperarioPersona", v);
      },
    },

    // #############
    // #  MODELOS  #
    // #############
    modeloOperarioPersonaStore: {
      get() {
        return this.$store.getters["moduloOperarioPersona/modeloOperarioPersonaStore"];
      },
      set(v) {
        return this.$store.commit("moduloOperarioPersona/establecerModeloOperarioPersonaStore", v);
      },
    },
  },

  methods: {

    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    async cargarListaOperarioPersona () { 
      let listaOperarioPersona = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioOperarioPersona.obtenerTodosOperarioPersona();  // Obtener respuesta de backend
      let datosUsuario = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosUsuario.forEach((dd) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaOperarioPersona.push(dd);
      });
      this.listaOperarioPersonaStore = listaOperarioPersona;
    },

    async cargarListaCiudad () { 
      let listaCiudad = [];                                                       // Limpiar la 'lista de ciudades'
      let respuesta = await ServicioOperarioPersona.obtenerTodosCiudad();          // Obtener respuesta de backend
      let datosCiudad = await respuesta.data;                                     // Rescatar datos de la respuesta
      datosCiudad.forEach((ciudad) => {                                           // Guardar cada registro en la 'lista de datos' 
        listaCiudad.push(ciudad);
      });
      this.listaCiudadStore = listaCiudad;
    },

    // ##############
    // #  DIALOGOS  #
    // ##############
    cargarDialogNuevoOperarioPersona() {
      this.dialogNuevoOperarioPersona = !this.dialogNuevoOperarioPersona;  
      this.vaciarModeloOperarioPersonaStore(); 
      //this.$refs.DialogNuevoOperario.$refs.formNuevoOperario.resetValidation();     
    },

    cargarDialogEditarOperarioPersona(item) {
      this.dialogEditarOperarioPersona = !this.dialogEditarOperarioPersona;
      this.vaciarModeloOperarioPersonaStore(); 
      this.modeloOperarioPersonaStore = item;
    }, 

    // ###################
    // #  TIENDA DE VUE  #
    // ###################
    ...mapMutations("moduloOperarioPersona", ["establecerListaCiudadStore"]),  
    ...mapMutations("moduloOperarioPersona", ["vaciarModeloOperarioPersonaStore"]),     
  },
  
  mixins: [autenticacionMixin, myMixin],
};
</script>