<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo usuario -->
    <DialogNuevoConductorPersona ref="DialogNuevoConductorPersona"></DialogNuevoConductorPersona>

    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0" class="mt-5">
      <v-card-title class="py-2">

        <v-row no-gutters justify-md="space-between">
          <v-col cols="12" md="6">
            <div :class="[`text-h4`, `mb-4`]" class="transition-swing primary--text" v-text="nombre"></div>            
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field class="custom" filled v-model="buscarConductorPersona" append-icon="mdi-magnify" label="Buscar" dense></v-text-field>
          </v-col>          
        </v-row>

      </v-card-title>

      <v-card-text>
        <v-data-table :headers="cabeceraTablaUsuarios" :items="listaConductorPersonaStore" :search="buscarConductorPersona" sort-by="id_lote" :height="tablaResponsiva()" class="elevation-1" >
          <template v-slot:top>
            <DialogEditarConductorPersona ref="DialogEditarConductorPersona" ></DialogEditarConductorPersona>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="cargarDialogEditarConductorPersona(item)">mdi-eye</v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn large :block="$vuetify.breakpoint.xs ? true : false" width="300px" color="primary" @click="cargarDialogNuevoConductorPersona()" >Nuevo</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>

import { mapMutations, mapState } from "vuex";                                          // Trabajar con la tienda de Vue (Store)
import DialogNuevoConductorPersona from "../components/DialogNuevoConductorPersona";    // Dialogo para agregar usuario
import DialogEditarConductorPersona from "../components/DialogEditarConductorPersona";  // Dialogo para editar usuario
import ServicioConductorPersona from "../services/ServicioConductorPersona";            // Interactuar con el Backend
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion


export default {
  name: "BaseConductorPersona",

  components: {
    DialogNuevoConductorPersona,
    DialogEditarConductorPersona,
  },

  created() {
    this.$store.commit("colocarLayout", "LayoutAdministrador");
  },

  mounted() {
    this.cargarListaConductorPersona();
    this.cargarListaCiudad();
  },

  data() {
    return {
      nombre: "Gestión de Conductores",
      buscarConductorPersona: "",   // Guarda el texto de búsqueda
      cabeceraTablaUsuarios: [    // Cabeceras de la tabla (Los campos más relevantes)
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
    listaConductorPersonaStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloConductorPersona/listaConductorPersonaStore"]));
      },
      set(v) {
        return this.$store.commit("moduloConductorPersona/establecerListaConductorPersonaStore", v);
      },
    },

    listaCiudadStore: {
      get() {
        return this.$store.getters["moduloConductorPersona/listaCiudadStore"];
      },
      set(v) {
        return this.$store.commit("moduloConductorPersona/establecerListaCiudadStore", v);
      },
    },

    // ##############
    // #  DIALOGOS  #
    // ##############
    dialogNuevoConductorPersona: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoConductorPersona"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoConductorPersona", v);
      },
    },

    dialogEditarConductorPersona: {
      get() {
        return this.$store.getters["gestionDialogos/dialogEditarConductorPersona"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogEditarConductorPersona", v);
      },
    },

    // #############
    // #  MODELOS  #
    // #############
    modeloConductorPersonaStore: {
      get() {
        return this.$store.getters["moduloConductorPersona/modeloConductorPersonaStore"];
      },
      set(v) {
        return this.$store.commit("moduloConductorPersona/establecerModeloConductorPersonaStore", v);
      },
    },
  },

  methods: {

    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    async cargarListaConductorPersona () { 
      let listaConductorPersona = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioConductorPersona.obtenerTodosConductorPersona();  // Obtener respuesta de backend
      let datosUsuario = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosUsuario.forEach((dd) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaConductorPersona.push(dd);
      });
      this.listaConductorPersonaStore = listaConductorPersona;
      //console.log(this.listaConductorPersonaStore);
    },

    async cargarListaCiudad () { 
      let listaCiudad = [];                                                       // Limpiar la 'lista de ciudades'
      let respuesta = await ServicioConductorPersona.obtenerTodosCiudad();          // Obtener respuesta de backend
      let datosCiudad = await respuesta.data;                                     // Rescatar datos de la respuesta
      datosCiudad.forEach((ciudad) => {                                           // Guardar cada registro en la 'lista de datos' 
        listaCiudad.push(ciudad);
      });
      this.listaCiudadStore = listaCiudad;
      //console.log(this.listaCiudadStore);
    },

    // ##############
    // #  DIALOGOS  #
    // ##############
    cargarDialogNuevoConductorPersona() {
      this.dialogNuevoConductorPersona = !this.dialogNuevoConductorPersona;           
      this.vaciarModeloConductorPersonaStore(); 
    },

    cargarDialogEditarConductorPersona(item) {
      //console.log(item);
      this.dialogEditarConductorPersona = !this.dialogEditarConductorPersona;
      this.vaciarModeloConductorPersonaStore(); 
      this.modeloConductorPersonaStore = item;
      //const indiceEditar = this.listaConductorPersonaStore.indexOf(item);//4
    }, 

    // ###################
    // #  TIENDA DE VUE  #
    // ###################
    ...mapMutations("moduloConductorPersona", ["establecerListaCiudadStore"]),  
    ...mapMutations("moduloConductorPersona", ["vaciarModeloConductorPersonaStore"]),     
  },
  
  mixins: [autenticacionMixin, myMixin],
};
</script>