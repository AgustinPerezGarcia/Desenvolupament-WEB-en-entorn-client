let platos = [];

export function recogerInfo(){
    const cantidad = document.querySelectorAll('.cant');

cantidad.forEach(e => {
    e.addEventListener("input", (e)=>{guardarPlato(e)});
    e.addEventListener("input", mostrarPlato);
    e.addEventListener("input", mostrarPropina);
});

}

//guardamos platos
function guardarPlato(e) {

    const infoPlato = e.target.parentElement.parentElement;    

    const nombre = infoPlato.querySelector('.nombre').textContent;
    const precio = infoPlato.querySelector('.precio').textContent;
    const categoria = infoPlato.querySelector('.categoria').textContent;
    const cantidad = infoPlato.querySelector('.cant').value;
    const id = infoPlato.querySelector('.cant').id; 

    const existe = platos.some(curso => curso.id === id);

    if (existe) {
        platos[id].cantidad = cantidad;
    } else {
        const plato = {
            nombre: nombre,
            precio: precio,
            categoria: categoria,
            cantidad: cantidad,
            id: id,
        };

        platos[id] = plato;
    }

        console.table(platos);

}

//mostramos el plato

function mostrarPlato() {
    const tabla = document.querySelector('#resumen .contenido');
    tabla.innerHTML = "";

    if (platos.length === 0) return;

    let html = `
        <div class="col-md-6 card py-2 px-3 shadow">
            <h3 class="my-4 text-center">Consumiciones</h3>
    `;

    let subtotal = 0;

    platos.forEach(({ nombre, cantidad, precio }) => {
        const subtotalPlato = cantidad * precio;
        subtotal += subtotalPlato;

        html += `
            <ul class="list-group my-4">
                <li class="list-group-item fw-bold">${nombre}</li>
                <li class="list-group-item fw-bold">Cantidad: <span class="fw-normal">${cantidad}</span></li>
                <li class="list-group-item fw-bold">Precio: <span class="fw-normal">${precio}€</span></li>
                <li class="list-group-item fw-bold">Subtotal: <span class="fw-normal">${subtotalPlato}€</span></li>
            </ul>
        `;
    });

    html += `</div>`;
    tabla.innerHTML = html;

    mostrarPropina(subtotal);
}

//mostramos propina

function mostrarPropina(subtotal) {
    const tabla = document.querySelector('#resumen .contenido');
    
    if (tabla.querySelector('.propina')) return;

    const div = document.createElement('div');
    div.className = 'col-md-6 card py-2 px-3 shadow propina';
    div.innerHTML = `
        <h3 class="my-4 text-center">Propina</h3>
        <div class="form-check">
            <input type="radio" name="propina" value="10" class="form-check-input" id="p10">
            <label for="p10" class="form-check-label">10%</label>
        </div>
        <div class="form-check">
            <input type="radio" name="propina" value="25" class="form-check-input" id="p25">
            <label for="p25" class="form-check-label">25%</label>
        </div>
        <div class="form-check">
            <input type="radio" name="propina" value="50" class="form-check-input" id="p50">
            <label for="p50" class="form-check-label">50%</label>
        </div>
        <p class="fs-4 fw-bold mt-2">Subtotal: <span id="subtotal" class="fw-normal">${subtotal}</span>€</p>
        <p class="fs-4 fw-bold mt-2">Propina: <span id="propina" class="fw-normal">0</span>€</p>
        <p class="fs-4 fw-bold mt-2">Total a pagar: <span id="total" class="fw-normal">${subtotal}</span>€</p>
    `;

    tabla.appendChild(div);

    div.querySelectorAll('input[name="propina"]').forEach(input => {
        input.addEventListener('change', e => {
            const porcentaje = Number(e.target.value);
            const propina = subtotal * (porcentaje / 100);
            const total = subtotal + propina;

            div.querySelector('#propina').textContent = propina.toFixed(2);
            div.querySelector('#total').textContent = total.toFixed(2);
        });
    });
}
