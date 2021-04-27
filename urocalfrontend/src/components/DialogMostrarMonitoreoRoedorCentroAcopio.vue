<template>
  <v-dialog
    v-model="dialogMostrarMonitoreoRoedorCentroAcopio"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
    persistent
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="white primary--text">
        <h5>Actualizar/eliminar</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon :disabled="!noeditar" class="primary--text" @click="cambiarEstadoEditar()">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon :disabled="!noeditar" class="primary--text" @click="eliminarRegistro()">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="primary--text" @click="cerrarDialogMostrarMonitoreoRoedorCentroAcopio()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Limpieza Herramienta -->
      <v-card-text style="padding: 0px">
        <v-container>
          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-select
                v-model="modeloMonitoreoRoedorCentroAcopioStore.monitoreoroedor.centroacopioid"
                placeholder="Seleccione un centro de acopio"
                class="style-chooser"
                label="centroacopionombre"
                :disabled="noeditar"
                @input="obtenerTodosCentroAcopio" 
                :reduce="(listaCentroAcopio) => listaCentroAcopio.centroacopioid"
                :options="listaCentroAcopio"
              >
                <template v-slot:no-options="{ search, searching }">
                  <template v-if="searching">
                    No hay resultados para <em>{{ search }}</em
                    >.
                  </template>
                  <em style="opacity: 0.5" v-else>Empiece a escribir un  centro de aBBBcopio</em>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-menu
                v-model="menuMostrarCalendario"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field class="custom px-2" filled dense
                    label="Fecha de trampeo"
                    :disabled="noeditar"
                    v-model="modeloMonitoreoRoedorCentroAcopioStore.monfechatrampeo"
                    :rules="[reglas.campoVacio(fecha)]"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fecha"
                  @input="menuMostrarCalendario = false"
                  locale="es-419"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Tipo de trampa"
                :disabled="noeditar"
                v-model="modeloMonitoreoRoedorCentroAcopioStore.montipotrampa"
                :rules="[reglas.campoVacio(modeloMonitoreoRoedorCentroAcopioStore.montipotrampa)]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Número de trampas"
                :disabled="noeditar"
                type="Number"
                v-model="modeloMonitoreoRoedorCentroAcopioStore.monnumerotrampas"
                :rules="[reglas.campoVacio(modeloMonitoreoRoedorCentroAcopioStore.monnumerotrampas),
                reglas.soloNumerosPositivos(modeloMonitoreoRoedorCentroAcopioStore.monnumerotrampas)]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Cebo utilizado"
                :disabled="noeditar"
                v-model="modeloMonitoreoRoedorCentroAcopioStore.monceboutilizado"
                :rules="[reglas.campoVacio(modeloMonitoreoRoedorCentroAcopioStore.monceboutilizado)]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Roedores muertos"
                :disabled="noeditar"
                type="Number"
                v-model="modeloMonitoreoRoedorCentroAcopioStore.monroedoresmuertos"
                :rules="[reglas.campoVacio(modeloMonitoreoRoedorCentroAcopioStore.monroedoresmuertos),
                reglas.soloNumerosPositivos(modeloMonitoreoRoedorCentroAcopioStore.monroedoresmuertos)]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Operario"
                :disabled="noeditar"
                v-model="modeloMonitoreoRoedorCentroAcopioStore.monoperario"
                :rules="[reglas.campoVacio(modeloMonitoreoRoedorCentroAcopioStore.monoperario)]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Inspector"
                :disabled="noeditar"
                v-model="modeloMonitoreoRoedorCentroAcopioStore.moninspector"
                :rules="[reglas.campoVacio(modeloMonitoreoRoedorCentroAcopioStore.moninspector)]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Acciones tomadas"
                :disabled="noeditar"
                v-model="modeloMonitoreoRoedorCentroAcopioStore.monaccionestomadas"
                :rules="[reglas.campoVacio(modeloMonitoreoRoedorCentroAcopioStore.monaccionestomadas)]"
              ></v-text-field>
            </v-col>
          <v-col cols="12" md="6"></v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Sitio -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          :disabled="noeditar"
          @click="actualizarRegistro()"
          >Guardar Cambios</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import FormMonitoreoRoedorCentroAcopio from "@/components/FormMonitoreoRoedorCentroAcopio";
import ServicioMonitoreoRoedorCentroAcopio from '../services/ServicioMonitoreoRoedorCentroAcopio';
import servicioCentroAcopio from '../services/ServicioCentroAcopio';

