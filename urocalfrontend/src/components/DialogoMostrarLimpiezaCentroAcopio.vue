<template>
  <v-dialog v-model="dialogoMostrarLimpiezaCentroAcopio" scrollable max-width="800px" transition="dialog-transition" 
    :fullscreen="$vuetify.breakpoint.xs ? true : false" >

    <v-card tile>

      <v-card-title class="primary--text">
        <!-- Barra de titulo -->
        <h5 class="pl-3">Actualizar/eliminar</h5>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon :disabled="!noeditar" class="primary--text" @click="cambiarEstadoEditar()">mdi-pencil</v-icon></v-btn>
        <v-btn icon><v-icon @click="eliminarRegistro()" class="primary--text">mdi-trash-can</v-icon></v-btn>
        <v-btn icon><v-icon @click="cerrarDialogo()" class="primary--text">mdi-close</v-icon></v-btn>
      </v-card-title>

      <v-card-text>
        <v-form ref="formEditarLimpiezaCA" v-model="formLimpiezaCAValido">
          <v-row no-gutters>
            <v-col cols="12" md="6">
              <v-select :disabled="noeditar"
                v-model="modeloLimpiezaCentroAcopioStore.centroacopiolista.centroacopioid"
                placeholder="Seleccione el Centro de Acopio"
                class="style-chooser px-2"
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
              <v-text-field :disabled="noeditar" v-model="modeloLimpiezaCentroAcopioStore.limcenareas" label="Áreas" class="custom px-2" dense filled     
                :rules="[reglas.campoVacio(modeloLimpiezaCentroAcopioStore.limcenareas),
                         reglas.soloNumerosPositivos(modeloLimpiezaCentroAcopioStore.limcenareas),
                ]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-menu 
                v-model="menuMostrarCalendario" 
                :nudge-right="40" 
                transition="scale-transition" 
                offset-y 
                min-width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field :disabled="noeditar"
                    v-model="modeloLimpiezaCentroAcopioStore.limcenfecha" class="custom px-2" dense filled
                    label="Fecha de la Limpieza"
                    :rules="[reglas.campoVacio(modeloLimpiezaCentroAcopioStore.limcenfecha)]"
                    readonly
                    hint="Formato DD/MM/YYYY"
                    v-bind="attrs"
                    v-on="on">
                  </v-text-field>
                </template>
                <v-date-picker v-model="fecha" @input="menuMostrarCalendario = false" locale="es-419" ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field :disabled="noeditar" v-model="modeloLimpiezaCentroAcopioStore.limcenmateriales" label="Materiales" class="custom px-2" dense filled
                :rules="[reglas.campoVacio(modeloLimpiezaCentroAcopioStore.limcenmateriales)]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col cols="12" md="6">
              <v-text-field :disabled="noeditar" v-model="modeloLimpiezaCentroAcopioStore.limcenproductos" label="Productos" class="custom px-2" dense filled
                :rules="[reglas.campoVacio(modeloLimpiezaCentroAcopioStore.limcenproductos)]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-textarea  :disabled="noeditar" v-model="modeloLimpiezaCentroAcopioStore.limcenmotivo" label="Motivo" rows="1" class="custom px-2" dense filled
                :rules="[reglas.campoVacio(modeloLimpiezaCentroAcopioStore.limcenmotivo)]"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn :disabled="validarBtnNuevo()"
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

import { mapMutations, mapState } from "vuex";
import ServicioLimpiezaCentroAcopio from '../services/ServicioLimpiezaCentroAcopio';    // Interactuar con el Backend
//import FormularioLimpiezaCA from "@/components/FormLimpiezaCentroAcopio";

