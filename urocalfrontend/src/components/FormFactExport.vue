<template>
  <v-form ref="formFactExporta">
    <v-container>
<<<<<<< Updated upstream
        Poner contenido aqui
=======
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Numero"
            v-model="factExportaStore.facnumero"
            :rules="[reglas.campoVacio(factExportaStore.facnumero)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Comprador"
            v-model="factExportaStore.compradorid"
            :rules="[reglas.campoVacio(factExportaStore.compradorid)]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Vendedor"
            v-model="factExportaStore.vendedorid"
            :rules="[reglas.campoVacio(factExportaStore.vendedorid)]"
          ></v-text-field>
        </v-col>
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
                v-model="factExportaStore.facfecha"
                class="custom px-2"
                filled
                dense
                label="Fecha"
                readonly
                :rules="[reglas.campoVacio(factExportaStore.facfecha)]"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="factExportaStore.facfecha"
              @input="menuMostrarCalendario = false"
              :show-current="currentDate"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Puerto de Embarque"
            v-model="factExportaStore.facpuertoembarque"
            :rules="[reglas.campoVacio(factExportaStore.facpuertoembarque)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Puerto de Destino"
            v-model="factExportaStore.facpuertodestino"
            :rules="[reglas.campoVacio(factExportaStore.facpuertodestino)]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Vapor"
            v-model="factExportaStore.facvapor"
            :rules="[reglas.campoVacio(factExportaStore.facvapor)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Subtotal 12%"
            v-model="factExportaStore.facsubtotal12"
            :rules="[reglas.campoVacio(factExportaStore.facsubtotal12)]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Subtotal 0%"
            v-model="factExportaStore.facsubtotal0"
            :rules="[reglas.campoVacio(factExportaStore.facsubtotal0)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Subtotal sin IVA"
            v-model="factExportaStore.facsubtotalsiniva"
            :rules="[reglas.campoVacio(factExportaStore.facsubtotalsiniva)]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Subtotal Excento de IVA"
            v-model="factExportaStore.facsubtotalivaexcento"
            :rules="[reglas.campoVacio(factExportaStore.facsubtotalivaexcento)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Subtotal sin Impuestos"
            v-model="factExportaStore.facsubtotalsinimpuestos"
            :rules="[
              reglas.campoVacio(factExportaStore.facsubtotalsinimpuestos),
            ]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Subtotal sin Impuestos"
            v-model="factExportaStore.facsubtotalsinimpuestos"
            :rules="[
              reglas.campoVacio(factExportaStore.facsubtotalsinimpuestos),
            ]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="ICE"
            v-model="factExportaStore.facice"
            :rules="[reglas.campoVacio(factExportaStore.facice)]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="IVA 12%"
            v-model="factExportaStore.faciva12"
            :rules="[reglas.campoVacio(factExportaStore.faciva12)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="IRBPM"
            v-model="factExportaStore.facirbpn"
            :rules="[reglas.campoVacio(factExportaStore.facirbpn)]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Total"
            v-model="factExportaStore.facvalortotal"
            :rules="[reglas.campoVacio(factExportaStore.facvalortotal)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
           <v-select
            v-model="factExportaStore.facformapago"
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
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Plazo"
            v-model="factExportaStore.facplazo"
            :rules="[reglas.campoVacio(factExportaStore.facplazo)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Tiempo"
            v-model="factExportaStore.factiempo"
            :rules="[reglas.campoVacio(factExportaStore.factiempo)]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="DAE"
            v-model="factExportaStore.facdae"
            :rules="[reglas.campoVacio(factExportaStore.facdae)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Peso Neto"
            v-model="factExportaStore.facpesoneto"
            :rules="[reglas.campoVacio(factExportaStore.facpesoneto)]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Peso Bruto"
            v-model="factExportaStore.facpesobruto"
            :rules="[reglas.campoVacio(factExportaStore.facpesobruto)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Lote"
            v-model="factExportaStore.faclote"
            :rules="[reglas.campoVacio(factExportaStore.faclote)]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Contenedor"
            v-model="factExportaStore.faccontenedor"
            :rules="[reglas.campoVacio(factExportaStore.faccontenedor)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Semana"
            v-model="factExportaStore.facsemana"
            :rules="[reglas.campoVacio(factExportaStore.facsemana)]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-menu
            v-model="menuMostrarCalendarioZarpe"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="Fecha de Zarpe"
                v-model="factExportaStore.facfechazarpe"
                class="custom px-2"
                filled
                dense
                :rules="[reglas.campoVacio(factExportaStore.facfechazarpe)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="factExportaStore.facfechazarpe"
              @input="menuMostrarCalendarioZarpe = false"
              :show-current="currentDate"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Marca"
            v-model="factExportaStore.facmarca"
            :rules="[reglas.campoVacio(factExportaStore.facmarca)]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Certificaciones"
            v-model="factExportaStore.faccertificaciones"
            :rules="[reglas.campoVacio(factExportaStore.faccertificaciones)]"
          ></v-text-field>
        </v-col>
      </v-row>
>>>>>>> Stashed changes
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from "vuex";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "FormFactExporta",

  components: {
    vSelect,
  },

  data() {
    return {
<<<<<<< Updated upstream
      
    };
  },

  
  computed: {

   

    // // Obtiene la variable que indica si el formulario es valido
    // formFactExportaValido: {
    //   get() {
    //     return this.$store.getters["moduloFactExporta/formFactExportaValido"];
    //   },
    //   set(v) {
    //     return this.$store.commit("moduloFactExporta/cambiarEstadoValidoFormFactExporta", v);
    //   },
    // },

    // modeloFactExportaStore: {
    //   get() {
    //     return this.$store.getters["moduloFactExporta/finca"];
    //   },
    //   set(v) {
    //     return this.$store.commit("moduloFactExporta/nuevoFactExporta", v);
    //   },
    // },
=======
      menuMostrarCalendario: "",
      menuMostrarCalendarioZarpe: "",
      currentDate: new Date().toISOString().substr(0, 10),
      forma_pago: [
        { nombre: "Efectivo", descripcion: "Efectivo" },
        { nombre: "Tarjeta de débito", descripcion: "Tarjeta de débito" },
        { nombre: "Dinero Electrónico", descripcion: "Dinero Electrónico" },
        { nombre: "Tarjeta Prepago", descripcion: "Tarjeta Prepago" },
        { nombre: "Tarjeta de Crédito", descripcion: "Tarjeta de Crédito" },
      ],
    };
  },

  computed: {
    // Obtiene la variable que indica si el formulario es valido
    formFacturaExportValido: {
      get() {
        return this.$store.getters[
          "moduloFacturaExport/formFacturaExportValido"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloFacturaExport/cambiarEstadoValidoFormFacturaExport",
          v
        );
      },
    },

    factExportaStore: {
      get() {
        return this.$store.getters["moduloFacturaExport/factExportaStore"];
      },
      set(v) {
        return this.$store.commit("moduloFacturaExport/nuevaFacturaExport", v);
      },
    },
>>>>>>> Stashed changes

    // Obtiene el modelo Ciudad
    // ...mapState("moduloFactExporta", ["finca"]),
    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

<<<<<<< Updated upstream
  methods: {
    
  },
=======
  methods: {},
>>>>>>> Stashed changes
};
</script>
