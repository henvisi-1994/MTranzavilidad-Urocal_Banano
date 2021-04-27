<template>
  <v-dialog
    v-model="dialogMostrarMonitoreoRoedorFinca"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
    persistent
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="primary white--text">
        <h5>Actualizar/eliminar</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon :disabled="!noeditar" class="white--text" @click="cambiarEstadoEditar()">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon :disabled="!noeditar" class="white--text" @click="eliminarRegistro()">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogMostrarMonitoreoRoedorFinca()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Limpieza Herramienta -->
      <v-card-text style="padding: 0px">
        <v-container>
          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="5">
              <v-select
                v-model="modeloMonitoreoRoedorFincaStore.monitoreoroedor.fincaid"
                placeholder="Seleccione una finca"
                class="style-chooser"
                label="finnombrefinca"
                :disabled="noeditar"
                :reduce="(listaFincaStore) => listaFincaStore.fincaid"
                :options="listaFincaStore"
              >
                <template v-slot:no-options="{ search, searching }">
                  <template v-if="searching">
                    No hay resultados para <em>{{ search }}</em
                    >.
                  </template>
                  <em style="opacity: 0.5" v-else>Empiece a escribir una finca</em>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="5">
              <v-menu
                v-model="menuMostrarCalendario"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="Fecha de trampeo"
                    :disabled="noeditar"
                    v-model="modeloMonitoreoRoedorFincaStore.monfechatrampeo"
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
            <v-col cols="12" md="5">
              <v-text-field
                label="Tipo de trampa"
                :disabled="noeditar"
                v-model="modeloMonitoreoRoedorFincaStore.montipotrampa"
                :rules="[reglas.campoVacio(modeloMonitoreoRoedorFincaStore.montipotrampa)]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="5">
              <v-text-field
                label="Número de trampas"
                :disabled="noeditar"
                type="Number"
                v-model="modeloMonitoreoRoedorFincaStore.monnumerotrampas"
                :rules="[reglas.campoVacio(modeloMonitoreoRoedorFincaStore.monnumerotrampas),
                reglas.soloNumerosPositivos(modeloMonitoreoRoedorFincaStore.monnumerotrampas)]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="5">
              <v-text-field
                label="Cebo utilizado"
                :disabled="noeditar"
                v-model="modeloMonitoreoRoedorFincaStore.monceboutilizado"
                :rules="[reglas.campoVacio(modeloMonitoreoRoedorFincaStore.monceboutilizado)]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="5">
              <v-text-field
                label="Roedores muertos"
                :disabled="noeditar"
                type="Number"
                v-model="modeloMonitoreoRoedorFincaStore.monroedoresmuertos"
                :rules="[reglas.campoVacio(modeloMonitoreoRoedorFincaStore.monroedoresmuertos),
                reglas.soloNumerosPositivos(modeloMonitoreoRoedorFincaStore.monroedoresmuertos)]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="5">
              <v-text-field
                label="Operario"
                :disabled="noeditar"
                v-model="modeloMonitoreoRoedorFincaStore.monoperario"
                :rules="[reglas.campoVacio(modeloMonitoreoRoedorFincaStore.monoperario)]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="5">
              <v-text-field
                label="Inspector"
                :disabled="noeditar"
                v-model="modeloMonitoreoRoedorFincaStore.moninspector"
                :rules="[reglas.campoVacio(modeloMonitoreoRoedorFincaStore.moninspector)]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="5">
              <v-text-field
                label="Acciones tomadas"
                :disabled="noeditar"
                v-model="modeloMonitoreoRoedorFincaStore.monaccionestomadas"
                :rules="[reglas.campoVacio(modeloMonitoreoRoedorFincaStore.monaccionestomadas)]"
              ></v-text-field>
            </v-col>
          <v-col cols="12" md="5"></v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Sitio -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          :disabled="noeditar"
          color="primary"
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

import FormMonitoreoRoedorFinca from "@/components/FormMonitoreoRoedorFinca";
import ServicioMonitoreoRoedorFinca from '../services/ServicioMonitoreoRoedorFinca';

