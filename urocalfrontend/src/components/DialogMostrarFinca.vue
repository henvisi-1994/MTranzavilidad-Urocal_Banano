<template>
  <v-dialog
    v-model="dialogMostrarFinca"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
    persistent
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="primary--text">
        <h5>Actualizar/eliminar</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon :disabled="!noeditar" class="primary--text" @click="cambiarEstadoEditar()">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon :disabled="!noeditar" class="primary--text" @click="eliminarRegistro()">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="primary--text" @click="cerrarDialogMostrarFinca()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Finca -->
      <v-card-text style="padding: 0px">
        <v-container>
          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Código"
                :disabled="noeditar"
                v-model="modeloFincaStore.fincodigo"
                :rules="[reglas.campoVacio(modeloFincaStore.fincodigo)]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Nombre"
                :disabled="noeditar"
                v-model="modeloFincaStore.finnombrefinca"
                :rules="[reglas.campoVacio(modeloFincaStore.finnombrefinca)]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Superficie total"
                :disabled="noeditar"
                type="Number"
                v-model="modeloFincaStore.finsuperficietotal"
                :rules="[reglas.campoVacio(modeloFincaStore.finsuperficietotal),
                reglas.soloNumerosPositivos(modeloFincaStore.finsuperficietotal)]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Superficie cultivada"
                :disabled="noeditar"
                type="Number"
                v-model="modeloFincaStore.finsuperficiecultivada"
                :rules="[reglas.campoVacio(modeloFincaStore.finsuperficiecultivada),
                reglas.soloNumerosPositivos(modeloFincaStore.finsuperficiecultivada)]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Coordenada X"
                :disabled="noeditar"
                type="Number"
                v-model="modeloFincaStore.fincoordenadax"
                :rules="[reglas.campoVacio(modeloFincaStore.fincoordenadax),
                reglas.soloNumerosPositivos(modeloFincaStore.fincoordenadax)]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Coordenada Y"
                :disabled="noeditar"
                type="Number"
                v-model="modeloFincaStore.fincoordenaday"
                :rules="[reglas.campoVacio(modeloFincaStore.fincoordenaday),
                reglas.soloNumerosPositivos(modeloFincaStore.fincoordenaday)]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-menu
                v-model="menuMostrarCalendarioAsociacion"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field class="custom px-2" filled dense
                    label="Fecha de productos prohibidos"
                    :disabled="noeditar"
                    v-model="modeloFincaStore.finproductosprohibidos"
                    :rules="[reglas.campoVacio(fecha)]"
                    readonly
                    hint="Formato DD/MM/YYYY"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fechapp"
                  @input="menuMostrarCalendarioAsociacion = false"
                  locale="es-419"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <v-menu
                v-model="menuMostrarCalendarioPropietario"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field class="custom px-2" filled dense
                    label="Fecha de primera inspección"
                    :disabled="noeditar"
                    v-model="modeloFincaStore.finprimerainspeccion"
                    :rules="[reglas.campoVacio(fecha)]"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fechap"
                  @input="menuMostrarCalendarioPropietario = false"
                  locale="es-419"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-menu
                v-model="menuMostrarCalendarioSitio"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field class="custom px-2" filled dense
                    label="Fecha de ultima inspección"
                    :disabled="noeditar"
                    v-model="modeloFincaStore.finultimainspeccion"
                    :rules="[reglas.campoVacio(fecha)]"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fechau"
                  @input="menuMostrarCalendarioSitio = false"
                  locale="es-419"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Conformidades"
                :disabled="noeditar"
                v-model="modeloFincaStore.finnoconformidades"
                :rules="[reglas.campoVacio(modeloFincaStore.finnoconformidades)]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Certificación EU"
                :disabled="noeditar"
                v-model="modeloFincaStore.fincertificacioneu"
                :rules="[reglas.campoVacio(modeloFincaStore.fincertificacioneu)]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Certificación NOP"
                :disabled="noeditar"
                v-model="modeloFincaStore.fincertificacionnop"
                :rules="[reglas.campoVacio(modeloFincaStore.fincertificacionnop)]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Certificación JAS"
                :disabled="noeditar"
                v-model="modeloFincaStore.fincertificacionjas"
                :rules="[reglas.campoVacio(modeloFincaStore.fincertificacionjas)]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="modeloFincaStore.asociacionfinca.asociacionid"
                :disabled="noeditar"
                placeholder="Seleccione una Asociación"
                class="style-chooser"
                label="asonombre"
                :reduce="(listaAsociacionStore) => listaAsociacionStore.asociacionid"
                :options="listaAsociacionStore"
              >
                <template v-slot:no-options="{ search, searching }">
                  <template v-if="searching">
                    No hay resultados para <em>{{ search }}</em
                    >.
                  </template>
                  <em style="opacity: 0.5" v-else>Empiece a escribir una asociación</em>
                </template>
              </v-select>
            </v-col>
          </v-row>

          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-select
                v-model="modeloFincaStore.fincapropietario.productorid"
                :disabled="noeditar"
                placeholder="Seleccione un Propietario"
                class="style-chooser"
                label="propietario"
                :reduce="(listaPropietarioStore) => listaPropietarioStore.productorid"
                :options="listaPropietarioStore"
              >
                <template v-slot:no-options="{ search, searching }">
                  <template v-if="searching">
                    No hay resultados para <em>{{ search }}</em
                    >.
                  </template>
                  <em style="opacity: 0.5" v-else>Empiece a escribir un propietario</em>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="modeloFincaStore.sitiofinca.sitioid"
                placeholder="Seleccione un Sitio"
                :disabled="noeditar"
                class="style-chooser"
                label="sitionombre"
                :reduce="(listaSitioStore) => listaSitioStore.sitioid"
                :options="listaSitioStore"
              >
                <template v-slot:no-options="{ search, searching }">
                  <template v-if="searching">
                    No hay resultados para <em>{{ search }}</em
                    >.
                  </template>
                  <em style="opacity: 0.5" v-else>Empiece a escribir un sitio</em>
                </template>
              </v-select>
            </v-col>
          </v-row>

          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6"
              ><v-textarea class="custom px-2" filled dense
                label="Observaciones"
                :disabled="noeditar"
                rows="2"
                v-model="modeloFincaStore.finobservacion"
                :rules="[reglas.campoVacio(modeloFincaStore.finobservacion)]"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="6"></v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Sitio -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          :disabled="noeditar"
          width="300px" large elevation="0"
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

