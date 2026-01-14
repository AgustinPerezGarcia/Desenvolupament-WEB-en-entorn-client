import api from "@/lib/axios"

export default {
    obtenerCategorias(){
        return api.get('/list.php?c=list')
    },
    buscarrRecetas({categoria, nombre}){
        return api(`/fliter.php?c=${categoria}&i=${nombre}`)
    }
}