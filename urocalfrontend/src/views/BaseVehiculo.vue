<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo Vehiculo -->
    <DialogNuevoVehiculo ref="DialogNuevoVehiculo"></DialogNuevoVehiculo>

    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0" class="mt-5">
      <v-card-title class="py-2">
        <v-row no-gutters justify-md="space-between">
          <v-col cols="12" md="6">
            <div
              :class="[`text-h4`, `mb-4`]"
              class="transition-swing primary--text"
              v-text="nombre"
            ></div>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="buscarVehiculo"
              append-icon="mdi-magnify"
              label="Buscar"
              class="custom"
              filled
              dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaVehiculos"
          sort-by="id_lote"
          :items="listavehiculoStore"
          :search="buscarVehiculo"
          class="elevation-1"
        >
          <template v-slot:top>
            <DialogEditarVehiculo ref="DialogEditarVehiculo"></DialogEditarVehiculo>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="cargarDialogEditarVehiculo(item)">mdi-eye</v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          large
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px"
          color="primary"
          @click="cargarDialogNuevoVehiculo()"
          >Nuevo Vehiculo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

import DialogNuevoVehiculo from "../components/DialogNuevoVehiculo";
import DialogEditarVehiculo from "../components/DialogEditarVehiculo";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion
import ServicioVehiculo from '../services/ServicioVehiculo';

export default {
  name: "BaseVehiculo",

  components: {
    DialogNuevoVehiculo,
    DialogEditarVehiculo,
  },

  data() {
    return {
      nombre: "Gestión de Vehículos",
      buscarVehiculo: "", // Guarda el texto de búsqueda
      cabeceraTablaVehiculos: [
        // Detalla las cabeceras de la tabla (Los campos más relevantes)
        {
          text: "Placa",
          value: "vehplaca",
          align: "center",
          sortable: false,
          class: "grey lighten-3",
        },
        {
          text: "Marca",
          value: "vehmarca",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Descripción",
          value: "vehdescripcion",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Lona",
          value: "vehlona",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Caseta",
          value: "vehcaseta",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Puerta",
          value: "vehpuerta",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Finca",
          value: "finnombrefinca",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Detalles",
          value: "actions",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
      ],
    };
  },
    mounted()
  {
    this.cargarVehiculo();

  },

  computed: {

    
    /* Obtiene y establece el estado de la variable dialogNuevoVehiculo
    que muestra u oculta el dialogo*/
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

        listavehiculoStore: {
      get() {
        return this.$store.getters["moduloVehiculo/listavehiculoStore"];
      },
      set(v) {
        return this.$store.commit("moduloVehiculo/establecerlistavehiculoStore", v);
      },
    },

    /* Obtiene y modifica el estado de la variable dialogTabMostrarLote
    que muestra u oculta el dialogo*/
    dialogEditarVehiculo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogEditarVehiculo"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogEditarVehiculo", v);
      },
    },
  },

  methods: {
    ...mapMutations("moduloVehiculo", ["vaciarVehiculo"]),
    // Vacia el modelo Vehiculo


    // Dialogo Nuevo Vehiculo
    cargarDialogNuevoVehiculo() {
      this.dialogNuevoVehiculo = !this.dialogNuevoVehiculo; // Abre el DialogNuevoVehiculo
      this.vaciarVehiculo();
    },
    conversion(params){
      let resultado=false;
      if(params=="Si"){
        resultado=true;
      }else if(params=="No"){
        resultado=false;
      }
      return resultado;
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

    // Dialogo Editar Vehiculo
    async cargarDialogEditarVehiculo(item) {
      this.dialogEditarVehiculo = !this.dialogEditarVehiculo;
      //this.vaciarVehiculo();
      let respuesta = await ServicioVehiculo.obtenerVehiculo(item.vehiculoid);  // Obtener respuesta de backend
      let datosVehiculo = await respuesta.data[0];
      this.modeloVehiculoStore={
    vehiculoid:datosVehiculo.vehiculoid,
    vehplaca:datosVehiculo.vehplaca, 
    vehmarca:datosVehiculo.vehmarca,
    vehdescripcion:datosVehiculo.vehdescripcion,
    vehlona:this.conversion(datosVehiculo.vehlona),
    vehcaseta:this.conversion(datosVehiculo.vehcaseta),
    vehpuerta:datosVehiculo.vehpuerta,
    fincaid:datosVehiculo.fincaid,
      }
    },
  },

  mixins: [autenticacionMixin, myMixin],

  created() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario.rol === "Administrador")
      this.$store.commit("colocarLayout", "LayoutAdministrador");
    if (usuario.rol === "Responsable Centro Acopio")
      this.$store.commit("colocarLayout", "LayoutCentroAcopio");
  },
};
</script>
