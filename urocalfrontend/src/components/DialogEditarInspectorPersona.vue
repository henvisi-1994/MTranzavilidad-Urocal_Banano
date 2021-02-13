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
  <v-dialog v-model="dialogEditarInspectorPersona" scrollable max-width="700px" transition="dialog-transition" :fullscreen="$vuetify.breakpoint.xs ? true : false">
    <v-card tile>

      <v-card-title class="primary--text">
        <h5 class="pl-3">Información del inspector</h5>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon :disabled="!noeditar" class="primary--text" @click="cambiarEstadoEditar()">mdi-pencil</v-icon></v-btn>
        <v-btn icon><v-icon @click="eliminarRegistro()" class="primary--text">mdi-trash-can</v-icon></v-btn>
        <v-btn icon><v-icon @click="cerrarDialogo()" class="primary--text">mdi-close</v-icon></v-btn>
      </v-card-title>
      
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field :disabled="noeditar" v-model="modeloInspectorPersonaStore.percedula" label="Cédula/RUC" class="custom px-2" dense filled></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-menu v-model="menuMostrarCalendario" transition="scale-transition" offset-y max-width="290px" min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field :disabled="noeditar"
                v-model="modeloInspectorPersonaStore.perfechanacimiento" 
                label="Fecha de nacimiento" 
                :rules="[reglas.campoVacio(modeloInspectorPersonaStore.perfechanacimiento)]"
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
            <v-text-field :disabled="noeditar" v-model="modeloInspectorPersonaStore.pernombres" label="Nombres" class="custom px-2" dense filled></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field :disabled="noeditar" v-model="modeloInspectorPersonaStore.perapellidos" label="Apellidos" class="custom px-2" dense filled></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters> 
          <v-col cols="12" md="6">
            <v-text-field :disabled="noeditar" v-model="modeloInspectorPersonaStore.pertelefono" label="Teléfono" class="custom px-2" dense filled></v-text-field>
          </v-col>
          <v-col cols="12" md="6">   
            <v-select :disabled="noeditar"
              v-model="modeloInspectorPersonaStore.ciudadnacimiento.ciudadid" 
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
            <v-text-field :disabled="noeditar" v-model="modeloInspectorPersonaStore.perwhatsapp" label="Whatsapp" class="custom px-2" dense filled></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select :disabled="noeditar"
              v-model="modeloInspectorPersonaStore.pergenero"
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
            <v-text-field :disabled="noeditar" v-model="modeloInspectorPersonaStore.perdireccion" label="Dirección" class="custom px-2" dense filled></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field :disabled="noeditar" v-model="modeloInspectorPersonaStore.peremail" label="Email" class="custom px-2" dense filled></v-text-field>
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
import ServicioInspectorPersona from "../services/ServicioInspectorPersona";  // Interactuar con el Backend

export default {
  name: "DialogEditarInspectorPersona",
  components: {
    vSelect
  },

  data() {
    return {
      noeditar: true,
      menuMostrarCalendario: "",
      fecha: null, 
      itemsGenero: [
        {id: 0, genero: 'Masculino'}, 
        {id: 1, genero:'Femenino'}
      ],
      itemsTipoUsuario: ['Productor', 'Responsable Centro Acopio', 'Exportador', 'Administrador'],
    };
  },


  watch: {
    fecha (val) {   // Cada vez que haya un cambio en fecha se actualiza perfechanacimiento aaaa-mm-dd -> dd/mm/aaaa
      this.modeloInspectorPersonaStore.perfechanacimiento = this.formatDate(this.fecha)
    },
  },

  computed: {

    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    listaCiudadStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloInspectorPersona/listaCiudadStore"]));
      },
      set(v) {
        return this.$store.commit("moduloInspectorPersona/establecerListaCiudadStore", v);
      },
    },

    listaInspectorPersonaStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloInspectorPersona/listaInspectorPersonaStore"]));
      },
      set(v) {
        return this.$store.commit("moduloInspectorPersona/establecerListaInspectorPersonaStore", v);
      },
    },

    // ##############
    // #  DIALOGOS  #
    // ##############
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
    async cargarListaInspectorPersona () { 
      let listaInspectorPersona = [];                                                 // Limpiar la 'lista de datos'

      let respuesta = await ServicioInspectorPersona.obtenerTodosInspectorPersona();  // Obtener respuesta de backend
      let datosUsuario = await respuesta.data;                                        // Rescatar datos de la respuesta
      datosUsuario.forEach((modeloInspectorPersonaStore) => {                         // Guardar cada registro en la 'lista de datos' 
        listaInspectorPersona.push(modeloInspectorPersonaStore);
      });

      this.listaInspectorPersonaStore = listaInspectorPersona;
    },

    // UPDATE: Actualiza un registro
    async actualizarRegistro () { 
      
      const respuesta = await ServicioInspectorPersona.actualizarInspectorPersona(this.modeloInspectorPersonaStore.personaid, this.modeloInspectorPersonaStore);
      if (respuesta.status == 200) {
        this.cerrarDialogo();
        this.cargarListaInspectorPersona();
        this.vaciarModeloInspectorPersonaStore(); 
        this.$toast.success(respuesta.data.message);       
      }else{
        this.$toast.error(respuesta.data.message);
      }
      
    },

    // DELETE: Elimina un registro
    async eliminarRegistro() {
      
      const respuesta = await ServicioInspectorPersona.eliminarInspectorPersona(this.modeloInspectorPersonaStore.personaid);
      if (respuesta.status == 200) {
        this.cerrarDialogo();
        this.cargarListaInspectorPersona();
      } 
      this.$toast.success(respuesta.data.message);
    },

    
    

    // ########################
    // #  METODOS AUXILIARES  #
    // ########################
    
    // DIALOGO: cierra este dialogo
    cerrarDialogo(){
      this.dialogEditarInspectorPersona = !this.dialogEditarInspectorPersona;
      this.noeditar = true;
    },

    // VARIABLE DE ESTADO: Habilita o deshabilita los campos de edición
    cambiarEstadoEditar () { 
      this.noeditar = !this.noeditar;
    },

    // FORMATO: Establece el formato de la fecha a dd/mm/aaaa
    formatDate (fecha) {
        if (!fecha) return null
        const [year, month, day] = fecha.split('-')
        return `${day}/${month}/${year}`
    },

    ...mapMutations("moduloInspectorPersona", ["vaciarModeloInspectorPersonaStore"]),  // Vacia el modelo modeloInspectorPersonaStore
    
  },
};
</script>