import FormFinca from "@/components/FormFinca";
import ServicioFinca from '../services/ServicioFinca';

export default {
  name: "MostrarFinca",

  components: {
    FormFinca,
    vSelect
  },

  data() {
    return {
      sitio: null,
      asociacion: null,
      propietarios: null,
      fechap: null,
      fechau: null,
      fechapp: null,
      noeditar: true,
      tab: "formFinca",

      menuMostrarCalendarioAsociacion: "", // Variable de referencia para el menú de fecha toma muestra
      menuMostrarCalendarioPropietario: "", // Variable de referencia para el menú de fecha toma muestra
      menuMostrarCalendarioSitio: "", // Variable de referencia para el menú de fecha toma muestra
      fecha: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  watch: {
    fechapp (val) {
      this.modeloFincaStore.finproductosprohibidos = this.formatDate(this.fechapp);
    },

    fechap (val) {
      this.modeloFincaStore.finprimerainspeccion = this.formatDate(this.fechap);
    },

    fechau (val) {
      this.modeloFincaStore.finultimainspeccion = this.formatDate(this.fechau);
    },
  },

  computed: {

    listaSitioStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloFinca/listaSitioStore"]));
      },
      set(v) {
        return this.$store.commit("moduloFinca/establecerListaSitioStore", v);
      },
    },

    listaAsociacionStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloFinca/listaAsociacionStore"]));
      },
      set(v) {
        return this.$store.commit("moduloFinca/establecerListaAsociacionStore", v);
      },
    },

    listaPropietarioStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloFinca/listaPropietarioStore"]));
      },
      set(v) {
        return this.$store.commit("moduloFinca/establecerListaPropietarioStore", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarFinca
    dialogMostrarFinca: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarFinca"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarFinca", v);
      },
    },

    modeloFincaStore: {
      get() {
        return this.$store.getters["moduloFinca/finca"];
      },
      set(v) {
        return this.$store.commit("moduloFinca/nuevoFinca", v);
      },
    },

    listaFincaStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloFinca/listaFincaStore"]));
      },
      set(v) {
        return this.$store.commit("moduloFinca/establecerListaFincaStore", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {

    // UPDATE: Actualiza un registro
    async actualizarRegistro () { 
      try {
          const respuesta = await ServicioFinca.actualizarFinca(this.modeloFincaStore.fincaid, this.modeloFincaStore);
          this.$toast.success(respuesta.data.message);
          this.cargarListaFinca();
          this.cerrarDialogMostrarFinca();
        } catch (error) {
          this.$toast.error(error.response.data.message);
      } 
    },

    // #  MANIPULACIÓN DE DATOS  #
    async cargarListaFinca () { 
      let listaFinca = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioFinca.obtenerTodosFincas();  // Obtener respuesta de backend
      let datosFinca = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosFinca.forEach((finca) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaFinca.push(finca);
      });
      this.listaFincaStore = listaFinca;
    },

    async eliminarRegistro() {
      try {
          const respuesta = await ServicioFinca.eliminarFinca(this.modeloFincaStore.fincaid);
          this.$toast.success(respuesta.data.message);
          this.cargarListaFinca();
          this.cerrarDialogMostrarFinca();
       } catch (error) {
          this.$toast.error(error.response.data.message);
      } 
    },

    // Vacia el modelo Finca
    ...mapMutations("moduloFinca", ["vaciarFinca"]),

    cerrarDialogMostrarFinca() {
      this.dialogMostrarFinca = !this.dialogMostrarFinca; // Cierra el dialogMostrarFinca
      this.vaciarFinca(); // Vacia el modelo Finca
      this.cargarListaFinca();
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
