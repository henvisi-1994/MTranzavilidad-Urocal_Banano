<template>
  <v-form ref="formRegistroEnvio" v-model="formRegistroEnvioValido">
    <v-container>
      <v-row
        no-gutters
        justify-md="space-around"
        :class="$vuetify.breakpoint.xs ? '' : 'mb-5'"
      >
      </v-row>

      <v-card-text style="padding: 0px">
        <v-container>
          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-menu
                v-model="menuMostrarCalendario"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :disabled="editarRegistroEnvio"
                    label="Fecha de Envio"
                    class="custom px-2"
                    filled
                    dense
                    v-model="modeloRegistroEnvioStore.regfecha"
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

            <v-col cols="12" md="6">
              <v-select
                :disabled="editarRegistroEnvio"
                v-model="modeloRegistroEnvioStore.regtipo"
                placeholder="Tipo de Producto"
                class="style-chooser"
                label="tipocacao"
                @input="obtenerTodosTipoCacao"
                :reduce="(listaTipoCacaoStore) => listaTipoCacaoStore.regtipo"
                :options="listaTipoCacaoStore"
                :rules="[reglas.campoVacio(modeloRegistroEnvioStore.regtipo)]"
              >
                <template v-slot:no-options="{ search, searching }">
                  <template v-if="searching">
                    No hay resultados para <em>{{ search }}</em
                    >.
                  </template>
                  <em style="opacity: 0.5" v-else
                    >Empiece a escribir un tipo</em
                  >
                </template>
              </v-select>
            </v-col>
          </v-row>
          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-text-field
                class="custom px-2"
                filled
                dense
                label="Lote"
                v-model="modeloRegistroEnvioStore.reglote"
                :disabled="editarRegistroEnvio"
                :rules="[reglas.campoVacio(modeloRegistroEnvioStore.reglote)]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                class="custom px-2"
                filled
                dense
                label="Destino"
                v-model="modeloRegistroEnvioStore.regdestino"
                :disabled="editarRegistroEnvio"
                :rules="[
                  reglas.campoVacio(modeloRegistroEnvioStore.regdestino),
                ]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <v-card elevation="0">
            <v-card-title class="primary--text">
              <v-col cols="12" md="6"> Detalle </v-col>
              <v-col cols="12" md="6">
                <v-autocomplete
                  v-model="modeloRegistroEnvioDetalle"
                  :items="listaSeleccionDetallesStore"
                  :filter="filtroCodigos"
                  item-text="datosunidos"
                  label="Buscar"
                  class="custom"
                  dense
                  filled
                ></v-autocomplete>
                <!-- boton -->
                <v-card-actions class="justify-center pb-3">
                  <v-btn
                    :block="$vuetify.breakpoint.xs ? true : false"
                    width="200px"
                    color="primary"
                    @click="agregarDetalle()"
                    >Agregar</v-btn
                  >
                </v-card-actions>
              </v-col>
            </v-card-title>

            <v-card-text>
              <v-data-table
                :headers="cabeceraTablaDetalle"
                :items="modeloRegistroEnvioStore.regdetalle"
                class="elevation-1"
              >
                <template v-slot:item.actions="{ item }">
                  <v-btn icon>
                    <v-icon
                      class="primary--text"
                      @click="eliminarItemDetalleEnvio(item)"
                      >mdi-trash-can</v-icon
                    >
                  </v-btn>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-container>
      </v-card-text>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from "vuex";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import servicioProducto from "../services/ServicioProducto";
