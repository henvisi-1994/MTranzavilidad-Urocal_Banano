<template>

  <v-dialog v-model="dialogEditarOperarioPersona" 
    scrollable max-width="700px" 
    transition="dialog-transition" 
    :fullscreen="$vuetify.breakpoint.xs ? true : false">
    <v-card tile>

      <v-card-title class="primary--text">
        <h5 class="pl-3">Información del operario</h5>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon :disabled="!noeditar" class="primary--text" @click="cambiarEstadoEditar()">mdi-pencil</v-icon></v-btn>
        <v-btn icon><v-icon @click="eliminarRegistro()" class="primary--text">mdi-trash-can</v-icon></v-btn>
        <v-btn icon><v-icon @click="cerrarDialogo()" class="primary--text">mdi-close</v-icon></v-btn>
      </v-card-title>
      
      <v-card-text>
        <v-form ref="formEditarOperario" v-model="formOperarioPersonaValido">
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field 
              :disabled="noeditar" 
              :rules="[
                reglas.campoVacio(modeloOperarioPersonaStore.percedula),
              ]"
              v-model="modeloOperarioPersonaStore.percedula" 
              label="Cédula/RUC" 
              class="custom px-2" dense filled>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-menu v-model="menuMostrarCalendario" transition="scale-transition" offset-y max-width="290px" min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field :disabled="noeditar"
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
              :disabled="noeditar" 
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
              :disabled="noeditar" 
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
              :disabled="noeditar" 
              v-model="modeloOperarioPersonaStore.pertelefono" 
              label="Teléfono" 
              :rules="[
                reglas.campoVacio(modeloOperarioPersonaStore.pertelefono),
              ]"
              class="custom px-2" dense filled>
              </v-text-field>
          </v-col>
          <v-col cols="12" md="6">   
            <v-select :disabled="noeditar"
              v-model="modeloOperarioPersonaStore.ciudadnacimiento.ciudadid" 
              placeholder="Seleccione una ciudad"
              class="style-chooser px-2"
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
              :disabled="noeditar" 
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
              :disabled="noeditar" 
              v-model="modeloOperarioPersonaStore.perdireccion" 
              label="Dirección" 
              :rules="[
                reglas.campoVacio(modeloOperarioPersonaStore.perdireccion),
              ]"
              class="custom px-2" dense filled>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select :disabled="noeditar"
              v-model="modeloOperarioPersonaStore.pergenero"
              placeholder="Género"
              class="style-chooser px-2 custom"
              label="genero"
              filled
              :reduce="(itemsGenero) => itemsGenero.id"
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
              :disabled="noeditar" 
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
              :disabled="noeditar" 
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
        <v-btn :disabled="validarBtnNuevo()"
          color="primary" 
          large elevation="0" 
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
import ServicioOperarioPersona from "../services/ServicioOperarioPersona";  // Interactuar con el Backend
import ServicioFinca from "../services/ServicioFinca";

export default {
  name: "DialogEditarOperarioPersona",
  components: {
    vSelect
  },

  data() {
    return {
      formOperarioPersonaValido: false,
      noeditar: true,
      menuMostrarCalendario: "",
      fecha: null, 
      listaFincas: [],
      itemsGenero: [
        {id: 0, genero: 'Masculino'}, 
        {id: 1, genero:'Femenino'}
      ],
      itemsTipoUsuario: ['Operario', 'Responsable Centro Acopio', 'Operario', 'Administrador'],
    };
  },


  watch: {
    fecha (val) {   // Cada vez que haya un cambio en fecha se actualiza perfechanacimiento aaaa-mm-dd -> dd/mm/aaaa
      this.modeloOperarioPersonaStore.perfechanacimiento = this.formatDate(this.fecha)
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
    async cargarListaOperarioPersona () { 
      let listaOperarioPersona = [];                                                 // Limpiar la 'lista de datos'

      let respuesta = await ServicioOperarioPersona.obtenerTodosOperarioPersona();  // Obtener respuesta de backend
      let datosUsuario = await respuesta.data;                                        // Rescatar datos de la respuesta
      datosUsuario.forEach((modeloOperarioPersonaStore) => {                         // Guardar cada registro en la 'lista de datos' 
        listaOperarioPersona.push(modeloOperarioPersonaStore);
      });

      this.listaOperarioPersonaStore = listaOperarioPersona;
    },

    async obtenerTodosFinca() {
      let resultado = await ServicioFinca.obtenerTodosFincas();
      this.listaFincas = resultado.data;
    },

    // UPDATE: Actualiza un registro
    async actualizarRegistro () { 
      
      const respuesta = await ServicioOperarioPersona.actualizarOperarioPersona(this.modeloOperarioPersonaStore.personaid, this.modeloOperarioPersonaStore);
      if (respuesta.status == 200) {
        this.cerrarDialogo();
        this.cargarListaOperarioPersona();
        this.vaciarModeloOperarioPersonaStore(); 
        this.$toast.success(respuesta.data.message);       
      }else{
        this.$toast.error(respuesta.data.message);
      }
      
    },

    // DELETE: Elimina un registro
    async eliminarRegistro() {
      
      const respuesta = await ServicioOperarioPersona.eliminarOperarioPersona(this.modeloOperarioPersonaStore.personaid);
      if (respuesta.status == 200) {
        this.cerrarDialogo();
        this.cargarListaOperarioPersona();
        this.$toast.success(respuesta.data.message);
      }else{
        this.$toast.error(respuesta.data.message);
      }
    },

    
    

    // ########################
    // #  METODOS AUXILIARES  #
    // ########################
    
    // DIALOGO: cierra este dialogo
    cerrarDialogo(){
      this.dialogEditarOperarioPersona = !this.dialogEditarOperarioPersona;
      this.noeditar = true;
    },

    // VARIABLE DE ESTADO: Habilita o deshabilita los campos de edición
    cambiarEstadoEditar () { 
      this.noeditar = !this.noeditar;
    },

    // VALIDACION: valida este formulario
    validarBtnNuevo(){

      if(this.noeditar) return true;
      let vselectciudad = this.modeloOperarioPersonaStore.ciudadnacimiento.ciudadid == "" || this.modeloOperarioPersonaStore.ciudadnacimiento.ciudadid == null;
      let vselectgenero = this.modeloOperarioPersonaStore.pergenero == "" || this.modeloOperarioPersonaStore.pergenero == null;
      let vselectfinca = this.modeloOperarioPersonaStore.finca.fincaid == "" || this.modeloOperarioPersonaStore.finca.fincaid == null;

      return this.formOperarioPersonaValido && !vselectciudad && !vselectgenero && !vselectfinca ? false : true;
    },


    // FORMATO: Establece el formato de la fecha a dd/mm/aaaa
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