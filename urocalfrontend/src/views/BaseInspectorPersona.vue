<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo usuario -->
    <DialogNuevoInspectorPersona ref="DialogNuevoInspectorPersona"></DialogNuevoInspectorPersona>

    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0" class="mt-5">
      <v-card-title class="py-2">

        <v-row no-gutters justify-md="space-between">
          <v-col cols="12" md="6">
            <div :class="[`text-h4`, `mb-4`]" class="transition-swing primary--text" v-text="nombre"></div>            
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field class="custom" filled v-model="buscarInspectorPersona" append-icon="mdi-magnify" label="Buscar" dense></v-text-field>
          </v-col>          
        </v-row>

      </v-card-title>

      <v-card-text>
        <v-data-table :headers="cabeceraTablaUsuarios" :items="listaInspectorPersonaStore" :search="buscarInspectorPersona" sort-by="id_lote" :height="tablaResponsiva()" class="elevation-1" >
          <template v-slot:top>
            <DialogEditarInspectorPersona ref="DialogEditarInspectorPersona" ></DialogEditarInspectorPersona>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="cargarDialogEditarInspectorPersona(item)">mdi-eye</v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn large :block="$vuetify.breakpoint.xs ? true : false" width="300px" color="primary" @click="cargarDialogNuevoInspectorPersona()" >Nuevo</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>

import { mapMutations, mapState } from "vuex";                                          // Trabajar con la tienda de Vue (Store)
import DialogNuevoInspectorPersona from "../components/DialogNuevoInspectorPersona";    // Dialogo para agregar usuario
import DialogEditarInspectorPersona from "../components/DialogEditarInspectorPersona";  // Dialogo para editar usuario
import ServicioInspectorPersona from "../services/ServicioInspectorPersona";            // Interactuar con el Backend
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion


export default {
  name: "BaseInspectorPersona",

  components: {
    DialogNuevoInspectorPersona,
    DialogEditarInspectorPersona,
  },

  created() {
    this.$store.commit("colocarLayout", "LayoutAdministrador");
  },

  mounted() {
    this.cargarListaInspectorPersona();
    this.cargarListaCiudad();
  },

  data() {
    return {
      nombre: "Gestión de Inspectores",
      buscarInspectorPersona: "",   // Guarda el texto de búsqueda
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
    listaInspectorPersonaStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloInspectorPersona/listaInspectorPersonaStore"]));
      },
      set(v) {
        return this.$store.commit("moduloInspectorPersona/establecerListaInspectorPersonaStore", v);
      },
    },

    listaCiudadStore: {
      get() {
        return this.$store.getters["moduloInspectorPersona/listaCiudadStore"];
      },
      set(v) {
        return this.$store.commit("moduloInspectorPersona/establecerListaCiudadStore", v);
      },
    },

    // ##############
    // #  DIALOGOS  #
    // ##############
    dialogNuevoInspectorPersona: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoInspectorPersona"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoInspectorPersona", v);
      },
    },

    dialogEditarInspectorPersona: {
      get() {
        return this.$store.getters["gestionDialogos/dialogEditarInspectorPersona"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogEditarInspectorPersona", v);
      },
    },

    // #############
    // #  MODELOS  #
    // #############
    modeloInspectorPersonaStore: {
      get() {
        return this.$store.getters["moduloInspectorPersona/modeloInspectorPersonaStore"];
      },
      set(v) {
        return this.$store.commit("moduloInspectorPersona/establecerModeloInspectorPersonaStore", v);
      },
    },
  },

  methods: {

    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    async cargarListaInspectorPersona () { 
      let listaInspectorPersona = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioInspectorPersona.obtenerTodosInspectorPersona();  // Obtener respuesta de backend
      let datosUsuario = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosUsuario.forEach((dd) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaInspectorPersona.push(dd);
      });
      this.listaInspectorPersonaStore = listaInspectorPersona;
    },

    async cargarListaCiudad () { 
      let listaCiudad = [];                                                       // Limpiar la 'lista de ciudades'
      let respuesta = await ServicioInspectorPersona.obtenerTodosCiudad();          // Obtener respuesta de backend
      let datosCiudad = await respuesta.data;                                     // Rescatar datos de la respuesta
      datosCiudad.forEach((ciudad) => {                                           // Guardar cada registro en la 'lista de datos' 
        listaCiudad.push(ciudad);
      });
      this.listaCiudadStore = listaCiudad;
    },

    // ##############
    // #  DIALOGOS  #
    // ##############
    cargarDialogNuevoInspectorPersona() {
      this.dialogNuevoInspectorPersona = !this.dialogNuevoInspectorPersona;           
      this.vaciarModeloInspectorPersonaStore(); 
    },

    cargarDialogEditarInspectorPersona(item) {
      this.dialogEditarInspectorPersona = !this.dialogEditarInspectorPersona;
      this.vaciarModeloInspectorPersonaStore(); 
      this.modeloInspectorPersonaStore = item;
    }, 

    // ###################
    // #  TIENDA DE VUE  #
    // ###################
    ...mapMutations("moduloInspectorPersona", ["establecerListaCiudadStore"]),  
    ...mapMutations("moduloInspectorPersona", ["vaciarModeloInspectorPersonaStore"]), 
  },
  
  mixins: [autenticacionMixin, myMixin],
};
</script>