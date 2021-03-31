<template>
  <v-form ref="formGuiaRemision" v-model="formGuiaRemisionValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field :disabled="editarGuiaRemision" v-model="modeloGuiaRemisionStore.guiserie" class="custom px-2" dense filled label="Serie" :rules="[reglas.campoVacio(modeloGuiaRemisionStore.guiserie)]"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field :disabled="editarGuiaRemision" v-model="modeloGuiaRemisionStore.guinumero" class="custom px-2" dense filled label="Número" :rules="[reglas.campoVacio(modeloGuiaRemisionStore.guinumero)]"></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field :disabled="editarGuiaRemision" v-model="modeloGuiaRemisionStore.guicomprobanteventa" class="custom px-2" dense filled label="Número del comprobante de venta" :rules="[reglas.campoVacio(modeloGuiaRemisionStore.guicomprobanteventa)]"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-menu
          :disabled="editarGuiaRemision"
            v-model="menuFechaEmision"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field class="custom px-2" dense filled
                :disabled="editarGuiaRemision"
                v-model="modeloGuiaRemisionStore.guifechaemision"
                label="Fecha de emisión"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="[reglas.campoVacio(modeloGuiaRemisionStore.guifechaemision)]"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="modeloGuiaRemisionStore.guifechaemision"
              @input="menuFechaEmision = false"
              :show-current="fechaActual"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-menu
            :disabled="editarGuiaRemision"
            v-model="menuFechaInicioTraslado"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field class="custom px-2" dense filled
                :disabled="editarGuiaRemision"
                v-model="modeloGuiaRemisionStore.guifechainicio"
                label="Fecha de inicio de traslado"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="[reglas.campoVacio(modeloGuiaRemisionStore.guifechainicio)]"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="modeloGuiaRemisionStore.guifechainicio"
              @input="menuFechaInicioTraslado = false"
              :show-current="fechaActual"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-menu
            :disabled="editarGuiaRemision"
            ref="menuHoraInicio"
            v-model="menuHoraInicio"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :disabled="editarGuiaRemision"
                class="custom px-2"
                v-model="modeloGuiaRemisionStore.guihorainicio"
                label="Hora de inicio del traslado"
                readonly
                dense filled
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menuHoraInicio"
              v-model="modeloGuiaRemisionStore.guihorainicio"
              full-width
              @click:minute="$refs.menuHoraInicio.save(modeloGuiaRemisionStore.guihorainicio)"
            ></v-time-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-menu
            :disabled="editarGuiaRemision"
            v-model="menuFechaFinTraslado"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field class="custom px-2" dense filled
                :disabled="editarGuiaRemision"
                v-model="modeloGuiaRemisionStore.guifechafin"
                label="Fecha de fin de traslado"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="[reglas.campoVacio(modeloGuiaRemisionStore.guifechafin)]"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="modeloGuiaRemisionStore.guifechafin"
              @input="menuFechaFinTraslado = false"
              :show-current="fechaActual"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-menu
            :disabled="editarGuiaRemision"
            ref="menuHoraFin"
            v-model="menuHoraFin"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
            :close-on-content-click="false"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :disabled="editarGuiaRemision"
                class="custom px-2"
                v-model="modeloGuiaRemisionStore.guihorafin"
                label="Hora de fin del traslado"
                readonly
                dense filled
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="menuHoraFin"
              v-model="modeloGuiaRemisionStore.guihorafin"
              full-width
              @click:minute="$refs.menuHoraFin.save(modeloGuiaRemisionStore.guihorafin)"
            ></v-time-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field :disabled="editarGuiaRemision" v-model="modeloGuiaRemisionStore.guipuntoinicio" class="custom px-2" dense filled label="Punto de inicio" :rules="[reglas.campoVacio(modeloGuiaRemisionStore.guipuntoinicio)]"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field :disabled="editarGuiaRemision" v-model="modeloGuiaRemisionStore.guipuntofin" class="custom px-2" dense filled label="Punto de fin" :rules="[reglas.campoVacio(modeloGuiaRemisionStore.guipuntofin)]"></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          
          <v-select
            v-model="modeloGuiaRemisionStore.guimotivo"
            placeholder="Seleccione una motivo"
            class="style-chooser"
            label="descripcion"
            :reduce="(motivos) => motivos.nombre"
            :options="motivos"
            :disabled="editarGuiaRemision"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>empiece a escribir un motivo</em>
            </template>
          </v-select>

        </v-col>
        <v-col cols="12" md="6">
             <v-select
            v-model="modeloGuiaRemisionStore.guiformapago"
            placeholder="Seleccione una forma de pago"
            class="style-chooser"
            label="descripcion"
            :reduce="(forma_pago) => forma_pago.nombre"
            :options="forma_pago"
            :disabled="editarGuiaRemision"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>empiece a escribir una forma de pago</em>
            </template>
          </v-select>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around" class="mt-5">
        <v-col cols="12" md="6">
          <v-text-field :disabled="editarGuiaRemision" v-model="modeloGuiaRemisionStore.guiobservacion" class="custom px-2" dense filled label="Descripción" :rules="[reglas.campoVacio(modeloGuiaRemisionStore.guiobservacion)]"></v-text-field>
        </v-col>
        <v-col cols="12" md="6" >
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around" class="mt-5">
        <v-col cols="12">
          <p class="text-center overline primary--text">Productor</p>
        </v-col>
        <v-col cols="12" md="6">
          
          <v-select
            v-model="modeloGuiaRemisionStore.productorid"
            placeholder="Seleccione una productor"
            class="style-chooser"
            label="productor"
            :reduce="(listaProductorPersona) => listaProductorPersona.id"
            :options="listaProductorPersona"
            :disabled="editarGuiaRemision"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>empiece a escribir un productor</em>
            </template>
          </v-select>


        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around" class="mt-5">
        <v-col cols="12">
          <p class="text-center overline primary--text">Destinatario</p>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field :disabled="editarGuiaRemision" v-model="modeloGuiaRemisionStore.guidestinatario" class="custom px-2" dense filled label="Nombre o Razón Social" :rules="[reglas.campoVacio(modeloGuiaRemisionStore.guidestinatario)]"></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around" class="mt-5">
        <v-col cols="12">
          <p class="text-center overline primary--text">
            Persona encargada del transporte
          </p>
        </v-col>
        <v-col cols="12" md="9">
         
          <v-select
            v-model="modeloGuiaRemisionStore.conductorid"
            placeholder="Seleccione un conductor"
            class="style-chooser"
            label="conductor"
            :reduce="(listaConductorPersona) => listaConductorPersona.id"
            :options="listaConductorPersona"
            :disabled="editarGuiaRemision"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>empiece a escribir un conductor</em>
            </template>
          </v-select>

         
        </v-col>
        <v-col cols="12" md="9">
          
           <v-select
            v-model="modeloGuiaRemisionStore.vehiculoid"
            placeholder="Seleccione una placa de vehiculo"
            class="style-chooser"
            label="vehplaca"
            :reduce="(listaVehiculos) => listaVehiculos.vehiculoid"
            :options="listaVehiculos"
            :disabled="editarGuiaRemision"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>empiece a escribir la placa del vehiculo</em>
            </template>
          </v-select>

        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around" class="mt-5">
        <v-col cols="12">
          <p class="text-center overline primary--text">Bienes transportados</p>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <v-text-field :disabled="editarGuiaRemision" type="number" min="0" v-model="bien.carcantidad" class="custom px-2" dense filled label="Cantidad" :rules="[reglas.campoVacio(bien.carcantidad)]"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field :disabled="editarGuiaRemision" v-model="bien.carunidad" class="custom px-2" dense filled label="Unidad" :rules="[reglas.campoVacio(bien.carunidad)]"></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <v-text-field :disabled="editarGuiaRemision" v-model="bien.cosechaid" class="custom px-2" dense filled label="Código de cosecha" :rules="[reglas.campoVacio(bien.cosechaid)]"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field :disabled="editarGuiaRemision" v-model="bien.cardescripcion" class="custom px-2" dense filled label="Descripción" :rules="[reglas.campoVacio(bien.cardescripcion)]"></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" md="6">
          <v-text-field :disabled="editarGuiaRemision" v-model="bien.carestado" class="custom px-2" dense filled label="Estado" :rules="[reglas.campoVacio(bien.carestado)]"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
        </v-col>
      </v-row>
      <v-row class="justify-center">              
        <v-btn :disabled="bienValido" elevation="0" large :block="$vuetify.breakpoint.xs ? true : false" width="300px" color="primary" @click="agregarBien()">Agregar bienes transportados</v-btn>
      </v-row>
      <v-row no-gutters justify-md="space-around" class="mt-10">
        <v-col cols="11">
           <!--nuevo data table-->

           <v-data-table
          :headers="cabeceraTablaBienes"
          :items="modeloGuiaRemisionStore.carga"
          class="elevation-1"
          no-data-text= 'No se han agregado bienes'
        >
          <template v-slot:item.actions="{ item }">
            <v-icon :disabled="editarGuiaRemision" color="primary" @click="eliminarBien(item)"> mdi-trash-can </v-icon>
          </template>
        </v-data-table>

        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import {mapState} from 'vuex';
