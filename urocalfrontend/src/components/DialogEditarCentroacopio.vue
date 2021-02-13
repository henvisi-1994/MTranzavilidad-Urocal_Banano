<template>
<!-- 
  <v-row  justify="center">
          <v-dialog v-model="dialog" persistent max-width="460" >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">Open Dialog</v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">¿Está seguro de que desea continuar?</v-card-title>
              <v-card-text>El registro será eliminado y no podrá recuperarse.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="dialog = false" >No</v-btn>
                <v-btn color="primary" text @click="dialog = false" >Sí</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
  -->
  <v-dialog v-model="dialogEditarCentroacopio" scrollable max-width="700px" transition="dialog-transition" :fullscreen="$vuetify.breakpoint.xs ? true : false">
    <v-card tile>

      <v-card-title class="primary--text">
        <h5 class="pl-3">Información del centro de acopio</h5>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon :disabled="!noeditar" class="primary--text" @click="cambiarEstadoEditar()">mdi-pencil</v-icon></v-btn>
        <v-btn icon><v-icon @click="eliminarRegistro()" class="primary--text">mdi-trash-can</v-icon></v-btn>
        <v-btn icon><v-icon @click="cerrarDialogo()" class="primary--text">mdi-close</v-icon></v-btn>
      </v-card-title>
      
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field :disabled="noeditar" v-model="modeloCentroacopio.centroacopioid" label="Id" class="custom px-2" dense filled></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field :disabled="noeditar" v-model="modeloCentroacopio.centroacopionombre" label="Nombre" class="custom px-2" dense filled></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field :disabled="noeditar" v-model="modeloCentroacopio.responsableacopioid" label="Responsable" class="custom px-2" dense filled></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn 
          color="primary" 
          large 
          :block="$vuetify.breakpoint.xs ? true : false" @click="actualizarRegistro()"
          width="250px">
          Guardar cambios
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import { mapMutations, mapState } from "vuex";                                // Trabajar con la tienda de Vue (Store)
import ServicioCentroacopio from "../services/ServicioCentroAcopio";  // Interactuar con el Backend

export default {
  name: "DialogEditarCentroacopio",
  components: {
    vSelect
  },

  data() {
    return {
      noeditar: true,
      itemsTipoUsuario: ['Productor', 'Responsable Centro Acopio', 'Exportador', 'Administrador'],
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
    dialogEditarCentroacopio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogEditarCentroacopio"];
      },
      set(v) {
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

    // ###################
    // #  TIENDA DE VUE  #
    // ###################

    ...mapState("validacionForm", ["reglas"]),                                        // Reglas de validacion
  },
  methods: {

    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    // CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

    // SELECT: Obtiene todos los registros
    async cargarListaCentroacopio () { 
      let listaCentroacopio = [];                                                 // Limpiar la 'lista de datos'

      let respuesta = await ServicioCentroacopio.obtenerTodosCentroAcopio();  // Obtener respuesta de backend
      let datosUsuario = await respuesta.data;                                        // Rescatar datos de la respuesta
      datosUsuario.forEach((modeloCentroacopio) => {                         // Guardar cada registro en la 'lista de datos' 
        listaCentroacopio.push(modeloCentroacopio);
      });

      this.listaCentroacopio = listaCentroacopio;
    },

    // UPDATE: Actualiza un registro
    async actualizarRegistro () { 
      //console.log(this.modeloCentroacopio);
      const respuesta = await ServicioCentroacopio.actualizarCentroAcopio(this.modeloCentroacopio);
      if (respuesta.status == 200) {
        this.cerrarDialogo();
        this.cargarListaCentroacopio();
        this.vaciarCentroacopio();        
      }
    },

    // DELETE: Elimina un registro
    async eliminarRegistro() {
      //console.log(this.modeloConductorPersonaStore);
      const respuesta = await ServicioCentroacopio.eliminarCentroAcopio(this.modeloCentroacopio.centroacopioid);
      if (respuesta.status == 200) {
        this.cerrarDialogo();
        this.cargarListaCentroacopio();
      } 
    },

    
    

    // ########################
    // #  METODOS AUXILIARES  #
    // ########################
    
    // DIALOGO: cierra este dialogo
    cerrarDialogo(){
      this.dialogEditarCentroacopio = !this.dialogEditarCentroacopio;
      this.noeditar = true;
    },

    // VARIABLE DE ESTADO: Habilita o deshabilita los campos de edición
    cambiarEstadoEditar () { 
      this.noeditar = !this.noeditar;
    },

    ...mapMutations("moduloCentroacopio", ["vaciarCentroacopio"]),  // Vacia el modelo modeloCentroacopio
    
  },
  mounted(){
    console.log("holaaaaaaaaaaaaaa")
    console.log(this.modeloCentroacopio)
  }
};

</script>