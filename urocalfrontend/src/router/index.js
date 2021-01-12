import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/BaseLogin.vue'
import BaseMalezaControl from '../views/BaseMalezaControl.vue'
import BaseMonitoreoRoedorCentroAcopio from '../views/BaseMonitoreoRoedorCentroAcopio.vue'
import BaseVehiculo from '../views/BaseVehiculo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  // ------------- ADMINISTRADOR
  {
    path: '/usuario',
    name: 'BaseUsuarioPersona',
    component: () => import('@/views/BaseUsuarioPersona.vue'),
  },
  {
    path: '/operario',
    name: 'BaseOperarioPersona',
    component: () => import('@/views/BaseOperarioPersona.vue'),
  },
  {
    path: '/productor',
    name: 'BaseProductorPersona',
    component: () => import('@/views/BaseProductorPersona.vue'),
  },
  // ------------- PRODUCTOR - BANANO -------------
  // ------------- PRODUCTOR - CACAO --------------  
  {
    path: '/cacao/siembra',    //OJO, Siembra tambien se encuentra en Banano.
    name: 'BaseSiembra',
    component: () => import('@/views/BaseSiembra.vue'),
  },
  {
    path: '/cacao/limpiezaherramienta',
    name: 'BaseLimpiezaHerramienta',
    component: () => import('@/views/BaseLimpiezaHerramienta.vue'),
  },
  {
    path: '/cacao/poda',
    name: 'BasePoda',
    component: () => import('@/views/BasePoda.vue')
  },
  {
    path: '/cacao/fertilizacion',
    name: 'BaseFertilizacion',
    component: () => import('@/views/BaseFertilizacion.vue')
  },
  {
    path: '/cacao/maleza',    //OJO, controlMaleza tambien se encuentra en Cacao.
    name: 'BaseMalezaControl',
    component: BaseMalezaControl
  },
  {
    path: '/cacao/fitosanitario',
    name: 'BaseFitosanitario',
    component: () => import('@/views/BaseFitosanitario.vue')
  },
  {
    path: '/cacao/riego',
    name: 'BaseRiego',
    component: () => import('@/views/BaseRiego.vue')
  },
  // ------------- PRODUCTOR - FINCA -------------- 
  {
    path: '/finca/lote',
    name: 'BaseLote',
    component: () => import('@/views/BaseLote.vue'),
  },
  {
    path: '/finca/monitoreoroedor',
    name: 'MonitoreoRoedorFinca',
    component: () => import('@/views/BaseMonitoreoRoedorFinca.vue'),
  },
  {
    path: '/finca/limpiezavehiculo', // OJO esta tambien esta en centro de acopio
    name: 'BaseLimpiezaVehiculo',
    component: () => import('@/views/BaseLimpiezaVehiculo.vue'),
  },
  // ------------- CENTRO ACOPIO - BANANO --------------------
  // ------------- CENTRO ACOPIO - CACAO ---------------------
  // ------------- CENTRO ACOPIO - CENTRO ACOPIO ------------- 
  {
    path: '/centroacopio/monitoreoroedor',
    name: 'MonitoreoRoedorCentroAcopio',
    component: BaseMonitoreoRoedorCentroAcopio
  },
  // ------------- EXPORTADOR - BANANO --------------------
  // ------------- EXPORTADOR - CACAO ---------------------

  // ---------------------
  {
    path: '/vehiculo',
    name: 'BaseVehiculo',
    component: BaseVehiculo
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


export default router
