<script setup>
import { ref, onMounted, watch } from 'vue';
import { db } from './data/guitarras';
import Guitarra from './components/Guitarra.vue'
import Header from './components/Header.vue';

const guitarras = ref([]);

const carrito = ref([]);

const guitarra = ref({});

onMounted(() => {
    guitarras.value = db;
    guitarra.value = db[5];
     const localStorageCarrito = localStorage.getItem('carrito');

    if (localStorageCarrito !== null) {
        carrito.value = JSON.parse(localStorageCarrito);
    } 
})

watch(carrito, ()=>{
    guardarLocalStorage()
    },{
        deep:true
})

const agregarCarrito = (guitarra) => {
    if (carrito.value.findIndex((element) => element.id === guitarra.id) === -1) {
        carrito.value.push(guitarra);
        guitarra.cantidad = 1;
    } else {
        guitarra.cantidad++;
    }
}

const cambiarCantidad = (guitarra, num) => {
    if (num !== 1) {
        if (guitarra.cantidad > 1) {
            guitarra.cantidad--;
        }
    } else {
        guitarra.cantidad++;
    }
}

const borrarGuitarra = (guitarra) => {
    const nuevoCarrito = carrito.value.filter((element) => element.id !== guitarra.id);
    carrito.value = nuevoCarrito;
}

const borrarCarrito = () => {
    carrito.value = [];
}

const guardarLocalStorage = ()=>{
    localStorage.setItem('carrito', JSON.stringify(carrito.value))
}

</script>

<template>

    <Header :carrito="carrito" :guitarra="guitarra" :precio="precio"
        @cambiar-cantidad="cambiarCantidad"
        @borrar-guitarra="borrarGuitarra" @borrar-carrito="borrarCarrito" 
        @agregar-carrito="agregarCarrito"
    />

    <main class="container-xl mt-5">
        <h2 class="text-center">Nuestra Colección</h2>

        <div class="row mt-5">
            <Guitarra v-for="guitarra in guitarras" :guitarra="guitarra" 
                @agregar-carrito="agregarCarrito"
                @precio-total="precioTotal"
            />
        </div>
    </main>


    <footer class="bg-dark mt-5 py-5">
        <div class="container-xl">
            <p class="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
</template>

<style></style>
