<template>
  <v-dialog
    v-model="dialogEditarLimpiezaVehiculo"
    scrollable
    max-width="500px"
    transition="dialog-transition"
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
  >
    <v-card tile>
      <v-card-title class="justify-center white primary--text">
        <h5>Actualizar/Eliminar</h5>
        <v-spacer></v-spacer>
        <v-btn icon
          ><v-icon
            :disabled="!noeditar"
            class="primary--text"
            @click="cambiarEstadoEditar()"
            >mdi-pencil</v-icon
          ></v-btn
        >
        <v-btn icon
          ><v-icon @click="eliminarRegistro()" class="primary--text"
            >mdi-trash-can</v-icon
          ></v-btn
        >
        <v-btn icon
          ><v-icon class="primary--text" @click="cerrarDialogo()"
            >mdi-close</v-icon
          ></v-btn
        >
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-select
              v-model="limpiezaVehiculo.fincaid"
              placeholder="Seleccione una Finca"
              class="style-chooser"
              label="findescripcionfinca"
              :reduce="(listaFinca) => listaFinca.fincaid"
              :options="listaFinca"
              :disabled="noeditar"
            >
              <template v-slot:no-options="{ search, searching }">
                <template v-if="searching">
                  No hay resultados para <em>{{ search }}</em
                  >.
                </template>
                <em style="opacity: 0.5" v-else
                  >Empiece a escribir una Placa de Vehiculo</em
                >
              </template>
            </v-select>

            <v-text-field
              class="custom px-2"
              v-model="limpiezaVehiculo.limvehproductoutilizado"
              :disabled="noeditar"
              filled
              dense
              label="Producto utilizado"
            ></v-text-field>
            <v-checkbox
              v-model="limpiezaVehiculo.limvehescobillon"
              label="Escobillon"
              color="success"
              :disabled="noeditar"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="limpiezaVehiculo.limvehescoba"
              label="Escoba"
              color="success"
              :disabled="noeditar"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="limpiezaVehiculo.limvehagua"
              label="Agua"
              color="success"
              :disabled="noeditar"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="limpiezaVehiculo.limvehaspiradora"
              label="Aspiradora"
              color="success"
              :disabled="noeditar"
              hide-details
            ></v-checkbox>
            <br />
            <v-select
              v-model="limpiezaVehiculo.vehiculoid"
              placeholder="Seleccione una placa de Vehiculo"
              class="style-chooser"
              label="vehplaca"
              :reduce="(listaVehiculos) => listaVehiculos.vehiculoid"
              :options="listaVehiculos"
              :disabled="noeditar"
            >
              <template v-slot:no-options="{ search, searching }">
                <template v-if="searching">
                  No hay resultados para <em>{{ search }}</em
                  >.
                </template>
                <em style="opacity: 0.5" v-else
                  >Empiece a escribir una Placa de Vehiculo</em
                >
              </template>
            </v-select>
            <v-menu
              v-model="menuMostrarCalendario"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="Fecha"
                  v-model="limpiezaVehiculo.limvehfecha"
                  class="custom px-2"
                  filled
                  dense
                  :rules="[reglas.campoVacio(limpiezaVehiculo.limvehfecha)]"
                  :disabled="noeditar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                >
                </v-text-field>
              </template>
              <v-date-picker
                v-model="limpiezaVehiculo.limvehfecha"
                @input="menuMostrarCalendario = false"
                :show-current="fechaActual"
                locale="es-419"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-col>
          <!--<v-btn color="error" block @click="dialogEditarLimpiezaVehiculo = !dialogEditarLimpiezaVehiculo" >Cancelar</v-btn>-->
          <v-btn color="primary" @click="guardar()" block class="mt-2"
            >Guardar</v-btn
          >
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { mapMutations, mapState } from "vuex";
import ServicioLimpiezaVehiculo from "../services/ServicioLimpiezaVehiculo"; // Interactuar con el Backend
import ServicioFinca from "../services/ServicioFinca";
import ServicioVehiculo from "../services/ServicioVehiculo";
export default {
  name: "DialogEditarLimpiezaVehiculo",
  components: {
    vSelect,
  },

  props: {},

  data() {
    return {
      listaFinca: [],
      menuMostrarCalendario: "",
      noeditar: true,
      fechaActual: new Date().toISOString().substr(0, 10), // Fecha actual
      listaVehiculos: [],
    };
  },

  computed: {
    listavehiculoStore: {
      get() {
        return this.$store.getters["moduloVehiculo/listavehiculoStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloVehiculo/establecerlistavehiculoStore",
          v
        );
      },
    },

    itemsMarcaStore: {
      get() {
        return this.$store.getters["moduloVehiculo/itemsMarcaStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloVehiculo/establecerlistavehiculoStore",
          v
        );
      },
    },

    limpiezaVehiculo: {
      get() {
        return this.$store.getters["moduloLimpiezaVehiculo/limpieza_vehiculo"];
      },
      set(v) {
        return this.$store.commit(
          "moduloLimpiezaVehiculo/nuevoLimpiezaVehiculo",
          v
        );
      },
    },
    listaLimpiezaVehiculoStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters[
              "moduloLimpiezaVehiculo/listaLimpiezaVehiculoStore"
            ]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloLimpiezaVehiculo/establecerListaLimpiezaVehiculoStore",
          v
        );
      },
    },

    // Según el valor de la variable dialogEditarLimpiezaVehiculo muestra u oculta el dialogo
    dialogEditarLimpiezaVehiculo: {
      get() {
        return this.$store.getters[
          "gestionDialogos/dialogEditarLimpiezaVehiculo"
        ];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogEditarLimpiezaVehiculo",
          v
        );
      },
    },

    ...mapState("validacionForm", ["reglas"]), // Reglas de validacion
  },
  mounted() {
    this.cargarListaVehiculoPlaca();
    this.obtenerTodosFincas();
  },

  methods: {
    cerrarDialogo() {
      this.dialogEditarLimpiezaVehiculo = !this.dialogEditarLimpiezaVehiculo;
      this.vaciarLimpiezaVehiculo;
      this.noeditar = true;
    },

    async guardar() {
      try {
        let respuestaServicioLimpiezaVehiculo = await ServicioLimpiezaVehiculo.actualizarLimpiezaVehiculo(
          this.limpiezaVehiculo.limpiezavehiculoid,
          this.limpiezaVehiculo
        );
        this.$toast.success(respuestaServicioLimpiezaVehiculo.data.message);
        this.cerrarDialogo();
        this.cargarListaLimpiezaVehiculo();
      } catch (error) {
        this.$toast.error(error.response.data.messagge);
      }
    },
    async cargarListaVehiculoPlaca() {
      let respuesta = await ServicioVehiculo.obtenerTodosVehiculos(); // Obtener respuesta de backend
      this.listaVehiculos = await respuesta.data;
    },
    async eliminarRegistro() {
      try {
        let respuestaServicioLimpiezaVehiculo = await ServicioLimpiezaVehiculo.eliminarLimpiezaVehiculo(
          this.limpiezaVehiculo.limpiezavehiculoid
        );
        this.$toast.error(respuestaServicioLimpiezaVehiculo.data.message);
        this.cerrarDialogo();
        this.cargarListaLimpiezaVehiculo();
      } catch (error) {
        this.$toast.error(error.response.data.messagge);
      }
    },
    async cargarListaLimpiezaVehiculo() {
       try {
        let respuesta = null;
        if (localStorage.getItem("productor") !== null) {
          let usuariosesion = JSON.parse(localStorage.getItem("productor"));
          respuesta = await ServicioLimpiezaVehiculo.obtenerProductorLimpiezaVehiculo(
            usuariosesion.productorid
          );
        } else {
          respuesta = await ServicioLimpiezaVehiculo.obtenerTodosLimpiezaVehiculo();
        }
        let datosLimpiezaVehiculo = await respuesta.data;
        this.$store.commit("moduloLimpiezaVehiculo/vaciarLista", null);
        datosLimpiezaVehiculo.forEach((LimpiezaVehiculo) => {
          // Guardar cada registro en la 'lista de datos'
          this.$store.commit(
            "moduloLimpiezaVehiculo/addListaLimpiezaVe",
            LimpiezaVehiculo
          );
        });
      } catch (error) {}
    },
    async obtenerTodosFincas() {
      try {
        let respuesta = null;
        if (localStorage.getItem("productor") !== null) {
          let usuariosesion = JSON.parse(localStorage.getItem("productor"));
          respuesta = await ServicioFinca.obtenerFincaPropietario(
            usuariosesion.productorid
          );
        } else {
          respuesta = await ServicioFinca.obtenerTodosFincas();
        }
        this.listaFinca = respuesta.data;
      } catch (error) {}
    },
    cambiarEstadoEditar() {
      this.noeditar = false;
    },
  },
};
</script>
