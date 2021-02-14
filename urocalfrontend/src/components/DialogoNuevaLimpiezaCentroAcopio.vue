<template>
<v-dialog v-model="dialogoNuevaLimpiezaCentroAcopio" scrollable max-width="800px" transition="dialog-transition" :fullscreen="$vuetify.breakpoint.xs ? true : false">
    <v-card tile>
      <!-- Barra de titulo -->
      <v-card-title class="justify-center primary--text">
        <h5 class="pl-3">Nueva Limpieza del Centro de Acopio</h5>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon class="primary--text" @click="cerrarDialogoNuevaLimpiezaCA()">mdi-close</v-icon></v-btn>
      </v-card-title>

      <!--<v-card-text class="py-top">
         Formulario para registrar nueva Limpieza del Centro de Acopio 
        <FormularioLimpiezaCentroAcopio ref="componenteFormularioLimpiezaCA"></FormularioLimpiezaCentroAcopio>
      </v-card-text>-->

      <v-card-text>
        <v-form ref="formNuevaLimpiezaCA" v-model="formLimpiezaCAValido">
          <v-row no-gutters>
            <v-col cols="12" md="6">
              <v-select
                v-model="centroacopio"
                placeholder="Seleccione el Centro de Acopio"
                class="style-chooser custom px-2"
                label="centroacopionombre"
                filled
                :reduce="(listaCentroAcopioStore) => listaCentroAcopioStore.centroacopioid"
                :options="listaCentroAcopioStore"
              >
                <template v-slot:no-options="{ search, searching }">
                  <template v-if="searching">
                    No hay resultados para <em>{{ search }}</em>
                  </template>
                  <em style="opacity: 0.5" v-else>Empiece a escribir el Centro de Acopio</em>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="modeloLimpiezaCentroAcopioStore.limcenareas" label="Áreas" class="custom px-2" dense filled     
                :rules="[reglas.campoVacio(modeloLimpiezaCentroAcopioStore.limcenareas)]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col cols="12" md="6">
              <v-menu v-model="menuMostrarCalendario" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="modeloLimpiezaCentroAcopioStore.limcenfecha" class="custom px-2" dense filled
                    label="Fecha de la Limpieza"
                    :rules="[reglas.campoVacio(modeloLimpiezaCentroAcopioStore.limcenfecha)]"
                    readonly
                    v-bind="attrs"
                    v-on="on">
                    </v-text-field>
                </template>
                <v-date-picker v-model="modeloLimpiezaCentroAcopioStore.limcenfecha" @input="menuMostrarCalendario=false" :show-current="fecha" locale="es-419" ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="modeloLimpiezaCentroAcopioStore.limcenmateriales" label="Materiales" class="custom px-2" dense filled
                :rules="[reglas.campoVacio(modeloLimpiezaCentroAcopioStore.limcenmateriales)]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col cols="12" md="6">
              <v-text-field v-model="modeloLimpiezaCentroAcopioStore.limcenproductos" label="Productos" class="custom px-2" dense filled
                :rules="[reglas.campoVacio(modeloLimpiezaCentroAcopioStore.limcenproductos)]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-textarea  v-model="modeloLimpiezaCentroAcopioStore.limcenmotivo" label="Motivo" rows="1" class="custom px-2" dense filled
                :rules="[reglas.campoVacio(modeloLimpiezaCentroAcopioStore.limcenmotivo)]"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nueva Limpieza del Centro de Acopio -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="250px"
          large elevation="0" :disabled="validarBtnNuevo()"
          color="primary"
          @click="guardarLimpiezaCentroAcopio()">
          Registrar
          </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import { mapMutations, mapState } from "vuex";                                          // Trabajar con la tienda de Vue (Store)
//import FormularioLimpiezaCentroAcopio from "@/components/FormLimpiezaCentroAcopio";
import ServicioLimpiezaCentroAcopio from '../services/ServicioLimpiezaCentroAcopio';    // Interactuar con el Backend

