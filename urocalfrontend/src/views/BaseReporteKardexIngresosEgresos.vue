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
            <v-menu v-model="menuMostrarCalendario" transition="scale-transition" offset-y max-width="290px" min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field class="custom px-2" dense filled
                  label="Fecha Inicial" 
                  readonly
                  v-bind="attrs"
                  v-on="on">
                </v-text-field>
              </template>
              <v-date-picker  @input="menuMostrarCalendario = false" :show-current="fechaActual" locale="es-419" ></v-date-picker>
            </v-menu>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
            <v-menu v-model="menuMostrarCalendario" transition="scale-transition" offset-y max-width="290px" min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field class="custom px-2" dense filled
                  label="Fecha Final" 
                  readonly
                  v-bind="attrs"
                  v-on="on">
                </v-text-field>
              </template>
              <v-date-picker  @input="menuMostrarCalendario = false" :show-current="fechaActual" locale="es-419" ></v-date-picker>
            </v-menu>
        </v-col>
      </v-row>

     <v-row no-gutters justify-md="space-around">
        <v-col  cols="12" sm="6">
          <v-select :items="itemsProducto"  label="Producto"  Producto></v-select>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col  cols="12" sm="6">
          <v-select :items="itemsProveedor"  label="Proveedor"  Poveedor></v-select>
        </v-col>
      </v-row>
      
      <v-row no-gutters justify-md="space-around">
        <v-col  cols="12" sm="6">
          <v-select :items="itemsEncargado"  label="Encargado"  Encargado></v-select>
        </v-col>
      </v-row>
        
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para descargar PDF -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          @click="cargarDialogNuevoPais()"
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
  name: "BaseReporteKardexIngresosEgresos",

  components: {
    //FormReporteCompra,
  },

  mounted() {
    //this.cargarListaPais();
  },

  data() {
    return {
      nombre: "Gestión de Reporte Kardex de Insumos",
      itemsProducto: ['Cacao Nacional', 'Ramilla'],
      itemsProveedor: ['Proveedor 1', 'Proveedor 2', 'Proveedor 3', 'Proveedor 4'],
      itemsEncargado: ['José Ortiz', 'Enma Pardo', 'Cristhian Espinoza'],
      
    };
  },

  computed: {

    listaPaisStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloPais/listaPaisStore"]));
      },
      set(v) {
        return this.$store.commit("moduloPais/establecerListaPaisStore", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogNuevoPais
    dialogNuevoPais: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoPais"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoPais", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarPais
    dialogMostrarPais: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarPais"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogMostrarPais", v);
      },
    },

    modeloPaisStore: {
      get() {
        return this.$store.getters["moduloPais/pais"];
      },
      set(v) {
        return this.$store.commit("moduloPais/nuevoPais", v);
      },
    },
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

    // Vacia el modelo Pais
    ...mapMutations("moduloPais", ["vaciarPais"]),

    // Carga el DialogNuevoPais
    cargarDialogNuevoPais() {
      this.dialogNuevoPais = !this.dialogNuevoPais; // Abre el dialogNuevoPais
      this.$refs.DialogNuevoPais.$refs.componentFormPais.$refs.formPais.resetValidation(); // Reinicia las validaciones de formPais
      this.vaciarPais(); // Vacia el modelo Pais
    },

    abrirMostrarPais(item) {
      this.dialogMostrarPais = !this.dialogMostrarPais;
      this.vaciarPais(); // Vacia el modelo Pais
      const indiceEditar = this.listaPaisStore.indexOf(item);
      this.modeloPaisStore = item;
    },
  },

  mixins: [autenticacionMixin, myMixin],

  created() {
    this.$store.commit("colocarLayout", "LayoutAdministrador");
  },
};
</script>
