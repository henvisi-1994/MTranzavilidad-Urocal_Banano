<template>
  <v-dialog v-model="dialogNuevoConductorPersona" scrollable max-width="800px" transition="dialog-transition" :fullscreen="$vuetify.breakpoint.xs ? true : false">
    <v-card tile>
      <v-card-title class="justify-center primary--text">
        <h5 class="pl-3">Nuevo conductor</h5>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon class="primary--text" @click="cerrarDialogo()">mdi-close</v-icon></v-btn>
      </v-card-title>
      
      <v-card-text>

        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field 
              v-model="modeloConductorPersonaStore.percedula"
              :rules="[reglas.campoVacio(modeloConductorPersonaStore.percedula),
                       reglas.soloNumerosPositivos(modeloConductorPersonaStore.percedula)]" 
              label="Cédula/RUC" 
              class="custom px-2" 
              dense filled>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-menu v-model="menuMostrarCalendario" transition="scale-transition" offset-y max-width="290px" min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field 
                v-model="modeloConductorPersonaStore.perfechanacimiento" 
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
            <v-text-field 
            v-model="modeloConductorPersonaStore.pernombres" 
            :rules="[reglas.campoVacio(modeloConductorPersonaStore.pernombres)]"
            label="Nombres" 
            class="custom px-2" 
            dense filled></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field 
            v-model="modeloConductorPersonaStore.perapellidos" 
            :rules="[reglas.campoVacio(modeloConductorPersonaStore.perapellidos)]"
            label="Apellidos" 
            class="custom px-2" 
            dense filled></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters> 
          <v-col cols="12" md="6">
            <v-text-field 
            v-model="modeloConductorPersonaStore.pertelefono" 
            :rules="[reglas.campoVacio(modeloConductorPersonaStore.pertelefono),
                    reglas.soloNumerosPositivos(modeloConductorPersonaStore.pertelefono)]" 
            label="Teléfono" 
            class="custom px-2" 
            dense filled></v-text-field>
          </v-col>
          <v-col cols="12" md="6">   
            <v-select
              v-model="ciudad" 
              :rules="[reglas.campoVacio(ciudad)]"
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
            v-model="modeloConductorPersonaStore.perwhatsapp" 
            :rules="[reglas.campoVacio(modeloConductorPersonaStore.perwhatsapp),
                    reglas.soloNumerosPositivos(modeloConductorPersonaStore.perwhatsapp)]" 
            label="Whatsapp" 
            class="custom px-2" 
            dense filled></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select 
              v-model="modeloConductorPersonaStore.pergenero"
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
            v-model="modeloConductorPersonaStore.perdireccion" 
            :rules="[reglas.campoVacio(modeloConductorPersonaStore.perdireccion)]"   
            label="Dirección" class="custom px-2" 
            dense filled></v-text-field>
          </v-col>
            
          <v-col cols="12" md="6">
            <v-text-field v-model="modeloConductorPersonaStore.conductorlicencia" 
            :rules="[reglas.campoVacio(modeloConductorPersonaStore.conductorlicencia),
                    reglas.soloNumerosPositivos(modeloConductorPersonaStore.conductorlicencia)]" 
            label="Licencia" class="custom px-2" dense filled></v-text-field>
          </v-col>
        </v-row>
            
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field v-model="modeloConductorPersonaStore.peremail" label="Email"
             :rules="[reglas.campoVacio(modeloConductorPersonaStore.peremail),
                    reglas.correo(modeloConductorPersonaStore.peremail)]" 
            class="custom px-2" dense filled></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
          </v-col>
        </v-row>

      </v-card-text>
      
      <v-card-actions class="justify-center">
        <v-btn 
          color="primary" 
          large 
          :block="$vuetify.breakpoint.xs ? true : false"
          width="250px" @click="guardarConductorPersona()">
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
import ServicioConductorPersona from '../services/ServicioConductorPersona';  // Interactuar con el Backend

export default {
  name: "DialogNuevoConductorPersona",
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
      this.modeloConductorPersonaStore.perfechanacimiento = this.formatDate(this.fecha);
    },

    ciudad (val) { //id
      this.modeloConductorPersonaStore.ciudadnacimiento.ciudadid = this.ciudad;
    },
  },

  computed: {

    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    listaCiudadStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloConductorPersona/listaCiudadStore"]));
      },
      set(v) {
        return this.$store.commit("moduloConductorPersona/establecerListaCiudadStore", v);
      },
    },

    listaConductorPersonaStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloConductorPersona/listaConductorPersonaStore"]));
      },
      set(v) {
        return this.$store.commit("moduloConductorPersona/establecerListaConductorPersonaStore", v);
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

    ...mapState("validacionForm", ["reglas"]),                
    
  },

  methods: {


    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    // CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
    
    // INSERT: Agrega un usuario
    async guardarConductorPersona () { 
      try{
        //console.log(this.modeloConductorPersonaStore);
        let respuesta = await ServicioConductorPersona.agregarConductorPersona(this.modeloConductorPersonaStore);
        if (respuesta.status == 201) {
          this.cerrarDialogo();
          this.$toast.success(respuesta.data.message);
          this.cargarListaConductorPersona();
          this.vaciarModeloConductorPersonaStore();
        }
      } catch (error) {
          this.$toast.error("Llene todos los campos del formulario!"); 
      }
      
    },

    // SELECT: Carga todos los usuarios registrados
    async cargarListaConductorPersona () { 
      let listaConductorPersona = [];                                              // Limpiar la 'lista de datos'

      let respuesta = await ServicioConductorPersona.obtenerTodosConductorPersona();  // Obtener respuesta de backend
      let datosUsuario = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosUsuario.forEach((modeloConductorPersonaStore) => {                       // Guardar cada registro en la 'lista de datos' 
        listaConductorPersona.push(modeloConductorPersonaStore);
      });

      this.listaConductorPersonaStore = listaConductorPersona;
    },


    // ##############
    // #  DIALOGOS  #
    // ##############

    // CERRAR: Cierra este dialogo
    cerrarDialogo(){
      this.dialogNuevoConductorPersona = !this.dialogNuevoConductorPersona;
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

    ...mapMutations("moduloConductorPersona", ["vaciarModeloConductorPersonaStore"]),  // Vacia el modelo modeloConductorPersonaStore
    
  }
};
</script>