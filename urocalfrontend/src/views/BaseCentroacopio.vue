<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo usuario -->
    <DialogNuevoCentroacopio ref="DialogNuevoCentroacopio"></DialogNuevoCentroacopio>

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
            <v-text-field class="custom" filled v-model="buscarCentroacopio" append-icon="mdi-magnify" label="Buscar" dense></v-text-field>
          </v-col>          
        </v-row>

      </v-card-title>

      <v-card-text>
        <v-data-table :headers="cabeceraTablaUsuarios" :items="listaCentroacopio" :search="buscarCentroacopio" sort-by="id_lote" :height="tablaResponsiva()" class="elevation-1" >
          <template v-slot:top>
            <DialogEditarCentroacopio ref="DialogEditarCentroacopio" ></DialogEditarCentroacopio>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="cargarDialogEditarCentroacopio(item)">mdi-eye</v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn large :block="$vuetify.breakpoint.xs ? true : false" width="300px" color="primary" @click="cargarDialogNuevoCentroacopio()" >Nuevo</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>


<script>

import { mapMutations, mapState } from "vuex";                                          // Trabajar con la tienda de Vue (Store)
import DialogNuevoCentroacopio from "../components/DialogNuevoCentroacopio";    // Dialogo para agregar usuario
import DialogEditarCentroacopio from "../components/DialogEditarCentroacopio";  // Dialogo para editar usuario
import ServicioCentroacopio from "../services/ServicioCentroAcopio";            // Interactuar con el Backend
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseCentroacopio",

  components: {
    DialogNuevoCentroacopio,
    DialogEditarCentroacopio,
  },

  created() {
    this.$store.commit("colocarLayout", "LayoutProductor");
  },

  mounted() {
    this.cargarListaCentroacopio();
  },

  data() {
    return {
      nombre: "Gestión de Centro de acopio",
      buscarCentroacopio: "",   // Guarda el texto de búsqueda
      cabeceraTablaUsuarios: [    // Cabeceras de la tabla (Los campos más relevantes)
        {text: "Id",value: "centroacopioid", sortable: false, align: "center", class: "grey lighten-3", },
        {text: "Nombre",value: "centroacopionombre", align: "center", sortable: false, class: "grey lighten-3",},
        {text: "Responsable",value: "responsableacopioid", sortable: false, align: "center", class: "grey lighten-3",},
        {text: "Detalles",value: "actions", sortable: false, align: "center", class: "grey lighten-3",},
      ],                  
    };
  },


  computed: {

    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    listaCentroacopio: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloCentroacopio/listaCentroacopio"]));
      },
      set(v) {
        return this.$store.commit("moduloCentroacopio/establecerListaCentroacopio", v);
      },
    },


    // ##############
    // #  DIALOGOS  #
    // ##############
    dialogNuevoCentroacopio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoCentroacopio"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoCentroacopio", v);
      },
    },

    dialogEditarCentroacopio: {
      get() {
        console.log(this.centroacopioid);
        return this.$store.getters["gestionDialogos/dialogEditarCentroacopio"];
      },
      set(v) {
        console.log(this.centroacopioid);
        return this.$store.commit("gestionDialogos/toggleDialogEditarCentroacopio", v);
      },
    },

    // #############
    // #  MODELOS  #
    // #############
    modeloCentroacopio: {
      get() {
        return this.$store.getters["moduloCentroacopio/modeloCentroacopio"];
      },
      set(v) {
        return this.$store.commit("moduloCentroacopio/establecerModeloCentroacopio", v);
      },
    },
  },

  methods: {

    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    async cargarListaCentroacopio () { 
      let listaCentroacopio = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioCentroacopio.obtenerTodosCentroAcopio();  // Obtener respuesta de backend
      let datosUsuario = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosUsuario.forEach((dd) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaCentroacopio.push(dd);
      });
      this.listaCentroacopio = listaCentroacopio;
      //console.log(this.listaCentroacopio);
    },

    // ##############
    // #  DIALOGOS  #
    // ##############
    cargarDialogNuevoCentroacopio() {
      this.dialogNuevoCentroacopio = !this.dialogNuevoCentroacopio;           
      this.vaciarCentroacopio(); 
    },

    cargarDialogEditarCentroacopio(item) {
      //console.log(item);
      this.dialogEditarCentroacopio = !this.dialogEditarCentroacopio;
      this.vaciarCentroacopio(); 
      this.modeloCentroacopio = item;
      //const indiceEditar = this.listaCentroacopio.indexOf(item);//4
    }, 

    // ###################
    // #  TIENDA DE VUE  #
    // ###################
    ...mapMutations("moduloCentroacopio", ["vaciarCentroacopio"]),     

    // Carga el DialogMostrarCentroacopio
    abrirMostrarCentroacopio() {
      this.dialogMostrarCentroacopio = !this.dialogMostrarCentroacopio; // Abre el DialogNuevoCentroacopio
      //this.$refs.componentDialogMostrarCentroacopio.$refs.componentFormCentroacopio.$refs.formCentroacopio.resetValidation(); // Reinicia las validaciones de formCentroacopio
      this.vaciarCentroacopio(); // Vacia el modelo Centroacopio
    },

    // Vacia el modelo Centroacopio
    ...mapMutations("moduloCentroacopio", ["vaciarCentroacopio"]),

    // Carga el DialogNuevoCentroacopio
    cargarDialogNuevoCentroacopio() {
      this.dialogNuevoCentroacopio = !this.dialogNuevoCentroacopio; // Abre el DialogNuevo
      //this.$refs.componentDialogNuevoCentroacopio.$refs.componentFormCentroacopio.$refs.formCentroacopio.resetValidation(); // Reinicia las validaciones de formCentroacopio
      this.vaciarCentroacopio(); // Vacia el modelo Centroacopio
    },
  },

  mixins: [autenticacionMixin, myMixin],

  created() {
    this.$store.commit("colocarLayout", "LayoutAdministrador");
  },
  
};
</script>