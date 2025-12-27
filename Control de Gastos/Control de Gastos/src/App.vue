<script setup>
  import { reactive, ref, watch } from 'vue';
  import Presupuesto from './components/Presupuesto.vue';
  import ControlPresupuesto from './components/ControlPresupuesto.vue';
  import Modal from './components/Modal.vue';
  import iconoNuevoGasto from './assets/img/nuevo-gasto.svg';
  import { generaId } from './helpers';
  import Gasto from './components/Gasto.vue';

  const presupuesto = ref(0);
  const disponible = ref(0);
  const gastado = ref(0)
  const modal = reactive({
    mostrar: false,
    animar: false
  });
  const gasto = reactive({
    nombre: '',
    cantidad: '',
    categoria: '',
    id: null,
    fecha: new Date()
  })
  const gastos = ref([]);

  function definirPresupuesto(cantidad){
      presupuesto.value = cantidad;
      disponible.value = cantidad;
  }

  function mostrarModal() {
    modal.mostrar = true;
    setTimeout(()=>{
      modal.animar = true;
    },500)
  }

  function ocultarModal() {
    setTimeout(()=>{
      modal.mostrar = false;
    },500)
    modal.animar = false;
  }

  function guardarGasto() {
    gasto.id = generaId();
    gastos.value.push({...gasto});
    reiniciarGasto();
    ocultarModal();
  }

  function reiniciarGasto() {
    gasto.nombre = ''
    gasto.cantidad = ''
    gasto.categoria = ''
    gasto.id = null
    gasto.fecha = new Date()
  }

  watch(gastos, () =>{
  gastado.value = gastos.value.reduce(
      (total, gasto) => total + gasto.cantidad,
      0
    );
    disponible.value = presupuesto.value - gastado.value;
    },{
      deep: true
    }
  )

</script>

<template>

  <div      
    :class="{fijar:modal.mostrar}"
  >

    <header>  

      <h1>Planificador de Gastos</h1>

      <div class="contenedor-header contenedor sombra">
        <Presupuesto 
        
          v-if="presupuesto === 0"
        
          @definir-presupuesto="definirPresupuesto"
          
        />
        <ControlPresupuesto
          v-else
          :presupuesto="presupuesto"
          :disponible="disponible"
          :gastado="gastado"
        />

      </div>

    </header>

    <main 
      v-if="presupuesto !== 0"
    >
      <div class="crear-gasto">
        <img 
          :src="iconoNuevoGasto" 
          alt="icono nuevo gasto"
          @click="mostrarModal"
          >
      </div>
      <Modal
        v-if="modal.mostrar === true"
        :animar="modal.animar"
        :disponible="disponible"
        v-model:nombre="gasto.nombre"
        v-model:cantidad="gasto.cantidad"
        v-model:categoria="gasto.categoria"
        @ocultar-modal="ocultarModal"
        @guardar-gasto="guardarGasto"
      />
      <div class="listado-gastos contenedor">
        <h2>{{gastos.length ? "Gastos:" : "NO hay gastos"}}</h2>
        <Gasto
          v-for="value in gastos"
          :gasto="value"
          :key="value.id"
        />
      </div>
    </main>
  
  </div>

</template>

<style>
  :root {
    --azul: #3b82f6;
    --blanco: #FFF;
    --gris-claro: #F5F5F5;
    --gris: #94a3b8;
    --gris-oscuro: #64748b;
    --negro: #000;
  }

  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    font-size: 1.6rem;
    font-family: "Lato", sans-serif;
    background-color: var(--gris-claro);
  }

  h1 {
    font-size: 4rem;
  }

  h2 {
    font-size: 3rem;
  }

  header {
    background-color: var(--azul);
  }

  header h1 {
    padding: 3rem 0;
    margin: 0;
    color: var(--blanco);
    text-align: center;
  }

  .contenedor{
    width: 90%;
    max-width: 80rem;
    margin: 0 auto;
  }

  .contenedor-header{
    margin-top: -5rem;
    transform: translateY(5rem);
    padding: 5rem;
  }

  .sombra{
    box-shadow: 0 10px 15px -3px #0000001a;
    background-color: var(--blanco);
    border-radius: 1.2rem;
    padding: 5rem;
  }

  .crear-gasto{
    position: fixed;
    bottom: 5rem;
    right: 5rem;
  }

  .crear-gasto img{
    width: 5rem;
    cursor: pointer;
  }

  .listado-gastos{
    margin-top: 10rem;
  }

  .listado-gastos h2{
    font-weight: 900;
    color: var(--gris-oscuro);
  }

  .fijar{
    overflow: hidden;
    height: 98vh;
  }
</style>
