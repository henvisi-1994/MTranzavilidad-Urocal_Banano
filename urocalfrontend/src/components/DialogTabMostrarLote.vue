<template>
  <v-dialog
    v-model="dialogTabsMostrarLote"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
  >
    <v-card class="rounded-0" height="490px">
      <!-- Barra de titulo -->
      <v-card-title class="primary--text">
        <h5>INFORMACIÓN DE LOTE</h5>
        <v-spacer></v-spacer>
        <v-btn icon @click="desbloquearFormulario()">
          <v-icon class="primary--text">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="eliminar()">
          <v-icon class="primary--text">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon @click="closeDialogTabsMostrarLote()">
          <v-icon class="primary--text">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <!-- Tabs -->
        <v-tabs
          v-model="tab"
          show-arrows
          center-active
          fixed-tabs
          ref="componentTab"
        >
          <v-tab href="#formLote"> Lote </v-tab>
          <v-tab href="#formCultivo"> Cultivo </v-tab>
          <v-tab href="#formMedioAmbiente"> Medio ambiente </v-tab>
          <v-tab href="#formSuelo"> Suelo </v-tab>
        </v-tabs>
        <v-divider></v-divider>

        <v-tabs-items v-model="tab">
          <v-tab-item key="formLote" value="formLote">
            <v-card flat>
              <v-card-text class="pb-0">
                <FormLote ref="componentFormLote"></FormLote>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item key="formCultivo" value="formCultivo">
            <v-card flat>
              <v-card-text class="pb-0">
                <FormCultivo></FormCultivo>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item key="formMedioAmbiente" value="formMedioAmbiente" eager>
            <v-card flat>
              <v-card-text class="pb-0">
                <FormMedioAmbiente ref="componentFormMedioAmbiente"></FormMedioAmbiente>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item key="formSuelo" value="formSuelo" eager>
            <v-card flat>
              <v-card-text class="pb-0">
                <FormSuelo ref="componentFormSuelo"></FormSuelo>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
        <!-- Fin: Tabs -->
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Lote -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          color="primary"
          :disabled="bloqueoBotonCambios()"
          @click="guardarCambios()"
          >Guardar cambios</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormLote from "@/components/FormLote";
import FormCultivo from "@/components/FormCultivo";
import FormMedioAmbiente from "@/components/FormMedioAmbiente";
import FormSuelo from "@/components/FormSuelo";

import servicioLote from "../services/ServicioLote";
import servicioCultivo from "../services/ServicioCultivo";
import servicioMedioAmbiente from "../services/ServicioMedioAmbiente";
import servicioSuelo from "../services/ServicioSuelo";

