<script setup>

    const emit = defineEmits(['tareaHecha', 'tareaNoHecha', 'borrarTarea'])

    const props = defineProps({
        tarea: {
            type: Object,
            required: true
        }
    })  

</script>
<template>
    <li :class="{'completed': tarea.hecho}">
        <span> {{ tarea.nombre }} </span>
        <div>
            <button class="modificar" v-if="tarea.hecho" @click="emit('tareaNoHecha', tarea)">Marcar como pendiente</button>

            <button class="modificar" v-else @click="emit('tareaHecha', tarea)">Marcar como completada</button>

            <button class="eliminar" @click="emit('borrarTarea', tarea)">Eliminar</button>
        </div>
    </li>
</template>