<template>
  <v-dialog v-model="dialogNuevoCentroacopio" scrollable max-width="800px" transition="dialog-transition" :fullscreen="$vuetify.breakpoint.xs ? true : false">
    <v-card tile>
      <v-card-title class="justify-center primary--text">
        <h5 class="pl-3">Nuevo centro de acopio</h5>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon class="primary--text" @click="cerrarDialogo()">mdi-close</v-icon></v-btn>
      </v-card-title>
      
      <v-card-text>

        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field v-model="modeloCentroacopio.centroacopioid" label="Id" class="custom px-2" dense filled></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field v-model="modeloCentroacopio.centroacopionombre" label="Nombre" class="custom px-2" dense filled></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="modeloCentroacopio.responsableacopioid" label="Responsable-Acopio" class="custom px-2" dense filled></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      
      <v-card-actions class="justify-center">
        <v-btn 
          color="primary" 
          large 
          :block="$vuetify.breakpoint.xs ? true : false"
          width="250px" @click="guardarCentroacopio()">
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import { mapMutations, mapState } from "vuex";                            // Trabajar con la tienda de Vue (Store)
import ServicioCentroacopio from '../services/ServicioCentroAcopio';  // Interactuar con el Backend

export default {
  name: "DialogNuevoCentroacopio",  components: {
    vSelect
  },

  data() {
    
    return {
      
      itemsTipoUsuario: [
        {id: 1, tipoUsuario: 'Productor'}, 
        {id: 2, tipoUsuario: 'Responsable Centro Acopio'}, 
        {id: 3, tipoUsuario: 'Exportador'}, 
        {id: 4, tipoUsuario: 'Administrador'}
      ],
    };
  },

  watch: {
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

    ...mapState("validacionForm", ["reglas"]),                
    
  },

  methods: {


    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    // CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
    
    // INSERT: Agrega un usuario
    async guardarCentroacopio () { 

      //console.log(this.modeloCentroacopio);
      let respuesta = await ServicioCentroacopio.crearCentroAcopio(this.modeloCentroacopio);
      if (respuesta.status == 201) {
        this.cerrarDialogo();
        this.cargarListaCentroacopio();
        this.vaciarCentroacopio();
      }
    },

    // SELECT: Carga todos los usuarios registrados
    async cargarListaCentroacopio () { 
      let listaCentroacopio = [];                                              // Limpiar la 'lista de datos'

      let respuesta = await ServicioCentroacopio.obtenerTodosCentroAcopio();  // Obtener respuesta de backend
      let datosUsuario = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosUsuario.forEach((modeloCentroacopio) => {                       // Guardar cada registro en la 'lista de datos' 
        listaCentroacopio.push(modeloCentroacopio);
      });

      this.listaCentroacopio = listaCentroacopio;
    },


    // ##############
    // #  DIALOGOS  #
    // ##############

    // CERRAR: Cierra este dialogo
    cerrarDialogo(){
      this.dialogNuevoCentroacopio = !this.dialogNuevoCentroacopio;
    },


    // ########################
    // #  METODOS AUXILIARES  #
    // ########################

    ...mapMutations("moduloCentroacopio", ["vaciarCentroacopio"]),  // Vacia el modelo modeloCentroacopio
    
  }
};
</script>