export default {
  name: "MostrarMonitoreoRoedorFinca",

  components: {
    FormMonitoreoRoedorFinca,
    vSelect
  },

  watch: {
    fecha (val) {   // Cada vez que haya un cambio en fecha se actualiza perfechanacimiento aaaa-mm-dd -> dd/mm/aaaa
      this.modeloMonitoreoRoedorFincaStore.monfechatrampeo = this.formatDate(this.fecha)
    },
  },

  data() {
    return {
      noeditar: true,
      tab: "formMonitoreoRoedorFinca",
      menuMostrarCalendario: "", // Variable de referencia para el menú de fecha toma muestra
      fecha: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogMostrarMonitoreoRoedorFinca
    dialogMostrarMonitoreoRoedorFinca: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarMonitoreoRoedorFinca"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarMonitoreoRoedorFinca", v);
      },
    },

    listaMonitoreoRoedorFincaStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloMonitoreoRoedorFinca/listaMonitoreoRoedorFincaStore"]));
      },
      set(v) {
        return this.$store.commit("moduloMonitoreoRoedorFinca/establecerListaMonitoreoRoedorFincaStore", v);
      },
    },

    listaFincaStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloMonitoreoRoedorFinca/listaFincaStore"]));
      },
      set(v) {
        return this.$store.commit("moduloMonitoreoRoedorFinca/establecerListaFincaStore", v);
      },
    },

    modeloMonitoreoRoedorFincaStore: {
      get() {
        return this.$store.getters["moduloMonitoreoRoedorFinca/monitoreoRoedorFinca"];
      },
      set(v) {
        return this.$store.commit("moduloMonitoreoRoedorFinca/nuevoMonitoreoRoedorFinca", v);
      },
    },
    
    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {

    // UPDATE: Actualiza un registro
    async actualizarRegistro () { 
      try {
          const respuesta = await ServicioMonitoreoRoedorFinca.actualizarMonitoreoRoedorFinca(this.modeloMonitoreoRoedorFincaStore.monitoreoroedorid, this.modeloMonitoreoRoedorFincaStore);
          this.$toast.success(respuesta.data.message);
          this.cargarListaMonitoreoRoedorFinca();
          this.cerrarDialogMostrarMonitoreoRoedorFinca();        
       } catch (error) {
          this.$toast.error(error.response.data.message);
      } 
    },

    // #  MANIPULACIÓN DE DATOS  #
    async cargarListaMonitoreoRoedorFinca () { 
      let listaMonitoreoRoedorFinca = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioMonitoreoRoedorFinca.obtenerTodosMonitoreoRoedorFinca();  // Obtener respuesta de backend
      let datosMonitoreoRoedorFinca = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosMonitoreoRoedorFinca.forEach((MonitoreoRoedorFinca) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaMonitoreoRoedorFinca.push(MonitoreoRoedorFinca);
      });
      this.listaMonitoreoRoedorFincaStore = listaMonitoreoRoedorFinca;
    },

    async eliminarRegistro() {
      try {
          const respuesta = await ServicioMonitoreoRoedorFinca.eliminarMonitoreoRoedorFinca(this.modeloMonitoreoRoedorFincaStore.monitoreoroedorid);
          this.$toast.warning(respuesta.data.message);
          this.cargarListaMonitoreoRoedorFinca();
          this.cerrarDialogMostrarMonitoreoRoedorFinca();
        } catch (error) {
          this.$toast.error(error.response.data.message);
      } 
    },
    // Vacia el modelo MonitoreoRoedorFinca
    ...mapMutations("moduloMonitoreoRoedorFinca", ["vaciarMonitoreoRoedorFinca"]),

    cerrarDialogMostrarMonitoreoRoedorFinca() {
      this.dialogMostrarMonitoreoRoedorFinca = !this.dialogMostrarMonitoreoRoedorFinca; // Cierra el dialogMostrarMonitoreoRoedorFinca
      this.vaciarMonitoreoRoedorFinca(); // Vacia el modelo MonitoreoRoedorFinca
      this.cargarListaMonitoreoRoedorFinca();
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
  },
};
</script>