export default {
  name: "NuevaLimpiezaCentroAcopio",

  components: {
    //FormularioLimpiezaCentroAcopio,
    vSelect
  },

  data() {
    return {
      formLimpiezaCAValido: false,
      menuMostrarCalendario: "",
      fecha: new Date().toISOString().substr(0, 10),
      centroacopio: null,
    };
  },

  watch: {
    fecha (val) {
      this.modeloLimpiezaCentroAcopioStore.limcenfecha = this.formatDate(this.fecha);
    },

    centroacopio (val) { //id
      this.modeloLimpiezaCentroAcopioStore.centroacopiolista.centroacopioid = this.centroacopio;
    },
  },

  computed: {

    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################

    listaCentroAcopioStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloLimpiezaCentroAcopio/listaCentroAcopioStore"]));
      },
      set(v) {
        return this.$store.commit("moduloLimpiezaCentroAcopio/establecerListaCentroAcopioStore", v);
      },
    },

    listaLimpiezaCentroAcopioStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloLimpiezaCentroAcopio/listaLimpiezaCentroAcopioStore"]));
      },
      set(v) {
        return this.$store.commit("moduloLimpiezaCentroAcopio/establecerListaLimpiezaCentroAcopioStore", v);
      },
    },


    // ##############
    // #  DIALOGOS  #
    // ##############

    // Obtiene y modifica el estado de la variable dialogoNuevaLimpiezaCentroAcopio
    dialogoNuevaLimpiezaCentroAcopio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoNuevaLimpiezaCentroAcopio"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogoNuevaLimpiezaCentroAcopio", v);
      },
    },


    // #############
    // #  MODELOS  #
    // #############
    modeloLimpiezaCentroAcopioStore: {
      get() {
        return this.$store.getters["moduloLimpiezaCentroAcopio/modeloLimpiezaCentroAcopioStore"];
      },
      set(v) {
        return this.$store.commit("moduloLimpiezaCentroAcopio/establecerModeloLimpiezaCentroAcopioStore", v);
      },
    },

    ...mapState("validacionForm", ["reglas"]),                

    // Obtiene es estado de la variable formLimpiezaCAValido y el modelo
    //...mapState("moduloLimpiezaCentroAcopio", ["formLimpiezaCAValido", "modeloLimpiezaCentroAcopioStore", "listaLimpiezaCentroAcopioStore"]),
  },

  methods: {

    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    // CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
    
    // INSERT: Agrega una limpieza centro acopio
    async guardarLimpiezaCentroAcopio() {
      try {
        //console.log(this.modeloLimpiezaCentroAcopioStore);
        let respuesta = await ServicioLimpiezaCentroAcopio.agregarLimpiezaCentroAcopio(this.modeloLimpiezaCentroAcopioStore);
        if (respuesta.status == 201) {
          this.cerrarDialogoNuevaLimpiezaCA();
          this.cargarListaLimpiezaCentroAcopio();
          this.vaciarModeloLimpiezaCentroAcopioStore();
          this.$toast.success(respuesta.data.message);
        }else{
          console.log(error.response.data.message);
        }
      } catch (error) {
        //console.log(error.response.data.message);
        this.$toast.error(error.response.data.message);
      }
    },


    // SELECT: Carga todas las limpiezas registrados
    async cargarListaLimpiezaCentroAcopio () { 
      let listaLimpiezaCentroAcopio = [];                                                     // Limpiar la 'lista de datos'

      let respuesta = await ServicioLimpiezaCentroAcopio.obtenerTodosLimpiezaCentroAcopio();  // Obtener respuesta de backend
      let datosLimpiezaCentroAcopio = await respuesta.data;                                                // Rescatar datos de la respuesta
      datosLimpiezaCentroAcopio.forEach((modeloLimpiezaCentroAcopioStore) => {                                 // Guardar cada registro en la 'lista de datos' 
        listaLimpiezaCentroAcopio.push(modeloLimpiezaCentroAcopioStore);
      });

      this.listaLimpiezaCentroAcopioStore = listaLimpiezaCentroAcopio;
    },


    // ##############
    // #  DIALOGOS  #
    // ##############

    // CERRAR: Cierra este dialogo
    cerrarDialogoNuevaLimpiezaCA() {
      this.dialogoNuevaLimpiezaCentroAcopio = !this.dialogoNuevaLimpiezaCentroAcopio; // Cierra el DialogoNuevaLimpiezaCentroAcopio
      this.$refs.formNuevaLimpiezaCA.resetValidation();
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


    // VALIDACION: valida este formulario
    validarBtnNuevo(){
      let vselectcentroacopio = this.modeloLimpiezaCentroAcopioStore.centroacopiolista.centroacopioid == "" || this.modeloLimpiezaCentroAcopioStore.centroacopiolista.centroacopioid == null;

      return this.formLimpiezaCAValido && !vselectcentroacopio ? false : true;
    },


    // Vacia el modelo limpiezacentroacopio
    ...mapMutations("moduloLimpiezaCentroAcopio", ["vaciarModeloLimpiezaCentroAcopioStore"]),
   

    // Valida que el boton este activo si el formulario correspondiente a la seccion es valido
    /*validarBtnAgregarLimpiezaCA() {
      let validSelect = this.modeloLimpiezaCentroAcopioStore.centroacopioid == "" || this.modeloLimpiezaCentroAcopioStore.centroacopioid == null;
      return this.formLimpiezaCAValido && !validSelect ? false : true;
    },*/
  },
};
</script>
<style scoped>
.py-top {
  padding: 0 16px !important;
}
</style>
