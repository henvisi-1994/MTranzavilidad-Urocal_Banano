<template>
  <!-- 
  <v-row  justify="center">
          <v-dialog v-model="dialog" persistent max-width="460" >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">Open Dialog</v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">¿Está seguro de que desea continuar?</v-card-title>
              <v-card-text>El registro será eliminado y no podrá recuperarse.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="dialog = false" >No</v-btn>
                <v-btn color="primary" text @click="dialog = false" >Sí</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
  -->
  <v-dialog
    v-model="dialogEditarConductorPersona"
    scrollable
    max-width="700px"
    transition="dialog-transition"
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
  >
    <v-card tile>
      <v-card-title class="primary--text">
        <h5 class="pl-3">Información del conductor</h5>
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
          ><v-icon @click="cerrarDialogo()" class="primary--text"
            >mdi-close</v-icon
          ></v-btn
        >
      </v-card-title>

      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field
              :disabled="noeditar"
              v-model="modeloConductorPersonaStore.percedula"
              :rules="[reglas.campoVacio(modeloConductorPersonaStore.percedula),
                       reglas.soloNumerosPositivos(modeloConductorPersonaStore.percedula)]" 
              label="Cédula/RUC"
              class="custom px-2"
              dense
              filled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-menu
              v-model="menuMostrarCalendario"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :disabled="noeditar"
                  v-model="modeloConductorPersonaStore.perfechanacimiento"
                  label="Fecha de nacimiento"
                  :rules="[
                    reglas.campoVacio(
                      modeloConductorPersonaStore.perfechanacimiento
                    ),
                  ]"
                  readonly
                  hint="Formato DD/MM/YYYY"
                  v-bind="attrs"
                  v-on="on"
                  class="custom px-2"
                  dense
                  filled
                >
                </v-text-field>
              </template>
              <v-date-picker
                v-model="fecha"
                @input="menuMostrarCalendario = false"
                locale="es-419"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field
              :disabled="noeditar"
              v-model="modeloConductorPersonaStore.pernombres"
              :rules="[reglas.campoVacio(modeloConductorPersonaStore.pernombres)]"
              label="Nombres"
              class="custom px-2"
              dense
              filled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              :disabled="noeditar"
              v-model="modeloConductorPersonaStore.perapellidos"
              :rules="[reglas.campoVacio(modeloConductorPersonaStore.perapellidos)]"
              label="Apellidos"
              class="custom px-2"
              dense
              filled
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field
              :disabled="noeditar"
              v-model="modeloConductorPersonaStore.pertelefono"
              :rules="[reglas.campoVacio(modeloConductorPersonaStore.pertelefono),
                    reglas.soloNumerosPositivos(modeloConductorPersonaStore.pertelefono)]" 
              label="Teléfono"
              class="custom px-2"
              dense
              filled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              :disabled="noeditar"
              v-model="modeloConductorPersonaStore.ciudadnacimiento.ciudadid"
              :rules="[reglas.campoVacio(modeloConductorPersonaStore.ciudadnacimiento.ciudadid)]"
              placeholder="Seleccione una ciudad"
              class="style-chooser px-2"
              label="ciudadnombre"
              filled
              :reduce="(listaCiudadStore) => listaCiudadStore.ciudadid"
              :options="listaCiudadStore"
            >
              <template v-slot:no-options="{ search, searching }">
                <template v-if="searching">
                  No hay resultados para <em>{{ search }}</em>
                </template>
                <em style="opacity: 0.5" v-else
                  >Empiece a escribir una finca</em
                >
              </template>
            </v-select>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field
              :disabled="noeditar"
              v-model="modeloConductorPersonaStore.perwhatsapp"
              :rules="[reglas.campoVacio(modeloConductorPersonaStore.perwhatsapp),
                    reglas.soloNumerosPositivos(modeloConductorPersonaStore.perwhatsapp)]" 
              label="Whatsapp"
              class="custom px-2"
              dense
              filled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              :disabled="noeditar"
              v-model="modeloConductorPersonaStore.pergenero"
              placeholder="Género"
              class="style-chooser px-2 custom"
              label="genero"
              filled
              :reduce="(itemsGenero) => itemsGenero.id"
              :options="itemsGenero"
            >
              <template v-slot:no-options="{ search, searching }">
                <template v-if="searching">
                  No hay resultados para <em>{{ search }}</em>
                </template>
                <em style="opacity: 0.5" v-else
                  >Empiece a escribir una finca</em
                >
              </template>
            </v-select>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field
              :disabled="noeditar"
              v-model="modeloConductorPersonaStore.perdireccion"
              :rules="[reglas.campoVacio(modeloConductorPersonaStore.perdireccion)]"  
              label="Dirección"
              class="custom px-2"
              dense
              filled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              :disabled="noeditar"
              v-model="modeloConductorPersonaStore.conductorlicencia"
              :rules="[reglas.campoVacio(modeloConductorPersonaStore.conductorlicencia),
                    reglas.soloNumerosPositivos(modeloConductorPersonaStore.conductorlicencia)]" 
              label="Licencia"
              class="custom px-2"
              dense
              filled
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field
              :disabled="noeditar"
              v-model="modeloConductorPersonaStore.peremail"
              :rules="[reglas.campoVacio(modeloConductorPersonaStore.peremail),
                    reglas.correo(modeloConductorPersonaStore.peremail)]" 
              label="Email"
              class="custom px-2"
              dense
              filled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6"> </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          color="primary"
          large
          :block="$vuetify.breakpoint.xs ? true : false"
          @click="actualizarRegistro()"
          width="250px"
        >
          Guardar cambios
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import { mapMutations, mapState } from "vuex"; // Trabajar con la tienda de Vue (Store)
import ServicioConductorPersona from "../services/ServicioConductorPersona"; // Interactuar con el Backend

