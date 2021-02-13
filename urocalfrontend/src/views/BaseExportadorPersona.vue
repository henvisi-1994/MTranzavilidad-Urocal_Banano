<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo usuario -->
    <DialogNuevoExportadorPersona ref="DialogNuevoExportadorPersona"></DialogNuevoExportadorPersona>

    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0" class="mt-5">
      <v-card-title class="py-2">

        <v-row no-gutters justify-md="space-between">
          <v-col cols="12" md="6">
            <div :class="[`text-h4`, `mb-4`]" class="transition-swing primary--text" v-text="nombre"></div>            
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field class="custom" filled v-model="buscarExportadorPersona" append-icon="mdi-magnify" label="Buscar" dense></v-text-field>
          </v-col>          
        </v-row>

      </v-card-title>

      <v-card-text>
        <v-data-table :headers="cabeceraTablaUsuarios" :items="listaExportadorPersonaStore" :search="buscarExportadorPersona" sort-by="id_lote" :height="tablaResponsiva()" class="elevation-1" >
          <template v-slot:top>
            <DialogEditarExportadorPersona ref="DialogEditarExportadorPersona" ></DialogEditarExportadorPersona>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="cargarDialogEditarExportadorPersona(item)">mdi-eye</v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn large :block="$vuetify.breakpoint.xs ? true : false" width="300px" color="primary" @click="cargarDialogNuevoExportadorPersona()" >Nuevo</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>

import { mapMutations, mapState } from "vuex";                                          // Trabajar con la tienda de Vue (Store)
import DialogNuevoExportadorPersona from "../components/DialogNuevoExportadorPersona";    // Dialogo para agregar usuario
import DialogEditarExportadorPersona from "../components/DialogEditarExportadorPersona";  // Dialogo para editar usuario
import ServicioExportadorPersona from "../services/ServicioExportadorPersona";            // Interactuar con el Backend
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion


export default {
  name: "BaseExportadorPersona",

  components: {
    DialogNuevoExportadorPersona,
    DialogEditarExportadorPersona,
  },

  created() {
    this.$store.commit("colocarLayout", "LayoutAdministrador");
  },

  mounted() {
    this.cargarListaExportadorPersona();
    this.cargarListaCiudad();
  },

  data() {
    return {
      nombre: "Gestión de Exportadores",
      buscarExportadorPersona: "",   // Guarda el texto de búsqueda
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
    listaExportadorPersonaStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloExportadorPersona/listaExportadorPersonaStore"]));
      },
      set(v) {
        return this.$store.commit("moduloExportadorPersona/establecerListaExportadorPersonaStore", v);
      },
    },

    listaCiudadStore: {
      get() {
        return this.$store.getters["moduloExportadorPersona/listaCiudadStore"];
      },
      set(v) {
        return this.$store.commit("moduloExportadorPersona/establecerListaCiudadStore", v);
      },
    },

    // ##############
    // #  DIALOGOS  #
    // ##############
    dialogNuevoExportadorPersona: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoExportadorPersona"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoExportadorPersona", v);
      },
    },

    dialogEditarExportadorPersona: {
      get() {
        return this.$store.getters["gestionDialogos/dialogEditarExportadorPersona"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogEditarExportadorPersona", v);
      },
    },

    // #############
    // #  MODELOS  #
    // #############
    modeloExportadorPersonaStore: {
      get() {
        return this.$store.getters["moduloExportadorPersona/modeloExportadorPersonaStore"];
      },
      set(v) {
        return this.$store.commit("moduloExportadorPersona/establecerModeloExportadorPersonaStore", v);
      },
    },
  },

  methods: {

    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    async cargarListaExportadorPersona () { 
      let listaExportadorPersona = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioExportadorPersona.obtenerTodosExportadorPersona();  // Obtener respuesta de backend
      let datosUsuario = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosUsuario.forEach((dd) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaExportadorPersona.push(dd);
      });
      this.listaExportadorPersonaStore = listaExportadorPersona;
    },

    async cargarListaCiudad () { 
      let listaCiudad = [];                                                       // Limpiar la 'lista de ciudades'
      let respuesta = await ServicioExportadorPersona.obtenerTodosCiudad();          // Obtener respuesta de backend
      let datosCiudad = await respuesta.data;                                     // Rescatar datos de la respuesta
      datosCiudad.forEach((ciudad) => {                                           // Guardar cada registro en la 'lista de datos' 
        listaCiudad.push(ciudad);
      });
      this.listaCiudadStore = listaCiudad;
    },

    // ##############
    // #  DIALOGOS  #
    // ##############
    cargarDialogNuevoExportadorPersona() {
      this.dialogNuevoExportadorPersona = !this.dialogNuevoExportadorPersona;           
      this.vaciarModeloExportadorPersonaStore(); 
    },

    cargarDialogEditarExportadorPersona(item) {
      this.dialogEditarExportadorPersona = !this.dialogEditarExportadorPersona;
      this.vaciarModeloExportadorPersonaStore(); 
      this.modeloExportadorPersonaStore = item;
    }, 

    // ###################
    // #  TIENDA DE VUE  #
    // ###################
    ...mapMutations("moduloExportadorPersona", ["establecerListaCiudadStore"]),  
    ...mapMutations("moduloExportadorPersona", ["vaciarModeloExportadorPersonaStore"]),    
  },
  
  mixins: [autenticacionMixin, myMixin],
};
</script>