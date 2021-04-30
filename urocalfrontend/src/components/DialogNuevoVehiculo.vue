<template>
  <v-dialog v-model="dialogNuevoVehiculo" scrollable max-width="500px" transition="dialog-transition" :fullscreen="$vuetify.breakpoint.xs ? true : false">
    <v-card tile>
      <v-card-title class="justify-center primary--text">
        <v-spacer></v-spacer>
        <h5>Nuevo Vehiculo</h5>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon class="primary--text" @click="cerrarDialogo()">mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="modeloVehiculoStore.vehplaca" class="custom px-2" filled dense label="Placa"></v-text-field>
            
            <v-select
            v-model="modeloVehiculoStore.vehmarca"
            placeholder="Marca"
            class="style-chooser"
            label="nombre"
            :reduce="(itemsMarcaStore) => itemsMarcaStore.nombre"
            :options="itemsMarcaStore"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir una Placa de Vehiculo</em>
            </template>
          </v-select>
            
            <v-text-field class="custom px-2" v-model="modeloVehiculoStore.vehdescripcion" filled dense label="Descripcion"></v-text-field>
            <v-checkbox
              v-model="modeloVehiculoStore.vehlona"
              label="Lona"
              color="success"
              value="true"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="modeloVehiculoStore.vehcaseta"
              label="Caseta"
              color="success"
              value="true"
              hide-details
            ></v-checkbox>
            <v-text-field class="custom px-2" v-model="modeloVehiculoStore.vehpuerta" :rules="[reglas.campoVacio(modeloVehiculoStore.vehpuerta),reglas.soloNumerosPositivos(modeloVehiculoStore.vehpuerta)]" filled dense label="Puerta"></v-text-field>
            <v-select
            v-model="modeloVehiculoStore.fincaid"
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
              <em style="opacity: 0.5" v-else>Empiece a escribir una Placa de Vehiculo</em>
            </template>
          </v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-col>
        <!--<v-btn color="error" block @click="dialogNuevoVehiculo = !dialogNuevoVehiculo" >Cancelar</v-btn>-->
        <v-btn color="primary" @click="guardarVehiculo()" large elevation="0" block class="mt-2">Guardar</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import ServicioFinca from '../services/ServicioFinca';
import ServicioVehiculo from '../services/ServicioVehiculo';

export default {
  name: "DialogNuevoVehiculo",
  components: {
    vSelect,
  },

  props: {},

  data() {
    return {
      menuMostrarCalendario: "",
      listaFinca:[],
      fechaActual: new Date().toISOString().substr(0, 10), // Fecha actual

    };
  },
  mounted() {
    
    this.obtenerTodosFincas();
  },

  computed: {
      listavehiculoStore: {
      get() {
        return this.$store.getters["moduloVehiculo/listavehiculoStore"];
      },
      set(v) {
        return this.$store.commit("moduloVehiculo/establecerlistamarcaStore", v);
      },
    },

      itemsMarcaStore: {
      get() {
        return this.$store.getters["moduloVehiculo/itemsMarcaStore"];
      },
      set(v) {
        return this.$store.commit("moduloVehiculo/establecerlistavehiculoStore", v);
      },
    },



    // Según el valor de la variable dialogNuevoVehiculo muestra u oculta el dialogo
    dialogNuevoVehiculo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoVehiculo"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoVehiculo", v);
      },
    },
       modeloVehiculoStore: {
      get() {
        return this.$store.getters["moduloVehiculo/vehiculo"];
      },
      set(v) {
        return this.$store.commit("moduloVehiculo/nuevoVehiculo", v);
      },
    
  },
      ...mapState("validacionForm", ["reglas"]),                  // Reglas de validacion
  },

  methods: {
     async cargarVehiculo()
    {
        let respuesta = await ServicioVehiculo.obtenerTodosVehiculos();  // Obtener respuesta de backend
        let datosVehiculo = await respuesta.data;
        this.$store.commit("moduloVehiculo/vaciarLista",null);                                    // Rescatar datos de la respuesta
        datosVehiculo.forEach((vehiculo) => {                                  // Guardar cada registro en la 'lista de datos' 
        this.$store.commit("moduloVehiculo/addListaVehiculo",vehiculo);
      });
      
    },

    cerrarDialogo(){
      this.dialogNuevoVehiculo = !this.dialogNuevoVehiculo;
      this.vaciarVehiculo;
    },

    async obtenerTodosFincas() {
      //console.log(usuariosesion.productorid);
      let resultado = await ServicioFinca.obtenerTodosFincas();
      this.listaFinca = resultado.data;
    },


    async guardarVehiculo()
    {
            //console.log(this.limpieza_vehiculo)
      try {
        let respuesta = await ServicioVehiculo.agregarVehiculo(this.modeloVehiculoStore);  
        this.$toast.success(respuesta.data.message);
        this.cerrarDialogo();
        this.cargarVehiculo();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },
  },
};
</script>