export default {
  name: "DialogEditarConductorPersona",
  components: {
    vSelect,
  },

  data() {
    return {
      noeditar: true,
      menuMostrarCalendario: "",
      fecha: null,
      itemsGenero: [
        { id: 0, genero: "Masculino" },
        { id: 1, genero: "Femenino" },
      ],
      itemsTipoUsuario: [
        "Productor",
        "Responsable Centro Acopio",
        "Exportador",
        "Administrador",
      ],
    };
  },

  watch: {
    fecha(val) {
      // Cada vez que haya un cambio en fecha se actualiza perfechanacimiento aaaa-mm-dd -> dd/mm/aaaa
      this.modeloConductorPersonaStore.perfechanacimiento = this.formatDate(
        this.fecha
      );
    },
  },

  computed: {
    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    listaCiudadStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloConductorPersona/listaCiudadStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloConductorPersona/establecerListaCiudadStore",
          v
        );
      },
    },

    listaConductorPersonaStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters[
              "moduloConductorPersona/listaConductorPersonaStore"
            ]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloConductorPersona/establecerListaConductorPersonaStore",
          v
        );
      },
    },

    // ##############
    // #  DIALOGOS  #
    // ##############
    dialogEditarConductorPersona: {
      get() {
        return this.$store.getters[
          "gestionDialogos/dialogEditarConductorPersona"
        ];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogEditarConductorPersona",
          v
        );
      },
    },

    // #############
    // #  MODELOS  #
    // #############
    modeloConductorPersonaStore: {
      get() {
        return this.$store.getters[
          "moduloConductorPersona/modeloConductorPersonaStore"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloConductorPersona/establecerModeloConductorPersonaStore",
          v
        );
      },
    },

    // ###################
    // #  TIENDA DE VUE  #
    // ###################

    ...mapState("validacionForm", ["reglas"]), // Reglas de validacion
  },
  methods: {
    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    // CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)

    // SELECT: Obtiene todos los registros
    async cargarListaConductorPersona() {
      let listaConductorPersona = []; // Limpiar la 'lista de datos'

      let respuesta = await ServicioConductorPersona.obtenerTodosConductorPersona(); // Obtener respuesta de backend
      let datosUsuario = await respuesta.data; // Rescatar datos de la respuesta
      datosUsuario.forEach((modeloConductorPersonaStore) => {
        // Guardar cada registro en la 'lista de datos'
        listaConductorPersona.push(modeloConductorPersonaStore);
      });

      this.listaConductorPersonaStore = listaConductorPersona;
    },

    // UPDATE: Actualiza un registro
    async actualizarRegistro() {
      try {
        //console.log(this.modeloConductorPersonaStore);
        const respuesta = await ServicioConductorPersona.actualizarConductorPersona(
          this.modeloConductorPersonaStore.personaid,
          this.modeloConductorPersonaStore
        );
        if (respuesta.status == 200) {
          this.cerrarDialogo();
          this.$toast.success(respuesta.data.message);
          this.cargarListaConductorPersona();
          this.vaciarModeloConductorPersonaStore();
        }
      } catch (error) {
        this.$toast.error("Llene todos los campos del formulario!");
      }
    },

    // DELETE: Elimina un registro
    async eliminarRegistro() {
      try {
        //console.log(this.modeloConductorPersonaStore);
        const respuesta = await ServicioConductorPersona.eliminarConductorPersona(
          this.modeloConductorPersonaStore.personaid
        );
        if (respuesta.status == 200) {
          this.cerrarDialogo();
          this.$toast.warning(respuesta.data.message);
          this.cargarListaConductorPersona();
        }
      } catch (error) {
        this.$toast.error("Error al eliminar"); 
      }
    },

    // ########################
    // #  METODOS AUXILIARES  #
    // ########################

    // DIALOGO: cierra este dialogo
    cerrarDialogo() {
      this.dialogEditarConductorPersona = !this.dialogEditarConductorPersona;
      this.noeditar = true;
    },

    // VARIABLE DE ESTADO: Habilita o deshabilita los campos de edición
    cambiarEstadoEditar() {
      this.noeditar = !this.noeditar;
    },

    // FORMATO: Establece el formato de la fecha a dd/mm/aaaa
    formatDate(fecha) {
      if (!fecha) return null;
      const [year, month, day] = fecha.split("-");
      return `${day}/${month}/${year}`;
    },

    ...mapMutations("moduloConductorPersona", [
      "vaciarModeloConductorPersonaStore",
    ]), // Vacia el modelo modeloConductorPersonaStore
  },
};
</script>