<template>
  <v-dialog v-model="dialogEditarUsuarioPersona" scrollable max-width="700px" transition="dialog-transition" :fullscreen="$vuetify.breakpoint.xs ? true : false">
    <v-card tile>

      <v-card-title class="primary--text">
        <h5 class="pl-3">Información del usuario</h5>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon :disabled="!noeditar" class="primary--text" @click="cambiarEstadoEditar()">mdi-pencil</v-icon></v-btn>
        <!-- <v-btn icon><v-icon @click="eliminarRegistro()" class="primary--text">mdi-trash-can</v-icon></v-btn> -->
        <v-btn icon><v-icon @click="cerrarDialogo()" class="primary--text">mdi-close</v-icon></v-btn>
      </v-card-title>
      
      <v-card-text>
        <v-form ref="formEditarUsuario" v-model="formUsuarioPersonaValido">  
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field 
              :disabled="noeditar" 
              v-model="modeloUsuarioPersonaStore.percedula" 
              label="Cédula/RUC" 
              :rules="[
                reglas.campoVacio(modeloUsuarioPersonaStore.percedula),
              ]"
              class="custom px-2" dense filled>
              </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-menu v-model="menuMostrarCalendario" transition="scale-transition" offset-y max-width="290px" min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field :disabled="noeditar"
                v-model="modeloUsuarioPersonaStore.perfechanacimiento" 
                label="Fecha de nacimiento" 
                :rules="[
                  reglas.campoVacio(modeloUsuarioPersonaStore.perfechanacimiento),
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
              v-model="modeloUsuarioPersonaStore.pernombres" 
              label="Nombres" 
              :rules="[
                reglas.campoVacio(modeloUsuarioPersonaStore.pernombres),
              ]"
              class="custom px-2" dense filled>
              </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field 
              :disabled="noeditar" 
              v-model="modeloUsuarioPersonaStore.perapellidos" 
              label="Apellidos" 
              :rules="[
                reglas.campoVacio(modeloUsuarioPersonaStore.perapellidos),
              ]"
              class="custom px-2" dense filled>
              </v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters> 
          <v-col cols="12" md="6">
            <v-text-field 
              :disabled="noeditar" 
              v-model="modeloUsuarioPersonaStore.pertelefono" 
              label="Teléfono" 
              :rules="[
                reglas.campoVacio(modeloUsuarioPersonaStore.pertelefono),
              ]"
              class="custom px-2" dense filled>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">   
            <v-select :disabled="noeditar"
              v-model="modeloUsuarioPersonaStore.ciudadnacimiento.ciudadid" 
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
              v-model="modeloUsuarioPersonaStore.perwhatsapp" 
              label="Whatsapp" 
              :rules="[
                reglas.campoVacio(modeloUsuarioPersonaStore.perwhatsapp),
              ]"
              class="custom px-2" dense filled>
              </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select :disabled="noeditar"
              v-model="modeloUsuarioPersonaStore.pergenero"
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
              :disabled="noeditar" 
              v-model="modeloUsuarioPersonaStore.perdireccion" 
              label="Dirección" 
              :rules="[
                reglas.campoVacio(modeloUsuarioPersonaStore.perdireccion),
              ]"
              class="custom px-2" dense filled>
              </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select :disabled="noeditar"
              v-model="modeloUsuarioPersonaStore.usutipo" 
              placeholder="Tipo de usuario"
              class="style-chooser custom px-2"
              label="tipoUsuario" 
              filled
              :reduce="(itemsTipoUsuario) => itemsTipoUsuario.tipoUsuario"
              :options="itemsTipoUsuario">
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
              v-model="modeloUsuarioPersonaStore.peremail" 
              label="Email" 
              :rules="[
                reglas.campoVacio(modeloUsuarioPersonaStore.peremail),
                reglas.correo(modeloUsuarioPersonaStore.peremail)
              ]" 
              class="custom px-2" dense filled>
              </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-checkbox :disabled="noeditar" v-model="modeloUsuarioPersonaStore.usuactivo" label="Cuenta habilitada" class="px-2" filled></v-checkbox>
          </v-col>
        </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn 
          color="primary" 
          large elevation="0" :disabled="validarBtn()"
          :block="$vuetify.breakpoint.xs ? true : false" @click="actualizarRegistro()"
          width="200px">
          Guardar cambios
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import { mapMutations, mapState } from "vuex";                            // Trabajar con la tienda de Vue (Store)
import ServicioUsuarioPersona from "../services/ServicioUsuarioPersona";  // Interactuar con el Backend

