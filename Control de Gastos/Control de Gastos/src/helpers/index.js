export function formatearMoneda(cantidad) {
    return cantidad.toLocaleString('es-ES', { style: 'currency',
        currency: 'EUR' });
}

export const generaId = () => {
    const fecha = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2);
    return fecha + random;
}

export const opciones = {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
}