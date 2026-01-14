<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { computed } from 'vue';
import { useBebidasStore } from '@/stores/bebidas';

const route = useRoute();

const store = useBebidasStore()
console.log(store.categorias);



const paginaInicio = computed(() => route.name === 'inicio')

const handleSubmit = () => {
    store.obtenerRecetas()
}

</script>

<template>
    <header class="bg-slate-800"
        :class="{ header: paginaInicio}"
        >
        <div class="mx-auto container px-5 py-16">
        <div class="flex justify-between items-center">
            <div>
                <router-link :to="{name: 'inicio'}">
                    <img class="w-32" src="/img/logo.svg" alt="imagen logo">
                </router-link>
            </div>
            <nav class="flex gap-4 text-white items-end">
                <router-link 
                    :to="{name: 'inicio'}"
                    class="uppercase font-bold"
                    active-class="text-orange-500"
                >
                    Inicio
                </router-link>
                <router-link 
                    :to="{name: 'favoritos'}"
                    class="uppercase font-bold"
                    active-class="text-orange-500"
                >
                    Favoritos
                </router-link>
            </nav>

        </div>

        


        <form        
        v-if="paginaInicio"
        v-on:submit.prevent="handleSubmit"
        class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
        >
        <div class="space-y-4">
            <label
            class="block text-white uppercase font-extrabold text-lg"
            for="ingrediente"
            >
            Nombre o Ingredientes
            </label>

            <input
            id="ingrediente"
            type="text"
            class="p-3 w-full rounded-lg focus:outline-none bg-white"
            placeholder="Nombre o Ingrediente: ej. Vodka, Tequila, etc"
            v-model="store.busqueda.nombre"
            />
        </div>
        <div class="space-y-4">
            <label
            class="block text-white uppercase font-extrabold text-lg"
            for="categoría"
            >
            Categoría
            </label>

            <select
            id="categoría"
            type="text"
            class="p-3 w-full rounded-lg focus:outline-none bg-white"
            v-model="store.busqueda.categoria"

            >
                <option value="">---Selecione---</option>
                <option
                    v-for="categoria in store.categorias"
                    :key="categoria.strCategory"
                    :value="categoria.strCategory" 
                >{{ categoria.strCategory }}</option>
            </select>
        </div>
        <input type="submit"
            class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase"
            value="Buscar Bebidas"
        />
        </form>

        </div>
    </header>
</template>

<style scoped>
    .header {
        background-image: url('/public/img/bg.jpg');
        background-size: cover;
        background-position: center;
    }
</style>