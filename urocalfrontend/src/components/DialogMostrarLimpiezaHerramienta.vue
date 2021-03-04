<template>
  <v-dialog
    v-model="dialogMostrarLimpiezaHerramienta"
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
          <v-icon class="primary--text" @click="cerrarDialogMostrarLimpiezaHerramienta()"
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
                v-model="modeloLimpiezaHerramientaStore.cultivoproducto.cultivoid"
                placeholder="Seleccione un cultivo"
                class="style-chooser"
                label="pronombre"
                :disabled="noeditar"
                :reduce="(listaCultivoStore) => listaCultivoStore.cultivoid"
                :options="listaCultivoStore"
              >
                <template v-slot:no-options="{ search, searching }">
                  <template v-if="searching">
                    No hay resultados para <em>{{ search }}</em
                    >.
                  </template>
                  <em style="opacity: 0.5" v-else>Empiece a escribir un cultivo</em>
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
                    label="Fecha de limpieza"
                    :disabled="noeditar"
                    v-model="modeloLimpiezaHerramientaStore.limfecha"
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
                label="Producto utilizado"
                :disabled="noeditar"
                v-model="modeloLimpiezaHerramientaStore.limproducto"
                :rules="[reglas.campoVacio(modeloLimpiezaHerramientaStore.limproducto)]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Equipos"
                :disabled="noeditar"
                v-model="modeloLimpiezaHerramientaStore.limequipos"
                :rules="[reglas.campoVacio(modeloLimpiezaHerramientaStore.limequipos)]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Maquinaria"
                :disabled="noeditar"
                v-model="modeloLimpiezaHerramientaStore.limmaquinaria"
                :rules="[reglas.campoVacio(modeloLimpiezaHerramientaStore.limmaquinaria)]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Herramientas"
                :disabled="noeditar"
                v-model="modeloLimpiezaHerramientaStore.limherramientas"
                :rules="[reglas.campoVacio(modeloLimpiezaHerramientaStore.limherramientas)]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Cajones"
                :disabled="noeditar"
                v-model="modeloLimpiezaHerramientaStore.limcajones"
                :rules="[reglas.campoVacio(modeloLimpiezaHerramientaStore.limcajones)]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Tendales"
                :disabled="noeditar"
                v-model="modeloLimpiezaHerramientaStore.limtendales"
                :rules="[reglas.campoVacio(modeloLimpiezaHerramientaStore.limtendales)]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6"
              ><v-text-field class="custom px-2" filled dense
                label="Operario"
                :disabled="noeditar"
                v-model="modeloLimpiezaHerramientaStore.limoperario"
                :rules="[reglas.campoVacio(modeloLimpiezaHerramientaStore.limoperario)]"
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

import FormLimpiezaHerramienta from "@/components/FormLimpiezaHerramienta";
import ServicioLimpiezaHerramienta from '../services/ServicioLimpiezaHerramienta';

export default {
  name: "MostrarLimpiezaHerramienta",

  components: {
    FormLimpiezaHerramienta,
    vSelect
  },

  watch: {
    fecha (val) {   // Cada vez que haya un cambio en fecha se actualiza perfechanacimiento aaaa-mm-dd -> dd/mm/aaaa
      this.modeloLimpiezaHerramientaStore.limfecha = this.formatDate(this.fecha)
    },
  },

  data() {
    return {
      noeditar: true,
      tab: "formLimpiezaHerramienta",
      menuMostrarCalendario: "", // Variable de referencia para el menú de fecha toma muestra
      fecha: new Date().toISOString().substr(0, 10), // Almacena la fecha actual

    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogMostrarLimpiezaHerramienta
    dialogMostrarLimpiezaHerramienta: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarLimpiezaHerramienta"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarLimpiezaHerramienta", v);
      },
    },

    listaLimpiezaHerramientaStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloLimpiezaHerramienta/listaLimpiezaHerramientaStore"]));
      },
      set(v) {
        return this.$store.commit("moduloLimpiezaHerramienta/establecerListaLimpiezaHerramientaStore", v);
      },
    },

    listaCultivoStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloLimpiezaHerramienta/listaCultivoStore"]));
      },
      set(v) {
        return this.$store.commit("moduloLimpiezaHerramienta/establecerListaCultivoStore", v);
      },
    },

    modeloLimpiezaHerramientaStore: {
      get() {
        return this.$store.getters["moduloLimpiezaHerramienta/limpiezaHerramienta"];
      },
      set(v) {
        return this.$store.commit("moduloLimpiezaHerramienta/nuevoLimpiezaHerramienta", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {

    // UPDATE: Actualiza un registro
    async actualizarRegistro () { 
      //console.log(this.modeloFincaStore)
      try {
          let respuesta = await ServicioLimpiezaHerramienta.actualizarLimpiezaHerramienta(this.modeloLimpiezaHerramientaStore.limpiezaherramientaid, this.modeloLimpiezaHerramientaStore);
          this.$toast.success(respuesta.data.message);
          this.cargarListaLimpiezaHerramienta();
          this.cerrarDialogMostrarLimpiezaHerramienta();
        } catch (error) {
          this.$toast.error(error.response.data.message);
      } 
    },

    // #  MANIPULACIÓN DE DATOS  #
    async cargarListaLimpiezaHerramienta () { 
      let listaLimpiezaHerramienta = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioLimpiezaHerramienta.obtenerTodosLimpiezaHerramienta();  // Obtener respuesta de backend
      let datosLimpiezaHerramienta = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosLimpiezaHerramienta.forEach((LimpiezaHerramienta) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaLimpiezaHerramienta.push(LimpiezaHerramienta);
      });
      this.listaLimpiezaHerramientaStore = listaLimpiezaHerramienta;
      //console.log(this.listaLimpiezaHerramientaStore)
    },

    async eliminarRegistro() {
      try {
          let respuesta = await ServicioLimpiezaHerramienta.eliminarLimpiezaHerramienta(this.modeloLimpiezaHerramientaStore.limpiezaherramientaid);
          this.$toast.success(respuesta.data.message);
          this.cargarListaLimpiezaHerramienta();
          this.cerrarDialogMostrarLimpiezaHerramienta();
        } catch (error) {
          this.$toast.error(error.response.data.message);
      } 
    },

    // Vacia el modelo LimpiezaHerramienta
    ...mapMutations("moduloLimpiezaHerramienta", ["vaciarLimpiezaHerramienta"]),

    cerrarDialogMostrarLimpiezaHerramienta() {
      this.dialogMostrarLimpiezaHerramienta = !this.dialogMostrarLimpiezaHerramienta; // Cierra el dialogMostrarLimpiezaHerramienta
      this.vaciarLimpiezaHerramienta(); // Vacia el modelo LimpiezaHerramienta
      this.cargarListaLimpiezaHerramienta();
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