import ServicioVehiculo from "../services/ServicioVehiculo";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: 'FormGuiaRemision',

  components: {
    vSelect,
  },


  data() {
    return {
      menuFechaEmision: false,
      menuFechaInicioTraslado: false,
      menuFechaFinTraslado: false,
      menuHoraInicio: false,
      menuHoraFin: false,
      fechaActual: new Date().toISOString().substr(0, 10),
      indexOfBien: '',
      editandoBien: false,
      bien:{
        carcantidad: '',
        carunidad: '',
        cardescripcion: '',
        carestado: '',
        cosechaid: '',
      },
      listaVehiculos:[],
      cabeceraTablaBienes: [
        {
          text: "Cantidad",
          value: "carcantidad",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Unidad",
          value: "carunidad",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Descripción",
          value: "cardescripcion",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Estado",
          value: "carestado",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Código de cosecha",
          value: "cosechaid",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Acciones",
          value: "actions",
          align: "center",
          class: "grey lighten-3",
        },
      ],
      forma_pago: [{nombre: "Efectivo", descripcion: "Efectivo"},
                   {nombre: "Tarjeta de débito", descripcion: "Tarjeta de débito"},
                   {nombre: "Dinero Electrónico", descripcion: "Dinero Electrónico"},
                   {nombre: "Tarjeta Prepago", descripcion: "Tarjeta Prepago"},
                   {nombre: "Tarjeta de Crédito", descripcion: "Tarjeta de Crédito"},
      
      ],
      motivos: [{nombre: "Venta", descripcion: "Venta"},
                {nombre: "Compra", descripcion: "Compra"},
                {nombre: "Transformación", descripcion: "Transformación"},
                {nombre: "Consignación", descripcion: "Consignación"},
                {nombre: "Traslado entre establecimientos de una misma empresa", descripcion: "Traslado entre establecimientos de una misma empresa"},
                {nombre: "Traslado por emisor itinerante de comprobantes de venta", descripcion: "Traslado por emisor itinerante de comprobantes de venta"},
                {nombre: "Devolución", descripcion: "Devolución"},
                {nombre: "Importación", descripcion: "Importación"},
                {nombre: "Exportación", descripcion: "Exportación"},
                {nombre: "Otros", descripcion: "Otros"},
      ],
    }
  },

  computed: {
    ...mapState("moduloGuiaRemision", ["editarGuiaRemision"]),
    ...mapState("moduloProductorPersona", ["listaProductorPersonaStore"]),
    ...mapState("moduloConductorPersona", ["listaConductorPersonaStore"]),

    ...mapState("validacionForm", ["reglas"]),

    listaProductorPersona(){
      if(this.listaProductorPersonaStore){
        return this.listaProductorPersonaStore.map(productor => {
          return {
            productor:`${productor.pernombres} ${productor.perapellidos} | RUC/CI. ${productor.percedula}`,
            id: productor.personaid
          }
        })
      }
      return [];
    },

    listaConductorPersona(){
      if(this.listaConductorPersonaStore){
        return this.listaConductorPersonaStore.map(conductor => {
          return {
            conductor:`${conductor.pernombres} ${conductor.perapellidos} | RUC/CI. ${conductor.percedula} | Licencia: ${conductor.conductorlicencia}`,
            id: conductor.personaid
          }
        })
      }
      return [];
    },

    modeloGuiaRemisionStore: {
      get() {
        return this.$store.getters["moduloGuiaRemision/modeloGuiaRemisionStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloGuiaRemision/establecerModeloGuiaRemisionStore",
          v
        );
      },
    },

    formGuiaRemisionValido: {
      get() {
        return this.$store.getters["moduloGuiaRemision/formGuiaRemisionValido"];
      },
      set(v) {
        return this.$store.commit(
          "moduloGuiaRemision/cambiarEstadoValidoFormGuiaRemision",
          v
        );
      },
    },

    bienValido() {
      if(!this.bien.carcantidad || !this.bien.carunidad || !this.bien.cardescripcion || !this.bien.cosechaid || !this.bien.carestado){
        return true
      }
      return false;
    }
  },
  
  mounted(){
    this.listaVehiculo();
  },
  methods: {
    agregarBien() {
      this.modeloGuiaRemisionStore.carga.push(this.bien);
      this.$refs.formGuiaRemision.resetValidation();
      this.vaciarBien();
    },
    tablaResponsiva() {
      // Ajusta el tamaño de la tabla para pantallas pequeñas
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          if (
            this.$vuetify.breakpoint.height >= 500 &&
            this.$vuetify.breakpoint.height <= 550
          ) {
            return "41vh";
          }
          if (
            this.$vuetify.breakpoint.height >= 551 &&
            this.$vuetify.breakpoint.height <= 599
          ) {
            return "44vh";
          }
          if (
            this.$vuetify.breakpoint.height >= 600 &&
            this.$vuetify.breakpoint.height <= 650
          ) {
            return "51vh";
          }
          if (
            this.$vuetify.breakpoint.height >= 651 &&
            this.$vuetify.breakpoint.height <= 699
          ) {
            return "53vh";
          }
          if (
            this.$vuetify.breakpoint.height >= 700 &&
            this.$vuetify.breakpoint.height <= 799
          ) {
            return "57vh";
          }
          if (this.$vuetify.breakpoint.height >= 800) {
            return "61vh";
          }
        default:
          return "auto";
      }
    },

    async listaVehiculo (){
      let respuesta= await ServicioVehiculo.obtenerTodosVehiculos();
      this.listaVehiculos= respuesta.data;
    },

    eliminarBien(item){
      const index = this.modeloGuiaRemisionStore.carga.indexOf(item);
      this.modeloGuiaRemisionStore.carga.splice(index, 1);
    },

    vaciarBien() {
      this.bien = JSON.parse(JSON.stringify({
        carcantidad: '',
        carunidad: '',
        cardescripcion: '',
        carestado: '',
        cosechaid: '',
      }))
    }
  }
}
</script>

<style>

</style>