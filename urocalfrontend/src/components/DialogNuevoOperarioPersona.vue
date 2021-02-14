<template>
  
  <v-dialog v-model="dialogNuevoOperarioPersona" scrollable max-width="800px" transition="dialog-transition" :fullscreen="$vuetify.breakpoint.xs ? true : false">
    
    <v-card tile>
      <v-card-title class="justify-center primary--text">
        <h5 class="pl-3">Nuevo operario</h5>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon class="primary--text" @click="cerrarDialogo()">mdi-close</v-icon></v-btn>
      </v-card-title>
      
      <v-card-text>
        <v-form ref="formNuevoOperario" v-model="formOperarioPersonaValido">
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field 
              v-model="modeloOperarioPersonaStore.percedula" 
              label="Cédula/RUC" 
              :rules="[
                reglas.campoVacio(modeloOperarioPersonaStore.percedula),
              ]"
              class="custom px-2" dense filled>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-menu v-model="menuMostrarCalendario" transition="scale-transition" offset-y max-width="290px" min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field 
                v-model="modeloOperarioPersonaStore.perfechanacimiento" 
                label="Fecha de nacimiento" 
                :rules="[
                  reglas.campoVacio(modeloOperarioPersonaStore.perfechanacimiento),
                ]"
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
            <v-text-field 
              v-model="modeloOperarioPersonaStore.pernombres" 
              label="Nombres" 
              :rules="[
                reglas.campoVacio(modeloOperarioPersonaStore.pernombres),
              ]"
              class="custom px-2" dense filled>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field 
              v-model="modeloOperarioPersonaStore.perapellidos" 
              label="Apellidos" 
              :rules="[
                reglas.campoVacio(modeloOperarioPersonaStore.perapellidos),
              ]"
              class="custom px-2" dense filled>
            </v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters> 
          <v-col cols="12" md="6">
            <v-text-field 
              v-model="modeloOperarioPersonaStore.pertelefono" 
              label="Teléfono" 
              :rules="[
                reglas.campoVacio(modeloOperarioPersonaStore.pertelefono),
              ]"
              class="custom px-2" dense filled>
            </v-text-field>
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
            <v-text-field 
              v-model="modeloOperarioPersonaStore.perwhatsapp" 
              label="Whatsapp" 
              :rules="[
                reglas.campoVacio(modeloOperarioPersonaStore.perwhatsapp),
              ]"
              class="custom px-2" dense filled>
              </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="modeloOperarioPersonaStore.finca.fincaid" 
              placeholder="Seleccione una finca"
              class="style-chooser custom px-2"
              label="finnombrefinca" 
              filled
              :reduce="(listaFincas) => listaFincas.fincaid"
              :options="listaFincas">
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
            <v-text-field 
              v-model="modeloOperarioPersonaStore.perdireccion" 
              label="Dirección" 
              :rules="[
                reglas.campoVacio(modeloOperarioPersonaStore.perdireccion),
              ]" 
              class="custom px-2" dense filled>
              </v-text-field>
          </v-col>
            
          <v-col cols="12" md="6">
            <v-select 
              v-model="modeloOperarioPersonaStore.pergenero"
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
            <v-text-field 
              v-model="modeloOperarioPersonaStore.opecargo" 
              label="Cargo" 
              :rules="[
                reglas.campoVacio(modeloOperarioPersonaStore.opecargo),
              ]" 
              class="custom px-2" dense filled>
              </v-text-field>            
          </v-col>
          <v-col cols="12" md="6">   
            <v-text-field 
              v-model="modeloOperarioPersonaStore.peremail" 
              label="Email" 
              :rules="[
                reglas.campoVacio(modeloOperarioPersonaStore.peremail),
                reglas.correo(modeloOperarioPersonaStore.peremail)
              ]" 
              class="custom px-2" dense filled>
            </v-text-field>                             
          </v-col>
        </v-row>
        </v-form>

      </v-card-text>
      
      <v-card-actions class="justify-center">
        <v-btn 
          color="primary" 
          large elevation="0" :disabled="validarBtnNuevo()"
          :block="$vuetify.breakpoint.xs ? true : false"
          width="250px" @click="guardarOperarioPersona()">
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import { mapMutations, mapState } from "vuex";                               // Trabajar con la tienda de Vue (Store)
import ServicioOperarioPersona from '../services/ServicioOperarioPersona';   // Interactuar con el Backend
import ServicioFinca from "../services/ServicioFinca";

