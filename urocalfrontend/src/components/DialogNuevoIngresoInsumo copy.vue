<template>
  <v-dialog
    v-model="dialogNuevoIngresoInsumo"
    scrollable
    max-width="800px"
    transition="dialog-transition"
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
  >
    <v-card tile>
      <v-card-title class="justify-center primary--text">
        <h5 class="pl-3">Nuevo ingreso</h5>
        <v-spacer></v-spacer>
        <v-btn icon
          ><v-icon class="primary--text" @click="cerrarDialogo()"
            >mdi-close</v-icon
          ></v-btn
        >
      </v-card-title>

    <v-card-text>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <!-- Buscador para Ingreso Insumo(ingresoinsumoid) -->
          <v-select
            v-model="modeloIngresoInsumoStore.ingresoinsumosid"
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
              @input="menuMostrarCalendario = false"
              :show-current="fechaActual"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            label="Control de ingreso"
            v-model="modeloIngresoInsumoStore.egrinsparacontrolar"
            :rules="[reglas.campoVacio(modeloIngresoInsumoStore.egrinsparacontrolar)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Dosis"
            v-model="modeloIngresoInsumoStore.egrinsdosis"
            :rules="[reglas.campoVacio(modeloIngresoInsumoStore.egrinsdosis)]"
          ></v-text-field>
        </v-col>
      </v-row>
 
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            label="Cantidad entregada"
            type="number"
            v-model="modeloIngresoInsumoStore.egrinscantidadentregada"
            :rules="[reglas.campoVacio(modeloIngresoInsumoStore.egrinscantidadentregada)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Encargado"
            v-model="modeloIngresoInsumoStore.egrinsencargado"
            :rules="[reglas.campoVacio(modeloIngresoInsumoStore.egrinsencargado)]"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          color="primary"
          large
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          @click="guardarIngresoInsumo()"
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
import ServicioIngresoInsumo from "../services/ServicioIngresoInsumo"; // Interactuar con el Backend

export default {
  name: "DialogNuevoIngresoInsumo",
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
      this.modeloIngresoInsumoStore.perfechanacimiento = this.formatDate(
        this.fecha
      );
    },

    ciudad(val) {
      //id
      this.modeloIngresoInsumoStore.ciudadnacimiento.ciudadid = this.ciudad;
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
            this.$store.getters["moduloIngresoInsumo/listaInsumoStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloIngresoInsumo/establecerListaInsumoStore",
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
    dialogNuevoIngresoInsumo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoIngresoInsumo"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogNuevoIngresoInsumo",
          v
        );
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

    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {
    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    // CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

    // INSERT: Agrega un usuario
    async guardarIngresoInsumo() {
      console.log("dataper:", this.modeloIngresoInsumoStore);
      let respuesta = await ServicioIngresoInsumo.agregarIngresoInsumo(
        this.modeloIngresoInsumoStore
      );
      if (respuesta.status == 201) {
        this.cerrarDialogo();
        this.cargarListaIngresoInsumo();
        this.vaciarModeloIngresoInsumo();
      }
    },

    // SELECT: Carga todos los usuarios registrados
    async cargarListaIngresoInsumo() {
      let listaIngresoInsumo = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioIngresoInsumo.obtenerTodosIngresoInsumo(); // Obtener respuesta de backend
      let datosIngreso = await respuesta.data; // Rescatar datos de la respuesta
      datosIngreso.forEach((modeloIngresoInsumoStore) => {
        // Guardar cada registro en la 'lista de datos'
        listaIngresoInsumo.push(modeloIngresoInsumoStore);
      });

      this.listaIngresoInsumoStore = listaIngresoInsumo;
    },

    // ##############
    // #  DIALOGOS  #
    // ##############

    // CERRAR: Cierra este dialogo
    cerrarDialogo() {
      this.dialogNuevoIngresoInsumo = !this.dialogNuevoIngresoInsumo;
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
    ...mapMutations("moduloIngresoInsumo", ["vaciarModeloIngresoInsumo"]),  // Vacia el modelo modeloIngresoInsumoStore
  },
};
</script>