<template>
  <v-dialog v-model="dialogEditarVehiculo" scrollable max-width="500px" transition="dialog-transition" :fullscreen="$vuetify.breakpoint.xs ? true : false">
    <v-card tile>
      <v-card-title class="justify-center primary--text">
        <v-spacer></v-spacer>
        <h5>Editar Vehiculo</h5>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon :disabled="!noeditar" class="primary--text" @click="cambiarEstadoEditar()">mdi-pencil</v-icon></v-btn>
        <v-btn icon><v-icon @click="eliminarRegistro()" class="primary--text">mdi-trash-can</v-icon></v-btn>
        <v-btn icon><v-icon class="primary--text" @click="cerrarDialogo()">mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="modeloVehiculoStore.vehplaca" :disabled="noeditar" class="custom px-2" filled dense label="Placa"></v-text-field>
            
            <v-select
            v-model="modeloVehiculoStore.vehmarca"
            :disabled="noeditar"
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
            
            <v-text-field class="custom px-2" v-model="modeloVehiculoStore.vehdescripcion" :disabled="noeditar" filled dense label="Descripcion"></v-text-field>
            <v-checkbox
            :disabled="noeditar"
              v-model="modeloVehiculoStore.vehlona"
              label="Lona"
              color="success"
              hide-details
            ></v-checkbox>
            <v-checkbox
            :disabled="noeditar"
              v-model="modeloVehiculoStore.vehcaseta"
              label="Caseta"
              color="success"
              hide-details
            ></v-checkbox>
            <v-text-field class="custom px-2" v-model="modeloVehiculoStore.vehpuerta" :disabled="noeditar" filled dense label="Puerta"></v-text-field>
            <v-select
            v-model="modeloVehiculoStore.fincaid"
            :disabled="noeditar"
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
        <!--<v-btn color="error" block @click="dialogEditarVehiculo = !dialogEditarVehiculo" >Cancelar</v-btn>-->
        <v-btn color="primary" elevation="0" @click="guardarVehiculo()" large block class="mt-2">Guardar</v-btn>
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
  name: "DialogEditarVehiculo",
  components: {
    vSelect,
  },

  props: {},

  data() {
    return {
      noeditar:true,
      listaFinca:[],
      menuMostrarCalendario: "",
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
        return this.$store.commit("moduloVehiculo/establecerlistavehiculoStore", v);
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

     modeloVehiculoStore: {
      get() {
        return this.$store.getters["moduloVehiculo/vehiculo"];
      },
      set(v) {
        return this.$store.commit("moduloVehiculo/nuevoVehiculo", v);
      },
    
  },
    // Según el valor de la variable dialogEditarVehiculo muestra u oculta el dialogo
    dialogEditarVehiculo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogEditarVehiculo"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogEditarVehiculo", v);
      },
    },

    ...mapState("moduloVehiculo", ["limpieza_vehiculo"]),   // Modulo Vehiculo

    ...mapState("validacionForm", ["reglas"]),                  // Reglas de validacion
    
  },

  methods: {
    cerrarDialogo(){
      this.dialogEditarVehiculo = !this.dialogEditarVehiculo;
      this.vaciarVehiculo;
    },
        async guardarVehiculo()
    {
            //console.log(this.limpieza_vehiculo)
      try {
        let respuesta = await ServicioVehiculo.updateVehiculo(this.modeloVehiculoStore.vehiculoid,this.modeloVehiculoStore);  
        this.$toast.success(respuesta.data.message);
        this.cerrarDialogo();
        this.cargarVehiculo();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    async eliminarRegistro(){
      try {
        let respuestaServicioVehiculo=await ServicioVehiculo.deleteVehiculo(this.modeloVehiculoStore.vehiculoid);
        this.$toast.error(respuestaServicioVehiculo.data.message);
        this.cerrarDialogo();
        this.cargarVehiculo();
        
      } catch (error) {
        this.$toast.error(error.response.data.messagge);
      }
    },

      async cargarVehiculo()
    {
        let respuesta = await ServicioVehiculo.obtenerTodosVehiculos();  // Obtener respuesta de backend
        let datosVehiculo = await respuesta.data;
        this.$store.commit("moduloVehiculo/vaciarLista",null);                                    // Rescatar datos de la respuesta
        datosVehiculo.forEach((vehiculo) => {                                  // Guardar cada registro en la 'lista de datos' 
        this.$store.commit("moduloVehiculo/addListaVehiculo",vehiculo);
      });
      
    },
      cambiarEstadoEditar(){
      this.noeditar=false;
    },
          async obtenerTodosFincas() {
      //console.log(usuariosesion.productorid);
      let resultado = await ServicioFinca.obtenerTodosFincas();
      this.listaFinca = resultado.data;
    },
  },


};
</script>
