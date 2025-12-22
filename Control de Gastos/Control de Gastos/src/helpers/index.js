export function formatearMoneda(cantidad) {
    return cantidad.toLocaleString('es-ES', { style: 'currency',
        currency: 'EUR' });
}
