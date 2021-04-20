<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo Pais -->
    

    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0" class="mt-5">
      <v-card-title class="py-2">
        <v-row no-gutters justify-md="space-between">
          <v-col cols="12" md="12">
            <div :class="[`text-h4`, `mb-4`]" class="transition-swing primary--text" v-text="nombre"></div>            
          </v-col>
         
        </v-row>
      </v-card-title>

      <v-card-text>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
            <v-menu v-model="menuMostrarCalendarioInicial" transition="scale-transition" offset-y max-width="290px" min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field class="custom px-2" dense filled
                  label="Fecha Inicial" 
                  readonly
                  v-bind="attrs"
                  v-on="on">
                </v-text-field>
              </template>
              <v-date-picker  @input="menuMostrarCalendarioInicial = false" :show-current="fechaActual" locale="es-419" ></v-date-picker>
            </v-menu>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
            <v-menu v-model="menuMostrarCalendarioFinal" transition="scale-transition" offset-y max-width="290px" min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field class="custom px-2" dense filled
                  label="Fecha Final" 
                  readonly
                  v-bind="attrs"
                  v-on="on">
                </v-text-field>
              </template>
              <v-date-picker  @input="menuMostrarCalendarioFinal = false" :show-current="fechaActual" locale="es-419" ></v-date-picker>
            </v-menu>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col  cols="12" sm="6">
          <v-select :items="itemsCentroAcopio"  label="Centro de Acopio"  Centro de Acopio></v-select>
        </v-col>
      </v-row>

          
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para descargar PDF -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          @click=""
          >Generar PDF</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";

//import FormReporteCompra from "../components/FormReporteCompra";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseReporteKardexProductos",

  components: {
    //FormReporteCompra,
  },

  mounted() {
    //this.cargarListaPais();
  },

  data() {
    return {
      menuMostrarCalendario:new Date().toISOString().substr(0, 10),
      nombre: "Gestión de Reporte de Kardex de Productos",
      buscarPais: "", // Guarda el texto de búsqueda
      itemsCentroAcopio: ['Centro de Acopio'],
     
    };
  },

  computed: {

    
  },

  methods: {

    // #  MANIPULACIÓN DE DATOS  #
    async cargarListaPais () { 
      let listaPais = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioPais.obtenerTodosPaises();  // Obtener respuesta de backend
      let datosPais = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosPais.forEach((pais) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaPais.push(pais);
      });
      this.listaPaisStore = listaPais;
    },    
  },

  mixins: [autenticacionMixin, myMixin],

  created() {
    this.$store.commit("colocarLayout", "LayoutAdministrador");
  },
};
</script>