export default {
  name: "MostrarMonitoreoRoedorCentroAcopio",

  components: {
    FormMonitoreoRoedorCentroAcopio,
    vSelect
  },

  mounted() {
    this.obtenerTodosCentroAcopio();
  },

  watch: {
    fecha (val) {   // Cada vez que haya un cambio en fecha se actualiza perfechanacimiento aaaa-mm-dd -> dd/mm/aaaa
      this.modeloMonitoreoRoedorCentroAcopioStore.monfechatrampeo = this.formatDate(this.fecha)
    },
  },

  data() {
    return {
      listaCentroAcopio: [],
      noeditar: true,
      tab: "formMonitoreoRoedorFinca",
      menuMostrarCalendario: "", // Variable de referencia para el menú de fecha toma muestra
      fecha: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  computed: {
        // Obtiene el modelo MonitoreoRoedorCentroAcopio
    ...mapState("moduloMonitoreoRoedorCentroAcopio", ["monitoreoRoedorCentroAcopio"], ["listaAcopioStore"]),

    // Obtiene y modifica el estado de la variable dialogMostrarMonitoreoRoedorCentroAcopio
    dialogMostrarMonitoreoRoedorCentroAcopio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarMonitoreoRoedorCentroAcopio"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarMonitoreoRoedorCentroAcopio", v);
      },
    },

    listaMonitoreoRoedorCentroAcopioStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloMonitoreoRoedorCentroAcopio/listaMonitoreoRoedorCentroAcopioStore"]));
      },
      set(v) {
        return this.$store.commit("moduloMonitoreoRoedorCentroAcopio/establecerListaMonitoreoRoedorCentroAcopioStore", v);
      },
    },

    listaAcopioStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloMonitoreoRoedorCentroAcopio/listaAcopioStore"]));
      },
      set(v) {
        return this.$store.commit("moduloMonitoreoRoedorCentroAcopio/establecerListaAcopioStore", v);
      },
    },

    modeloMonitoreoRoedorCentroAcopioStore: {
      get() {
        return this.$store.getters["moduloMonitoreoRoedorCentroAcopio/monitoreoRoedorCentroAcopio"];
      },
      set(v) {
        return this.$store.commit("moduloMonitoreoRoedorCentroAcopio/nuevoMonitoreoRoedorCentroAcopio", v);
      },
    },
        // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {

    // UPDATE: Actualiza un registro
    async actualizarRegistro () { 
      //console.log(this.modeloMonitoreoRoedorCentroAcopioStore)
      try {
          const respuesta = await ServicioMonitoreoRoedorCentroAcopio.actualizarMonitoreoRoedorCentroAcopio(this.modeloMonitoreoRoedorCentroAcopioStore.monitoreoroedorid, this.modeloMonitoreoRoedorCentroAcopioStore);
          this.$toast.success(respuesta.data.message);
          this.cargarListaMonitoreoRoedorCentroAcopio();
          this.cerrarDialogMostrarMonitoreoRoedorCentroAcopio();        
        } catch (error) {
          this.$toast.error(error.response.data.message);
      } 
    },

    // #  MANIPULACIÓN DE DATOS  #
    async cargarListaMonitoreoRoedorCentroAcopio() { 
      let listaMonitoreoRoedorCentroAcopio = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioMonitoreoRoedorCentroAcopio.obtenerTodosMonitoreoRoedorCentroAcopio();  // Obtener respuesta de backend
      let datosMonitoreoRoedorCentroAcopio = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosMonitoreoRoedorCentroAcopio.forEach((CentroAcopio) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaMonitoreoRoedorCentroAcopio.push(CentroAcopio);
      });
      this.listaMonitoreoRoedorCentroAcopioStore = listaMonitoreoRoedorCentroAcopio;
    },

    async eliminarRegistro() {
      try {
          const respuesta = await ServicioMonitoreoRoedorCentroAcopio.eliminarMonitoreoRoedorCentroAcopio(this.modeloMonitoreoRoedorCentroAcopioStore.monitoreoroedorid);
          this.$toast.success(respuesta.data.message);
          this.cargarListaMonitoreoRoedorCentroAcopio();
          this.cerrarDialogMostrarMonitoreoRoedorCentroAcopio();
        } catch (error) {
          this.$toast.error(error.response.data.message);
      } 
    },

    // Vacia el modelo MonitoreoRoedorCentroAcopio
    ...mapMutations("moduloMonitoreoRoedorCentroAcopio", ["vaciarMonitoreoRoedorCentroAcopio"]),

    cerrarDialogMostrarMonitoreoRoedorCentroAcopio() {
      this.dialogMostrarMonitoreoRoedorCentroAcopio = !this.dialogMostrarMonitoreoRoedorCentroAcopio; // Cierra el dialogMostrarMonitoreoRoedorCentroAcopio
      this.vaciarMonitoreoRoedorCentroAcopio(); // Vacia el modelo MonitoreoRoedorCentroAcopio
      this.cargarListaMonitoreoRoedorCentroAcopio();
      this.noeditar = true;
    },

    cambiarEstadoEditar () { 
      this.noeditar = !this.noeditar;
    },

    // FORMATO: Modifica el formato de la fecha a dd/mm/aaaa
    formatDate (fecha) {
        if (!fecha) return null

        const [year, month, day] = fecha.split('-')
        return `${day}/${month}/${year}`
    },
    
    //Obtiene el centro de acopio
      async obtenerTodosCentroAcopio() {
      let resultado = await servicioCentroAcopio.obtenerTodosCentroAcopio();
      this.listaCentroAcopio = resultado.data; 
      
    },
    limpiarIds(){
      this.centroacopioid = '';
    }
  },
};
</script>
