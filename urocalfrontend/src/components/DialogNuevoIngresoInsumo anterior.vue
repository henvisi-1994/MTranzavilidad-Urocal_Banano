<template>
  <v-dialog
    v-model="dialogNuevoIngresoInsumo"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="primary white--text">
        <h5>
          Registrar nuevo ingreso de insumo
        </h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogIngresoInsumo()"
            >mdi-close</v-icon
          >
        </v-btn> 
      </v-card-title>

      
      <!--v-card-text style="padding: 0px">
        <v-container>
          //<! Formulario para registrar IngresoInsumo -->
          <!--FormIngresoInsumo ref="componentFormIngresoInsumo"></FormIngresoInsumo>
        </v-container>
      </v-card-text-->

      <v-card-text>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <!-- Buscador para Ingreso Insumo(ingresoinsumoid) -->
          <v-select
            :disabled="noeditar"
            v-model="modeloIngresoInsumoStore.ingresoinsumosid"
            placeholder="Centro de Acopio"
            class="style-chooser"
            label="centroacopionombre"
            :reduce="(listaCentroAcopios) => listaCentroAcopios.ingresoinsumosid"
            :options="listaCentroAcopios"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir un insumo</em>
            </template>
          </v-select>
          <!-- Buscador para Finca(fincaid) -->
          <v-select
            :disabled="noeditar"
            v-model="modeloIngresoInsumoStore.fincaid"
            placeholder="Finca"
            class="style-chooser"
            label="finnombrefinca"
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
                label="Fecha de ingreso"
                v-model="modeloIngresoInsumoStore.egrinsfechaingreso"
                :rules="[reglas.campoVacio(modeloIngresoInsumoStore.egrinsfechaingreso)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="modeloIngresoInsumoStore.egrinsfechaingreso"
              @input="menuMostrarCalendario = true"
              :show-current="fechaActual"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="noeditar"
            v-model="modeloIngresoInsumoStore.egrinsparacontrolar"
            label="Control de ingreso"
            :rules="[reglas.campoVacio(modeloIngresoInsumoStore.egrinsparacontrolar)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="noeditar"
            v-model="modeloIngresoInsumoStore.egrinsdosis"
            label="Dosis"
            :rules="[reglas.campoVacio(modeloIngresoInsumoStore.egrinsdosis)]"
          ></v-text-field>
        </v-col>
      </v-row>
 
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="noeditar"
            v-model="modeloIngresoInsumoStore.egrinscantidadentregada"
            label="Cantidad entregada"
            type="number"
            :rules="[reglas.campoVacio(modeloIngresoInsumoStore.egrinscantidadentregada)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="noeditar"
            v-model="modeloIngresoInsumoStore.egrencargado"
            label="Encargado"
            :rules="[reglas.campoVacio(modeloIngresoInsumoStore.egrencargado)]"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo IngresoInsumo -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          color="primary"
          @click="registrar()"
          >Registrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import { mapMutations, mapState } from "vuex"; // Trabajar con la tienda de Vue (Store)
import ServicioIngresoInsumo from "../services/ServicioIngresoInsumo"; // Interactuar con el Backend

import FormIngresoInsumo from "@/components/FormIngresoInsumo";

export default {
  name: "DialogNuevoIngresoInsumo",

  components: {
    //FormIngresoInsumo
    vSelect,
  },

  data() {
    return {
      menuMostrarCalendario: "", // Variable de referencia para el menú de fecha toma muestra
      fechaActual: new Date().toISOString().substr(0, 10) // Almacena la fecha actual
    };
  },

  watch: {
    fecha(val) {
      // Cada vez que haya un cambio en fecha se actualiza perfechanacimiento aaaa-mm-dd -> dd/mm/aaaa
      this.modeloIngresoInsumoStore.perfechanacimiento = this.formatDate(
        this.fecha
      );
    },
  },

  computed: {

    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    listaCentroAcopios: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloIngresoInsumo/listaCentroAcopios"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloIngresoInsumo/establecerListaCentroAcopios",
          v
        );
      },
    },
    listaFincaStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloIngresoInsumo/listaFincaStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloIngresoInsumo/establecerListaFincaStore",
          v
        );
      },
    },
    listaIngresoInsumoStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloIngresoInsumo/listaIngresoInsumoStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloIngresoInsumo/establecerListaIngresoInsumoStore",
          v
        );
      },
    },

    // ##############
    // #  DIALOGOS  #
    // ##############

    // Obtiene y modifica el estado de la variable dialogNuevoIngresoInsumo
    dialogNuevoIngresoInsumo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoIngresoInsumo"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoIngresoInsumo", v);
      },
    },

    // #############
    // #  MODELOS  #
    // #############
    modeloIngresoInsumoStore: {
      get() {
        return this.$store.getters[
          "moduloIngresoInsumo/modeloIngresoInsumoStore"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloIngresoInsumo/establecerModeloIngresoInsumoStore",
          v
        );
      },
    },

    // ###################
    // #  TIENDA DE VUE  #
    // ###################

    // Obtiene es estado de la variable formIngresoInsumoValido y el modelo IngresoInsumo
    //...mapState("moduloIngresoInsumo", ["formIngresoInsumoValido", "IngresoInsumo"]),
    ...mapState("validacionForm", ["reglas"]), // Reglas de validacion
  },

  methods: {

    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    // CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

    // INSERT: Agrega un usuario
 
    // Registra dependiendo el tab donde se encuentre
    async registrar() {
      //console.log(this.IngresoInsumo);
      console.log("dataper:", this.modeloIngresoInsumoStore);
      try {
        let respuesta = await ServicioIngresoInsumo.agregarIngresoInsumo(
        this.modeloIngresoInsumoStore
      );        
        if (respuesta.status == 201) {        
          this.cerrarDialogIngresoInsumo();
          this.$toast.success(respuesta.data.message);
          this.cargarListaIngresoInsumo();
          this.vaciarIngresoInsumo();
        }             
      } catch (error) {
          this.$toast.error("Llene todos los campos del formulario!");    
         
      }
    },

    cerrarDialogIngresoInsumo() {
      this.dialogNuevoIngresoInsumo = !this.dialogNuevoIngresoInsumo; // Cierra el dialogNuevoIngresoInsumo
      this.$refs.componentFormIngresoInsumo.$refs.formIngresoInsumo.resetValidation(); // Reinicia las validaciones del formIngresoInsumo
      this.vaciarIngresoInsumo(); // Vacia el modelo IngresoInsumo
    },

    // FORMATO: Establece el formato de la fecha a dd/mm/aaaa
    formatDate(fecha) {
      if (!fecha) return null;
      const [year, month, day] = fecha.split("-");
      return `${day}/${month}/${year}`;
    },

    // Vacia el modelo IngresoInsumo
    ...mapMutations("moduloIngresoInsumo", ["vaciarIngresoInsumo"]),
  },
};
</script>
