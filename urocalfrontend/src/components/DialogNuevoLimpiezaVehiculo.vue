<template>
  <v-dialog
    v-model="dialogNuevoLimpiezaVehiculo"
    scrollable
    max-width="500px"
    transition="dialog-transition"
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
  >
    <v-card tile>
      <v-card-title class="justify-center white primary--text">
        <v-spacer></v-spacer>
        <h5>Nuevo Limpieza Vehiculo</h5>
        <v-spacer></v-spacer>
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
              @input="cargarListaVehiculo"
              placeholder="Finca"
              class="style-chooser"
              label="findescripcionfinca"
              :reduce="(listaFinca) => listaFinca.fincaid"
              :options="listaFinca"
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
              filled
              dense
              label="Producto utilizado"
            ></v-text-field>
            <v-checkbox
              v-model="limpiezaVehiculo.limvehescobillon"
              label="Escobillon"
              color="success"
              value="true"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="limpiezaVehiculo.limvehescoba"
              label="Escoba"
              color="success"
              value="true"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="limpiezaVehiculo.limvehagua"
              label="Agua"
              color="success"
              value="true"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="limpiezaVehiculo.limvehaspiradora"
              label="Aspiradora"
              color="success"
              value="true"
              hide-details
            ></v-checkbox>
            <br />
            <v-select
              v-model="limpiezaVehiculo.vehiculoid"
              placeholder="Vehiculo"
              class="style-chooser"
              label="vehplaca"
              :reduce="(listaVehiculos) => listaVehiculos.vehiculoid"
              :options="listaVehiculos"
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
                  class="custom px-2"
                  filled
                  dense
                  label="Fecha"
                  v-model="limpiezaVehiculo.limvehfecha"
                  :rules="[reglas.campoVacio(limpiezaVehiculo.limvehfecha)]"
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
          <!--<v-btn color="error" block @click="dialogNuevoLimpiezaVehiculo = !dialogNuevoLimpiezaVehiculo" >Cancelar</v-btn>-->
          <v-btn
            color="primary"
            @click="guardarLimpiezaVehiculo()"
            large
            elevation="0"
            width="300px"
            block
            class="mt-2"
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
import ServicioLimpiezaVehiculo from "../services/ServicioLimpiezaVehiculo";
import ServicioVehiculo from "../services/ServicioVehiculo";
import ServicioFinca from "../services/ServicioFinca";
import { mapMutations, mapState } from "vuex";

export default {
  name: "DialogNuevoLimpiezaVehiculo",
  components: {
    vSelect,
  },

  props: {},

  data() {
    return {
      menuMostrarCalendario: "",
      listaFinca: [],
      fincaid: 0,
      fechaActual: new Date().toISOString().substr(0, 10), // Fecha actual
      listaVehiculos: [],
    };
  },

  computed: {
    // Según el valor de la variable dialogNuevoLimpiezaVehiculo muestra u oculta el dialogo
    dialogNuevoLimpiezaVehiculo: {
      get() {
        return this.$store.getters[
          "gestionDialogos/dialogNuevoLimpiezaVehiculo"
        ];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogNuevoLimpiezaVehiculo",
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
    
    ...mapState("validacionForm", ["reglas"]), // Reglas de validacion
  },
  mounted() {
    this.obtenerTodosFincas();
  },

  methods: {
    cerrarDialogo() {
      this.dialogNuevoLimpiezaVehiculo = !this.dialogNuevoLimpiezaVehiculo;
      this.vaciarLimpiezaVehiculo;
    },
    async guardarLimpiezaVehiculo() {
      //console.log(this.limpiezavehiculo)
      try {
        let respuesta = await ServicioLimpiezaVehiculo.agregarLimpiezaVehiculo(
          this.limpiezaVehiculo
        );
        this.$toast.success(respuesta.data.message);
        this.cerrarDialogo();
        this.cargarListaLimpiezaVehiculo();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },
    async cargarListaVehiculo() {
      let respuesta = await ServicioVehiculo.obtenerVehiculoFinca(this.limpiezaVehiculo.fincaid); // Obtener respuesta de backend
      this.listaVehiculos = await respuesta.data;
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
    // #  MANIPULACIÓN DE DATOS  #
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
  },
};
</script>
