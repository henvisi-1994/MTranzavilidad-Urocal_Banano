<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo cosecha -->
    <DialogStepperCosechaNuevo
      ref="DialogStepperCosechaNuevo"
    ></DialogStepperCosechaNuevo>

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
            <!-- Caja de búsqueda -->
            <v-text-field
              v-model="buscarCosecha"
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
        <!-- Tabla que muestra las cosechas -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaCosecha"
          sort-by="cosechaid"
          :items="listaCosechaStore"
          :search="buscarCosecha"
          class="elevation-1"
        >
          <template v-slot:top>
            <!-- Tabs que muestra la informacion detallada del cosecha -->
            <DialogTabMostrarCosecha
              ref="DialogoMostrarCosecha"
            ></DialogTabMostrarCosecha>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirTabsMostrarCosecha(item)"> mdi-eye </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo Lote -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" elevation="0"
          large
          color="primary"
          @click="cargarDialogStepperCosechaNuevo()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapMutations, mapState } from "vuex";

import DialogStepperCosechaNuevo from "../components/DialogStepperCosechaNuevo";
import DialogTabMostrarCosecha from "../components/DialogTabMostrarCosecha";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion
import ServicioCosecha from "../services/ServicioCosecha"
import servicioCultivo from "../services/ServicioCultivo";
import servicioLote from "../services/ServicioLote";