export default {
  name: "DialogoMostrarLimpiezaCentroAcopio",
  components: {
    vSelect
  },
  //OJO
  data() {
    return {
      formLimpiezaCAValido: false,
      noeditar: true,
      menuMostrarCalendario: "",
      fecha: null,
    };
  },

  watch: {
    fecha (val) {
      this.modeloLimpiezaCentroAcopioStore.limcenfecha = this.formatDate(this.fecha);
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
    // Obtiene y modifica el estado de la variable dialogoMostrarLimpiezaCentroAcopio
    dialogoMostrarLimpiezaCentroAcopio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoMostrarLimpiezaCentroAcopio"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogoMostrarLimpiezaCentroAcopio", v);
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


    // ###################
    // #  TIENDA DE VUE  #
    // ###################

    ...mapState("validacionForm", ["reglas"]),    // Reglas de validacion
  },

  methods: {


    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    // CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

    // SELECT: Carga todas las limpiezas registrados
    async cargarListaLimpiezaCentroAcopio () { 
      let listaLimpiezaCentroAcopio = [];                                                     // Limpiar la 'lista de datos'
      let respuesta = await ServicioLimpiezaCentroAcopio.obtenerTodosLimpiezaCentroAcopio();  // Obtener respuesta de backend
      let datosLimpiezaCentroAcopio = await respuesta.data;                                   // Rescatar datos de la respuesta
      datosLimpiezaCentroAcopio.forEach((modeloLimpiezaCentroAcopioStore) => {                // Guardar cada registro en la 'lista de datos' 
        listaLimpiezaCentroAcopio.push(modeloLimpiezaCentroAcopioStore);
      });
      this.listaLimpiezaCentroAcopioStore = listaLimpiezaCentroAcopio;
    },


    // UPDATE: Actualiza un registro
    async actualizarRegistro () {
      try {
        //console.log(this.modeloLimpiezaCentroAcopioStore);
        const respuesta = await ServicioLimpiezaCentroAcopio.actualizarLimpiezaCentroAcopio(this.modeloLimpiezaCentroAcopioStore.limpiezacentroacopioid, this.modeloLimpiezaCentroAcopioStore);
        //if (respuesta.status == 200) {
          this.$toast.success(respuesta.data.message);
          this.cerrarDialogo();
          this.cargarListaLimpiezaCentroAcopio();
          this.vaciarModeloLimpiezaCentroAcopioStore();
        //}else{
        //  console.log(error.response.data.message);
        //}
      } catch (error) { 
        console.log(error.response.data.message);
        this.$toast.error(error.response.data.message);
      }
    },


    // DELETE: Elimina un registro
    /*async eliminarRegistro() {
      //console.log(this.modeloLimpiezaCentroAcopioStore);
      const respuesta = await ServicioLimpiezaCentroAcopio.eliminarLimpiezaCentroAcopio(this.modeloLimpiezaCentroAcopioStore.limpiezacentroacopioid);
      if (respuesta.status == 200) {
        this.cerrarDialogo();
        this.cargarListaLimpiezaCentroAcopio();
      }
    },*/


    async eliminarRegistro() {
      //console.log(this.modeloLimpiezaCentroAcopioStore);
      const respuesta = await ServicioLimpiezaCentroAcopio.eliminarLimpiezaCentroAcopio(this.modeloLimpiezaCentroAcopioStore.limpiezacentroacopioid); 
      try {
        this.$toast.warning(respuesta.data.message);
        this.cerrarDialogo();
        this.cargarListaLimpiezaCentroAcopio();
      } catch (error) {
        console.log(error.response.data.message);
        this.$toast.error(error.response.data.message);
      }
    },


    // ########################
    // #  METODOS AUXILIARES  #
    // ########################
    
    // DIALOGO: cierra este dialogo
    cerrarDialogo() {
      this.dialogoMostrarLimpiezaCentroAcopio = !this.dialogoMostrarLimpiezaCentroAcopio; // Cierra el DialogoNuevaLimpiezaCentroAcopio
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


    // VALIDACION: valida este formulario
    validarBtnNuevo(){
      let vselectcentroacopio = this.modeloLimpiezaCentroAcopioStore.centroacopiolista.centroacopioid == "" || this.modeloLimpiezaCentroAcopioStore.centroacopiolista.centroacopioid == null;

      return this.formLimpiezaCAValido && !vselectcentroacopio ? false : true;
    },


    // Vacia el modelo limpiezacentroacopio
    ...mapMutations("moduloLimpiezaCentroAcopio", ["vaciarModeloLimpiezaCentroAcopioStore"]),

  },
};

</script>
<style scoped>
.py-top {
  padding: 0 16px !important;
}
</style>
