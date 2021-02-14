<template>
  <v-dialog v-model="dialogNuevoExportadorPersona" scrollable max-width="800px" transition="dialog-transition" :fullscreen="$vuetify.breakpoint.xs ? true : false">
    <v-card tile>
      <v-card-title class="justify-center primary--text">
        <h5 class="pl-3">Nuevo exportador</h5>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon class="primary--text" @click="cerrarDialogo()">mdi-close</v-icon></v-btn>
      </v-card-title>
      
      <v-card-text>

        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field v-model="modeloExportadorPersonaStore.percedula" label="Cédula/RUC" class="custom px-2" dense filled></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-menu v-model="menuMostrarCalendario" transition="scale-transition" offset-y max-width="290px" min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field 
                v-model="modeloExportadorPersonaStore.perfechanacimiento" 
                label="Fecha de nacimiento" 
                :rules="[reglas.campoVacio(fecha)]"
                readonly
                hint="Formato DD/MM/YYYY"
                v-bind="attrs"
                v-on="on"
                class="custom px-2" dense
                filled>
              </v-text-field>
            </template>
            <v-date-picker v-model="fecha" @input="menuMostrarCalendario = false" locale="es-419" ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field v-model="modeloExportadorPersonaStore.pernombres" label="Nombres" class="custom px-2" dense filled></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="modeloExportadorPersonaStore.perapellidos" label="Apellidos" class="custom px-2" dense filled></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters> 
          <v-col cols="12" md="6">
            <v-text-field v-model="modeloExportadorPersonaStore.pertelefono" label="Teléfono" class="custom px-2" dense filled></v-text-field>
          </v-col>
          <v-col cols="12" md="6">   
            <v-select
              v-model="ciudad" 
              placeholder="Seleccione una ciudad"
              class="style-chooser custom px-2"
              label="ciudadnombre" 
              filled
              :reduce="(listaCiudadStore) => listaCiudadStore.ciudadid"
              :options="listaCiudadStore">
              <template v-slot:no-options="{ search, searching }">
                <template v-if="searching">
                  No hay resultados para <em>{{ search }}</em>
                </template>
                <em style="opacity: 0.5" v-else>Empiece a escribir una finca</em>
              </template>
            </v-select>                   
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field v-model="modeloExportadorPersonaStore.perwhatsapp" label="Whatsapp" class="custom px-2" dense filled></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select 
              v-model="modeloExportadorPersonaStore.pergenero"
              placeholder="Género"
              class="style-chooser px-2 custom"
              label="genero"
              filled
              :reduce="(itemsGenero) => itemsGenero.genero"
              :options="itemsGenero">
              <template v-slot:no-options="{ search, searching }">
                <template v-if="searching">
                  No hay resultados para <em>{{ search }}</em>
                </template>
                <em style="opacity: 0.5" v-else>Empiece a escribir una finca</em>
              </template>
            </v-select>
          </v-col>
        </v-row>
          
        <v-row no-gutters> 
          <v-col cols="12" md="6">
            <v-text-field v-model="modeloExportadorPersonaStore.perdireccion" label="Dirección" class="custom px-2" dense filled></v-text-field>
          </v-col>
            
          <v-col cols="12" md="6">
            <v-text-field v-model="modeloExportadorPersonaStore.peremail" label="Email" class="custom px-2" dense filled></v-text-field>
          </v-col>
        </v-row>

      </v-card-text>
      
      <v-card-actions class="justify-center">
        <v-btn 
          color="primary" 
          large 
          :block="$vuetify.breakpoint.xs ? true : false"
          width="250px" @click="guardarExportadorPersona()">
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
import ServicioExportadorPersona from '../services/ServicioExportadorPersona';  // Interactuar con el Backend

export default {
  name: "DialogNuevoExportadorPersona",
  components: {
    vSelect
  },

  data() {
    
    return {
      menuMostrarCalendario: "",
      fecha: new Date().toISOString().substr(0, 10),
      ciudad: null,
      itemsGenero: [
        {id: 1, genero: 'Masculino'}, 
        {id: 2, genero:'Femenino'}
      ],
      itemsTipoUsuario: [
        {id: 1, tipoUsuario: 'Productor'}, 
        {id: 2, tipoUsuario: 'Responsable Centro Acopio'}, 
        {id: 3, tipoUsuario: 'Exportador'}, 
        {id: 4, tipoUsuario: 'Administrador'}
      ],
    };
  },

  watch: {
    fecha (val) {
      this.modeloExportadorPersonaStore.perfechanacimiento = this.formatDate(this.fecha);
    },

    ciudad (val) { //id
      this.modeloExportadorPersonaStore.ciudadnacimiento.ciudadid = this.ciudad;
    },
  },

  computed: {

    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    listaCiudadStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloExportadorPersona/listaCiudadStore"]));
      },
      set(v) {
        return this.$store.commit("moduloExportadorPersona/establecerListaCiudadStore", v);
      },
    },

    listaExportadorPersonaStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloExportadorPersona/listaExportadorPersonaStore"]));
      },
      set(v) {
        return this.$store.commit("moduloExportadorPersona/establecerListaExportadorPersonaStore", v);
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

    ...mapState("validacionForm", ["reglas"]),                
    
  },

  methods: {


    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    // CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
    
    // INSERT: Agrega un usuario
    async guardarExportadorPersona () { 

      let respuesta = await ServicioExportadorPersona.agregarExportadorPersona(this.modeloExportadorPersonaStore);
      if (respuesta.status == 201) {
        this.cerrarDialogo();
        this.cargarListaExportadorPersona();
        this.vaciarModeloExportadorPersonaStore();
        this.$toast.success(respuesta.data.message);
      }else{
        this.$toast.error(respuesta.data.message);
      }
    },

    // SELECT: Carga todos los usuarios registrados
    async cargarListaExportadorPersona () { 
      let listaExportadorPersona = [];                                              // Limpiar la 'lista de datos'

      let respuesta = await ServicioExportadorPersona.obtenerTodosExportadorPersona();  // Obtener respuesta de backend
      let datosUsuario = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosUsuario.forEach((modeloExportadorPersonaStore) => {                       // Guardar cada registro en la 'lista de datos' 
        listaExportadorPersona.push(modeloExportadorPersonaStore);
      });

      this.listaExportadorPersonaStore = listaExportadorPersona;
    },


    // ##############
    // #  DIALOGOS  #
    // ##############

    // CERRAR: Cierra este dialogo
    cerrarDialogo(){
      this.dialogNuevoExportadorPersona = !this.dialogNuevoExportadorPersona;
    },


    // ########################
    // #  METODOS AUXILIARES  #
    // ########################

    // FORMATO: Modifica el formato de la fecha a dd/mm/aaaa
    formatDate (fecha) {
        if (!fecha) return null

        const [year, month, day] = fecha.split('-')
        return `${day}/${month}/${year}`
    },

    ...mapMutations("moduloExportadorPersona", ["vaciarModeloExportadorPersonaStore"]),  // Vacia el modelo modeloExportadorPersonaStore
    
  }
};
</script>