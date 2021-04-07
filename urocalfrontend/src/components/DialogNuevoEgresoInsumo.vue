<template>
  <v-dialog
    v-model="dialogNuevoEgresoInsumo"
    scrollable
    max-width="800px"
    transition="dialog-transition"
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
  >
    <v-card tile>
      <v-card-title class="justify-center primary--text">
        <h5 class="pl-3">Registrar nuevo Egreso de insumo</h5>
        <v-spacer></v-spacer>
        <v-btn icon
          ><v-icon class="primary--text" @click="cerrarDialogo()"
            >mdi-close</v-icon
          ></v-btn
        >
      </v-card-title>

    <v-card-text>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <!-- Buscador para Ingreso Insumo(ingresoinsumoid) -->
          <v-select
            v-model="modeloEgresoInsumoStore.ingresoinsumosid"
            placeholder="Insumo"
            class="style-chooser"
            label="inginsproducto"
            :reduce="(listaInsumoStore) => listaInsumoStore.ingresoinsumosid"
            :options="listaInsumoStore"
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
            v-model="modeloEgresoInsumoStore.fincaid"
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
                label="Fecha de egreso"
                v-model="modeloEgresoInsumoStore.egrinsfechaegreso"
                :rules="[reglas.campoVacio(modeloEgresoInsumoStore.egrinsfechaegreso)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="modeloEgresoInsumoStore.egrinsfechaegreso"
              @input="menuMostrarCalendario = false"
              :show-current="fechaActual"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Control de egreso"
            v-model="modeloEgresoInsumoStore.egrinsparacontrolar"
            :rules="[reglas.campoVacio(modeloEgresoInsumoStore.egrinsparacontrolar), reglas.soloLetras(modeloEgresoInsumoStore.egrinsparacontrolar)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Dosis"
            v-model="modeloEgresoInsumoStore.egrinsdosis"
            :rules="[reglas.campoVacio(modeloEgresoInsumoStore.egrinsdosis), reglas.soloLetras(modeloEgresoInsumoStore.egrinsdosis)]"
          ></v-text-field>
        </v-col>
      </v-row>
 
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Cantidad entregada"
            type="number"
            v-model="modeloEgresoInsumoStore.egrinscantidadentregada"
            :rules="[reglas.campoVacio(modeloEgresoInsumoStore.egrinscantidadentregada), reglas.soloNumerosPositivos(modeloEgresoInsumoStore.egrinscantidadentregada)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Encargado"
            v-model="modeloEgresoInsumoStore.egrencargado"
            :rules="[reglas.campoVacio(modeloEgresoInsumoStore.egrencargado), reglas.soloLetras(modeloEgresoInsumoStore.egrencargado)]"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          color="primary"
          large
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" elevation="0"
          @click="guardarEgresoInsumo()"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import { mapMutations, mapState } from "vuex"; // Trabajar con la tienda de Vue (Store)
import ServicioEgresoInsumo from "../services/ServicioEgresoInsumo"; // Interactuar con el Backend

export default {
  name: "DialogNuevoEgresoInsumo",
  components: {
    vSelect,
  },

  data() {
    return {
      menuMostrarCalendario: "",
      fecha: new Date().toISOString().substr(0, 10),
      menuMostrarCalendario: "", // Variable de referencia para el menú de fecha toma muestra
      fechaActual: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  watch: {
    fecha(val) {
      this.modeloEgresoInsumoStore.perfechanacimiento = this.formatDate(
        this.fecha
      );
    },

    ciudad(val) {
      //id
      this.modeloEgresoInsumoStore.ciudadnacimiento.ciudadid = this.ciudad;
    },
  },

  computed: {
    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    listaInsumoStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloEgresoInsumo/listaInsumoStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloEgresoInsumo/establecerListaInsumoStore",
          v
        );
      },
    },
    listaFincaStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloEgresoInsumo/listaFincaStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloEgresoInsumo/establecerListaFincaStore",
          v
        );
      },
    },

    listaEgresoInsumoStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloEgresoInsumo/listaEgresoInsumoStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloEgresoInsumo/establecerListaEgresoInsumoStore",
          v
        );
      },
    },

    // ##############
    // #  DIALOGOS  #
    // ##############
    dialogNuevoEgresoInsumo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoEgresoInsumo"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogNuevoEgresoInsumo",
          v
        );
      },
    },

    // #############
    // #  MODELOS  #
    // #############
    modeloEgresoInsumoStore: {
      get() {
        return this.$store.getters[
          "moduloEgresoInsumo/modeloEgresoInsumoStore"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloEgresoInsumo/establecerModeloEgresoInsumoStore",
          v
        );
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
    async guardarEgresoInsumo() {
      console.log("dataper:", this.modeloEgresoInsumoStore);
      try {
        let respuesta = await ServicioEgresoInsumo.agregarEgresoInsumo(
        this.modeloEgresoInsumoStore
      );        
        if (respuesta.status == 201) {        
          this.cerrarDialogo();
          this.$toast.success(respuesta.data.message);
          this.cargarListaEgresoInsumo();
          this.vaciarModeloEgresoInsumo();
        }             
      } catch (error) {
          this.$toast.error("Llene todos los campos del formulario!");    
         
      }
      
    },

    // SELECT: Carga todos los usuarios registrados
    async cargarListaEgresoInsumo() {
      let listaEgresoInsumo = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioEgresoInsumo.obtenerTodosEgresoInsumo(); // Obtener respuesta de backend
      let datosEgreso = await respuesta.data; // Rescatar datos de la respuesta
      datosEgreso.forEach((modeloEgresoInsumoStore) => {
        // Guardar cada registro en la 'lista de datos'
        listaEgresoInsumo.push(modeloEgresoInsumoStore);
      });

      this.listaEgresoInsumoStore = listaEgresoInsumo;
    },

    // ##############
    // #  DIALOGOS  #
    // ##############

    // CERRAR: Cierra este dialogo
    cerrarDialogo() {
      this.dialogNuevoEgresoInsumo = !this.dialogNuevoEgresoInsumo;
    },

    // ########################
    // #  METODOS AUXILIARES  #
    // ########################

    // FORMATO: Modifica el formato de la fecha a dd/mm/aaaa
    formatDate(fecha) {
      if (!fecha) return null;

      const [year, month, day] = fecha.split("-");
      return `${day}/${month}/${year}`;
    },
    ...mapMutations("moduloEgresoInsumo", ["vaciarModeloEgresoInsumo"]),  // Vacia el modelo modeloEgresoInsumoStore
  },
};
</script>