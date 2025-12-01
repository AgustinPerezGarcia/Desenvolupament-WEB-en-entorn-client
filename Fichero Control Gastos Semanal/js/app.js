let presupuesto;
let formulario;
let gastoListado;

class Presupuesto {
    constructor(cantidad) {
        this.presupuesto = Number(cantidad);
        this.restante = Number(cantidad);
        this.gastos = [];
        
    }

    nuevoGasto(gasto) {
        this.gastos.push(gasto);
        this.calcularRestante();
    }

    calcularRestante() {

        const gastado = this.gastos.reduce(function(total, g) {
            return total + g.cantidad;
        }, 0);

        this.restante = this.presupuesto - gastado;

    }

    eliminarGasto(id) {
        this.gastos = this.gastos.filter(function(g) {
            return g.id !== id;

        });

        this.calcularRestante();
    }
}

class InterfazUsuario {
    insertarPresupuesto(obj) {
        const total = document.querySelector('#total');
        const restante = document.querySelector('#restante');

        if (total) {
            total.textContent = obj.presupuesto;

        }
        if (restante) {

            restante.textContent = obj.restante;

        }
    }

    imprimirAlerta(mensaje, tipo) {
        const prev = document.querySelector('.contenido.primario > .alert, .contenido-principal > .alert');
        if (prev) {
            prev.remove();

        }

        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'mt-3');
        divMensaje.textContent = mensaje;

        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');

        }

        const titulo = document.querySelector('.contenido.primario h2.text-center');
        if (titulo && titulo.parentNode) {
            titulo.parentNode.insertBefore(divMensaje, titulo.nextElementSibling);
        } else {
            const cont = document.querySelector('.contenido-principal');
            if (cont) {
                cont.prepend(divMensaje);

            } else {
                document.body.insertBefore(divMensaje, document.body.firstChild);

            }
        }

        setTimeout(function() {
            divMensaje.remove();
        }, 3000);
    }

    mostrarGastos(gastos) {
        const lista = document.querySelector('#gastos ul');
        if (!lista) {
            return;

        }

        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);

        }

        gastos.forEach(function(gasto) {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';
                li.dataset.id = gasto.id;

                li.innerHTML = gasto.nombre + ' <span class="badge badge-primary badge-pill">' + gasto.cantidad + ' €</span>';

                const btn = document.createElement('button');
                btn.classList.add('btn', 'btn-danger', 'borrar-gasto');
                btn.textContent = 'Borrar';
                btn.addEventListener('click', function() {
                        if (typeof window.eliminarGasto === 'function') {
                            window.eliminarGasto(gasto.id);

                        }
                    }
                );

                li.appendChild(btn);
                lista.appendChild(li);

            }
        );
    }

    actualizarRestante(restanteValor) {
        const restante = document.querySelector('#restante');
        if (restante) {
            restante.textContent = restanteValor;

        }
    }

    comprobarPresupuesto(obj) {
        const presupuestoTotal = obj.presupuesto;
        const restante = obj.restante;
        const restanteDiv = document.querySelector('.restante');

        if (restanteDiv) {
            restanteDiv.classList.remove('alert-success', 'alert-warning', 'alert-danger');

            const porcentajeGastado = (presupuestoTotal - restante) / presupuestoTotal;

            if (porcentajeGastado >= 0.75) {
                restanteDiv.classList.add('alert-danger');

            } else if (porcentajeGastado >= 0.5) {
                restanteDiv.classList.add('alert-warning');

            } else {
                restanteDiv.classList.add('alert-success');

            }
        }

        const btn = document.querySelector('#agregar-gasto button[type="submit"]');
        if (btn) {
            if (restante <= 0) {
                this.imprimirAlerta('Has agotado el presupuesto', 'error');
                btn.disabled = true;

            } else {
                btn.disabled = false;

            }
        }
    }
}

const interfaz = new InterfazUsuario();

function preguntarPresupuesto() {
    let presUser;
    do {
        presUser = prompt('¿Cuál es tu presupuesto semanal?');

    } while (presUser === '' || presUser === null || isNaN(presUser) || presUser <= 0);

    presupuesto = new Presupuesto(presUser);
    interfaz.insertarPresupuesto(presupuesto);
}

function añadirGasto(e) {
    e.preventDefault();

    const nombre = document.querySelector('#gasto').value.trim();
    const cantidadStr = document.querySelector('#cantidad').value.trim();
    const cantidad = Number(cantidadStr);

    if (nombre === '' || cantidadStr === '') {
        interfaz.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;

    } else if (isNaN(cantidad) || cantidad <= 0) {
        interfaz.imprimirAlerta('Importe NO válido', 'error');
        return;

    }

    const gasto = {
        nombre: nombre,
        cantidad: cantidad,
        id: Date.now()

    };

    presupuesto.nuevoGasto(gasto);

    interfaz.imprimirAlerta('¡Gasto añadio correctamente!', 'success');
    interfaz.mostrarGastos(presupuesto.gastos);
    interfaz.actualizarRestante(presupuesto.restante);
    interfaz.comprobarPresupuesto(presupuesto);

    if (formulario) formulario.reset();
}

function eliminarGasto(id) {
    presupuesto.eliminarGasto(id);

    interfaz.mostrarGastos(presupuesto.gastos);
    interfaz.actualizarRestante(presupuesto.restante);
    interfaz.comprobarPresupuesto(presupuesto);
}

window.eliminarGasto = eliminarGasto;

document.addEventListener('DOMContentLoaded', function() {
        formulario = document.querySelector('#agregar-gasto');
        gastoListado = document.querySelector('#gastos ul');

        preguntarPresupuesto();

        if (formulario) {
            formulario.addEventListener('submit', añadirGasto);
        }
    }
);