export default {
  name: "TabsMostrarLote",

  components: {
    FormLote,
    FormCultivo,
    FormMedioAmbiente,
    FormSuelo,
  },

  data() {
    return {
      tab: "formLote", // Gestiona los tabs
      // estadoBotonCambios: true, // Bloquea el boton de guardar cambios
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogTabMostrarLote
    dialogTabsMostrarLote: {
      get() {
        return this.$store.getters["gestionDialogos/dialogTabsMostrarLote"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogTabsMostrarLote", v);
      },
    },

    // Obtiene la variable bloquearCamposFormLote
    bloquearCamposFormLote: {
      get() {
        return this.$store.getters["moduloLote/bloquearCamposFormLote"];
      },
      set(v) {
        return this.$store.commit("moduloLote/cambiarBloquearCamposFormLote", v);
      },
    },

    // Obtiene la variable bloquearCamposFormCultivo
    bloquearCamposFormCultivo: {
      get() {
        return this.$store.getters["moduloCultivo/bloquearCamposFormCultivo"];
      },
      set(v) {
        return this.$store.commit("moduloCultivo/cambiarBloquearCamposFormCultivo", v);
      },
    },

    // Obtiene la variable bloquearCamposFormMedioAmbiente
    bloquearCamposFormMedioAmbiente: {
      get() {
        return this.$store.getters["moduloMedioAmbiente/bloquearCamposFormMedioAmbiente"];
      },
      set(v) {
        return this.$store.commit(
          "moduloMedioAmbiente/cambiarBloquearCamposFormMedioAmbiente",
          v
        );
      },
    },

    // Obtiene la variable bloquearCamposFormSuelo
    bloquearCamposFormSuelo: {
      get() {
        return this.$store.getters["moduloSuelo/bloquearCamposFormSuelo"];
      },
      set(v) {
        return this.$store.commit("moduloSuelo/cambiarBloquearCamposFormSuelo", v);
      },
    },

    // Obtiene el modelo suelo
    suelo: {
      get() {
        return this.$store.getters["moduloSuelo/suelo"];
      },
      set(v) {
        return this.$store.commit("moduloSuelo/agregarSuelo", v);
      },
    },

    // Obtiene el modelo lote
    lote: {
      get() {
        return this.$store.getters["moduloLote/lote"];
      },
      set(v) {
        return this.$store.commit("moduloLote/agregarLote", v);
      },
    },


    // Obtiene la lista de IDs de productos
    listaIDsProductos: {
      get() {
        return this.$store.getters["moduloProducto/listaIDsProductos"];
      },
      set(v) {
        return this.$store.commit("moduloProducto/agregarListaIDsProductos", v);
      },
    },

    // Obtiene el modelo medioambiente
    medAmbiente: {
      get() {
        return this.$store.getters["moduloMedioAmbiente/medAmbiente"];
      },
      set(v) {
        return this.$store.commit("moduloMedioAmbiente/agregarMedioAmbiente", v);
      },
    },

    // Obtiene la variable que indica si el formulario es valido
    formMedioAmbienteValido: {
      get() {
        return this.$store.getters["moduloMedioAmbiente/formMedioAmbienteValido"];
      },
      set(v) {
        return this.$store.commit(
          "moduloMedioAmbiente/cambiarEstadoFormMedioAmbienteValido",
          v
        );
      },
    },

    // Obtiene la variable que indica si el formulario es valido
    formLoteValido: {
      get() {
        return this.$store.getters["moduloLote/formLoteValido"];
      },
      set(v) {
        return this.$store.commit("moduloLote/cambiarEstadoFormLoteValido", v);
      },
    },

    // Obtiene la variable que indica si el formulario es valido
    formSueloValido: {
      get() {
        return this.$store.getters["moduloSuelo/formSueloValido"];
      },
      set(v) {
        return this.$store.commit("moduloSuelo/cambiarEstadoFormSueloValido", v);
      },
    },
  },

  methods: {
    // Obtiene mutaciones del moduloLote
    ...mapMutations("moduloLote", ["vaciarLote", "asignarListaLotes"]),

    // Vacia el modelo environment
    ...mapMutations("moduloMedioAmbiente", ["vaciarMedioAmbiente"]),

    // Vacia la lista de IDs de productos
    ...mapMutations("moduloProducto", ["vaciarlistaIDsProductos"]),

    // Vacia el modelo soil
    ...mapMutations("moduloSuelo", ["vaciarSuelo"]),

    closeDialogTabsMostrarLote() {
      this.dialogTabsMostrarLote = false; // Cierra el DialogTabsMostrarLote
    },

    // Desbloquea el formulario, segun el tab en donde se encuentre
    desbloquearFormulario() {
      switch (this.tab) {
        case "formLote":
          this.bloquearCamposFormLote = false;
          this.bloqueoBotonCambios();
          break;
        case "formCultivo":
          /////////////////////////////////////////////////////////////
          this.bloquearCamposFormCultivo = false;
          this.bloqueoBotonCambios();
          break;
        case "formMedioAmbiente":
          this.bloquearCamposFormMedioAmbiente = false;
          this.bloqueoBotonCambios();
          break;
        case "formSuelo":
          this.bloquearCamposFormSuelo = false;
          this.bloqueoBotonCambios();
          break;
      }
    },

    // Desbloquea o bloquea el boton de guardar cambios segun el tab donde se encuentre
    bloqueoBotonCambios() {
      switch (this.tab) {
        case "formLote":
          return !this.bloquearCamposFormLote && this.formLoteValido ? false : true;
          break;
        case "formCultivo":
          return !this.bloquearCamposFormCultivo ? true : false;
          break;
        case "formMedioAmbiente":
          return !this.bloquearCamposFormMedioAmbiente && this.formMedioAmbienteValido
            ? false
            : true;
          break;
        case "formSuelo":
          return !this.bloquearCamposFormSuelo && this.formSueloValido ? false : true;
          break;
      }
    },

    // Actualiza la informacion segun el tab donde se encuentre
    async guardarCambios() {
      switch (this.tab) {
        case "formLote":
          try {
            let respuesta = await servicioLote.actualizarLote(this.lote);
            this.$toast.success(respuesta.data.message);
            this.obtenerTodosLote();
            this.bloquearCamposFormLote = false;
            //this.bloqueoBotonCambios();
            this.closeDialogTabsMostrarLote();
          } catch (error) {
            this.$toast.error(error.response.data.message);
          }
          break;
        case "formCultivo":
          
            this.listaIDsProductos.forEach(async (productoID) => {
              let cultivo = {
                lotecultivadoid: this.lote.lotecultivadoid,
                productoid: productoID,
              };
              try {
                let respuesta = await servicioCultivo.actualizarCultivo(cultivo);
                this.$toast.success(respuesta.data.message);
              } catch (error) {
              this.$toast.error(error.response.data.message);
            }
            });
            this.bloquearCamposFormCultivo = false;
            //this.bloqueoBotonCambios();
            this.closeDialogTabsMostrarLote();
          
          break;
        case "formMedioAmbiente":
          // Si no existe un registro de medioAmbiente para este lote, registra, caso contrario actualiza su informacion
          if (this.medAmbiente.lotecultivadoid === undefined) {
            try {
              this.medAmbiente.lotecultivadoid = this.lote.lotecultivadoid; // Agrega lotecultivadoid al objeto medAmbiente

              let respuesta = await servicioMedioAmbiente.crearMedioAmbiente(
                this.medAmbiente
              );

              this.$toast.success(respuesta.data.message);
              this.bloquearCamposFormMedioAmbiente = false;
              //this.bloqueoBotonCambios();
              this.closeDialogTabsMostrarLote();
            } catch (error) {
              this.$toast.error(error.response.data.message);
            }
          } else {
            try {
              let respuesta = await servicioMedioAmbiente.actualizarMedioAmbiente(
                this.medAmbiente
              );
              this.$toast.success(respuesta.data.message);
              this.bloquearCamposFormMedioAmbiente = false;
              //this.bloqueoBotonCambios();
              this.closeDialogTabsMostrarLote();
            } catch (error) {
              this.$toast.error(error.response.data.message);
            }
          }
          break;
        case "formSuelo":
          // Si no existe un registro de suelo para este lote, registra, caso contrario actualiza su informacion
          if (this.suelo.lotecultivadoid === undefined) {
            try {
              this.suelo.lotecultivadoid = this.lote.lotecultivadoid; // Agrega lotecultivadoid al objeto suelo

              let respuesta = await servicioSuelo.crearSuelo(this.suelo);

              this.$toast.success(respuesta.data.message);
              this.bloquearCamposFormSuelo = false;
              //this.bloqueoBotonCambios();
              this.closeDialogTabsMostrarLote();
            } catch (error) {
              this.$toast.error(error.response.data.message);
            }
          } else {
            try {
              let respuesta = await servicioSuelo.actualizarSuelo(this.suelo);
              this.$toast.success(respuesta.data.message);
              this.bloquearCamposFormSuelo = false;
              //this.bloqueoBotonCambios();
              this.closeDialogTabsMostrarLote();
            } catch (error) {
              this.$toast.error(error.response.data.message);
            }
          }
          break;
      }
    },

    // Llena la listaLotes con datos del servidor backend
    async obtenerTodosLote() {
      let resultado = await servicioLote.obtenerTodosLote();
      this.asignarListaLotes(resultado.data);
    },

    // Elimina segun el tab donde se encuentre
    async eliminar() {
      switch (this.tab) {
        case "formLote":
          try {
            let respuesta = await servicioLote.eliminarLote(this.lote.lotecultivadoid);
            console.log("respuesstaaa  "+respuesta);
            this.$toast.warning(respuesta.data.message);
            this.obtenerTodosLote();
            this.bloquearCamposFormLote = false;
            //this.bloqueoBotonCambios();
            this.closeDialogTabsMostrarLote();
          } catch (error) {
            this.$toast.error();
          }
          break;
        case "formCultivo":
            try {
            let respuesta = await servicioCultivo.eliminarCultivo(
              this.medAmbiente.lotecultivadoid
            );
            this.$toast.success(respuesta.data.message);
            this.medAmbiente = {};
             this.obtenerTodosLote();
            this.bloquearCamposFormCultivo = false;
            //this.bloqueoBotonCambios();
            this.closeDialogTabsMostrarLote();
          } catch (error) {
            this.$toast.error(error.response.data.message);
          }
          break;
        case "formMedioAmbiente":
          try {
            let respuesta = await servicioMedioAmbiente.eliminarMedioAmbiente(
              this.medAmbiente.lotecultivadoid
            );
            this.$toast.success(respuesta.data.message);
            this.medAmbiente = {};
            this.$refs.componentFormMedioAmbiente.$refs.formMedioAmbiente.resetValidation();
            this.obtenerTodosLote();
            this.bloquearCamposFormMedioAmbiente = false;
            //this.bloqueoBotonCambios();
            this.closeDialogTabsMostrarLote();
          } catch (error) {
            this.$toast.error(error.response.data.message);
          }
          break;
        case "formSuelo":
          try {
            let respuesta = await servicioSuelo.eliminarSuelo(this.suelo.lotecultivadoid);
            this.$toast.success(respuesta.data.message);
            this.suelo = {};
            this.$refs.componentFormSuelo.$refs.formSuelo.resetValidation();
            this.obtenerTodosLote();
            this.bloquearCamposFormSuelo = false;
            //this.bloqueoBotonCambios();
            this.closeDialogTabsMostrarLote();
          } catch (error) {
            this.$toast.error(error.response.data.message);
          }
          break;
      }
    },
  },

  watch: {
    // Cada vez que se abre el dialog, se resetean las validaciones de los formularios Lote, MedioAmbiente y Suelo, otras configuracioens más
    dialogTabsMostrarLote() {
      if (this.dialogTabsMostrarLote) {
        setTimeout(() => {
          this.$refs.componentFormLote.$refs.formLote.resetValidation();
          this.$refs.componentFormMedioAmbiente.$refs.formMedioAmbiente.resetValidation();
          this.$refs.componentFormSuelo.$refs.formSuelo.resetValidation();

          this.tab = "formLote";
          this.bloquearCamposFormLote = true;
          this.bloquearCamposFormCultivo = true;
          this.bloquearCamposFormMedioAmbiente = true;
          this.bloquearCamposFormSuelo = true;
        }, 100);
      }
    },
  },
};
</script>
