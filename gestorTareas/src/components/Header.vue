<script setup>
    import { computed, reactive, ref, watch } from 'vue';
    import Tarea from './Tarea.vue';

    const tarea = reactive({
        nombre: "",
        hecho: false
    });

    const tareas = ref(JSON.parse(localStorage.getItem('tareas')) || []); 

    const tareasPendientes = computed(() =>
        tareas.value.filter(t => !t.hecho).length
    )

    const tareasCompletadas = computed(() =>
        tareas.value.filter(t => t.hecho).length
    )

    function guardarTarea() {

        if (tarea.nombre !== '') {
            
            tareas.value.push({
                nombre: tarea.nombre,
                hecho: false
            })

            tarea.nombre = "";
        
        }
    }

    function tareaHecha(t){
        t.hecho = true;   
    }
    
    function tareaNoHecha(t){
        t.hecho = false; 
    }

    function borrarTarea(tarea) {
        const index = tareas.value.findIndex(t => t === tarea)

        if (index !== -1) {
            tareas.value.splice(index, 1)
        }
    }

    watch(
        tareas,
        (nuevasTareas) => {
            localStorage.setItem(
            'tareas',
            JSON.stringify(nuevasTareas)
            )
        },
        { deep: true }
    )

</script>

<template>
    <div id="app">
        <h1>Gestión de Tareas</h1>
        <form @submit.prevent="guardarTarea">
            <input type="text" placeholder="Añadir tarea..." v-model="tarea.nombre"/>
            <button type="submit">Añadir</button>
        </form>
        <!-- Mostrar conteos de tareas pendientes y completadas -->
        <p>
            Tareas pendientes: {{ tareasPendientes }} | Tareas completadas: {{ tareasCompletadas }}
        </p>
        <!-- Lista de tareas -->
        <ul>
            <Tarea
                v-for="tarea in tareas"
                :key="tarea.nombre"
                :tarea = "tarea"
                @tarea-hecha="tareaHecha"
                @tarea-no-hecha="tareaNoHecha"
                @borrar-tarea="borrarTarea"
            />
        </ul>
    </div>
</template>