export default {
  name: "DialogEditarUsuarioPersona",
  components: {
    vSelect
  },

  data() {
    return {
      formUsuarioPersonaValido: false,      
      noeditar: true,
      menuMostrarCalendario: "",
      fecha: null, 
      itemsGenero: [
        {id: 0, genero: 'Masculino'}, 
        {id: 1, genero:'Femenino'}
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
    fecha (val) {   // Cada vez que haya un cambio en fecha se actualiza perfechanacimiento aaaa-mm-dd -> dd/mm/aaaa
      this.modeloUsuarioPersonaStore.perfechanacimiento = this.formatDate(this.fecha)
    },
  },

  computed: {

    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    listaCiudadStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloUsuarioPersona/listaCiudadStore"]));
      },
      set(v) {
        return this.$store.commit("moduloUsuarioPersona/establecerListaCiudadStore", v);
      },
    },

    listaUsuarioPersonaStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloUsuarioPersona/listaUsuarioPersonaStore"]));
      },
      set(v) {
        return this.$store.commit("moduloUsuarioPersona/establecerListaUsuarioPersonaStore", v);
      },
    },

    // ##############
    // #  DIALOGOS  #
    // ##############
    dialogEditarUsuarioPersona: {
      get() {
        return this.$store.getters["gestionDialogos/dialogEditarUsuarioPersona"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogEditarUsuarioPersona", v);
      },
    },

    // #############
    // #  MODELOS  #
    // #############
    modeloUsuarioPersonaStore: {
      get() {
        return this.$store.getters["moduloUsuarioPersona/modeloUsuarioPersonaStore"];
      },
      set(v) {
        return this.$store.commit("moduloUsuarioPersona/establecerModeloUsuarioPersonaStore", v);
      },
    },

    // ###################
    // #  TIENDA DE VUE  #
    // ###################

    ...mapState("validacionForm", ["reglas"]),                          // Reglas de validacion
  },
  methods: {

    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    // CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

    // SELECT: Obtiene todos los registros
    async cargarListaUsuarioPersona () { 
      let listaUsuarioPersona = [];                                              // Limpiar la 'lista de datos'

      let respuesta = await ServicioUsuarioPersona.obtenerTodosUsuarioPersona();  // Obtener respuesta de backend
      let datosUsuario = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosUsuario.forEach((modeloUsuarioPersonaStore) => {                       // Guardar cada registro en la 'lista de datos' 
        listaUsuarioPersona.push(modeloUsuarioPersonaStore);
      });

      this.listaUsuarioPersonaStore = listaUsuarioPersona;
    },

    // UPDATE: Actualiza un registro
    async actualizarRegistro () { 
      const respuesta = await ServicioUsuarioPersona.actualizarUsuarioPersona(this.modeloUsuarioPersonaStore.personaid, this.modeloUsuarioPersonaStore);
      if (respuesta.status == 200) {
        this.cerrarDialogo();
        this.cargarListaUsuarioPersona();
        this.vaciarModeloUsuarioPersona();        
        this.$toast.success(respuesta.data.message);       
      }else{
        this.$toast.error(respuesta.data.message);
      }
    },

    // DELETE: Elimina un registro
    async eliminarRegistro() {
      const respuesta = await ServicioUsuarioPersona.eliminarUsuarioPersona(this.modeloUsuarioPersonaStore.personaid);
      if (respuesta.status == 200) {
        this.cerrarDialogo();
        this.cargarListaUsuarioPersona();
        this.$toast.success(respuesta.data.message);
      }else{
        this.$toast.error(respuesta.data.message);
      } 
    },

    // DIALOGO: cierra este dialogo
    cerrarDialogo(){
      this.dialogEditarUsuarioPersona = !this.dialogEditarUsuarioPersona;
      this.noeditar = true;
    },
    

    // ########################
    // #  METODOS AUXILIARES  #
    // ########################
    
    // VARIABLE DE ESTADO: Habilita o deshabilita los campos de edición
    cambiarEstadoEditar () { 
      this.noeditar = !this.noeditar;
    },

    // VALIDACION: valida este formulario
    validarBtn(){

      if(this.noeditar) return true;
      let vselectciudad = this.modeloUsuarioPersonaStore.ciudadnacimiento.ciudadid == "" || this.modeloUsuarioPersonaStore.ciudadnacimiento.ciudadid == null;
      let vselectgenero = this.modeloUsuarioPersonaStore.pergenero == "" || this.modeloUsuarioPersonaStore.pergenero == null;
      let vselectusutipo = this.modeloUsuarioPersonaStore.usutipo == "" || this.modeloUsuarioPersonaStore.usutipo == null;
      
      return this.formUsuarioPersonaValido && !vselectciudad && !vselectgenero && !vselectusutipo ? false : true;
    },

    // FORMATO: Establece el formato de la fecha a dd/mm/aaaa
    formatDate (fecha) {
        if (!fecha) return null
        const [year, month, day] = fecha.split('-')
        return `${day}/${month}/${year}`
    },

    ...mapMutations("moduloUsuarioPersona", ["vaciarModeloUsuarioPersona"]),  // Vacia el modelo modeloUsuarioPersonaStore
    
  },
};
</script>