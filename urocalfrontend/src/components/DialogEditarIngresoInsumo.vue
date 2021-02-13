<template>
  <v-dialog
    v-model="dialogEditarIngresoInsumo"
    scrollable
    max-width="700px"
    transition="dialog-transition"
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
  >
    <v-card tile>
      <v-card-title class="primary--text">
        <h5 class="pl-3">Información del ingreso</h5>
        <v-spacer></v-spacer>
        <v-btn icon
          ><v-icon
            class="primary--text"
            @click="cambiarEstadoEditar()"
            >mdi-pencil</v-icon
          ></v-btn
        >
        <v-btn icon><v-icon @click="eliminarRegistro()" class="primary--text">mdi-trash-can</v-icon></v-btn>
        <v-btn icon
          ><v-icon @click="cerrarDialogo()" class="primary--text"
            >mdi-close</v-icon
          ></v-btn
        >
      </v-card-title>

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
            v-model="modeloIngresoInsumoStore.egrinsencargado"
            label="Encargado"
            :rules="[reglas.campoVacio(modeloIngresoInsumoStore.egrinsencargado)]"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          :disabled="noeditar"
          color="primary"
          large
          :block="$vuetify.breakpoint.xs ? true : false"
          @click="actualizarRegistro()"
          width="200px"
        >
          Guardar cambios
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
  name: "DialogEditarIngresoInsumo",
  components: {
    vSelect,
  },

  data() {
    return {
      preeditar:null,
      noeditar: true,
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
    dialogEditarIngresoInsumo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogEditarIngresoInsumo"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogEditarIngresoInsumo",
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

    // ###################
    // #  TIENDA DE VUE  #
    // ###################

    ...mapState("validacionForm", ["reglas"]), // Reglas de validacion
  },
  methods: {
    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    // CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

    // SELECT: Obtiene todos los registros
    async cargarListaIngresoInsumo() {
      let listaIngresoInsumo = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioIngresoInsumo.obtenerTodosIngresoInsumo(); // Obtener respuesta de backend
      let datosUsuario = await respuesta.data; // Rescatar datos de la respuesta
      datosUsuario.forEach((modeloIngresoInsumoStore) => {
        // Guardar cada registro en la 'lista de datos'
        listaIngresoInsumo.push(modeloIngresoInsumoStore);
      });

      this.listaIngresoInsumoStore = listaIngresoInsumo;
    },

    // UPDATE: Actualiza un registro
    async actualizarRegistro() {
      const respuesta = await ServicioIngresoInsumo.actualizarIngresoInsumo(
        this.modeloIngresoInsumoStore.ingresoinsumosid,
        this.modeloIngresoInsumoStore
      );
      if (respuesta.status == 200) {
        this.cerrarDialogo();
        this.cargarListaIngresoInsumo();
        this.vaciarModeloIngresoInsumo();
      }
    },

    // DELETE: Elimina un registro
    async eliminarRegistro() {
      console.log(this.modeloIngresoInsumoStore);
      const respuesta = await ServicioIngresoInsumo.eliminarIngresoInsumo(
        this.modeloIngresoInsumoStore.ingresoinsumosid
      );
      if (respuesta.status == 200) {
        this.cerrarDialogo();
        this.cargarListaIngresoInsumo();
      }
    },

    // ########################
    // #  METODOS AUXILIARES  #
    // ########################

    // DIALOGO: cierra este dialogo
    cerrarDialogo() {
      if (this.preeditar!=null) {
        this.modeloIngresoInsumoStore.ingresoinsumosid=this.preeditar.ingresoinsumosid
        this.modeloIngresoInsumoStore.egrinsfechaingreso=this.preeditar.egrinsfechaingreso
        this.modeloIngresoInsumoStore.egrinsparacontrolar=this.preeditar.egrinsparacontrolar
        this.modeloIngresoInsumoStore.egrinsdosis=this.preeditar.egrinsdosis
        this.modeloIngresoInsumoStore.egrinscantidadentregada=this.preeditar.egrinscantidadentregada
        this.modeloIngresoInsumoStore.egrinsencargado=this.preeditar.egrinsencargado
        this.modeloIngresoInsumoStore.ingresoinsumosido=this.preeditar.ingresoinsumosid
        this.preeditar=null        
      }
      this.dialogEditarIngresoInsumo = !this.dialogEditarIngresoInsumo;
      this.noeditar = true;
    },
    // VARIABLE DE ESTADO: Habilita o deshabilita los campos de edición
    cambiarEstadoEditar() {
//      this.modeloIngresoInsumoStore.egrinsfechaingreso="2020-20-11"
        if (this.preeditar==null) {
          this.preeditar={}
          this.preeditar.ingresoinsumosid=this.modeloIngresoInsumoStore.ingresoinsumosid
          this.preeditar.egrinsfechaingreso=this.modeloIngresoInsumoStore.egrinsfechaingreso
          this.preeditar.egrinsparacontrolar=this.modeloIngresoInsumoStore.egrinsparacontrolar
          this.preeditar.egrinsdosis=this.modeloIngresoInsumoStore.egrinsdosis
          this.preeditar.egrinscantidadentregada=this.modeloIngresoInsumoStore.egrinscantidadentregada
          this.preeditar.egrinsencargado=this.modeloIngresoInsumoStore.egrinsencargado
          this.preeditar.ingresoinsumosid=this.modeloIngresoInsumoStore.ingresoinsumosid
          this.preeditar.fincaid=this.modeloIngresoInsumoStore.fincaid;
        }
          this.noeditar = !this.noeditar;
    },

    // FORMATO: Establece el formato de la fecha a dd/mm/aaaa
    formatDate(fecha) {
      if (!fecha) return null;
      const [year, month, day] = fecha.split("-");
      return `${day}/${month}/${year}`;
    },

    //...mapMutations("moduloIngresoInsumo", ["vaciarModeloIngresoInsumo"]),  // Vacia el modelo modeloIngresoInsumoStore
  },
};
</script>