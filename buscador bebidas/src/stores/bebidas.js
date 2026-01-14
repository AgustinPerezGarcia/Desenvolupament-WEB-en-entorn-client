import { defineStore } from "pinia";
import { onMounted, reactive, ref } from "vue";
import APIService from "@/services/APIService";

export const useBebidasStore = defineStore('bebidas', () => {
    const categorias = ref([]);
    const busqueda = reactive({
        nombre: "",
        categoria: ""
    })

    onMounted(async() => {
        const {data: {drinks}} = await APIService.obtenerCategorias();
        console.log(drinks);
        categorias.value = drinks;
    })

    async function obtenerRecetas(){
        const {data: {drinks}} = await APIService.buscarRecetas(busqueda);
        console.log(drinks);
    }

    return {
        categorias,
        busqueda,
        obtenerRecetas
    }
})