import ServicioRegistroEnvio from "../services/ServicioRegistroEnvio";
export default {
  name: "FormRegistroEnvio",

  components: {
    vSelect,
  },

  mounted() {
    this.obtenerTodosTipoCacao();
    this.obtenerSeleccionDetalles();
  },

  data() {
    return {
      cabeceraTablaDetalle: [
        {
          text: "Código",
          value: "codigo",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha",
          value: "fecha",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Productor",
          value: "productor",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "QQ Entregados",
          value: "entregados",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Acciones",
          value: "actions",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
      ],
      modeloRegistroEnvioDetalle: null,
      fecha: null,
      menuMostrarCalendario: "", // Variable de referencia para el menú de fecha toma muestra
      fechaActual: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },
  watch: {
    fecha(val) {
      this.modeloRegistroEnvioStore.regfecha = this.formatDate(this.fecha);
    },
  },
  computed: {
    // Obtiene la variable que indica si el formulario es valido
    formRegistroEnvioValido: {
      get() {
        return this.$store.getters[
          "moduloRegistroEnvio/formRegistroEnvioValido"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloRegistroEnvio/cambiarEstadoValidoFormRegistroEnvio",
          v
        );
      },
    },

    modeloRegistroEnvioStore: {
      get() {
        return this.$store.getters[
          "moduloRegistroEnvio/modeloRegistroEnvioStore"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloRegistroEnvio/establecerModeloRegistroEnvioStore",
          v
        );
      },
    },
    listaRegistroEnvioStore: {
      get() {
        return this.$store.getters[
          "moduloRegistroEnvio/listaRegistroEnvioStore"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloRegistroEnvio/establecerListaRegistroEnvioStore",
          v
        );
      },
    },
    listaTipoCacaoStore: {
      get() {
        return this.$store.getters["moduloRegistroEnvio/listaTipoCacaoStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloRegistroEnvio/establecerListaTipoCacaoStore",
          v
        );
      },
    },
    listaSeleccionDetallesStore: {
      get() {
        return this.$store.getters[
          "moduloRegistroEnvio/listaSeleccionDetallesStore"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloRegistroEnvio/establecerListaSeleccionDetallesStore",
          v
        );
      },
    },
    ...mapState("moduloRegistroEnvio", ["editarRegistroEnvio"]),
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {
    async obtenerTodosTipoCacao() {
      let resultado = await servicioProducto.obtenerDetallesCacao();
      this.listaTipoCacaoStore = resultado.data;
    },

    async obtenerSeleccionDetalles() {
      let resultado = await ServicioRegistroEnvio.obtenerSeleccionDetalles();
      this.listaSeleccionDetallesStore = resultado.data;
    },

    formatDate(fecha) {
      if (!fecha) return null;

      const [year, month, day] = fecha.split("-");
      return `${day}/${month}/${year}`;
    },

    filtroCodigos(item, queryText) {
      const texto = item.codigo.toLowerCase();
      const busqueda = queryText.toLowerCase();
      return texto.indexOf(busqueda) > -1;
    },
    agregarDetalle() {
      console.log('Modelo envio detalle');
      console.log(this.modeloRegistroEnvioDetalle);
      const encontrado = this.listaSeleccionDetallesStore.find(
        (e) => e.datosunidos === this.modeloRegistroEnvioDetalle
      );
      //ver si ya se ha agregado el objeto anterior,mente para no volver a agregarlo
      let seleccionado = false;

      for (
        var i = 0;
        i < this.modeloRegistroEnvioStore.regdetalle.length;
        i++
      ) {
        if (
          this.modeloRegistroEnvioStore.regdetalle[i].datosunidos ==
          encontrado.datosunidos
        ) {
          alert("El objeto ya se encuentra seleccionado");
          seleccionado = true;
        }
      }
      if (!seleccionado) {
        this.modeloRegistroEnvioStore.regdetalle.push(encontrado);
      }
      this.modeloRegistroEnvioDetalle = null;
    },
    eliminarItemDetalleEnvio(item) {
      let eliminarElemento=(lista,elemento)=>{
        return lista.filter(e=>e.datosunidos!==elemento.datosunidos)
      }
      let listaDetalle=this.modeloRegistroEnvioStore.regdetalle;
     listaDetalle=eliminarElemento(listaDetalle,item);
      this.$store.commit("moduloRegistroEnvio/establecerRegdetalle",listaDetalle);
    },
    // Cierra el dialogo
    cerrarDialogNuevoRegistroEnvio() {
      this.dialogNuevoRegistroEnvio = !this.dialogNuevoRegistroEnvio; // Cierra el dialogNuevoRegistroEnvio
    },
  },
};
</script>