export default {
  name: "BaseCosecha",

  components: {
    DialogStepperCosechaNuevo,
    DialogTabMostrarCosecha,
  },

  data() {
    return {
      nombre: "Gestión de Cosecha",
      buscarCosecha: "", // Guarda el texto de búsqueda
      cabeceraTablaCosecha: [
        // Detalla las cabeceras de la tabla

        {
          text: "Cultivo",
          value: "cultivo",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha",
          value: "cosfecha",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Cantidad",
          value: "coscantidad",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Unidad de Medida",
          value: "cosunidad",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Peso Total",
          value: "cospesototal",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Observación",
          value: "cosobservacion",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Codigo Cosecha",
          value: "coscodigo",
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

  computed: {

    bloquearCamposFormCosecha:{
      get() {
        return this.$store.getters["moduloCosecha/bloquearCamposFormCosecha"];
      },
      set(v) {
        return this.$store.commit("moduloCosecha/cambiarBloquearCamposFormCosecha", v);
      },
    },
      cosecha: {
      get() {
        return this.$store.getters["moduloCosecha/cosecha"];
      },
      set(v) {
        return this.$store.commit(
          "moduloCosecha/setCosecha",
          v
        );
      },
    },

    // Obtiene y modifica el estado de la variable dialogStepperCosechaNuevo
    dialogStepperCosechaNuevo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogStepperCosechaNuevo"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogStepperCosechaNuevo", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogTabMostrarLote
     dialogTabMostrarCosecha: {
      get() {
        return this.$store.getters["gestionDialogos/dialogTabMostrarCosecha"];
      },
      set(v) {
        //this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogTabMostrarCosecha", v);
      },
    },

    listaCultivoStore: {
      get() {
        return this.$store.getters["moduloCosecha/listaCultivoStore"];
      },
      set(v) {
        //this.n_step = 1;
        return this.$store.commit("moduloCosecha/asignarListaCultivo", v);
      },
    },

    listaLoteStore: {
      get() {
        return this.$store.getters["moduloCosecha/listaLoteStore"];
      },
      set(v) {
        //this.n_step = 1;
        return this.$store.commit("moduloCosecha/asignarListaLote", v);
      },
    },

    ...mapState("moduloCosecha", ["listaCosechaStore"]),
  },


  methods: {
    // Vacia el modelo lot
    ...mapMutations("moduloCosecha", ["vaciarCosecha", "asignarListaCosecha"]),

    // Vacia el modelo environment
    //...mapMutations("moduloTratamiento", ["vaciarTratamiento"]),

    // Carga el dialogStepperCosechaTratamientoNuevo
    cargarDialogStepperCosechaNuevo() {
      console.log(this.dialogStepperCosechaNuevo);
      this.dialogStepperCosechaNuevo = !this.dialogStepperCosechaNuevo; // Abre el dialogStepperCosechaTratamientoNuevo
      //this.$refs.DialogStepperCosechaNuevo.$refs.componentFormCosecha.$refs.formCosecha.resetValidation(); // Reinicia las validaciones de formLote
      //this.$refs.DialogStepperCosechaNuevo.$refs.componentFormTratamiento.$refs.formTratamiento.resetValidation(); // Reinicia las validaciones de formMedioAmbiente
      this.vaciarCosecha(); // Vacia el modelo Lote
      //this.vaciarTratamiento(); // Vacia el modelo MedioAmbiente
    },

   /* async cargarListaCosecha() {
      let listaCosecha = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioCosecha.obtenerTodosCosecha(); // Obtener respuesta de backend
      let datosUsuario = await respuesta.data; // Rescatar datos de la respuesta
      datosUsuario.forEach((cosecha) => {
        // Guardar cada registro en la 'lista de datos'
        listaCosecha.push(cosecha);
      });
      this.listaCosechaStore = listaCosecha;
      //console.log(this.listaEgresoInsumoStore);
    },*/

    /*abrirTabsMostrarCosecha(item) {
      this.dialogTabMostrarCosecha = !this.dialogTabMostrarCosecha; // Abre el dialogStepperCosechaTratamientoNuevo
      this.vaciarCosecha(); // Vacia el modelo Lote      
      this.cosecha = item;
      //this.vaciarTratamiento(); // Vacia el modelo MedioAmbiente console.log(this.dialogTabMostrarCosecha);
    },*/

   async abrirTabsMostrarCosecha(item) {
      try {
        // Obtener datos de siembra
        //console.log(cosecha)
        let cosecha = await ServicioCosecha.obtenerCosecha(item.cosechaid);
        // Se asignan los datos a los modelos
        this.cosecha = cosecha.data;
        this.ObtenerTodosLoteCultivadoDeFinca();
        this.obtenerTodosListaCultivo();
      } catch (error) {
        this.$store.error(error.response.data.message);
      }
      this.dialogTabMostrarCosecha = true;
      this.bloquearCamposFormCosecha=true;
      //this.$refs.DialogTabsMostrarLote.$refs.componentTab.callSlider();
    },

    /*abrirTabsMostrarCosecha() {
      this.dialogTabMostrarCosecha = !this.dialogTabMostrarCosecha;
      this.$refs.DialogTabMostrarCosecha.$refs.componentTab.callSlider();
      //this.$refs.DialogTabMostrarCosecha.$refs.componentFormCosecha.$refs.formCosecha.resetValidation(); // Reinicia las validaciones de formLote
      //this.$refs.DialogTabMostrarCosecha.$refs.componentFormTratamiento.$refs.formTratamiento.resetValidation(); // Reinicia las validaciones de formMedioAmbiente

      this.vaciarCosecha(); // Vacia el modelo Lote
      this.vaciarTratamiento(); // Vacia el modelo MedioAmbiente
    },*/
    async obtenerTodosCosecha() {
      let resultado = await ServicioCosecha.obtenerTodosCosecha();
      this.asignarListaCosecha(resultado.data);
      //console.log(this.listaMalezaControl);
    },
    async ObtenerTodosLoteCultivadoDeFinca() {
      let resultado = await servicioLote.obtenerTodosLoteCultivadoDeFinca(
        this.cosecha.fincaid
      );
      console.log(resultado.data);
      this.listaLoteStore = resultado.data;
    },
    async obtenerTodosListaCultivo() {
      console.log(this.cosecha.lotecultivadoid);
      let resultado = await servicioCultivo.obtenerCultivoDetalles(
        this.cosecha.lotecultivadoid
      );
      console.log(resultado.data);
      this.listaCultivoStore = resultado.data;
    },
  },
  
  mounted() {
    this.obtenerTodosCosecha();
    //this.cargarListaCosecha();
  },



  mixins: [autenticacionMixin, myMixin],

  created() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario.rol === "Administrador")
      this.$store.commit("colocarLayout", "LayoutAdministrador");
    if (usuario.rol === "Productor")
      this.$store.commit("colocarLayout", "LayoutProductor");
  },
};
</script>