export default {
  name: "DialogNuevoOperarioPersona",
  components: {
    vSelect
  },

  data() {
    
    return {
      formOperarioPersonaValido: false,
      menuMostrarCalendario: "",
      fecha: new Date().toISOString().substr(0, 10),
      ciudad: null,
      listaFincas: [],
      itemsGenero: [
        {id: 1, genero: 'Masculino'}, 
        {id: 2, genero:'Femenino'}
      ],
      itemsTipoUsuario: [
        {id: 1, tipoUsuario: 'Operario'}, 
        {id: 2, tipoUsuario: 'Responsable Centro Acopio'}, 
        {id: 3, tipoUsuario: 'Operario'}, 
        {id: 4, tipoUsuario: 'Administrador'}
      ],
    };
  },

  watch: {
    fecha (val) {
      this.modeloOperarioPersonaStore.perfechanacimiento = this.formatDate(this.fecha);
    },

    ciudad (val) { //id
      this.modeloOperarioPersonaStore.ciudadnacimiento.ciudadid = this.ciudad;
    },
  },

  computed: {

    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    listaCiudadStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloOperarioPersona/listaCiudadStore"]));
      },
      set(v) {
        return this.$store.commit("moduloOperarioPersona/establecerListaCiudadStore", v);
      },
    },

    listaOperarioPersonaStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloOperarioPersona/listaOperarioPersonaStore"]));
      },
      set(v) {
        return this.$store.commit("moduloOperarioPersona/establecerListaOperarioPersonaStore", v);
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

    ...mapState("validacionForm", ["reglas"]),        
  },

  methods: {


    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    // CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
    
    // INSERT: Agrega un usuario
    async guardarOperarioPersona () { 

      let respuesta = await ServicioOperarioPersona.agregarOperarioPersona(this.modeloOperarioPersonaStore);
      if (respuesta.status == 201) {
        this.cerrarDialogo();
        this.cargarListaOperarioPersona();
        this.vaciarModeloOperarioPersonaStore();
        this.$toast.success(respuesta.data.message);
      }else{
        this.$toast.error(respuesta.data.message);
      }
    },

    // SELECT: Carga todos los usuarios registrados
    async cargarListaOperarioPersona () { 
      let listaOperarioPersona = [];                                              // Limpiar la 'lista de datos'

      let respuesta = await ServicioOperarioPersona.obtenerTodosOperarioPersona();  // Obtener respuesta de backend
      let datosUsuario = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosUsuario.forEach((modeloOperarioPersonaStore) => {                       // Guardar cada registro en la 'lista de datos' 
        listaOperarioPersona.push(modeloOperarioPersonaStore);
      });

      this.listaOperarioPersonaStore = listaOperarioPersona;
    },


    async obtenerTodosFinca() {
      let resultado = await ServicioFinca.obtenerTodosFincas();
      this.listaFincas = resultado.data;
    },


    // ##############
    // #  DIALOGOS  #
    // ##############

    // CERRAR: Cierra este dialogo
    cerrarDialogo(){
      this.dialogNuevoOperarioPersona = !this.dialogNuevoOperarioPersona;
      this.$refs.formNuevoOperario.resetValidation();
    },


    // ########################
    // #  METODOS AUXILIARES  #
    // ########################

    // VALIDACION: valida este formulario
    validarBtnNuevo(){
      let vselectciudad = this.modeloOperarioPersonaStore.ciudadnacimiento.ciudadid == "" || this.modeloOperarioPersonaStore.ciudadnacimiento.ciudadid == null;
      let vselectgenero = this.modeloOperarioPersonaStore.pergenero == "" || this.modeloOperarioPersonaStore.pergenero == null;
      let vselectfinca = this.modeloOperarioPersonaStore.finca.fincaid == "" || this.modeloOperarioPersonaStore.finca.fincaid == null;

      return this.formOperarioPersonaValido && !vselectciudad && !vselectgenero && !vselectfinca ? false : true;
    },

    // FORMATO: Modifica el formato de la fecha a dd/mm/aaaa
    formatDate (fecha) {
        if (!fecha) return null

        const [year, month, day] = fecha.split('-')
        return `${day}/${month}/${year}`
    },

    ...mapMutations("moduloOperarioPersona", ["vaciarModeloOperarioPersonaStore"]),  // Vacia el modelo modeloOperarioPersonaStore
    
  },

  mounted() {
    this.obtenerTodosFinca();
  }
};
</script>