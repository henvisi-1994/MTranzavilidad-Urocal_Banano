<template>
  <v-dialog
    v-model="dialogEditarEgresoInsumo"
    scrollable
    max-width="700px"
    transition="dialog-transition"
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
  >
    <v-card tile>
      <v-card-title class="primary--text">
        <h5 class="pl-3">Información del egreso</h5>
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
            :disabled="noeditar"
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
            v-model="modeloEgresoInsumoStore.egrinsparacontrolar"
            label="Control de egreso"
            :rules="[reglas.soloLetras(modeloEgresoInsumoStore.egrinsparacontrolar), reglas.campoVacio(modeloEgresoInsumoStore.egrinsparacontrolar),]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="noeditar"
            v-model="modeloEgresoInsumoStore.egrinsdosis"
            label="Dosis"
            :rules="[reglas.campoVacio(modeloEgresoInsumoStore.egrinsdosis)]"
          ></v-text-field>
        </v-col>
      </v-row>
 
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="noeditar"
            v-model="modeloEgresoInsumoStore.egrinscantidadentregada"
            label="Cantidad entregada"
            type="number"
            :rules="[reglas.campoVacio(modeloEgresoInsumoStore.egrinscantidadentregada)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="noeditar"
            v-model="modeloEgresoInsumoStore.egrencargado"
            label="Encargado"
            :rules="[reglas.campoVacio(modeloEgresoInsumoStore.egrencargado)]"
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
import ServicioEgresoInsumo from "../services/ServicioEgresoInsumo"; // Interactuar con el Backend

export default {
  name: "DialogEditarEgresoInsumo",
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
      this.modeloEgresoInsumoStore.perfechanacimiento = this.formatDate(
        this.fecha
      );
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
    dialogEditarEgresoInsumo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogEditarEgresoInsumo"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogEditarEgresoInsumo",
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
    async cargarListaEgresoInsumo() {
      let listaEgresoInsumo = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioEgresoInsumo.obtenerTodosEgresoInsumo(); // Obtener respuesta de backend
      let datosUsuario = await respuesta.data; // Rescatar datos de la respuesta
      datosUsuario.forEach((modeloEgresoInsumoStore) => {
        // Guardar cada registro en la 'lista de datos'
        listaEgresoInsumo.push(modeloEgresoInsumoStore);
      });

      this.listaEgresoInsumoStore = listaEgresoInsumo;
    },

    // UPDATE: Actualiza un registro
    async actualizarRegistro() {
      try {
        const respuesta = await ServicioEgresoInsumo.actualizarEgresoInsumo(
          this.modeloEgresoInsumoStore.egresoinsumosid,
          this.modeloEgresoInsumoStore
        );
        if (respuesta.status == 200) {
          this.preeditar=null        
          this.cerrarDialogo();
          this.$toast.success(respuesta.data.message);
          this.cargarListaEgresoInsumo();
          this.vaciarModeloEgresoInsumo();
        }
      } catch (error) {
          this.$toast.error("Llene todos los campos del formulario!");    
         
      }
    },

    // DELETE: Elimina un registro
    async eliminarRegistro() {
      try {
        console.log(this.modeloEgresoInsumoStore);
        const respuesta = await ServicioEgresoInsumo.eliminarEgresoInsumo(
          this.modeloEgresoInsumoStore.egresoinsumosid
        );
        if (respuesta.status == 200) {
          this.cerrarDialogo();
          this.$toast.warning(respuesta.data.message);
          this.cargarListaEgresoInsumo();
        }
      } catch (error) {
          this.$toast.error("Llene todos los campos del formulario!");    
         
      }
    },

    // ########################
    // #  METODOS AUXILIARES  #
    // ########################

    // DIALOGO: cierra este dialogo
    cerrarDialogo() {
      if (this.preeditar!=null) {
        this.modeloEgresoInsumoStore.egresoinsumosid=this.preeditar.egresoinsumosid
        this.modeloEgresoInsumoStore.egrinsfechaegreso=this.preeditar.egrinsfechaegreso
        this.modeloEgresoInsumoStore.egrinsparacontrolar=this.preeditar.egrinsparacontrolar
        this.modeloEgresoInsumoStore.egrinsdosis=this.preeditar.egrinsdosis
        this.modeloEgresoInsumoStore.egrinscantidadentregada=this.preeditar.egrinscantidadentregada
        this.modeloEgresoInsumoStore.egrencargado=this.preeditar.egrencargado
        this.modeloEgresoInsumoStore.ingresoinsumosido=this.preeditar.ingresoinsumosid
        this.preeditar=null        
      }
      this.dialogEditarEgresoInsumo = !this.dialogEditarEgresoInsumo;
      this.noeditar = true;
    },
    // VARIABLE DE ESTADO: Habilita o deshabilita los campos de edición
    cambiarEstadoEditar() {
//      this.modeloEgresoInsumoStore.egrinsfechaegreso="2020-20-11"
        if (this.preeditar==null) {
          this.preeditar={}
          this.preeditar.egresoinsumosid=this.modeloEgresoInsumoStore.egresoinsumosid
          this.preeditar.egrinsfechaegreso=this.modeloEgresoInsumoStore.egrinsfechaegreso
          this.preeditar.egrinsparacontrolar=this.modeloEgresoInsumoStore.egrinsparacontrolar
          this.preeditar.egrinsdosis=this.modeloEgresoInsumoStore.egrinsdosis
          this.preeditar.egrinscantidadentregada=this.modeloEgresoInsumoStore.egrinscantidadentregada
          this.preeditar.egrencargado=this.modeloEgresoInsumoStore.egrencargado
          this.preeditar.ingresoinsumosid=this.modeloEgresoInsumoStore.ingresoinsumosid
          this.preeditar.fincaid=this.modeloEgresoInsumoStore.fincaid;
        }
          this.noeditar = !this.noeditar;
    },

    // FORMATO: Establece el formato de la fecha a dd/mm/aaaa
    formatDate(fecha) {
      if (!fecha) return null;
      const [year, month, day] = fecha.split("-");
      return `${day}/${month}/${year}`;
    },

    ...mapMutations("moduloEgresoInsumo", ["vaciarModeloEgresoInsumo"]),  // Vacia el modelo modeloEgresoInsumoStore
  },
};
</script>